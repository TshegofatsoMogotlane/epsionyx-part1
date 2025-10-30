import { anthropic, createNetwork, getDefaultRoutingAgent } from '@inngest/agent-kit'
import { createServer } from '@inngest/agent-kit/server'
import { inngest } from './client'
import Events from './constants'
import { databaseAgent } from './agents/databaseAgent'
import { documentScanningAgent } from './agents/documentScanningAgent'
import { IndustryAgent } from './agents/IndustryAgent'
import { TutorAgent } from './agents/TutorAgent'

// Create the agent network
const agentNetwork = createNetwork({
  name: 'epsionyx-agent-network',
  agents: [documentScanningAgent, IndustryAgent, TutorAgent, databaseAgent],
  defaultModel: anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-3-5-haiku-20241022',
    defaultParameters: {
      max_tokens: 1000,
    },
  }),
  defaultRouter: ({ network }: { network: any }) => {
    // const state = network.state.kv;
    const s = network.state.kv;
    // const savedToDatabase = state.get('saved-to-database');
    // if (savedToDatabase) {
    //   return undefined; // Stop execution
    // }
    
    // const extractedData = state.get('extracted-data');
    // const industryTasks = state.get('industry-tasks');
    // const interviewQuestions = state.get('interview-questions');
    
    // if (!extractedData) {
    //   return documentScanningAgent;
    // } else if (!industryTasks) {
    //   return IndustryAgent;
    // } else if (!interviewQuestions) {
    //   return TutorAgent;
    // } else {
    //   return databaseAgent;
    // }

    /* finished ? */
    if (s.get('saved-to-database')) return undefined;

    /* already extracted ? */
    if (!s.get('extracted-data')) return documentScanningAgent;

    /* already have tasks ? */
    if (!s.get('industry-tasks')) return IndustryAgent;

    /* already have questions ? */
    if (!s.get('interview-questions')) return TutorAgent;

    /* else save */
    return databaseAgent;
  }
});

export const server = createServer({
  agents: [documentScanningAgent, IndustryAgent, TutorAgent, databaseAgent],
  networks: [agentNetwork]
})

export const extractAndSavePDF = inngest.createFunction(
  { id: 'extract-pdf-and-save' },
  { event: Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE },
  async ({ event, step }) => {
    const { documentId, url, fileName } = event.data;
    console.log('🎯 Starting document processing:', fileName);
    console.log('📄 Document details:', { documentId, url, fileName });

    try {
      console.log('🚀 Starting agent network execution...');
      
      // Call agent network directly without step wrapper to avoid nesting
      console.log('🌐 Running agent network...');
      
      const result = await agentNetwork.run(
        `Process this academic document:
         
         Document URL: ${url}
         Document ID: ${documentId}
         File Name: ${fileName}
         
         Please extract the academic content, generate industry tasks, create interview questions, and save to database.`
      );
      
      console.log('✅ Network result:', result);
      console.log('✅ Processing completed successfully');
      
      return {
        success: true,
        documentId,
        fileName,
        result,
        message: 'Document processed through agent network'
      };
    } catch (error) {
      console.error('❌ Error in document processing:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  }
);
