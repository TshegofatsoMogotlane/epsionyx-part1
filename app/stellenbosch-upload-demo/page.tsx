'use client'

import React, { useState } from 'react'
import StellenboschDocumentUploadScene from '@/components/3d/StellenboschDocumentUploadScene'
import { type RealBuildingData } from '@/lib/stellenboschRealData'

export default function StellenboschUploadDemo() {
  const [selectedBuilding, setSelectedBuilding] = useState<RealBuildingData | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleBuildingSelect = (building: RealBuildingData) => {
    setSelectedBuilding(building)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Stellenbosch University Document Upload
          </h1>
          <p className="text-gray-600 mt-2">
            Select your faculty building and upload your academic documents
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Campus Scene */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                🏛️ Select Your Faculty Building
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Click on a building to associate your documents with the correct faculty
              </p>
            </div>
            
            <StellenboschDocumentUploadScene
              onBuildingSelect={handleBuildingSelect}
              selectedBuildingId={selectedBuilding?.id}
              height="h-96"
            />
          </div>

          {/* Upload Interface */}
          <div className="space-y-6">
            {/* Selected Building Info */}
            {selectedBuilding && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedBuilding.features.color }}
                  ></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedBuilding.name}
                    </h3>
                    <p className="text-gray-600">{selectedBuilding.faculty || 'General'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Built:</span>
                    <span className="ml-2 font-medium">{selectedBuilding.yearBuilt}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Style:</span>
                    <span className="ml-2 font-medium">{selectedBuilding.style}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Floors:</span>
                    <span className="ml-2 font-medium">{selectedBuilding.floors}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Capacity:</span>
                    <span className="ml-2 font-medium">{selectedBuilding.capacity?.toLocaleString()}</span>
                  </div>
                </div>
                
                {selectedBuilding.departments && (
                  <div className="mt-4">
                    <p className="text-gray-500 text-sm mb-2">Departments:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBuilding.departments.map((dept, i) => (
                        <span 
                          key={i}
                          className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* File Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📄 Upload Documents
              </h3>
              
              {selectedBuilding ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-4xl mb-4">📁</div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-gray-600 text-sm">
                        PDF, DOC, DOCX files up to 10MB each
                      </p>
                    </label>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Uploaded Files ({uploadedFiles.length})
                      </h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl">📄</div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-gray-600 text-sm">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <div className="text-green-600">✅</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">🏛️</div>
                  <p>Please select a faculty building first</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {selectedBuilding && uploadedFiles.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex gap-4">
                  <button className="flex-1 bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                    🚀 Process Documents
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    💾 Save Draft
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm mt-3 text-center">
                  Your documents will be processed and mapped to {selectedBuilding.name} curriculum
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}