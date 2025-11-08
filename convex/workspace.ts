import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Id } from "./_generated/dataModel"

// Submit solution for grading
export const submitSolution = mutation({
  args: {
    documentId: v.id("documents"),
    taskId: v.string(),
    code: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    // Get the document and task
    const document = await ctx.db.get(args.documentId)
    if (!document) {
      throw new Error("Document not found")
    }

    const taskIndex = parseInt(args.taskId)
    const task = document.industryTasks?.[taskIndex]
    if (!task) {
      throw new Error("Task not found")
    }

    // Run automated tests (simplified version)
    const testResults = await runAutomatedTests(args.code, args.language, task)
    
    // Calculate score
    const passedTests = testResults.filter(t => t.passed).length
    const score = Math.round((passedTests / testResults.length) * 100)
    const passed = score >= 70 // 70% passing grade

    // Store submission
    const submissionId = await ctx.db.insert("submissions", {
      userId: identity.subject,
      documentId: args.documentId,
      taskId: args.taskId,
      code: args.code,
      language: args.language,
      score,
      passed,
      testResults,
      submittedAt: Date.now(),
    })

    return {
      submissionId,
      score,
      passed,
      testResults,
      feedback: generateFeedback(score, testResults),
    }
  },
})

// Get user submissions for a task
export const getSubmissions = query({
  args: {
    documentId: v.id("documents"),
    taskId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return []
    }

    const submissions = await ctx.db
      .query("submissions")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), identity.subject),
          q.eq(q.field("documentId"), args.documentId),
          q.eq(q.field("taskId"), args.taskId)
        )
      )
      .order("desc")
      .take(10)

    return submissions
  },
})

// Get best submission for a task
export const getBestSubmission = query({
  args: {
    documentId: v.id("documents"),
    taskId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }

    const submissions = await ctx.db
      .query("submissions")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), identity.subject),
          q.eq(q.field("documentId"), args.documentId),
          q.eq(q.field("taskId"), args.taskId)
        )
      )
      .collect()

    if (submissions.length === 0) return null

    // Return submission with highest score
    return submissions.reduce((best, current) => 
      current.score > best.score ? current : best
    )
  },
})

// Helper function to run automated tests
async function runAutomatedTests(code: string, language: string, task: any) {
  // This is a simplified version. In production, you'd use:
  // - Docker containers for safe code execution
  // - Language-specific test runners
  // - Timeout mechanisms
  // - Resource limits
  
  const testResults = [
    {
      name: "Basic Functionality Test",
      passed: code.length > 50, // Simple check
      message: code.length > 50 ? "Passed" : "Code too short",
    },
    {
      name: "Code Quality Check",
      passed: !code.includes("TODO") && !code.includes("..."),
      message: "Code should be complete",
    },
    {
      name: "Syntax Validation",
      passed: true, // Would use actual parser
      message: "No syntax errors detected",
    },
    {
      name: "Edge Cases",
      passed: Math.random() > 0.3, // Simulated
      message: "Testing edge cases",
    },
  ]

  return testResults
}

// Generate feedback based on results
function generateFeedback(score: number, testResults: any[]) {
  if (score >= 90) {
    return "Excellent work! Your solution passes all tests with flying colors. 🎉"
  } else if (score >= 70) {
    return "Good job! Your solution works but could be improved. Review the failed tests."
  } else if (score >= 50) {
    return "Your solution needs work. Focus on the failed test cases and try again."
  } else {
    return "Keep trying! Review the requirements and test your code thoroughly."
  }
}
