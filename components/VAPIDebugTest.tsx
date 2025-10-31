'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Vapi from '@vapi-ai/web'

const VAPIDebugTest = () => {
  const [status, setStatus] = useState('Not connected')
  const [error, setError] = useState<string | null>(null)
  const [vapi, setVapi] = useState<Vapi | null>(null)

  const initializeVAPI = () => {
    try {
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
      console.log('VAPI Public Key:', publicKey ? 'Present' : 'Missing')
      
      if (!publicKey) {
        throw new Error('VAPI public key not found')
      }

      const vapiInstance = new Vapi(publicKey)
      setVapi(vapiInstance)
      
      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('VAPI call started')
        setStatus('Call started')
      })
      
      vapiInstance.on('call-end', () => {
        console.log('VAPI call ended')
        setStatus('Call ended')
      })
      
      vapiInstance.on('speech-start', () => {
        console.log('Speech started')
        setStatus('AI is speaking')
      })
      
      vapiInstance.on('speech-end', () => {
        console.log('Speech ended')
        setStatus('AI finished speaking')
      })
      
      vapiInstance.on('message', (message) => {
        console.log('VAPI message:', message)
      })
      
      vapiInstance.on('error', (error) => {
        console.error('VAPI error:', error)
        setError(error.message || 'Unknown error')
        setStatus('Error occurred')
      })
      
      setStatus('VAPI initialized')
      setError(null)
      
    } catch (err: any) {
      console.error('Failed to initialize VAPI:', err)
      setError(err.message)
      setStatus('Initialization failed')
    }
  }

  const startSimpleCall = async () => {
    if (!vapi) {
      setError('VAPI not initialized')
      return
    }

    try {
      setStatus('Starting call...')
      setError(null)
      
      // Try with just a simple voice test - no AI model
      const assistant = {
        name: "Voice Test",
        firstMessage: "Hello! This is a voice test. If you can hear this, the voice system is working.",
        voice: {
          provider: "azure" as const,
          voiceId: "andrew"
        }
      }

      console.log('Starting VAPI call with config:', assistant)
      await vapi.start(assistant)
      
    } catch (err: any) {
      console.error('Failed to start call:', err)
      setError(err.message || 'Failed to start call')
      setStatus('Call failed')
    }
  }

  const endCall = async () => {
    if (!vapi) return
    
    try {
      await vapi.stop()
      setStatus('Call ended')
    } catch (err: any) {
      console.error('Failed to end call:', err)
      setError(err.message)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>VAPI Debug Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium">Status:</div>
          <div className="text-sm text-gray-600">{status}</div>
        </div>
        
        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            Error: {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Button onClick={initializeVAPI} className="w-full">
            Initialize VAPI
          </Button>
          
          <Button 
            onClick={startSimpleCall} 
            disabled={!vapi}
            className="w-full"
          >
            Start Test Call
          </Button>
          
          <Button 
            onClick={endCall} 
            disabled={!vapi}
            variant="destructive"
            className="w-full"
          >
            End Call
          </Button>
        </div>
        
        <div className="text-xs text-gray-500">
          Check browser console for detailed logs
        </div>
      </CardContent>
    </Card>
  )
}

export default VAPIDebugTest