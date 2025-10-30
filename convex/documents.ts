import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Function to generate a Convex upload URL for the client
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Generate a URL that the client can use to upload the file
    return await ctx.storage.generateUploadUrl();
  },
});

// Store the PDF file metadata and add it to the database
export const storeDocument = mutation({
  args: {
    userId: v.string(),
    fileId: v.id("_storage"),
    fileName: v.string(),
    size: v.number(),
    mimeType: v.string(),
  },
  handler: async (ctx, args) => {
    // Save the PDF document metadata to the database
    const documentId = await ctx.db.insert("documents", {
      userId: args.userId,
      fileName: args.fileName,
      fileId: args.fileId,
      uploadedAt: Date.now(),
      size: args.size,
      mimeType: args.mimeType,
      status: "pending",

      // Initialize extracted data fields as null/empty
      textExtract: undefined,
      pageCount: undefined,
      summary: undefined,
      classification: undefined,
      tags: [],
    });

    return documentId;
  },
});

export const getDocuments = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Only return documents for the authenticated user
    return await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
  },
});

export const getDocumentById = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Get the document
    const document = await ctx.db.get(args.id);

    // Verify user has access
    if (document) {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Not Authenticated");
      }

      const userId = identity.subject;
      if (document.userId !== userId) {
        throw new Error("Not authorized to access this document");
      }
    }

    return document;
  },
});

export const getDocumentDownloadUrl = query({
  args: {
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    // Get a temporary URL that can be used to download the file
    return await ctx.storage.getUrl(args.fileId);
  },
});

export const updateDocumentStatus = mutation({
  args: {
    id: v.id("documents"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify user has access
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    if (document.userId !== userId) {
      throw new Error("Not authorized to update this document");
    }

    await ctx.db.patch(args.id, {
      status: args.status,
    });

    return true;
  },
});

// Delete a PDF document and its file
export const deleteDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    // Verify user has access
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    if (document.userId !== userId) {
      throw new Error("Not authorized to delete this document");
    }

    // Delete the file from storage
    if (document.fileId) {
      await ctx.storage.delete(document.fileId);
    }

    // Delete the document record
    await ctx.db.delete(args.id);

    return true;
  },
});

// Update a document with extracted data
export const updateDocumentWithExtractedData = mutation({
  args: {
    id: v.id("documents"),
    fileName: v.string(),
    summary: v.string(),
    extractedTopics: v.array(v.string()),
    module: v.string(),
    industryTasks: v.array(v.string()),
    interviewQuestions: v.array(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Fetch the document
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    // Verify user has access
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    if (document.userId !== userId) {
      throw new Error("Not authorized to update this document");
    }

    // Update the document with extracted data
    await ctx.db.patch(args.id, {
      fileName: args.fileName,
      summary: args.summary,
      extractedTopics: args.extractedTopics,
      module: args.module,
      industryTasks: args.industryTasks,
      interviewQuestions: args.interviewQuestions,
      status: args.status,
    });

    return {
      userId: document.userId,
    };
  },
});

// Internal mutation for server-side processing (no auth required)
export const updateDocumentWithExtractedDataInternal = mutation({
  args: {
    id: v.id("documents"),
    fileName: v.string(),
    summary: v.string(),
    extractedTopics: v.array(v.string()),
    module: v.string(),
    industryTasks: v.array(v.string()),
    interviewQuestions: v.array(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Fetch the document
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    // Update the document with extracted data (no auth check for internal processing)
    await ctx.db.patch(args.id, {
      fileName: args.fileName,
      summary: args.summary,
      extractedTopics: args.extractedTopics,
      module: args.module,
      industryTasks: args.industryTasks,
      interviewQuestions: args.interviewQuestions,
      status: args.status,
    });

    return {
      success: true,
      documentId: args.id,
      userId: document.userId,
    };
  },
});
