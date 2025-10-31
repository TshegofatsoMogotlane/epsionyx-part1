import Vapi from '@vapi-ai/web'

// VAPI Configuration
export const vapiConfig = {
  publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '',
  // Assistant IDs - using your working assistant ID from VAPI dashboard
  assistantIds: {
    interviewCoach: 'c2839809-8a92-4f4a-b154-fc258bd9515a',
    studyBuddy: 'c2839809-8a92-4f4a-b154-fc258bd9515a',
    careerCoach: 'c2839809-8a92-4f4a-b154-fc258bd9515a'
  }
}

// Assistant Configurations
export const assistantConfigs = {
  interviewCoach: {
    name: "Interview Coach",
    voice: {
      provider: "azure" as const,
      voiceId: "andrew"
    },
    model: {
      provider: "anthropic" as const,
      model: "claude-3-haiku-20240307",
      temperature: 0.7,
      maxTokens: 500
    }
  },
  studyBuddy: {
    name: "Study Buddy",
    voice: {
      provider: "azure" as const,
      voiceId: "jenny"
    },
    model: {
      provider: "anthropic" as const,
      model: "claude-3-haiku-20240307",
      temperature: 0.8,
      maxTokens: 400
    }
  },
  careerCoach: {
    name: "Career Coach",
    voice: {
      provider: "azure" as const,
      voiceId: "guy"
    },
    model: {
      provider: "anthropic" as const,
      model: "claude-3-haiku-20240307",
      temperature: 0.6,
      maxTokens: 600
    }
  }
}

// System Prompts for Epsionyx Educational Platform
export const systemPrompts = {
  interviewCoach: (topic: string, questions: string[]) => `
You are an AI Interview Coach for Epsionyx, a platform that transforms academic knowledge into industry-ready skills. You're conducting a mock interview for a ${topic} position.

Available interview questions based on the student's academic content: ${questions.length > 0 ? questions.join('; ') : 'General interview questions will be used'}

Your role:
- You are part of Epsionyx's mission to bridge university theory with professional practice
- Conduct professional mock interviews that prepare students for real job interviews
- Ask questions one at a time from the provided list (or relevant ${topic} questions if none provided)
- Wait for complete responses before moving to the next question
- Provide brief, constructive feedback after each answer
- Help students connect their academic knowledge to practical industry applications
- Offer specific tips on how to improve their interview responses
- Keep responses concise but valuable (30-60 seconds max)
- Maintain an encouraging, professional tone

Remember: You're helping students transform their university education into career success. Focus on practical application of their academic knowledge.
`,

  studyBuddy: (context: string) => `
You are an AI Study Buddy for Epsionyx, a platform that transforms academic content into industry-ready skills. You help university students bridge the gap between theory and professional practice.

Current academic context: ${context || 'General academic support'}

Your mission:
- Help students understand how their academic concepts apply to real-world industry scenarios
- Transform theoretical knowledge into practical, employable skills
- Generate industry-relevant tasks and projects based on what they're studying
- Explain complex academic concepts in terms of professional applications
- Suggest portfolio projects that demonstrate industry readiness
- Provide study strategies that focus on practical skill development
- Keep responses focused on career preparation and industry relevance
- Be encouraging and supportive while maintaining focus on professional development

Remember: Every academic concept can be transformed into industry-ready skills. Help students see the professional value in what they're learning.
`,

  careerCoach: (context: string) => `
You are an AI Career Coach for Epsionyx, specializing in helping students transition from university to successful professional careers by transforming academic knowledge into industry-ready skills.

Current context: ${context || 'General career guidance'}

Your expertise:
- Bridge the gap between university education and professional requirements
- Help students identify how their academic knowledge translates to industry value
- Provide actionable advice on skill development and portfolio building
- Guide students in creating projects that demonstrate real-world application of their studies
- Offer insights on industry trends and what employers are looking for
- Help with interview preparation by connecting academic achievements to professional competencies
- Suggest practical steps to build industry-relevant experience
- Focus on transforming theoretical knowledge into demonstrable professional skills

Your goal: Help students become job-ready by showing them how to leverage their academic foundation for career success. Every piece of academic knowledge has professional value - help them discover and articulate it.
`
}

// VAPI Client Class
export class VAPIClient {
  private vapi: Vapi | null = null
  private isInitialized = false

  constructor() {
    if (typeof window !== 'undefined' && vapiConfig.publicKey) {
      try {
        this.vapi = new Vapi(vapiConfig.publicKey)
        this.isInitialized = true
        console.log('VAPI client initialized successfully')
      } catch (error) {
        console.error('Failed to initialize VAPI client:', error)
      }
    }
  }

  async startCall(assistantType: keyof typeof assistantConfigs, systemPrompt: string) {
    if (!this.vapi || !this.isInitialized) {
      throw new Error('VAPI not initialized - please check your API key')
    }

    console.log('Starting VAPI call with assistant type:', assistantType)
    console.log('System prompt:', systemPrompt.substring(0, 200) + '...')

    // Check microphone permissions first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log('Microphone access granted')
      // Stop the test stream
      stream.getTracks().forEach(track => track.stop())
    } catch (micError) {
      console.error('Microphone access denied or not available:', micError)
      throw new Error('Microphone access is required for voice chat. Please allow microphone access and try again.')
    }

    // ALWAYS use transient assistant with custom educational prompts
    // Don't use pre-configured assistant IDs since they have wrong content
    const config = assistantConfigs[assistantType]
    
    const assistant = {
      ...config,
      firstMessage: this.getFirstMessage(assistantType),
      model: {
        ...config.model,
        messages: [
          {
            role: "system" as const,
            content: systemPrompt
          }
        ]
      }
    }

    console.log('Using transient assistant with educational prompts:', {
      name: assistant.name,
      firstMessage: assistant.firstMessage,
      systemPrompt: systemPrompt.substring(0, 100) + '...'
    })

    try {
      await this.vapi.start(assistant)
      console.log('VAPI call started successfully with custom educational assistant')
      
      return true
    } catch (error) {
      console.error('Failed to start VAPI call:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      throw error
    }
  }

  private getFirstMessage(assistantType: keyof typeof assistantConfigs): string {
    switch (assistantType) {
      case 'interviewCoach':
        return "Welcome to Epsionyx! I'm your AI interview coach here to help you practice for job interviews. I'll ask you questions based on your academic content and help you prepare for real-world interviews. Are you ready to begin our mock interview session?"
      case 'studyBuddy':
        return "Hi there! I'm your AI study buddy from Epsionyx. I'm here to help transform your academic knowledge into practical, industry-ready skills. What concept or course material would you like to work on today?"
      case 'careerCoach':
        return "Hello! I'm your AI career coach from Epsionyx. I specialize in helping students bridge the gap between university theory and professional practice. What career goals or skills would you like to develop today?"
      default:
        return "Welcome to Epsionyx! I'm here to help transform your academic knowledge into industry-ready skills. How can I assist you today?"
    }
  }

  async endCall() {
    if (!this.vapi) {
      throw new Error('VAPI not initialized')
    }

    try {
      await this.vapi.stop()
      return true
    } catch (error) {
      console.error('Failed to end VAPI call:', error)
      throw error
    }
  }

  onCallStart(callback: () => void) {
    if (this.vapi) {
      this.vapi.on('call-start', callback)
    }
  }

  onCallEnd(callback: () => void) {
    if (this.vapi) {
      this.vapi.on('call-end', callback)
    }
  }

  onSpeechStart(callback: () => void) {
    if (this.vapi) {
      this.vapi.on('speech-start', callback)
    }
  }

  onSpeechEnd(callback: () => void) {
    if (this.vapi) {
      this.vapi.on('speech-end', callback)
    }
  }

  onMessage(callback: (message: any) => void) {
    if (this.vapi) {
      this.vapi.on('message', callback)
    }
  }

  onError(callback: (error: any) => void) {
    if (this.vapi) {
      this.vapi.on('error', callback)
    }
  }
}

// Singleton instance
export const vapiClient = new VAPIClient()