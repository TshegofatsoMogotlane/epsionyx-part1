'use client'

import React, { useState, useEffect } from 'react'
import { Mic, MicOff, MessageSquare, X, Minimize2, Maximize2, Phone, PhoneOff, Target, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import Vapi from '@vapi-ai/web'

interface VAPIFloatingAssistantProps {
  userContext?: {
    currentPage?: string
    documentCount?: number
    currentDocument?: string
  }
  interviewQuestions?: string[]
  industryTasks?: string[]
  topic?: string
}

const VAPIFloatingAssistant: React.FC<VAPIFloatingAssistantProps> = ({
  userContext = {},
  interviewQuestions = [],
  industryTasks = [],
  topic = "University Degree Selection"
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [assistantMode, setAssistantMode] = useState<'degreeGuide' | 'interviewCoach' | 'careerExplorer'>('degreeGuide')
  
  // Direct VAPI integration (like VAPIInterviewCoach)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState(0)
  const [vapi, setVapi] = useState<Vapi | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Initialize VAPI
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
    if (publicKey && typeof window !== 'undefined') {
      const vapiInstance = new Vapi(publicKey)
      setVapi(vapiInstance)

      // Set up event listeners
      vapiInstance.on('call-start', () => {
        setIsConnected(true)
        setIsLoading(false)
        setCallDuration(0)
        setCurrentQuestionIndex(0)
        console.log('Voice chat started')
      })

      vapiInstance.on('call-end', () => {
        setIsConnected(false)
        setIsSpeaking(false)
        console.log('Voice chat ended')
      })

      vapiInstance.on('speech-start', () => {
        setIsSpeaking(true)
      })

      vapiInstance.on('speech-end', () => {
        setIsSpeaking(false)
      })

      vapiInstance.on('error', (err) => {
        setError(err.message || 'Voice call error')
        setIsConnected(false)
        setIsLoading(false)
        console.error('Voice chat error:', err)
      })
    }
  }, [])

  // Duration counter
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected])

  const assistantModes = {
    'degreeGuide': {
      name: 'Degree Guide',
      color: 'blue',
      description: 'Help choosing the best university degree for your goals'
    },
    'interviewCoach': {
      name: 'Interview Coach',
      color: 'green',
      description: 'Practice interview questions for your chosen field'
    },
    'careerExplorer': {
      name: 'Career Explorer',
      color: 'purple',
      description: 'Explore career paths and industry opportunities'
    }
  }

  const startCall = async () => {
    if (!vapi || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      // Use your working assistant ID but provide context through the conversation
      const assistantId = 'c2839809-8a92-4f4a-b154-fc258bd9515a'
      await vapi.start(assistantId)
    } catch (err: any) {
      setError(err.message || 'Failed to start voice chat')
      setIsLoading(false)
    }
  }

  const endCall = async () => {
    if (!vapi) return
    try {
      await vapi.stop()
    } catch (err: any) {
      setError(err.message || 'Failed to end call')
    }
  }

  const clearError = () => setError(null)
  const formattedDuration = `${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`
  const currentQuestion = interviewQuestions[currentQuestionIndex] || "Tell me about your interests and career goals"

  const toggleAssistant = () => {
    if (isConnected) {
      endCall()
    }
    setIsOpen(!isOpen)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
        >
          <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-200" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-2xl border-0 bg-white/95 backdrop-blur-sm ${isMinimized ? 'h-auto' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              AI Assistant
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAssistant}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="space-y-4">
            {/* Assistant Mode Selector */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Choose your assistant:</div>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(assistantModes).map(([key, mode]) => (
                  <Button
                    key={key}
                    variant={assistantMode === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAssistantMode(key as any)}
                    disabled={isConnected}
                    className={`justify-start text-left h-auto p-3 ${
                      assistantMode === key 
                        ? `bg-gradient-to-r from-${mode.color}-500 to-${mode.color}-600 text-white` 
                        : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs opacity-80">{mode.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-sm font-medium">Connection Error</span>
                </div>
                <div className="text-xs text-red-600 mt-1">{error}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="mt-2 text-red-600 hover:text-red-700"
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* Connection Status */}
            {isConnected && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                  <span className="text-sm font-medium">
                    Connected to {assistantModes[assistantMode].name} ({formattedDuration})
                  </span>
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {isSpeaking ? 'AI is speaking...' : 'Speak naturally - I\'m listening and ready to help!'}
                </div>
              </div>
            )}

            {/* Current Question/Task Preview */}
            {isConnected && assistantMode === 'interviewCoach' && currentQuestion && (
              <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2 mb-2">
                  <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-purple-800">Current Question:</span>
                </div>
                <p className="text-sm text-purple-700 italic">"{currentQuestion}"</p>
              </div>
            )}

            {/* Industry Tasks Preview */}
            {isConnected && assistantMode === 'careerExplorer' && industryTasks.length > 0 && (
              <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-green-800">Industry Tasks Available:</span>
                </div>
                <p className="text-sm text-green-700">{industryTasks.length} tasks ready for exploration</p>
              </div>
            )}

            {/* Context Info */}
            {userContext.currentPage && (
              <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                Context: {userContext.currentPage === '/documents' ? 'Documents Page' : 
                         userContext.currentPage?.startsWith('/document/') ? 'Viewing Document' :
                         userContext.currentPage === '/manage-plan' ? 'Manage Plan' : 'Home'}
                {userContext.documentCount !== undefined && ` • ${userContext.documentCount} documents`}
              </div>
            )}

            {/* Control Button */}
            <div className="flex gap-2">
              {!isConnected ? (
                <Button
                  onClick={startCall}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Phone className="h-4 w-4 mr-2" />
                      Start Voice Chat
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={endCall}
                  variant="destructive"
                  className="flex-1"
                >
                  <PhoneOff className="h-4 w-4 mr-2" />
                  End Chat
                </Button>
              )}
            </div>

            {/* Debug Info */}
            <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
              Debug: Assistant={assistantMode}, Connected={isConnected ? 'Yes' : 'No'}
              <br />
              VAPI Key: {process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ? 'Present' : 'Missing'}
            </div>

            {/* Quick Tips based on mode */}
            <div className="text-xs text-gray-500 space-y-1">
              <div className="font-medium">Quick tips for {assistantModes[assistantMode].name}:</div>
              {assistantMode === 'degreeGuide' && (
                <>
                  <div>• "What degree should I choose for my interests?"</div>
                  <div>• "Tell me about career prospects in engineering"</div>
                  <div>• "Help me compare different university programs"</div>
                </>
              )}
              {assistantMode === 'interviewCoach' && (
                <>
                  <div>• "Ask me interview questions for my field"</div>
                  <div>• "Help me practice answering behavioral questions"</div>
                  <div>• "Give me feedback on my responses"</div>
                </>
              )}
              {assistantMode === 'careerExplorer' && (
                <>
                  <div>• "What industry tasks match my skills?"</div>
                  <div>• "Show me real-world applications of my studies"</div>
                  <div>• "Help me build a portfolio project"</div>
                </>
              )}
            </div>

            {/* Available Resources */}
            {(interviewQuestions.length > 0 || industryTasks.length > 0) && (
              <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                Resources: {interviewQuestions.length} interview questions, {industryTasks.length} industry tasks
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default VAPIFloatingAssistant