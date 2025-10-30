'use client'

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { BrainCircuit, Sparkles, GraduationCap } from 'lucide-react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import AnimatedColorfulLogo from './animated-colorful-logo'
import MyUploadsButtonGlass from './my-uploads-button-glass'

const Header = () => {
    const pathname = usePathname()
    const isHomePage = pathname === '/'
    return (
        <header className={`relative ${isHomePage
            ? 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-white/20'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm'
            } transition-all duration-300`}>
            {/* Subtle animated background pattern for homepage */}
            {isHomePage && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20 animate-pulse"></div>
            )}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo Section */}
                    <Link href='/' className='group flex items-center space-x-3 hover:scale-105 transition-transform duration-200'>
                        <div className="relative">
                            <BrainCircuit className='w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-200' />
                            <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <AnimatedColorfulLogo />
                            <span className="text-xs text-gray-500 font-medium tracking-wide">Student Success Platform</span>
                        </div>
                    </Link>

                    {/* Navigation Section */}
                    <nav className='flex items-center space-x-6'>
                        <SignedIn>
                            {/* Enhanced My Uploads Button */}
                            <div className="relative">
                                <MyUploadsButtonGlass />
                            </div>

                            {/* Manage Plan Button with better styling */}
                            <Link href='/manage-plan'>
                                <Button
                                    variant="outline"
                                    className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 hover:text-blue-800 transition-all duration-300 shadow-sm hover:shadow-md group"
                                >
                                    <GraduationCap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                    Manage Plan
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Button>
                            </Link>

                            {/* Enhanced User Button */}
                            <div className="relative">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 ring-2 ring-blue-200 hover:ring-blue-300 transition-all duration-200",
                                        }
                                    }}
                                />
                            </div>
                        </SignedIn>

                        <SignedOut>
                            <Link href="/sign-up">
                                <Button
                                    size="lg"
                                    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group px-8"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                                        Get Started
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Button>
                            </Link>
                        </SignedOut>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header