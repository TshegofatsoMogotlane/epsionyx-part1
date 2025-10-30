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
    industryTasks: v.optional(v.array(v.string())),
    teachingResults: v.optional(v.array(v.string())),
    interviewQuestions: v.optional(v.array(v.string())),
    module: v.optional(v.string()),          
    textExtract: v.optional(v.string()),      
    pageCount: v.optional(v.number()),        
    summary: v.optional(v.string()),          
    classification: v.optional(v.string()),   
    tags: v.array(v.string()),             
  }),
});

