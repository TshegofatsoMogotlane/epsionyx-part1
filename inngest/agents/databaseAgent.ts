// Fixed databaseAgent.ts
import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";
import { z } from "zod";
import convex from "@/lib/convexClient";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { config } from "@/lib/config";

const saveToDatabaseTool = createTool({
  name: "save-to-database",
  description:
    "Collects all processed data from network state and saves comprehensive student learning data to database.",
  handler: async (input, context) => {
    try {
      console.log("💾 DatabaseAgent tool handler called with input:", input);

      // Get data from network state
      const state = context.network.state.kv;
      const extractedData = state.get("extracted-data");
      const industryTasks = state.get("industry-tasks");
      const interviewQuestions = state.get("interview-questions");

      const documentId = extractedData?.documentId || "unknown";

      console.log("💾 Saving to database:", {
        documentId,
        extractedData: extractedData ? "✓" : "✗",
        industryTasks: industryTasks ? "✓" : "✗",
        interviewQuestions: interviewQuestions ? "✓" : "✗",
      });

      if (!extractedData) {
        return { success: false, error: "No extracted data found to save" };
      }

      // Prepare comprehensive data for database storage
      const comprehensiveData = {
        documentId,
        fileName: extractedData.fileName,
        academicModule: extractedData.academicModule,
        coreTopics: extractedData.coreTopics,
        subtopics: extractedData.subtopics,
        industryApplications: extractedData.industryApplications,
        relevantCompanies: extractedData.relevantCompanies,
        jobRoles: extractedData.jobRoles,
        technicalSkills: extractedData.technicalSkills,
        toolsAndTechnologies: extractedData.toolsAndTechnologies,
        realWorldUseCases: extractedData.realWorldUseCases,
        skillLevels: extractedData.skillLevels,
        
        // Industry Tasks - This is what students need!
        industryProjects: industryTasks ? {
          totalProjects: industryTasks.totalProjects,
          categories: industryTasks.categories,
          projectTypes: industryTasks.projectTypes,
          generatedAt: industryTasks.generatedAt
        } : null,
        
        // Interview Questions - This is what students need!
        interviewPreparation: interviewQuestions ? {
          totalQuestions: interviewQuestions.totalQuestions,
          categories: interviewQuestions.categories,
          questionTypes: interviewQuestions.questionTypes,
          generatedAt: interviewQuestions.generatedAt
        } : null,
        
        processedAt: new Date().toISOString(),
        status: "completed"
      };

      console.log("📊 Comprehensive data prepared for database:", {
        documentId,
        fileName: comprehensiveData.fileName,
        academicModule: comprehensiveData.academicModule,
        totalTopics: comprehensiveData.coreTopics?.length || 0,
        totalProjects: comprehensiveData.industryProjects?.totalProjects || 0,
        totalQuestions: comprehensiveData.interviewPreparation?.totalQuestions || 0
      });

      // Save to Convex database using the existing mutation
      console.log("💾 Saving to Convex database...");
      
      const saveResult = await convex.mutation(api.documents.updateDocumentWithExtractedDataInternal, {
        id: documentId as Id<"documents">,
        fileName: comprehensiveData.fileName || "Unknown File",
        summary: `Academic module covering ${comprehensiveData.coreTopics?.length || 0} core topics with ${comprehensiveData.industryProjects?.totalProjects || 0} industry projects and ${comprehensiveData.interviewPreparation?.totalQuestions || 0} interview questions.`,
        extractedTopics: comprehensiveData.coreTopics || [],
        module: comprehensiveData.academicModule || "Unknown Module",
        industryTasks: industryTasks?.categories?.flatMap(cat => 
          cat.projects?.map(project => `${project.title}: ${project.description}`) || []
        ) || [],
        interviewQuestions: interviewQuestions?.categories?.flatMap(cat =>
          cat.questions?.map(q => `${q.question} (${q.type})`) || []
        ) || [],
        status: "completed"
      });

      console.log("✅ Successfully saved to database!");
      console.log("✅ Students will receive:");
      console.log(`   📚 Academic Module: ${comprehensiveData.academicModule}`);
      console.log(`   🎯 Core Topics: ${comprehensiveData.coreTopics?.length || 0}`);
      console.log(`   🏭 Industry Projects: ${comprehensiveData.industryProjects?.totalProjects || 0}`);
      console.log(`   💼 Interview Questions: ${comprehensiveData.interviewPreparation?.totalQuestions || 0}`);

      // Mark as saved in network state to stop further processing
      context.network.state.kv.set("saved-to-database", true);

      return {
        success: true,
        message: "All data successfully saved to database",
        documentId,
        saveResult,
        studentWillReceive: {
          academicModule: comprehensiveData.academicModule,
          totalTopics: comprehensiveData.coreTopics?.length || 0,
          industryProjects: comprehensiveData.industryProjects?.totalProjects || 0,
          interviewQuestions: comprehensiveData.interviewPreparation?.totalQuestions || 0,
          fileName: comprehensiveData.fileName
        },
        dataSaved: {
          extractedData: !!extractedData,
          industryTasks: !!industryTasks,
          interviewQuestions: !!interviewQuestions,
        },
      };
    } catch (error) {
      console.error("❌ Database save failed:", error);
      return {
        success: false,
        error: `Database save failed: ${error.message}`,
        documentId: extractedData?.documentId || "unknown"
      };
    }
  },
});

export const databaseAgent = createAgent({
  name: "Database Agent",
  description:
    "Saves comprehensive student learning data including industry projects and interview questions to database for student access.",
  system: `You are a Database Storage Agent responsible for saving comprehensive learning data that students will access.

  Your ONLY responsibility:
  - Use the save-to-database tool to store all processed data to Convex database
  - Ensure students receive their industry projects and interview questions
  - Save data using the updateDocumentWithExtractedData mutation
  
  CRITICAL: Students upload academic documents and expect to receive:
  1. Industry Projects (10-15 per topic) - Real-world applications they can build
  2. Interview Questions (50+ per topic) - Comprehensive preparation for employment
  3. Academic topic extraction and analysis
  
  The save-to-database tool will automatically access all data from network state and save to Convex.
  
  After saving, students can access their personalized industry projects and interview questions through the web interface.`,
  tools: [saveToDatabaseTool],
});
