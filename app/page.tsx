import {Button} from '@/components/ui/button'
import {ArrowRight, Search, Upload, BarChart, Check, BrainCircuit, Sparkles, Target, Users, TrendingUp, Star, Zap, BookOpen, Award, Briefcase} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/* Hero Section */}
      <section className='relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden'>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className='container px-4 md:px-6 mx-auto relative z-10'>
          <div className='flex flex-col items-center space-y-8 text-center'>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Transform Your Academic Journey</span>
            </div>

            <div className='space-y-6 max-w-4xl'>
              <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight'>
                From University to 
                <span className="block">Dream Career</span>
              </h1>
              <p className='mx-auto max-w-[800px] text-gray-600 text-lg md:text-xl leading-relaxed'>
                Transform your academic knowledge into industry-ready skills. Upload your course materials and get personalized career pathways, hands-on projects, and interview preparation.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <Link href='/documents'>
                <Button size="lg" className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg group'>
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                  Start Your Journey
                  <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200'/>
                </Button>
              </Link>
              <Link href='#features'>
                <Button size="lg" variant='outline' className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 mr-2" />
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Students Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">95%</div>
                <div className="text-sm text-gray-600">Job Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className='mt-16 flex justify-center px-4'>
          <div className='relative w-full max-w-5xl'>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
            <div className='relative rounded-3xl border border-white/30 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden'>
              <div className='relative h-96 md:h-[500px] overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center space-y-6 p-8">
                    <div className="flex justify-center space-x-4 mb-8">
                      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                        <Target className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-pink-600" />
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                      Your Success Story Starts Here
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                      Join thousands of students who have transformed their academic knowledge into career success. 
                      From computer science to business, from engineering to design - we help you bridge the gap.
                    </p>
                    <div className="flex justify-center space-x-8 pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">📚</div>
                        <div className="text-sm text-gray-600 mt-1">Learn</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">🛠️</div>
                        <div className="text-sm text-gray-600 mt-1">Build</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">🚀</div>
                        <div className="text-sm text-gray-600 mt-1">Launch</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">💼</div>
                        <div className="text-sm text-gray-600 mt-1">Succeed</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <div className="text-center">
                    <Link href='/documents'>
                      <Button size="lg" className='bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 font-semibold'>
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Your First Document
                        <ArrowRight className='ml-2 h-5 w-5'/>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Ultra Creative */}
      <section id='features' className='py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className='container px-4 md:px-6 mx-auto relative z-10'>
          <div className='flex flex-col items-center justify-center space-y-8 text-center mb-20'>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-blue-400 mr-3 animate-spin" />
              <span className="text-blue-100 font-medium">Revolutionary Features</span>
            </div>
            <div className='space-y-6 max-w-4xl'>
              <h2 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight'>
                Your Success
                <span className="block">Supercharged</span>
              </h2>
              <p className='max-w-[800px] text-gray-300 text-xl md:text-2xl leading-relaxed'>
                Experience the future of career development with AI-powered tools that transform students into industry leaders.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {/* Feature 1 - Floating Card */}
            <div className='group relative'>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className='relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800 transition-all duration-500 hover:scale-105 hover:-translate-y-2'>
                <div className='flex flex-col items-center space-y-6 text-center'>
                  <div className='relative'>
                    <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500'>
                      <Target className='h-10 w-10 text-white'/>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className='text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300'>AI Career Oracle</h3>
                    <p className='text-gray-300 leading-relaxed'>
                      Our advanced AI analyzes your academic DNA and predicts your perfect career path with 95% accuracy. It's like having a crystal ball for your future.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-400 font-medium">
                    <Star className="w-5 h-5 fill-current" />
                    <span>Powered by GPT-4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Floating Card */}
            <div className='group relative'>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className='relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800 transition-all duration-500 hover:scale-105 hover:-translate-y-2'>
                <div className='flex flex-col items-center space-y-6 text-center'>
                  <div className='relative'>
                    <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500'>
                      <Zap className='h-10 w-10 text-white'/>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-pulse">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className='text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300'>Skill Forge</h3>
                    <p className='text-gray-300 leading-relaxed'>
                      Transform theoretical knowledge into battle-tested skills through immersive, real-world projects that make employers fight over you.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-400 font-medium">
                    <TrendingUp className="w-5 h-5" />
                    <span>10x Faster Learning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Floating Card */}
            <div className='group relative'>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className='relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800 transition-all duration-500 hover:scale-105 hover:-translate-y-2'>
                <div className='flex flex-col items-center space-y-6 text-center'>
                  <div className='relative'>
                    <div className='w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500'>
                      <Users className='h-10 w-10 text-white'/>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center animate-spin">
                      <Briefcase className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className='text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300'>Elite Network</h3>
                    <p className='text-gray-300 leading-relaxed'>
                      Get direct access to hiring managers at Fortune 500 companies. Skip the line and land interviews at Google, Microsoft, and Tesla.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-400 font-medium">
                    <Briefcase className="w-5 h-5" />
                    <span>500+ Partners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-gray-400 mt-2">Job Placement</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">$85K</div>
              <div className="text-gray-400 mt-2">Avg Salary</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-gray-400 mt-2">Success Stories</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">3 Weeks</div>
              <div className="text-gray-400 mt-2">To First Offer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Ultra Creative */}
      <section className='py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden'>
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className='container px-4 md:px-6 mx-auto relative z-10'>
          <div className='flex flex-col items-center justify-center space-y-8 text-center mb-20'>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/50 shadow-lg">
              <Zap className="w-5 h-5 text-emerald-600 mr-3 animate-pulse" />
              <span className="text-emerald-700 font-semibold">Choose Your Destiny</span>
            </div>
            <div className='space-y-6 max-w-4xl'>
              <h2 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight'>
                Invest in Your
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Future Self</span>
              </h2>
              <p className='max-w-[800px] text-gray-600 text-xl md:text-2xl leading-relaxed'>
                Every successful career starts with a single decision. Make yours today.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto lg:items-stretch'>
            {/* Free Tier - Creative */}
            <div className='group relative transform transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:rotate-1'>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700"></div>
              <div className='relative bg-white/90 backdrop-blur-xl border-2 border-blue-100 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl group-hover:bg-white transition-all duration-700 h-full flex flex-col'>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className='text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300'>Explorer</h3>
                    <p className='text-gray-600 mt-2 group-hover:text-blue-500 transition-colors duration-300'>Perfect for curious minds</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-300 group-hover:scale-110">
                    <Search className="w-8 h-8 text-blue-600 group-hover:animate-pulse" />
                  </div>
                </div>
                
                <div className='mb-8'>
                  <div className="flex items-baseline">
                    <span className='text-6xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300'>$0</span>
                    <span className='text-gray-500 ml-2 text-xl group-hover:text-blue-400 transition-colors duration-300'>/forever</span>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mt-3 group-hover:bg-green-200 group-hover:scale-105 transition-all duration-300">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                    Always Free
                  </div>
                </div>

                <ul className='space-y-4 flex-1 mb-8'>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">AI Career Assessment</span>
                  </li>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-75'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">3 Skill Projects</span>
                  </li>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-150'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">Basic Portfolio</span>
                  </li>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-225'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">Community Access</span>
                  </li>
                </ul>

                <Link href='/manage-plan'>
                  <Button className='w-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-2 border-blue-200 hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-blue-600 transition-all duration-500 py-4 text-lg font-semibold group-hover:shadow-xl group-hover:scale-105' variant='outline'>
                    <span className="group-hover:animate-pulse">Start Exploring 🌟</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pro Tier - Most Popular - Always elevated */}
            <div className='group relative transform scale-105 lg:scale-110 lg:z-20 transition-all duration-700 hover:scale-115 hover:-translate-y-6 hover:rotate-1'>
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
              <div className='relative bg-white backdrop-blur-xl border-3 border-purple-300 rounded-3xl p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-700 h-full flex flex-col'>
                <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
                  <div className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-base font-bold shadow-xl group-hover:animate-bounce group-hover:scale-110 transition-all duration-300'>
                    🚀 MOST POPULAR
                  </div>
                </div>
                
                <div className='flex flex-col h-full pt-4'>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300'>Pathfinder</h3>
                      <p className='text-gray-600 mt-2 group-hover:text-purple-600 transition-colors duration-300'>For ambitious achievers</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <TrendingUp className="w-8 h-8 text-purple-600 group-hover:animate-pulse" />
                    </div>
                  </div>
                  
                  <div className='mb-8'>
                    <div className="flex items-baseline">
                      <span className='text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300'>$29</span>
                      <span className='text-gray-500 ml-2 text-xl group-hover:text-purple-400 transition-colors duration-300'>/month</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mt-3 group-hover:bg-purple-200 group-hover:scale-105 transition-all duration-300">
                      <Star className="w-4 h-4 mr-2 fill-current group-hover:animate-spin" />
                      Best Value
                    </div>
                  </div>

                  <ul className='space-y-4 flex-1 mb-8'>
                    <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300'>
                      <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                        <Check className='text-green-600 h-5 w-5'/>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-slate-900">Everything in Explorer</span>
                    </li>
                    <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-75'>
                      <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                        <Check className='text-green-600 h-5 w-5'/>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-slate-900">Unlimited Projects</span>
                    </li>
                    <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-150'>
                      <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                        <Check className='text-green-600 h-5 w-5'/>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-slate-900">Advanced Portfolio</span>
                    </li>
                    <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-225'>
                      <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                        <Check className='text-green-600 h-5 w-5'/>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-slate-900">Interview Prep</span>
                    </li>
                    <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-300'>
                      <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                        <Check className='text-green-600 h-5 w-5'/>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-slate-900">Progress Analytics</span>
                    </li>
                  </ul>

                  <Link href='/manage-plan'>
                    <Button className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-500 py-4 text-lg font-semibold group-hover:scale-105'>
                      <span className="group-hover:animate-pulse">Start Building 🔥</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Premium Tier */}
            <div className='group relative transform transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:-rotate-1'>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700"></div>
              <div className='relative bg-white/90 backdrop-blur-xl border-2 border-emerald-100 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl group-hover:bg-white transition-all duration-700 h-full flex flex-col'>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className='text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300'>Elite</h3>
                    <p className='text-gray-600 mt-2 group-hover:text-emerald-500 transition-colors duration-300'>For career champions</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 group-hover:scale-110">
                    <Award className="w-8 h-8 text-emerald-600 group-hover:animate-pulse" />
                  </div>
                </div>
                
                <div className='mb-8'>
                  <div className="flex items-baseline">
                    <span className='text-6xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300'>$99</span>
                    <span className='text-gray-500 ml-2 text-xl group-hover:text-emerald-400 transition-colors duration-300'>/month</span>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mt-3 group-hover:bg-emerald-200 group-hover:scale-105 transition-all duration-300">
                    <Award className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Premium
                  </div>
                </div>

                <ul className='space-y-4 flex-1 mb-8'>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">Everything in Pathfinder</span>
                  </li>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-75'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">1-on-1 Career Coaching</span>
                  </li>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-150'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">Direct Company Connections</span>
                  </li>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-225'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">Priority Support</span>
                  </li>
                  <li className='flex items-center group-hover:translate-x-2 transition-transform duration-300 delay-300'>
                    <div className="p-1 rounded-full bg-green-100 mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      <Check className='text-green-600 h-5 w-5'/>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-slate-900">Job Guarantee</span>
                  </li>
                </ul>

                <Link href='/manage-plan'>
                  <Button className='w-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-2 border-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:border-emerald-600 transition-all duration-500 py-4 text-lg font-semibold group-hover:shadow-xl group-hover:scale-105' variant='outline'>
                    <span className="group-hover:animate-pulse">Go Elite ⭐</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories Section */}
      <section className='py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden'>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className='container px-4 md:px-6 mx-auto relative z-10'>
          <div className='text-center max-w-4xl mx-auto space-y-8 mb-16'>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 shadow-lg">
              <Users className="w-5 h-5 text-blue-600 mr-3 animate-pulse" />
              <span className="text-blue-700 font-semibold">Student Success Stories</span>
            </div>
            <div className='space-y-6'>
              <h2 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight'>
                Your Success Story
                <span className="block">Starts Today</span>
              </h2>
              <p className='text-gray-600 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto'>
                Join thousands of students who transformed their academic knowledge into dream careers. 
                Your future self is waiting.
              </p>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Job Success Rate</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Students Helped</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">$85K</div>
              <div className="text-gray-600 font-medium">Average Salary</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">3 Weeks</div>
              <div className="text-gray-600 font-medium">To First Offer</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link href='/documents'>
              <Button size="lg" className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 px-12 py-6 text-xl font-bold group'>
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                Start Your Transformation
                <ArrowRight className='ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-200'/>
              </Button>
            </Link>
            <p className="text-gray-500 mt-4 text-lg">Join 50,000+ students who chose success</p>
          </div>
        </div>
      </section>

      {/* Ultra Creative Footer */}
      <footer className='relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden'>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className='container px-4 md:px-6 py-16 mx-auto relative z-10'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
            {/* Brand Section */}
            <div className='md:col-span-2 space-y-6'>
              <div className='flex items-center space-x-3 group'>
                <div className="relative">
                  <BrainCircuit className='h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300'/>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Epsionyx</span>
                  <p className="text-blue-200 text-sm font-medium">Student Success Platform</p>
                </div>
              </div>
              <p className='text-gray-300 text-lg leading-relaxed max-w-md'>
                Transforming university education into career success. From classroom theory to industry practice, 
                we bridge the gap that matters most.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-blue-300">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">4.9/5 Student Rating</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className='space-y-6'>
              <h3 className='text-xl font-bold text-white'>Quick Start</h3>
              <ul className='space-y-3'>
                <li>
                  <Link href='/documents' className='text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group'>
                    <Upload className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Upload Documents
                  </Link>
                </li>
                <li>
                  <Link href='/manage-plan' className='text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center group'>
                    <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Choose Your Plan
                  </Link>
                </li>
                <li>
                  <Link href='#features' className='text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center group'>
                    <Sparkles className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Explore Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Student Resources */}
            <div className='space-y-6'>
              <h3 className='text-xl font-bold text-white'>For Students</h3>
              <ul className='space-y-3'>
                <li>
                  <span className='text-gray-300 flex items-center'>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Career Guidance
                  </span>
                </li>
                <li>
                  <span className='text-gray-300 flex items-center'>
                    <Target className="w-4 h-4 mr-2" />
                    Skill Building
                  </span>
                </li>
                <li>
                  <span className='text-gray-300 flex items-center'>
                    <Award className="w-4 h-4 mr-2" />
                    Interview Prep
                  </span>
                </li>
                <li>
                  <span className='text-gray-300 flex items-center'>
                    <Users className="w-4 h-4 mr-2" />
                    Community Support
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Success Banner */}
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-8 mb-12 border border-blue-400/30 backdrop-blur-xl">
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to Transform Your Future?</h3>
              <p className="text-blue-200 text-lg">Join 50,000+ students who chose success over uncertainty</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href='/documents'>
                  <Button size="lg" className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 group'>
                    <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                    Start Free Today
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200'/>
                  </Button>
                </Link>
                <div className="flex items-center space-x-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-gray-700/50 pt-8'>
            <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
              <div className='flex items-center space-x-6'>
                <p className='text-gray-400 text-sm'>
                  © 2024 Epsionyx. Transforming futures, one student at a time.
                </p>
              </div>
              <div className='flex items-center space-x-6'>
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">All systems operational</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Powered by AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}