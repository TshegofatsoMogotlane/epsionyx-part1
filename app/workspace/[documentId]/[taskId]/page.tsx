'use client'

import { useParams } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Code, Play, Eye, EyeOff, Lightbulb, Trophy, ArrowLeft } from "lucide-react"
import dynamic from 'next/dynamic'
import Link from 'next/link'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="text-gray-400">Loading editor...</div>
    </div>
  )
})

const STARTER_CODE = `# Write your solution here
def solve():
    pass

if __name__ == "__main__":
    result = solve()
    print(result)
`

const WorkspacePage = () => {
  const params = useParams<{ documentId: string; taskId: string }>()
  const [code, setCode] = useState(STARTER_CODE)
  const [output, setOutput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [gradingResult, setGradingResult] = useState<any>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])

  const document = useQuery(api.documents.getDocumentById, { 
    id: params.documentId as Id<"documents"> 
  })

  const submitSolution = useMutation(api.workspace.submitSolution)

  if (!document) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading workspace...</p>
        </div>
      </div>
    )
  }

  const taskIndex = parseInt(params.taskId)
  const task = document.industryTasks?.[taskIndex]
  
  if (!task) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>Task not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  const isStringFormat = typeof task === 'string'
  const title = isStringFormat ? task.split(':')[0] : task.title
  const description = isStringFormat ? task.split(':').slice(1).join(':') : task.description

  const handleRunCode = async () => {
    setIsSubmitting(true)
    setOutput('Running code...\\n\\n')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOutput('Code executed successfully!\\n\\nOutput:\\nHello, World!')
    } catch (error) {
      setOutput('Error executing code')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const result = await submitSolution({
        documentId: params.documentId as Id<"documents">,
        taskId: params.taskId,
        code,
        language: 'python'
      })
      
      setGradingResult(result)
      setTestResults(result.testResults || [])
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b bg-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/document/${params.documentId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-xs text-gray-600">{document.fileName}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRunCode} disabled={isSubmitting} size="sm">
                <Play className="w-4 h-4 mr-2" />
                Run
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} size="sm">
                <Trophy className="w-4 h-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 border-r overflow-y-auto bg-gray-50">
          <div className="p-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{description}</p>
              </CardContent>
            </Card>

            {gradingResult && (
              <Card className={gradingResult.passed ? 'border-green-500' : 'border-red-500'}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {gradingResult.passed ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <Badge variant={gradingResult.passed ? "default" : "destructive"}>
                      {gradingResult.score}%
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setShowSolution(!showSolution)}>
                    {showSolution ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showSolution ? 'Hide' : 'Show'} Solution
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="editor" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="flex-1 m-0">
              <MonacoEditor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </TabsContent>

            <TabsContent value="solution" className="flex-1 m-0 p-4 overflow-y-auto">
              {showSolution ? (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded">
                  <code>{`# Solution\\ndef solve():\\n    return "Complete solution here"`}</code>
                </pre>
              ) : (
                <div className="text-center py-12">
                  <p>Submit to unlock solution</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="output" className="flex-1 m-0 p-4 bg-gray-900 text-gray-100">
              <pre className="text-sm">{output || 'No output yet'}</pre>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default WorkspacePage
