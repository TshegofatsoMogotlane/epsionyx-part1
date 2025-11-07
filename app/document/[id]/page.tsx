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
                Core Academic Topics ({document.extractedTopics.length})
              </CardTitle>
              <CardDescription>
                Main learning topics extracted from your document through deep AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {document.extractedTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="justify-start p-2">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subtopics - Show comprehensive analysis */}
        {document.subtopics && document.subtopics.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Detailed Subtopics ({document.subtopics.length})
              </CardTitle>
              <CardDescription>
                Comprehensive breakdown of all concepts, methods, and techniques covered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                {document.subtopics.map((subtopic, index) => (
                  <Badge key={index} variant="outline" className="justify-start text-xs p-1">
                    {subtopic}
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
              <div className="space-y-4">
                {document.industryTasks.map((task, index) => {
                  // Handle both string format and object format
                  const isStringFormat = typeof task === 'string';
                  const title = isStringFormat ? task.split(':')[0] : task.title;
                  const description = isStringFormat ? task.split(':').slice(1).join(':') : task.description;
                  
                  return (
                    <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
                        {!isStringFormat && task.level && (
                          <Badge variant="outline" className="ml-2">
                            {task.level}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{description}</p>
                      
                      {!isStringFormat && task.technologies && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-1">Technologies:</p>
                          <div className="flex flex-wrap gap-1">
                            {task.technologies.map((tech: string, techIndex: number) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {!isStringFormat && task.deliverables && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-1">Key Deliverables:</p>
                          <ul className="text-xs text-gray-600 list-disc list-inside">
                            {task.deliverables.slice(0, 3).map((deliverable: string, delIndex: number) => (
                              <li key={delIndex}>{deliverable}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {!isStringFormat && (task.timeEstimate || task.portfolioValue) && (
                        <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
                          {task.timeEstimate && <span>⏱️ {task.timeEstimate}</span>}
                          {task.portfolioValue && <span>💼 High Portfolio Value</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
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
              <div className="space-y-4">
                {document.interviewQuestions.map((question, index) => {
                  // Handle both string format and object format
                  const isStringFormat = typeof question === 'string';
                  const questionText = isStringFormat ? question.split(' (')[0] : question.question;
                  const category = isStringFormat ? question.split(' (')[1]?.replace(')', '') : question.category;
                  
                  return (
                    <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {category && (
                              <Badge variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            )}
                            {!isStringFormat && question.difficulty && (
                              <Badge variant="secondary" className="text-xs">
                                {question.difficulty}
                              </Badge>
                            )}
                          </div>
                          <p className="font-medium text-gray-900">{questionText}</p>
                        </div>
                      </div>
                      
                      {!isStringFormat && question.context && (
                        <p className="text-sm text-gray-600 mb-2">{question.context}</p>
                      )}
                      
                      {!isStringFormat && question.evaluationCriteria && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-1">What interviewers look for:</p>
                          <ul className="text-xs text-gray-600 list-disc list-inside">
                            {question.evaluationCriteria.slice(0, 3).map((criteria: string, critIndex: number) => (
                              <li key={critIndex}>{criteria}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {!isStringFormat && question.interviewTips && (
                        <div className="bg-yellow-50 p-2 rounded text-xs text-gray-700 mt-2">
                          <span className="font-medium">💡 Tip:</span> {question.interviewTips}
                        </div>
                      )}
                      
                      {!isStringFormat && question.realCompanyExample && (
                        <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                          🏢 {question.realCompanyExample}
                        </div>
                      )}
                    </div>
                  );
                })}
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