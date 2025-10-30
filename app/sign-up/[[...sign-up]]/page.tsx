'use client'

import { SignUp } from '@clerk/nextjs'
import { BrainCircuit, Sparkles, GraduationCap, Target, MessageSquare, Briefcase, TrendingUp, Star, Users, CheckCircle, Zap } from 'lucide-react'
import AnimatedColorfulLogo from '@/components/animated-colorful-logo'
import { Card, CardContent } from '@/components/ui/card'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="relative">
              <BrainCircuit className="w-12 h-12 text-white" />
              <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                <AnimatedColorfulLogo />
              </div>
              <span className="text-sm text-purple-100 font-medium tracking-wide">Student Success Platform</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Start Your Journey to
            <span className="block text-green-300">Career Excellence</span>
          </h1>

          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Transform your academic knowledge into industry-ready skills and land your dream job with confidence.
          </p>

          {/* What You'll Get */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">What you'll get:</h3>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span className="text-purple-100">AI-powered analysis of your study materials</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span className="text-purple-100">Personalized industry projects for your portfolio</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span className="text-purple-100">Comprehensive interview preparation questions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span className="text-purple-100">Real-world skills that employers value</span>
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">How it works:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm text-purple-100">Upload your academic PDFs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-400 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm text-purple-100">AI extracts key learning topics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm text-purple-100">Get industry projects & interview questions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-sm text-purple-100">Build portfolio & ace interviews!</span>
              </div>
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-2 gap-6 pt-8 mt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">10,000+</div>
              <div className="text-sm text-purple-200">Successful Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">95%</div>
              <div className="text-sm text-purple-200">Job Placement Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="relative">
              <BrainCircuit className="w-10 h-10 text-blue-600" />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                <AnimatedColorfulLogo />
              </div>
              <span className="text-xs text-gray-500 font-medium tracking-wide">Student Success Platform</span>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Epsionyx Today!</h2>
            <p className="text-gray-600">Start transforming your studies into career success</p>
          </div>

          {/* Sign Up Component */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-gray-700 hover:from-purple-100 hover:to-blue-100 hover:border-purple-300 transition-all duration-300",
                  formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl",
                  formFieldInput: "border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200",
                  footerActionLink: "text-purple-600 hover:text-purple-700 transition-colors duration-200",
                }
              }}
            />
          </div>

          {/* Benefits */}
          <div className="mt-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-800">Free to Start!</span>
              </div>
              <p className="text-xs text-green-700">
                Begin with our free tier and upgrade as you grow. No credit card required.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span>10K+ students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}