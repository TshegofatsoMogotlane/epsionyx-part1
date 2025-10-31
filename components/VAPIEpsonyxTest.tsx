'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import VAPIFloatingAssistant from './VAPIFloatingAssistant'

const VAPIEpsonyxTest = () => {
  const [showAssistant, setShowAssistant] = useState(false)

  // Sample data for high school students choosing university degrees
  const sampleInterviewQuestions = [
    "Tell me about your academic interests and what subjects you enjoy most",
    "What career goals do you have after university?",
    "Why are you interested in this particular field of study?",
    "How do you see yourself using this degree in the real world?",
    "What skills do you hope to develop during your university studies?",
    "Can you describe a project or achievement you're proud of?",
    "How do you handle challenges and setbacks in your studies?",
    "What makes you passionate about this field?",
    "Where do you see yourself in 5-10 years after graduation?",
    "How would you explain your chosen field to someone who knows nothing about it?"
  ]

  const sampleIndustryTasks = [
    "Design a mobile app prototype for student productivity",
    "Create a business plan for a sustainable startup",
    "Analyze market trends in renewable energy",
    "Develop a marketing campaign for a local business",
    "Build a simple website using modern web technologies",
    "Research and present on emerging technologies in your field",
    "Create a data visualization project using real datasets",
    "Design an engineering solution to a community problem",
    "Write and produce a short documentary on a social issue",
    "Develop a financial model for a small business"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Epsionyx - University Degree Selection Assistant
            </CardTitle>
            <p className="text-center text-gray-600">
              AI-powered guidance to help high school students choose the perfect university degree
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-800">🎓 What We Help With:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Explore different university degree options</li>
                  <li>• Understand career prospects for each field</li>
                  <li>• Practice interview questions for your chosen field</li>
                  <li>• Discover real-world industry tasks and projects</li>
                  <li>• Get personalized guidance based on your interests</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-purple-800">🚀 Available Resources:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Interview Questions:</span>
                    <span className="font-medium text-blue-600">{sampleInterviewQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Industry Tasks:</span>
                    <span className="font-medium text-purple-600">{sampleIndustryTasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Assistants:</span>
                    <span className="font-medium text-green-600">3 specialized</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button
                onClick={() => setShowAssistant(!showAssistant)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                {showAssistant ? 'Hide' : 'Launch'} AI Assistant
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Questions Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">📝 Sample Interview Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sampleInterviewQuestions.slice(0, 5).map((question, index) => (
                  <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                    <span className="font-medium text-blue-600">Q{index + 1}:</span> {question}
                  </div>
                ))}
                <div className="text-xs text-gray-500 text-center pt-2">
                  ...and {sampleInterviewQuestions.length - 5} more questions
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-purple-800">🛠️ Sample Industry Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sampleIndustryTasks.slice(0, 5).map((task, index) => (
                  <div key={index} className="p-2 bg-purple-50 rounded text-sm">
                    <span className="font-medium text-purple-600">Task {index + 1}:</span> {task}
                  </div>
                ))}
                <div className="text-xs text-gray-500 text-center pt-2">
                  ...and {sampleIndustryTasks.length - 5} more tasks
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-3 text-green-800">🎯 How to Use the AI Assistant:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium text-blue-600">1. Degree Guide Mode</div>
                <div className="text-gray-700">Ask about different university degrees, career prospects, and which programs match your interests.</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-green-600">2. Interview Coach Mode</div>
                <div className="text-gray-700">Practice answering interview questions for your chosen field and get feedback on your responses.</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-purple-600">3. Career Explorer Mode</div>
                <div className="text-gray-700">Explore real-world industry tasks and learn how to build projects that showcase your skills.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Assistant */}
      {showAssistant && (
        <VAPIFloatingAssistant
          userContext={{
            currentPage: '/degree-selection',
            documentCount: 0,
            currentDocument: 'University Degree Guide'
          }}
          interviewQuestions={sampleInterviewQuestions}
          industryTasks={sampleIndustryTasks}
          topic="University Degree Selection"
        />
      )}
    </div>
  )
}

export default VAPIEpsonyxTest