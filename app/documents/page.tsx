import DocumentList from '@/components/DocumentList'
import PDFDropzone from '@/components/PDFDropzone'
import React from 'react'
import { GraduationCap, Sparkles, Target, TrendingUp, BookOpen, Briefcase, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const Uploads = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='text-center text-white'>
            <div className='flex justify-center mb-6'>
              <div className='p-4 bg-white/20 rounded-full backdrop-blur-sm'>
                <GraduationCap className='h-12 w-12' />
              </div>
            </div>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
              Transform Your Studies Into
              <span className='block text-yellow-300'>Career Success</span>
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed'>
              Upload your academic PDFs and get personalized industry projects, interview questions, and portfolio-ready skills
            </p>
            <div className='flex flex-wrap justify-center gap-6 text-sm'>
              <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                <Sparkles className='h-4 w-4 text-yellow-300' />
                <span>AI-Powered Analysis</span>
              </div>
              <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                <Target className='h-4 w-4 text-green-300' />
                <span>Industry-Ready Projects</span>
              </div>
              <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                <TrendingUp className='h-4 w-4 text-purple-300' />
                <span>Interview Preparation</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl'></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BookOpen className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>Academic Analysis</h3>
              <p className='text-gray-600'>Extract key topics and learning objectives from your study materials</p>
            </CardContent>
          </Card>
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Briefcase className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>Industry Projects</h3>
              <p className='text-gray-600'>Get 10-15 real-world projects per topic to build your portfolio</p>
            </CardContent>
          </Card>
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MessageSquare className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>Interview Prep</h3>
              <p className='text-gray-600'>50+ targeted questions to ace your job interviews</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-12 items-start'>
          {/* Upload Section */}
          <div className='space-y-6'>
            <div className='text-center xl:text-left'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Ready to Transform Your Studies?
              </h2>
              <p className='text-lg text-gray-600 mb-8'>
                Upload your academic PDFs and watch them transform into industry-ready skills and interview preparation materials.
              </p>
            </div>
            
            <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
              <PDFDropzone />
            </div>

            {/* Process Steps */}
            <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4 text-center'>How It Works</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold'>1</div>
                  <p className='text-gray-700'>Upload your academic PDF documents</p>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold'>2</div>
                  <p className='text-gray-700'>AI analyzes and extracts key learning topics</p>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold'>3</div>
                  <p className='text-gray-700'>Get industry projects and interview questions</p>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold'>4</div>
                  <p className='text-gray-700'>Build your portfolio and ace interviews!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className='space-y-6'>
            <div className='text-center xl:text-left'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Your Learning Journey
              </h2>
              <p className='text-lg text-gray-600 mb-8'>
                Track your uploaded documents and access your personalized industry projects and interview preparation materials.
              </p>
            </div>
            
            <div className='bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden'>
              <DocumentList />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className='bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Ready to Bridge the Gap Between Study and Success?
          </h2>
          <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
            Join thousands of students who are transforming their academic knowledge into industry-ready skills and landing their dream jobs.
          </p>
          <div className='flex flex-wrap justify-center gap-4 text-sm'>
            <span className='bg-blue-600 px-4 py-2 rounded-full'>✨ AI-Powered</span>
            <span className='bg-purple-600 px-4 py-2 rounded-full'>🎯 Industry-Focused</span>
            <span className='bg-green-600 px-4 py-2 rounded-full'>💼 Career-Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Uploads