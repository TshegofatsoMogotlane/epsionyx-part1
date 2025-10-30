'use client'

import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Doc } from "@/convex/_generated/dataModel"
import { ChevronRight, FileText } from "lucide-react"

const DocumentList = () => {
    const {user} = useUser()
    const documents = useQuery(api.documents.getDocuments, {
        userId: user?.id || '',
    })

    const router = useRouter()

    if(!user){
        return (
            <div className='w-full p-8 text-center'>
                <p className='text-gray-600'>Please sign in to view your documents</p>
            </div>
        )
    }

    if(!documents){
        return(
            <div className='w-full p-8 text-center'>
                <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-bp2 border-blue-500 mx-auto'></div>
                <p className='mt-2 text-gray-600'>Loading documents...</p>
            </div>
        )
    }

    if(documents.length === 0){
        return(
            <div className='w-full p-8 text-center border border-gray-200 rounded-lg bg-gray-50'>
                <p className='text-gray-600'>No documents have been uploading yet.</p>
            </div>
        )
    }
    
  return (
    <div className='w-full'>
        <h2 className='text-xl font-semibold mb-4'>Your Documents</h2>
        <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[40px]'></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='w-[40px]'></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((document: Doc<'documents'>)=>(
                        <TableRow key={document._id} className='cursor-pointer hover:bg-gray-50'
                        onClick={()=>(router.push(`/document/${document._id}`))}
                        >
                            <TableCell className='py-2'>
                                <FileText className='h-6 w-6 text-red-500'/>
                            </TableCell>
                            <TableCell className='font-medium'>
                                {document.fileName}
                            </TableCell>
                            <TableCell>
                                {new Date(document.uploadedAt).toLocaleString()}
                            </TableCell>
                            <TableCell>{formatFileSize(document.size)}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${document.status==='pending'?'bg-yellow-100 text-yellow-800': document.status ==='processed'?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>
                                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                                </span>
                            </TableCell>
                            <TableCell className='text-right'>
                                <ChevronRight className='h-5 w-5 text-gray-400 ml-auto'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default DocumentList

function formatFileSize(bytes: number):string{
    if(bytes===0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes)/Math.log(k))

    return parseFloat((bytes / Math.pow(k,1)).toFixed(2)) + ' ' + sizes[1]
}