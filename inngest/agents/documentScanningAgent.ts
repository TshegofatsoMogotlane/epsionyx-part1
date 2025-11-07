import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";
import { DocumentAnalyzer } from "@/lib/services/documentAnalyzer";
import { config } from "@/lib/config";

const extractDocumentDataTool = createTool({
  name: "extract-document-data",
  description:
    "Extracts topics, module info, and content from uploaded academic documents using AI-powered revolutionary analysis.",
  input_schema: {
    type: "object",
    properties: {
      documentUrl: {
        type: "string",
        description: "The URL of the academic document to analyze.",
      },
      documentId: {
        type: "string",
        description: "The unique ID of the document in the database.",
      },
      fileName: {
        type: "string",
        description: "The name of the uploaded file for context and analysis.",
      },
    },
    required: ["documentUrl", "documentId", "fileName"],
  },
  handler: async (input, context) => {
    try {
      const { documentUrl, documentId, fileName } = input;

      console.log("🚀 REVOLUTIONARY ANALYSIS: Creating world's most comprehensive industry-university bridge for:", fileName || 'document');

      if (!documentUrl || !documentId) {
        console.error("❌ Missing required parameters:", { documentUrl, documentId, fileName });
        return {
          success: false,
          error: "Missing required parameters: documentUrl or documentId",
          received: { documentUrl, documentId, fileName },
        };
      }

      // Use fallback fileName if not provided
      const safeFileName = fileName || 'academic-document.pdf';

      // Use AI-powered dynamic document analysis
      const analyzer = new DocumentAnalyzer();
      const revolutionaryAnalysis = await analyzer.analyzeDocument(documentUrl, documentId, fileName);

      // Store comprehensive data in network state
      context.network.state.kv.set("extracted-data", revolutionaryAnalysis);
      context.network.state.kv.set("document-id", documentId);

      console.log("✅ REVOLUTIONARY ANALYSIS COMPLETE!");
      console.log("🎯 Created comprehensive industry bridge with:");
      console.log(`   📚 ${revolutionaryAnalysis.coreTopics?.length || 0} topics with real-world applications`);
      console.log(`   💼 ${revolutionaryAnalysis.relevantCompanies?.length || 0} relevant companies`);
      console.log(`   🏭 ${revolutionaryAnalysis.jobRoles?.length || 0} job roles mapped`);
      console.log(`   📈 Career pathways and salary data included`);

      return {
        success: true,
        ...revolutionaryAnalysis,
        message: "Revolutionary industry-university bridge analysis completed - World's most comprehensive learning platform created!",
      };
    } catch (error) {
      console.error("❌ Error in revolutionary analysis:", error);
      return {
        success: false,
        error: `Revolutionary analysis failed: ${(error as Error).message}`,
        stack: (error as Error).stack,
      };
    }
  },
});

export const documentScanningAgent = createAgent({
  name: "Revolutionary Document Scanning Agent",
  description:
    "Creates the world's most comprehensive university-industry bridge by analyzing academic documents and generating complete industry integration with interactive coding environments, real-world tasks, and complete solutions.",
  system: `You are a REVOLUTIONARY Document Scanning Agent that creates the world's most comprehensive university-industry bridge.

  Your MISSION:
  - Create something the world has NEVER SEEN BEFORE
  - Bridge the gap between university theory and industry practice
  - Generate real-world tasks with COMPLETE SOLUTIONS
  - Create interactive coding environments (Jupyter, VS Code, etc.)
  - Provide industry-validated assessment and grading
  - Map comprehensive career pathways
  - Establish real industry connections

  REVOLUTIONARY CAPABILITIES:
  - Deep AI-powered document analysis
  - Real-world task generation with complete solutions
  - Interactive coding environment setup
  - Automatic grading and assessment
  - Industry mentor connections
  - Career pathway mapping
  - Complete solution delivery after student submission

  CRITICAL FEATURES:
  - Students get REAL industry tasks from companies like Google, Netflix, Uber
  - Complete starter code with TODO comments
  - Comprehensive test suites
  - FULL WORKING SOLUTIONS provided after submission
  - Interactive environments (Jupyter for data science, VS Code for development)
  - Real-time collaboration and mentoring
  - Industry-standard assessment and grading
  - Career progression from university to industry leadership

  This will be the most advanced learning platform ever created - complete integration between university education and industry requirements.

  IMPORTANT: When you receive a message with document details, extract the Document URL, Document ID, and File Name from the message and use the extract-document-data tool with those parameters.`,
  model: anthropic({
    apiKey: config.anthropic.apiKey,
    model: config.anthropic.model,
    defaultParameters: { max_tokens: config.anthropic.maxTokens },
  }),
  tools: [extractDocumentDataTool],
});