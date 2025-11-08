'use client'

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Briefcase, MessageSquare, FileText, Clock, Target, Code, Play, ExternalLink, Laptop, Database, Terminal, Calculator, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"


const Document = () => {
    const params = useParams<{id: string}>()
    const router = useRouter()
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

        {/* Industry Tools Dashboard */}
        <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laptop className="w-5 h-5" />
              Industry Tools & Development Environment
            </CardTitle>
            <CardDescription>
              Access professional tools and environments used in the industry for hands-on learning and project development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Development Environments */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">💻 Development IDEs</h4>
                <div className="space-y-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://vscode.dev'}
                  >
                    <Code className="w-3 h-3 mr-2" />
                    VS Code Online
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://replit.com'}
                  >
                    <Terminal className="w-3 h-3 mr-2" />
                    Replit IDE
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://codepen.io'}
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    CodePen
                  </Button>
                </div>
              </div>

              {/* Data Science Tools */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">📊 Data Science & Analytics</h4>
                <div className="space-y-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://jupyter.org/try'}
                  >
                    <Code className="w-3 h-3 mr-2" />
                    Jupyter Notebook
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://colab.research.google.com'}
                  >
                    <Play className="w-3 h-3 mr-2" />
                    Google Colab
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://sqliteonline.com'}
                  >
                    <Database className="w-3 h-3 mr-2" />
                    SQL Online
                  </Button>
                </div>
              </div>

              {/* Assessment & Practice */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">🎯 Practice & Assessment</h4>
                <div className="space-y-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://leetcode.com'}
                  >
                    <Code className="w-3 h-3 mr-2" />
                    LeetCode
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://hackerrank.com'}
                  >
                    <Terminal className="w-3 h-3 mr-2" />
                    HackerRank
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://excalidraw.com'}
                  >
                    <FileText className="w-3 h-3 mr-2" />
                    System Design
                  </Button>
                </div>
              </div>

              {/* Accounting & Business Tools */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">💼 Accounting & Business</h4>
                <div className="space-y-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://www.office.com/launch/excel'}
                  >
                    <Calculator className="w-3 h-3 mr-2" />
                    Excel Online
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://www.excel-easy.com/vba.html'}
                  >
                    <Code className="w-3 h-3 mr-2" />
                    VBA Tutorial
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://www.office.com/launch/powerbi'}
                  >
                    <TrendingUp className="w-3 h-3 mr-2" />
                    Power BI
                  </Button>
                </div>
              </div>

              {/* Financial Analysis Tools */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">📈 Financial Analysis</h4>
                <div className="space-y-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://docs.google.com/spreadsheets'}
                  >
                    <Calculator className="w-3 h-3 mr-2" />
                    Google Sheets
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://www.quickbooks.intuit.com'}
                  >
                    <Database className="w-3 h-3 mr-2" />
                    QuickBooks
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => window.location.href = 'https://www.sageone.com'}
                  >
                    <TrendingUp className="w-3 h-3 mr-2" />
                    Sage Accounting
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={() => {
                    alert('🚀 Launching Comprehensive Industry Workspace!\n\n✨ Features:\n• Multi-language IDE support\n• Real-time collaboration\n• Automated testing & grading\n• Industry mentor feedback\n• Portfolio integration\n• Live code review\n• Performance analytics\n\n🎯 Coming in next major update!');
                  }}
                >
                  <Laptop className="w-4 h-4 mr-2" />
                  Launch Industry Workspace
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    alert('🤖 AI-Powered Assessment System\n\n🎯 Features:\n• Automated code grading\n• Real-time feedback\n• Industry-standard evaluation\n• Performance benchmarking\n• Skill gap analysis\n• Personalized learning paths\n\n📈 Launching soon!');
                  }}
                >
                  <Target className="w-4 h-4 mr-2" />
                  AI Assessment System
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    alert('🎓 Industry Mentorship Program\n\n👥 Features:\n• 1-on-1 mentor sessions\n• Code review with experts\n• Career guidance\n• Interview preparation\n• Industry networking\n• Job placement assistance\n\n🚀 Coming soon!');
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Industry Mentor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
                      
                      {/* Industry Tools Section */}
                      <div className="mt-4 pt-3 border-t bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-2">🛠️ Industry Tools & Environments</p>
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => window.location.href = 'https://jupyter.org/try'}
                          >
                            <Code className="w-3 h-3 mr-1" />
                            Jupyter Notebook
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => window.location.href = 'https://vscode.dev'}
                          >
                            <Laptop className="w-3 h-3 mr-1" />
                            VS Code Online
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => window.location.href = 'https://colab.research.google.com'}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Google Colab
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => window.location.href = 'https://replit.com'}
                          >
                            <Terminal className="w-3 h-3 mr-1" />
                            Replit IDE
                          </Button>
                          {!isStringFormat && task.technologies?.includes('SQL') && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs"
                              onClick={() => window.location.href = 'https://sqliteonline.com'}
                            >
                              <Database className="w-3 h-3 mr-1" />
                              SQL Online
                            </Button>
                          )}
                          {!isStringFormat && (task.technologies?.includes('Excel') || task.technologies?.includes('VBA') || task.technologies?.includes('Accounting')) && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs"
                                onClick={() => window.location.href = 'https://www.office.com/launch/excel'}
                              >
                                <Calculator className="w-3 h-3 mr-1" />
                                Excel Online
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs"
                                onClick={() => window.location.href = 'https://docs.google.com/spreadsheets'}
                              >
                                <Calculator className="w-3 h-3 mr-1" />
                                Google Sheets
                              </Button>
                            </>
                          )}
                        </div>
                        <div className="mt-2">
                          <Button 
                            size="sm" 
                            className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            onClick={() => router.push(`/workspace/${params.id}/${index}`)}
                          >
                            <Code className="w-3 h-3 mr-1" />
                            Start Coding & Get Graded
                          </Button>
                        </div>
                      </div>
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
                      
                      {/* Interview Practice Tools */}
                      <div className="mt-4 pt-3 border-t bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-2">🎯 Practice & Assessment Tools</p>
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => {
                              // TODO: Route to AI interview practice
                              alert('🤖 AI Interview Coach\n\n• Practice with AI interviewer\n• Real-time feedback\n• Voice & video simulation\n• Industry-specific scenarios\n\n(Launching soon!)');
                            }}
                          >
                            <MessageSquare className="w-3 h-3 mr-1" />
                            AI Interview Coach
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => window.location.href = 'https://leetcode.com'}
                          >
                            <Code className="w-3 h-3 mr-1" />
                            LeetCode Practice
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => window.location.href = 'https://hackerrank.com'}
                          >
                            <Terminal className="w-3 h-3 mr-1" />
                            HackerRank
                          </Button>
                          {!isStringFormat && question.category?.includes('System Design') && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs"
                              onClick={() => window.location.href = 'https://excalidraw.com'}
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              System Design Tool
                            </Button>
                          )}
                        </div>
                        <div className="mt-2">
                          <Button 
                            size="sm" 
                            className="text-xs bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                            onClick={() => {
                              // TODO: Route to comprehensive interview system
                              alert('🎯 Comprehensive Interview System\n\n• Mock interviews with AI\n• Real company scenarios\n• Automated scoring & feedback\n• Performance analytics\n• Industry mentor reviews\n\n(Coming in next update!)');
                            }}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Start Interview Practice
                          </Button>
                        </div>
                      </div>
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