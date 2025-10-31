'use client'

import React, { useState, useEffect } from 'react'
import { Mic, MicOff, MessageSquare, X, Minimize2, Maximize2, Phone, PhoneOff } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useVAPI } from '@/hooks/useVAPI'

interface VAPIFloatingAssistantProps {
  userContext?: {
    currentPage?: string
    documentCount?: number
    currentDocument?: string
  }
}

const VAPIFloatingAssistant: React.FC<VAPIFloatingAssistantProps> = ({
  userContext = {}
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [assistantMode, setAssistantMode] = useState<'studyBuddy' | 'careerCoach' | 'interviewCoach'>('studyBuddy')

  const {
    isConnected,
    isLoading,
    isSpeaking,
    error,
    callDuration,
    formattedDuration,
    startCall,
    endCall,
    clearError,
    assistantName
  } = useVAPI({
    assistantType: assistantMode,
    context: `User is on ${userContext.currentPage || 'unknown page'} with ${userContext.documentCount || 0} documents`,
    onCallStart: () => {
      console.log('Voice chat started')
    },
    onCallEnd: () => {
      console.log('Voice chat ended')
    },
    onError: (err) => {
      console.error('Voice chat error:', err)
    }
  })

  const assistantModes = {
    'studyBuddy': {
      name: 'Study Buddy',
      color: 'blue',
      description: 'Get help with your studies and documents'
    },
    'careerCoach': {
      name: 'Career Coach',
      color: 'purple',
      description: 'Career guidance and professional development'
    },
    'interviewCoach': {
      name: 'Interview Coach',
      color: 'green',
      description: 'Practice interviews and get feedback'
    }
  }

  // Remove the mock functions since we're using the real useVAPI hook

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
                    Connected to {assistantName} ({formattedDuration})
                  </span>
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {isSpeaking ? 'AI is speaking...' : 'Speak naturally - I\'m listening and ready to help!'}
                </div>
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

            {/* Quick Tips */}
            <div className="text-xs text-gray-500 space-y-1">
              <div className="font-medium">Quick tips:</div>
              <div>• "Help me understand this document"</div>
              <div>• "What should I study next?"</div>
              <div>• "Practice interview questions with me"</div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default VAPIFloatingAssistant