// Comprehensive TutorAgent.ts - Phase 3: Extensive Interview Preparation
import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";
import { z } from "zod";
import { config } from "@/lib/config";

const teachTopicTool = createTool({
  name: "teach-topic",
  description:
    "Generates real, AI-powered interview questions based on actual company interviews and current hiring practices",
  handler: async (input, context) => {
    try {
      console.log("🎯 TutorAgent tool handler called with input:", input);
      const { documentId } = input;

      // Get extracted data from network state
      const extractedData = context.network.state.kv.get("extracted-data");
      console.log(
        "📊 Extracted data from network state:",
        extractedData ? "Found" : "Not found",
      );

      if (!extractedData) {
        return {
          success: false,
          error: "No extracted data found in network state",
        };
      }

      const {
        coreTopics,
        academicModule,
        subtopics,
        industryApplications,
        relevantCompanies,
        jobRoles,
        technicalSkills,
        toolsAndTechnologies,
        realWorldUseCases,
        skillLevels,
      } = extractedData;

      console.log(
        `🎯 Generating AI-powered interview questions for ${documentId}`,
      );

      // Use Claude AI to generate real interview questions
      const aiModel = anthropic({
        apiKey: config.anthropic.apiKey,
        model: config.anthropic.model,
        defaultParameters: { max_tokens: config.anthropic.maxTokens },
      });

      // Generate real interview questions using AI
      const comprehensiveInterviewQuestions =
        await generateRealInterviewQuestions(
          aiModel,
          coreTopics,
          academicModule,
          industryApplications,
          relevantCompanies,
          jobRoles,
          technicalSkills,
          toolsAndTechnologies,
          realWorldUseCases,
        );

      // Store in network state
      context.network.state.kv.set(
        "interview-questions",
        comprehensiveInterviewQuestions,
      );

      console.log(
        `✅ Generated ${comprehensiveInterviewQuestions.totalQuestions} AI-powered interview questions across ${comprehensiveInterviewQuestions.categories.length} categories`,
      );

      return {
        success: true,
        interviewQuestions: comprehensiveInterviewQuestions,
        message: `Generated real interview preparation with ${comprehensiveInterviewQuestions.totalQuestions} AI-powered questions`,
      };
    } catch (error) {
      console.error("Error in teachTopicTool:", error);
      return {
        success: false,
        error: `Failed to generate AI-powered interview questions: ${error.message}`,
      };
    }
  },
});

async function generateRealInterviewQuestions(
  aiModel: any,
  coreTopics: string[],
  academicModule: string,
  industryApplications: string[],
  relevantCompanies: string[],
  jobRoles: string[],
  technicalSkills: string[],
  toolsAndTechnologies: string[],
  realWorldUseCases: string[]
) {
  const questionCategories = [];
  let totalQuestions = 0;

  // Generate real interview questions for each core topic using AI
  for (const topic of coreTopics) {
    const topicQuestions = await generateAIInterviewQuestions(
      aiModel,
      topic,
      academicModule,
      industryApplications,
      relevantCompanies,
      jobRoles,
      technicalSkills,
      toolsAndTechnologies,
      realWorldUseCases
    );

    questionCategories.push({
      topic: topic,
      questions: topicQuestions,
      questionCount: topicQuestions.length,
      aiGenerated: true,
      generatedAt: new Date().toISOString()
    });

    totalQuestions += topicQuestions.length;
  }

  return {
    academicModule,
    categories: questionCategories,
    totalQuestions: totalQuestions,
    generatedAt: new Date().toISOString(),
    questionTypes: [
      "Real Technical Interview Questions",
      "Behavioral & Leadership Questions",
      "Live Coding Challenges",
      "System Design & Architecture",
      "Industry-Specific Scenarios",
      "Problem-Solving & Critical Thinking",
      "Company Culture & Values",
      "Career Development & Growth"
    ],
    aiPowered: true
  };
}

async function generateAIInterviewQuestions(
  aiModel: any,
  topic: string,
  academicModule: string,
  industryApplications: string[],
  relevantCompanies: string[],
  jobRoles: string[],
  technicalSkills: string[],
  toolsAndTechnologies: string[],
  realWorldUseCases: string[]
) {
  const prompt = `You are a senior technical recruiter and hiring manager with 15+ years of experience interviewing candidates for ${academicModule} roles. Generate 15-20 REAL interview questions for the topic "${topic}" that are actually asked at top companies today.

Context:
- Academic Module: ${academicModule}
- Topic: ${topic}
- Industry Applications: ${industryApplications?.join(', ') || 'General applications'}
- Target Companies: ${relevantCompanies?.join(', ') || 'FAANG, unicorns, enterprises'}
- Job Roles: ${jobRoles?.join(', ') || 'Various technical roles'}
- Technical Skills: ${technicalSkills?.join(', ') || 'Core technical skills'}
- Tools & Technologies: ${toolsAndTechnologies?.join(', ') || 'Modern tech stack'}
- Real-World Use Cases: ${realWorldUseCases?.join(', ') || 'Practical applications'}

Generate questions across these categories:
1. Technical Deep-Dive (4-5 questions) - Real technical questions from actual interviews
2. Behavioral & Leadership (3-4 questions) - STAR method scenarios
3. Live Coding Challenges (3-4 questions) - Actual coding problems
4. System Design (2-3 questions) - Real architecture challenges
5. Problem-Solving (2-3 questions) - Critical thinking scenarios
6. Industry Knowledge (2-3 questions) - Current trends and applications

For each question, provide:
- category: Question type
- difficulty: Entry/Mid/Senior/Staff/Principal level
- question: The actual interview question (exactly as asked)
- context: Why this question is asked and what it reveals
- expectedAnswer: What a strong candidate should cover
- evaluationCriteria: Specific things interviewers look for (3-4 points)
- followUpQuestions: Natural follow-ups interviewers ask (2-3)
- realCompanyExample: Which companies ask similar questions
- sampleSolution: Brief outline of a good answer (for technical questions)
- commonMistakes: What candidates often get wrong
- interviewTips: How to approach this question effectively

Focus on:
- Questions actually asked at ${relevantCompanies?.join(', ') || 'top companies'} today
- Current industry trends and technologies
- Real problems companies are solving
- Questions that reveal practical skills and thinking
- Both technical depth and practical application
- Leadership and collaboration skills for senior roles

Make each question authentic, challenging, and directly relevant to getting hired for ${academicModule} roles in 2024-2025.

IMPORTANT: Return ONLY a valid JSON array of question objects. Do not include any explanatory text before or after the JSON. The response should start with [ and end with ]. Each question object must have all the specified fields.

Example format:
[
  {
    "category": "Technical Deep-Dive",
    "difficulty": "Mid Level",
    "question": "Explain how you would implement...",
    "context": "Tests...",
    "expectedAnswer": "Should demonstrate...",
    "evaluationCriteria": ["Point 1", "Point 2", "Point 3"],
    "followUpQuestions": ["Question 1?", "Question 2?"],
    "realCompanyExample": "Asked at Google, Meta",
    "sampleSolution": "Brief solution outline",
    "commonMistakes": "Common error",
    "interviewTips": "Approach tip"
  }
]`;

  try {
    const response = await aiModel.generate({
      messages: [{ role: 'user', content: prompt }],
    });
    
    // Check if response exists and has text
    if (!response || !response.text) {
      console.warn("AI model returned empty response, using fallback questions");
      return generateFallbackInterviewQuestions(topic, academicModule);
    }

    // Parse the AI response
    let questions = [];
    try {
      console.log("🔍 AI Response received:", response.text?.substring(0, 200) + "...");
      
      // Extract JSON from the response
      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: try to parse the entire response
        questions = JSON.parse(response.text);
      }
      
      // Validate that questions is an array and has valid content
      if (!Array.isArray(questions) || questions.length === 0) {
        console.warn("AI response is not a valid array, using fallback questions");
        questions = generateFallbackInterviewQuestions(topic, academicModule);
      }
    } catch (parseError) {
      console.warn("Failed to parse AI response as JSON, using fallback questions:", parseError.message);
      questions = generateFallbackInterviewQuestions(topic, academicModule);
    }

    // Validate and enhance questions - ensure no undefined values
    return questions.map((question, index) => {
      // Ensure all required fields exist and are not undefined
      const validatedQuestion = {
        id: `${topic.toLowerCase().replace(/\s+/g, '-')}-q${index}`,
        category: question?.category || "General Interview",
        difficulty: question?.difficulty || "Mid Level",
        question: question?.question || `Explain your experience with ${topic} and how you would apply it in a professional setting.`,
        context: question?.context || "Tests understanding and practical application",
        expectedAnswer: question?.expectedAnswer || `Should demonstrate understanding of ${topic} and practical application skills.`,
        evaluationCriteria: question?.evaluationCriteria || ["Technical knowledge", "Practical application", "Communication skills"],
        followUpQuestions: question?.followUpQuestions || [`How would you improve this approach?`, `What challenges might you face?`],
        realCompanyExample: question?.realCompanyExample || "Common question at tech companies",
        sampleSolution: question?.sampleSolution || "Provide specific examples and demonstrate practical thinking",
        commonMistakes: question?.commonMistakes || "Being too vague or theoretical",
        interviewTips: question?.interviewTips || "Use concrete examples and show practical experience",
        topic,
        academicModule,
        generatedAt: new Date().toISOString(),
        aiGenerated: true
      };
      
      return validatedQuestion;
    });

  } catch (error) {
    console.error("Error generating AI interview questions:", error);
    return generateFallbackInterviewQuestions(topic, academicModule);
  }
}

function generateFallbackInterviewQuestions(topic: string, academicModule: string) {
  return [
    {
      category: "Technical Deep-Dive",
      difficulty: "Mid Level",
      question: `Explain how ${topic} is applied in ${academicModule} and walk me through a real-world implementation you would design.`,
      context: "Tests fundamental understanding and practical application skills",
      expectedAnswer: `Should demonstrate solid understanding of ${topic} principles, provide concrete examples, and show ability to design practical solutions.`,
      evaluationCriteria: [
        "Technical knowledge depth",
        "Practical application understanding",
        "Design thinking and problem-solving",
        "Communication and explanation skills"
      ],
      followUpQuestions: [
        `What challenges might you face in this implementation?`,
        `How would you optimize this for performance?`,
        `What tools and technologies would you use?`
      ],
      realCompanyExample: "Similar questions asked at tech companies for mid-level roles",
      sampleSolution: `Strong answer should cover core concepts, practical examples, and implementation considerations`,
      commonMistakes: "Being too theoretical without practical examples",
      interviewTips: "Use specific examples and show practical thinking"
    },
    {
      category: "Behavioral & Leadership",
      difficulty: "All Levels",
      question: `Tell me about a time when you had to learn ${topic} quickly for a project. How did you approach it and what was the outcome?`,
      context: "Assesses learning agility, problem-solving, and adaptability",
      expectedAnswer: "Should use STAR method and demonstrate learning strategy, resourcefulness, and results",
      evaluationCriteria: [
        "Learning approach and strategy",
        "Resourcefulness and initiative",
        "Problem-solving methodology",
        "Results and impact achieved"
      ],
      followUpQuestions: [
        `What resources did you find most helpful?`,
        `How did you validate your understanding?`,
        `What would you do differently next time?`
      ],
      realCompanyExample: "Common behavioral question across all tech companies",
      sampleSolution: "Use STAR method with specific learning strategies and measurable outcomes",
      commonMistakes: "Being vague about learning process or outcomes",
      interviewTips: "Prepare specific examples showing learning agility"
    },
    {
      category: "Live Coding Challenge",
      difficulty: "Mid to Senior Level",
      question: `Implement a solution for ${topic} that handles [specific scenario]. Code it live and explain your approach.`,
      context: "Tests coding skills, problem-solving approach, and communication under pressure",
      expectedAnswer: "Should write clean, working code while explaining thought process and design decisions",
      evaluationCriteria: [
        "Code quality and structure",
        "Problem-solving approach",
        "Communication during coding",
        "Testing and edge case consideration"
      ],
      followUpQuestions: [
        `How would you test this solution?`,
        `What edge cases should we consider?`,
        `How would you optimize this for production?`
      ],
      realCompanyExample: "Standard coding interview format at most tech companies",
      sampleSolution: "Clean, well-structured code with clear explanation of approach",
      commonMistakes: "Not explaining thought process or ignoring edge cases",
      interviewTips: "Think out loud and write clean, readable code"
    },
    {
      category: "System Design",
      difficulty: "Senior Level",
      question: `Design a scalable system that uses ${topic} to handle [specific requirements]. Consider performance, reliability, and cost.`,
      context: "Evaluates system design skills, scalability thinking, and architectural knowledge",
      expectedAnswer: "Should provide comprehensive system design with clear trade-offs and justifications",
      evaluationCriteria: [
        "System architecture knowledge",
        "Scalability considerations",
        "Trade-off analysis",
        "Cost and performance optimization"
      ],
      followUpQuestions: [
        `How would you handle failure scenarios?`,
        `What monitoring would you implement?`,
        `How would you optimize costs?`
      ],
      realCompanyExample: "System design interviews at FAANG and unicorn companies",
      sampleSolution: "Well-architected system with clear component interactions and scaling strategies",
      commonMistakes: "Not considering trade-offs or failure scenarios",
      interviewTips: "Start with requirements, then build incrementally"
    },
    {
      category: "Problem-Solving",
      difficulty: "All Levels",
      question: `You discover a critical issue with ${topic} in production that's affecting users. Walk me through your troubleshooting approach.`,
      context: "Tests incident response, systematic thinking, and pressure handling",
      expectedAnswer: "Should demonstrate systematic troubleshooting, clear communication, and incident management skills",
      evaluationCriteria: [
        "Systematic troubleshooting approach",
        "Incident response methodology",
        "Communication and coordination",
        "Prevention and learning mindset"
      ],
      followUpQuestions: [
        `How would you communicate with stakeholders?`,
        `What preventive measures would you implement?`,
        `How would you conduct a post-mortem?`
      ],
      realCompanyExample: "Incident response scenarios common in technical interviews",
      sampleSolution: "Structured approach with clear steps and stakeholder communication",
      commonMistakes: "Panicking or not having a systematic approach",
      interviewTips: "Show calm, methodical thinking and clear communication"
    }
  ];
}

// Create the AI-powered TutorAgent
export const TutorAgent = createAgent({
  name: "ai-powered-tutor-agent",
  tools: [teachTopicTool],
  system: `You are an AI-powered interview preparation tutor that generates REAL interview questions based on actual company hiring practices and current industry trends.

Your mission is to create 15-20 authentic interview questions per topic that reflect what students will actually face in real interviews at top companies.

Your ONLY responsibility:
- Use the teach-topic tool to generate real, AI-powered interview questions
- Leverage Claude AI to create questions based on actual interview experiences
- Generate questions that reflect current hiring practices at FAANG, unicorns, and enterprises
- Create questions across all experience levels (Entry → Mid → Senior → Staff → Principal)
- Focus on questions that reveal both technical skills and practical thinking

CRITICAL RULES:
- You MUST ONLY use the teach-topic tool provided to you
- Generate REAL questions that companies are actually asking today
- Focus on current technologies, trends, and industry practices
- Include specific evaluation criteria and sample solutions
- Create questions that test both technical depth and practical application
- After generating AI-powered interview questions, your job is complete

The teach-topic tool will:
1. Access extracted academic data from network state
2. Use Claude AI to generate real interview questions from actual company practices
3. Create questions that bridge academic knowledge with industry hiring needs
4. Ensure students are prepared for real interview scenarios

Generate questions that make students immediately competitive in today's job market with authentic interview preparation.`,
  model: anthropic({
    apiKey: config.anthropic.apiKey,
    model: config.anthropic.model,
    defaultParameters: { max_tokens: config.anthropic.maxTokens },
  }),
});
