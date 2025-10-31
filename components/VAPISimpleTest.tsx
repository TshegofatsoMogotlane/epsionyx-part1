'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Vapi from '@vapi-ai/web'

const VAPISimpleTest = () => {
  const [status, setStatus] = useState('Ready to test')
  const [error, setError] = useState<string | null>(null)
  const [vapi, setVapi] = useState<Vapi | null>(null)

  const testVAPIConnection = async () => {
    try {
      setStatus('Initializing VAPI...')
      setError(null)

      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
      if (!publicKey) {
        throw new Error('VAPI public key not found')
      }

      const vapiInstance = new Vapi(publicKey)
      setVapi(vapiInstance)

      // Set up comprehensive event logging
      vapiInstance.on('call-start', () => {
        console.log('✅ VAPI call-start event')
        setStatus('Call started successfully!')
      })

      vapiInstance.on('call-end', () => {
        console.log('✅ VAPI call-end event')
        setStatus('Call ended')
      })

      vapiInstance.on('speech-start', () => {
        console.log('✅ VAPI speech-start event')
        setStatus('AI is speaking...')
      })

      vapiInstance.on('speech-end', () => {
        console.log('✅ VAPI speech-end event')
        setStatus('AI finished speaking')
      })

      vapiInstance.on('message', (message) => {
        console.log('✅ VAPI message:', message)
      })

      vapiInstance.on('error', (error) => {
        console.error('❌ VAPI error:', error)
        setError(`VAPI Error: ${error?.message || error?.type || 'Unknown error'}`)
        setStatus('Error occurred')
      })

      setStatus('Starting VAPI test call...')

      console.log('🚀 Starting VAPI call with your working assistant')

      // Use your working assistant ID that you know works
      const assistantId = 'c2839809-8a92-4f4a-b154-fc258bd9515a'
      await vapiInstance.start(assistantId)
      console.log('✅ Assistant started successfully')

      setStatus('Call started - VAPI is working!')

    } catch (err: any) {
      console.error('❌ Test failed:', err)
      setError(err.message || 'Test failed')
      setStatus('Test failed')
    }
  }

  const stopCall = async () => {
    if (vapi) {
      try {
        await vapi.stop()
        setStatus('Call stopped')
      } catch (err: any) {
        console.error('Failed to stop call:', err)
      }
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>VAPI Simple Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium">Status:</div>
          <div className="text-sm text-gray-600">{status}</div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            <div className="font-medium">Error:</div>
            <div>{error}</div>
          </div>
        )}

        <div className="space-y-2">
          <Button onClick={testVAPIConnection} className="w-full">
            🎤 Test VAPI Connection
          </Button>

          <Button
            onClick={stopCall}
            disabled={!vapi}
            variant="destructive"
            className="w-full"
          >
            ⏹️ Stop Call
          </Button>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div>This test will:</div>
          <div>• Initialize VAPI with your API key</div>
          <div>• Start a simple voice call</div>
          <div>• Log all events to console</div>
          <div>• Show detailed error information</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VAPISimpleTest