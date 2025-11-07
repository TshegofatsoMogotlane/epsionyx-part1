import { anthropic, createNetwork, getDefaultRoutingAgent } from '@inngest/agent-kit'
import { createServer } from '@inngest/agent-kit/server'
import { inngest } from './client'
import Events from './constants'
import { databaseAgent } from './agents/databaseAgent'
import { documentScanningAgent } from './agents/documentScanningAgent'
import { IndustryAgent } from './agents/IndustryAgent'
import { TutorAgent } from './agents/TutorAgent'

import { config } from '@/lib/config'

// Create the agent network
const agentNetwork = createNetwork({
  name: config.inngest.networkName,
  agents: [documentScanningAgent, IndustryAgent, TutorAgent, databaseAgent],
  defaultModel: anthropic({
    apiKey: config.anthropic.apiKey,
    model: config.anthropic.model,
    defaultParameters: {
      max_tokens: config.anthropic.maxTokens,
    },
  }),
  defaultRouter: ({ network }: { network: any }) => {
    const s = network.state.kv;
    
    // Prevent infinite loops by checking if processing is already in progress
    const processingStarted = s.get('processing-started');
    if (!processingStarted) {
      s.set('processing-started', true);
    }

    /* finished ? */
    if (s.get('saved-to-database')) {
      console.log('✅ Processing complete - saved to database');
      return undefined;
    }

    /* already extracted ? */
    if (!s.get('extracted-data')) {
      console.log('🔍 Starting document extraction...');
      return documentScanningAgent;
    }

    /* already have tasks ? */
    if (!s.get('industry-tasks')) {
      console.log('🏭 Generating industry tasks...');
      return IndustryAgent;
    }

    /* already have questions ? */
    if (!s.get('interview-questions')) {
      console.log('❓ Creating interview questions...');
      return TutorAgent;
    }

    /* else save */
    console.log('💾 Saving to database...');
    return databaseAgent;
  }
});

export const server = createServer({
  agents: [documentScanningAgent, IndustryAgent, TutorAgent, databaseAgent],
  networks: [agentNetwork]
})

export const extractAndSavePDF = inngest.createFunction(
  { id: 'epsionyx-extract-pdf-and-save' },
  { event: Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE },
  async ({ event, step }) => {
    const { documentId, url, fileName } = event.data;
    
    // Validate required parameters
    if (!documentId || !url || !fileName) {
      console.error('❌ Missing required parameters:', { documentId, url, fileName });
      throw new Error('Missing required parameters: documentId, url, or fileName');
    }
    
    console.log('🎯 Starting document processing:', fileName);
    console.log('📄 Document details:', { documentId, url, fileName });

    try {
      console.log('🚀 Starting agent network execution...');
      
      // Set initial context in network state
      agentNetwork.state.kv.set('document-url', url);
      agentNetwork.state.kv.set('document-id', documentId);
      agentNetwork.state.kv.set('file-name', fileName);
      
      console.log('🌐 Running agent network...');
      
      const result = await agentNetwork.run(
        `Process this academic document:
         
         Document URL: ${url}
         Document ID: ${documentId}
         File Name: ${fileName}
         
         Please use the extract-document-data tool with these exact parameters:
         - documentUrl: ${url}
         - documentId: ${documentId}
         - fileName: ${fileName}
         
         Then generate industry tasks, create interview questions, and save to database.`
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
        message: (error as Error)?.message || 'Unknown error',
        stack: (error as Error)?.stack,
        name: (error as Error)?.name
      });
      throw error;
    }
  }
);
