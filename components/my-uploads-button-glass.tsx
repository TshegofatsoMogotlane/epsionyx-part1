// components/my-uploads-button-glass.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Folder } from 'lucide-react'

const MyUploadsButtonGlass = () => {
  return (
    <Link href='/documents'>
      <Button
        variant="outline"
        className="group relative overflow-hidden backdrop-blur-md bg-white/80 border-white/30 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
      >
        <Folder className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        My Uploads
      </Button>
    </Link>
  )
}

export default MyUploadsButtonGlass