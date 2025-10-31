'use client'

import React, { useState, useEffect } from 'react'
import { Phone, PhoneOff, MessageSquare, Target, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import Vapi from '@vapi-ai/web'

interface VAPIInterviewCoachProps {
  interviewQuestions?: string[]
  topic?: string
  onSessionStart?: () => void
  onSessionEnd?: () => void
}

const VAPIInterviewCoach: React.FC<VAPIInterviewCoachProps> = ({
  interviewQuestions = [],
  topic = "General",
  onSessionStart,
  onSessionEnd
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState(0)
  const [vapi, setVapi] = useState<Vapi | null>(null)

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
        onSessionStart?.()
      })

      vapiInstance.on('call-end', () => {
        setIsConnected(false)
        setIsSpeaking(false)
        onSessionEnd?.()
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
      })
    }
  }, [onSessionStart, onSessionEnd])

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

  const startCall = async () => {
    if (!vapi || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const questionsText = interviewQuestions.length > 0 
        ? interviewQuestions.join('; ') 
        : 'General interview questions about the candidate\'s background, skills, and experience'

      // Use your working assistant ID
      const assistantId = 'c2839809-8a92-4f4a-b154-fc258bd9515a'
      await vapi.start(assistantId)
    } catch (err: any) {
      setError(err.message || 'Failed to start interview')
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
  const currentQuestion = interviewQuestions[currentQuestionIndex] || "Tell me about yourself"

  return (
    <div className="space-y-4">
      {/* Interview Coach Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <MessageSquare className="h-5 w-5" />
            AI Interview Coach
            <Badge variant="secondary" className="ml-2">
              {topic}
            </Badge>
          </CardTitle>
          <p className="text-sm text-blue-600">
            Practice your interview skills with our AI coach using your personalized questions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-red-800 font-medium">Connection Error</div>
                <div className="text-xs text-red-600">{error}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </Button>
            </div>
          )}

          {/* Session Stats */}
          {isConnected && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-white/60 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{interviewQuestions.length}</div>
                <div className="text-xs text-blue-500">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{formattedDuration}</div>
                <div className="text-xs text-purple-500">Duration</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${isSpeaking ? 'text-green-600' : 'text-gray-400'}`}>
                  {isSpeaking ? 'Speaking' : 'Listening'}
                </div>
                <div className="text-xs text-gray-500">Status</div>
              </div>
            </div>
          )}

          {/* Current Question Preview */}
          {isConnected && currentQuestion && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium text-purple-800">Sample Question:</span>
              </div>
              <p className="text-sm text-purple-700 italic">"{currentQuestion}"</p>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-3">
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
                    Start Interview Practice
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={endCall}
                variant="destructive"
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                End Interview
              </Button>
            )}
          </div>

          {/* Available Questions Preview */}
          {!isConnected && interviewQuestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Ready to practice with {interviewQuestions.length} questions
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Preview: "{interviewQuestions[0]?.substring(0, 100)}..."
              </div>
            </div>
          )}

          {/* No Questions State */}
          {interviewQuestions.length === 0 && (
            <div className="text-center py-4">
              <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                No interview questions available yet. Upload a document to generate personalized questions.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VAPIInterviewCoach