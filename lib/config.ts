// Configuration service for dynamic values
export const config = {
  // AI Configuration
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY!,
    model: process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022',
    maxTokens: parseInt(process.env.MAX_TOKENS || '4000'),
  },
  
  // Inngest Configuration
  inngest: {
    clientId: process.env.INNGEST_CLIENT_ID || 'epsionyx',
    networkName: process.env.AGENT_NETWORK_NAME || 'epsionyx-agent-network',
  },
  
  // External APIs
  apis: {
    glassdoor: process.env.GLASSDOOR_API_KEY,
    indeed: process.env.INDEED_API_KEY,
    github: process.env.GITHUB_API_TOKEN,
  },
  
  // Application Settings
  app: {
    environment: process.env.NODE_ENV || 'development',
  }
};

// Validation
if (!config.anthropic.apiKey) {
  throw new Error('ANTHROPIC_API_KEY is required');
}