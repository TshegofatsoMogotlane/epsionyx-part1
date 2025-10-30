import SchematicComponent from '@/components/schematic/SchematicComponent'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  Zap, 
  Target, 
  MessageSquare, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Star,
  CheckCircle,
  Sparkles,
  GraduationCap,
  Users,
  Award,
  Rocket
} from 'lucide-react'

const ManagePlan = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative container xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='text-center text-white'>
            <div className='flex justify-center mb-6'>
              <div className='p-4 bg-white/20 rounded-full backdrop-blur-sm'>
                <Crown className='h-12 w-12 text-yellow-300' />
              </div>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
              Manage Your Success Plan
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed'>
              Control your subscription, track your progress, and unlock your full potential
            </p>
            <div className='flex flex-wrap justify-center gap-4 text-sm'>
              <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                <Zap className='h-4 w-4 text-yellow-300' />
                <span>Unlimited Processing</span>
              </div>
              <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                <Target className='h-4 w-4 text-green-300' />
                <span>Premium Features</span>
              </div>
              <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                <Award className='h-4 w-4 text-purple-300' />
                <span>Priority Support</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/30 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl'></div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className='container xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BookOpen className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Unlimited Uploads</h3>
              <p className='text-sm text-gray-600'>Process as many documents as you need</p>
            </CardContent>
          </Card>
          
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Briefcase className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Premium Projects</h3>
              <p className='text-sm text-gray-600'>Advanced industry-level challenges</p>
            </CardContent>
          </Card>
          
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MessageSquare className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Expert Questions</h3>
              <p className='text-sm text-gray-600'>Interview prep from industry leaders</p>
            </CardContent>
          </Card>
          
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Rocket className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Priority Support</h3>
              <p className='text-sm text-gray-600'>Get help when you need it most</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className='container xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Plan Management */}
          <div className='lg:col-span-2 space-y-6'>
            <Card className='bg-white shadow-2xl border-0 overflow-hidden'>
              <CardHeader className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6'>
                <CardTitle className='text-2xl font-bold flex items-center gap-3'>
                  <Crown className='h-6 w-6 text-yellow-300' />
                  Subscription Management
                </CardTitle>
                <p className='text-blue-100 mt-2'>
                  Manage your billing, update payment methods, and control your subscription settings
                </p>
              </CardHeader>
              <CardContent className='p-6'>
                <SchematicComponent componentId={process.env.NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID!}/>
              </CardContent>
            </Card>
          </div>

          {/* Success Stats & Tips */}
          <div className='space-y-6'>
            {/* Success Metrics */}
            <Card className='bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-lg font-bold text-green-800 flex items-center gap-2'>
                  <TrendingUp className='h-5 w-5' />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-green-700'>Documents Processed</span>
                  <Badge className='bg-green-600 text-white'>Coming Soon</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-green-700'>Projects Generated</span>
                  <Badge className='bg-green-600 text-white'>Coming Soon</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-green-700'>Interview Questions</span>
                  <Badge className='bg-green-600 text-white'>Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Success Tips */}
            <Card className='bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-xl'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-lg font-bold text-purple-800 flex items-center gap-2'>
                  <Sparkles className='h-5 w-5' />
                  Success Tips
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                  <p className='text-sm text-purple-700'>Upload documents regularly to build a comprehensive portfolio</p>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                  <p className='text-sm text-purple-700'>Practice with generated interview questions weekly</p>
                </div>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                  <p className='text-sm text-purple-700'>Complete industry projects to showcase your skills</p>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className='bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-xl'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-lg font-bold text-blue-800 flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  Join Our Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-blue-700 mb-4'>
                  Connect with other students, share your progress, and get career advice from our community.
                </p>
                <div className='flex items-center gap-2 text-xs text-blue-600'>
                  <Star className='h-3 w-3' />
                  <span>10,000+ successful students</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12'>
        <div className='container xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div>
              <GraduationCap className='h-8 w-8 mx-auto mb-3 text-blue-400' />
              <h3 className='font-semibold mb-2'>Academic Excellence</h3>
              <p className='text-sm text-gray-300'>Transform your studies into career-ready skills</p>
            </div>
            <div>
              <Award className='h-8 w-8 mx-auto mb-3 text-purple-400' />
              <h3 className='font-semibold mb-2'>Industry Recognition</h3>
              <p className='text-sm text-gray-300'>Build projects that employers actually want to see</p>
            </div>
            <div>
              <Rocket className='h-8 w-8 mx-auto mb-3 text-green-400' />
              <h3 className='font-semibold mb-2'>Career Launch</h3>
              <p className='text-sm text-gray-300'>Land your dream job with confidence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagePlan