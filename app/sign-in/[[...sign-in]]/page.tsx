'use client'

import { SignIn } from '@clerk/nextjs'
import { BrainCircuit, Sparkles, GraduationCap, Target, MessageSquare, Briefcase, TrendingUp, Star, Users } from 'lucide-react'
import AnimatedColorfulLogo from '@/components/animated-colorful-logo'
import { Card, CardContent } from '@/components/ui/card'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
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
              <span className="text-sm text-blue-100 font-medium tracking-wide">Student Success Platform</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Transform Your Studies Into
            <span className="block text-yellow-300">Career Success</span>
          </h1>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who are bridging the gap between university theory and industry practice.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Target className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="text-blue-100">Get 10-15 industry projects per academic topic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-4 h-4 text-green-300" />
              </div>
              <span className="text-blue-100">50+ interview questions for job preparation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Briefcase className="w-4 h-4 text-purple-300" />
              </div>
              <span className="text-blue-100">Build a portfolio that employers actually want</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">10K+</div>
              <div className="text-sm text-blue-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">95%</div>
              <div className="text-sm text-blue-200">Job Success</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">500+</div>
              <div className="text-sm text-blue-200">Universities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Continue your journey to career success</p>
          </div>

          {/* Sign In Component */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-gray-700 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all duration-300",
                  formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl",
                  formFieldInput: "border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200",
                  footerActionLink: "text-blue-600 hover:text-blue-700 transition-colors duration-200",
                }
              }}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Trusted by students</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Join our community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}