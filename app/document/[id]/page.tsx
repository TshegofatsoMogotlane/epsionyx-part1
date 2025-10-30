'use client'

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Briefcase, MessageSquare, FileText, Clock, Target } from "lucide-react"

const Document = () => {
    const params = useParams<{id: string}>()
    const document = useQuery(api.documents.getDocumentById, { 
      id: params.id as Id<"documents"> 
    })

    if (!document) {
      return (
        <div className="container mx-auto p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading document...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto p-6 space-y-6">
        {/* Document Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{document.fileName || "Untitled Document"}</h1>
          <div className="flex items-center gap-2">
            <Badge variant={document.status === "completed" ? "default" : "secondary"}>
              {document.status}
            </Badge>
            {document.module && (
              <Badge variant="outline">
                <BookOpen className="w-3 h-3 mr-1" />
                {document.module}
              </Badge>
            )}
          </div>
          {document.summary && (
            <p className="text-gray-600 text-lg">{document.summary}</p>
          )}
        </div>

        <Separator />

        {/* Academic Topics */}
        {document.extractedTopics && document.extractedTopics.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Academic Topics ({document.extractedTopics.length})
              </CardTitle>
              <CardDescription>
                Key learning topics extracted from your document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {document.extractedTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="justify-start">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Industry Tasks */}
        {document.industryTasks && document.industryTasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Industry Projects ({document.industryTasks.length})
              </CardTitle>
              <CardDescription>
                Real-world projects to build your portfolio and demonstrate practical skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {document.industryTasks.map((task, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-sm">{task}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Interview Questions */}
        {document.interviewQuestions && document.interviewQuestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Interview Questions ({document.interviewQuestions.length})
              </CardTitle>
              <CardDescription>
                Comprehensive questions to prepare you for job interviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {document.interviewQuestions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-blue-50">
                    <p className="text-sm font-medium">{question}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {(!document.extractedTopics || document.extractedTopics.length === 0) &&
         (!document.industryTasks || document.industryTasks.length === 0) &&
         (!document.interviewQuestions || document.interviewQuestions.length === 0) && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Document Processing
              </h3>
              <p className="text-gray-600">
                Your document is being processed. Industry projects and interview questions will appear here once ready.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    )
}

export default Document