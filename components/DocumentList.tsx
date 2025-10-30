'use client'

import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { Doc } from "@/convex/_generated/dataModel"
import { ChevronRight, FileText, Clock, CheckCircle, AlertCircle, Sparkles, Target, MessageSquare, Calendar, HardDrive } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const DocumentList = () => {
    const {user} = useUser()
    const documents = useQuery(api.documents.getDocuments, {
        userId: user?.id || '',
    })

    const router = useRouter()

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'completed':
                return <CheckCircle className='h-5 w-5 text-green-500' />
            case 'pending':
                return <Clock className='h-5 w-5 text-yellow-500' />
            default:
                return <AlertCircle className='h-5 w-5 text-red-500' />
        }
    }

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            default:
                return 'bg-red-100 text-red-800 border-red-200'
        }
    }

    if(!user){
        return (
            <div className='p-12 text-center'>
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <FileText className='h-8 w-8 text-blue-500' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>Sign In Required</h3>
                <p className='text-gray-600'>Please sign in to view your documents and start your learning journey</p>
            </div>
        )
    }

    if(!documents){
        return(
            <div className='p-12 text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4'></div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>Loading Your Documents</h3>
                <p className='text-gray-600'>Fetching your learning materials...</p>
            </div>
        )
    }

    if(documents.length === 0){
        return(
            <div className='p-12 text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <Sparkles className='h-8 w-8 text-blue-500' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>Start Your Journey!</h3>
                <p className='text-gray-600 mb-6'>Upload your first academic PDF to get personalized industry projects and interview questions</p>
                <div className='flex justify-center gap-4 text-sm'>
                    <div className='flex items-center gap-2 text-blue-600'>
                        <Target className='h-4 w-4' />
                        <span>Industry Projects</span>
                    </div>
                    <div className='flex items-center gap-2 text-purple-600'>
                        <MessageSquare className='h-4 w-4' />
                        <span>Interview Prep</span>
                    </div>
                </div>
            </div>
        )
    }
    
  return (
    <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900'>Your Documents</h2>
            <Badge variant="secondary" className='text-sm'>
                {documents.length} {documents.length === 1 ? 'document' : 'documents'}
            </Badge>
        </div>
        
        <div className='space-y-4'>
            {documents.map((document: Doc<'documents'>) => (
                <Card 
                    key={document._id} 
                    className='cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50/30'
                    onClick={() => router.push(`/document/${document._id}`)}
                >
                    <CardContent className='p-6'>
                        <div className='flex items-start justify-between'>
                            <div className='flex items-start gap-4 flex-1'>
                                <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg'>
                                    <FileText className='h-6 w-6 text-white' />
                                </div>
                                
                                <div className='flex-1 min-w-0'>
                                    <h3 className='font-semibold text-gray-900 mb-2 truncate'>
                                        {document.fileName || 'Untitled Document'}
                                    </h3>
                                    
                                    <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3'>
                                        <div className='flex items-center gap-1'>
                                            <Calendar className='h-4 w-4' />
                                            <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <HardDrive className='h-4 w-4' />
                                            <span>{formatFileSize(document.size)}</span>
                                        </div>
                                        {document.module && (
                                            <Badge variant="outline" className='text-xs'>
                                                {document.module}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className='flex items-center gap-4 text-sm'>
                                        {document.extractedTopics && document.extractedTopics.length > 0 && (
                                            <div className='flex items-center gap-1 text-blue-600'>
                                                <Target className='h-4 w-4' />
                                                <span>{document.extractedTopics.length} topics</span>
                                            </div>
                                        )}
                                        {document.industryTasks && document.industryTasks.length > 0 && (
                                            <div className='flex items-center gap-1 text-purple-600'>
                                                <Sparkles className='h-4 w-4' />
                                                <span>{document.industryTasks.length} projects</span>
                                            </div>
                                        )}
                                        {document.interviewQuestions && document.interviewQuestions.length > 0 && (
                                            <div className='flex items-center gap-1 text-green-600'>
                                                <MessageSquare className='h-4 w-4' />
                                                <span>{document.interviewQuestions.length} questions</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex items-center gap-3'>
                                <Badge 
                                    className={`flex items-center gap-1 ${getStatusColor(document.status)} border`}
                                >
                                    {getStatusIcon(document.status)}
                                    <span className='capitalize'>{document.status}</span>
                                </Badge>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
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