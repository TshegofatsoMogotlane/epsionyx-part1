'use client'

import { useState, useEffect, useCallback } from 'react'
import { vapiClient, systemPrompts, assistantConfigs, vapiConfig } from '@/lib/vapi'

export type AssistantType = keyof typeof assistantConfigs

interface UseVAPIOptions {
  assistantType: AssistantType
  context?: string
  interviewQuestions?: string[]
  topic?: string
  onCallStart?: () => void
  onCallEnd?: () => void
  onError?: (error: any) => void
}

export const useVAPI = ({
  assistantType,
  context = '',
  interviewQuestions = [],
  topic = 'General',
  onCallStart,
  onCallEnd,
  onError
}: UseVAPIOptions) => {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState(0)

  // Generate system prompt based on assistant type
  const getSystemPrompt = useCallback(() => {
    switch (assistantType) {
      case 'interviewCoach':
        return systemPrompts.interviewCoach(topic, interviewQuestions)
      case 'studyBuddy':
        return systemPrompts.studyBuddy(context)
      case 'careerCoach':
        return systemPrompts.careerCoach(context)
      default:
        return systemPrompts.studyBuddy(context)
    }
  }, [assistantType, topic, interviewQuestions, context])

  // Start call
  const startCall = useCallback(async () => {
    if (isConnected || isLoading) return

    console.log('Starting VAPI call for assistant type:', assistantType)
    setIsLoading(true)
    setError(null)

    try {
      // Check if VAPI public key is available
      if (!vapiConfig.publicKey) {
        throw new Error('VAPI public key not configured. Please check your environment variables.')
      }

      const systemPrompt = getSystemPrompt()
      console.log('Generated system prompt:', systemPrompt.substring(0, 200) + '...')
      
      await vapiClient.startCall(assistantType, systemPrompt)
      
      console.log('VAPI call started, setting connected state')
      setIsConnected(true)
      onCallStart?.()
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to start voice call'
      console.error('VAPI start call error details:', err)
      setError(errorMessage)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }, [assistantType, getSystemPrompt, isConnected, isLoading, onCallStart, onError])

  // End call
  const endCall = useCallback(async () => {
    if (!isConnected) return

    try {
      await vapiClient.endCall()
      setIsConnected(false)
      setIsSpeaking(false)
      onCallEnd?.()
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to end voice call'
      setError(errorMessage)
      onError?.(err)
      console.error('VAPI end call error:', err)
    }
  }, [isConnected, onCallEnd, onError])

  // Toggle call
  const toggleCall = useCallback(async () => {
    if (isConnected) {
      await endCall()
    } else {
      await startCall()
    }
  }, [isConnected, startCall, endCall])

  // Set up event listeners
  useEffect(() => {
    let durationInterval: NodeJS.Timeout

    // Call start handler
    vapiClient.onCallStart(() => {
      console.log('VAPI call-start event received')
      setIsConnected(true)
      setCallDuration(0)
      
      // Start duration counter
      durationInterval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    })

    // Call end handler
    vapiClient.onCallEnd(() => {
      console.log('VAPI call-end event received')
      setIsConnected(false)
      setIsSpeaking(false)
      if (durationInterval) {
        clearInterval(durationInterval)
      }
    })

    // Speech handlers
    vapiClient.onSpeechStart(() => {
      console.log('VAPI speech-start event received')
      setIsSpeaking(true)
    })

    vapiClient.onSpeechEnd(() => {
      console.log('VAPI speech-end event received')
      setIsSpeaking(false)
    })

    // Message handler
    vapiClient.onMessage((message) => {
      console.log('VAPI message received:', message)
    })

    // Error handler
    vapiClient.onError((err) => {
      console.error('VAPI error event received:', err)
      setError(err.message || 'Voice call error occurred')
      setIsConnected(false)
      setIsLoading(false)
      onError?.(err)
    })

    // Cleanup
    return () => {
      if (durationInterval) {
        clearInterval(durationInterval)
      }
    }
  }, [onError])

  // Format call duration
  const formatDuration = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  return {
    // State
    isConnected,
    isLoading,
    isSpeaking,
    error,
    callDuration,
    formattedDuration: formatDuration(callDuration),
    
    // Actions
    startCall,
    endCall,
    toggleCall,
    
    // Helpers
    clearError: () => setError(null),
    assistantName: assistantConfigs[assistantType].name
  }
}