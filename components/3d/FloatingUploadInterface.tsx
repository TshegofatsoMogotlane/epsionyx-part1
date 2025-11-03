'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Sparkles, Target, MessageSquare, Briefcase, GraduationCap, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface FloatingUploadInterfaceProps {
  selectedUniversity: any
  onFileUpload: (file: File) => void
  className?: string
}

export default function FloatingUploadInterface({ 
  selectedUniversity, 
  onFileUpload, 
  className = "" 
}: FloatingUploadInterfaceProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const pdfFile = files.find(file => file.type === 'application/pdf')
    
    if (pdfFile) {
      handleFileUpload(pdfFile)
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          onFileUpload(file)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file)
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Floating Upload Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      >
        <Card className={`w-96 backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl transition-all duration-300 ${
          isDragOver ? 'scale-105 bg-blue-500/20 border-blue-400/50' : ''
        }`}>
          <CardContent className="p-8">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  rotate: isDragOver ? 360 : 0,
                  scale: isDragOver ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Upload className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Upload Your Academic PDF
              </h3>
              
              {selectedUniversity && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-blue-200 mb-4"
                >
                  Selected: {selectedUniversity.name}
                </motion.p>
              )}

              <p className="text-gray-300 mb-6">
                Drag & drop your PDF here or click to browse
              </p>

              {isUploading ? (
                <div className="space-y-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-white">Uploading... {uploadProgress}%</p>
                </div>
              ) : (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Choose PDF File
                </Button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating Feature Cards */}
      <AnimatePresence>
        {selectedUniversity && (
          <>
            {/* Industry Projects Card */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -100, rotate: -10 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute top-20 left-8 pointer-events-auto"
            >
              <Card className="w-72 backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Industry Projects</h4>
                      <p className="text-purple-200 text-sm">10-15 per topic</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Get real-world projects tailored to your academic content. Build a portfolio that employers love.
                  </p>
                  <div className="mt-4 flex items-center text-purple-300">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm">AI-Generated & Industry-Relevant</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interview Questions Card */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: 100, rotate: 10 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-20 right-8 pointer-events-auto"
            >
              <Card className="w-72 backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Interview Questions</h4>
                      <p className="text-blue-200 text-sm">50+ per topic</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Comprehensive interview preparation with questions tailored to your study material and career goals.
                  </p>
                  <div className="mt-4 flex items-center text-blue-300">
                    <Target className="w-4 h-4 mr-2" />
                    <span className="text-sm">Career-Focused & Comprehensive</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* University Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
            >
              <Card className="w-80 backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{selectedUniversity.name}</h4>
                      <p className="text-green-200 text-sm">{selectedUniversity.province} • Est. {selectedUniversity.established}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {selectedUniversity.description}
                  </p>
                  <div className="flex items-center text-green-300">
                    <Zap className="w-4 h-4 mr-2" />
                    <span className="text-sm">Ready to transform your studies!</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
            }}
            animate={{
              y: -10,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}