import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    userId: v.string(),
    fileName: v.optional(v.string()),
    fileId: v.id("_storage"),
    uploadedAt: v.number(),
    size: v.number(),
    mimeType: v.string(),
    status: v.string(),

    // Fields for processed/extracted data
    extractedTopics: v.optional(v.array(v.string())),
    subtopics: v.optional(v.array(v.string())), // Add subtopics field
    industryTasks: v.optional(v.array(v.any())), // Support both strings and rich objects
    teachingResults: v.optional(v.array(v.string())),
    interviewQuestions: v.optional(v.array(v.any())), // Support both strings and rich objects
    module: v.optional(v.string()),          
    textExtract: v.optional(v.string()),      
    pageCount: v.optional(v.number()),        
    summary: v.optional(v.string()),          
    classification: v.optional(v.string()),   
    tags: v.array(v.string()),             
  }),

  submissions: defineTable({
    userId: v.string(),
    documentId: v.id("documents"),
    taskId: v.string(),
    code: v.string(),
    language: v.string(),
    score: v.number(),
    passed: v.boolean(),
    testResults: v.array(v.any()),
    submittedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_document", ["documentId"])
    .index("by_user_and_task", ["userId", "documentId", "taskId"]),
});

