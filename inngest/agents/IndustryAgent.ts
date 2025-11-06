// Enhanced IndustryAgent.ts - Real Industry Tasks with AI Generation
import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";
import { config } from "@/lib/config";

const suggestIndustryTasksTool = createTool({
  name: "suggest-industry-tasks",
  description: "Generates real, dynamic industry projects using AI based on current market demands and actual company requirements.",
  handler: async (input, context) => {
    try {
      console.log("🏭 IndustryAgent tool handler called with input:", input);
      
      // Get extracted data from network state
      const state = context.network.state.kv;
      const extractedData = state.get("extracted-data");

      console.log("📊 Extracted data from network state:", extractedData ? "Found" : "Not found");

      if (!extractedData) {
        console.log("❌ No extracted data found in network state");
        return {
          success: false,
          error: "No extracted data found in network state",
        };
      }

      const { 
        coreTopics, 
        academicModule, 
        fileName, 
        subtopics, 
        industryApplications, 
        relevantCompanies, 
        jobRoles,
        technicalSkills,
        toolsAndTechnologies,
        realWorldUseCases
      } = extractedData;

      console.log(`🎯 Generating AI-powered industry projects for ${academicModule} document:`, fileName);

      // Use Claude AI to generate real industry tasks
      const aiModel = anthropic({
        apiKey: config.anthropic.apiKey,
        model: config.anthropic.model,
        defaultParameters: { max_tokens: config.anthropic.maxTokens },
      });

      const comprehensiveProjects = await generateRealIndustryProjects(
        aiModel,
        coreTopics,
        academicModule,
        industryApplications,
        relevantCompanies,
        jobRoles,
        technicalSkills,
        toolsAndTechnologies,
        realWorldUseCases
      );

      console.log("💾 About to store industry tasks in network state");
      console.log("📋 AI-generated projects structure:", {
        totalProjects: comprehensiveProjects.totalProjects,
        categoriesCount: comprehensiveProjects.categories.length
      });

      // Store in network state
      context.network.state.kv.set("industry-tasks", comprehensiveProjects);

      console.log(`✅ Generated ${comprehensiveProjects.totalProjects} AI-powered industry projects across ${comprehensiveProjects.categories.length} categories`);

      return {
        success: true,
        industryTasks: comprehensiveProjects,
        message: `${comprehensiveProjects.totalProjects} real industry projects generated using AI for ${academicModule} discipline`,
      };
    } catch (error) {
      console.error("❌ Error generating AI-powered industry projects:", error);
      return {
        success: false,
        error: `Failed to generate AI-powered industry projects: ${(error as Error).message}`,
      };
    }
  },
});

async function generateRealIndustryProjects(
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
  const projectCategories = [];
  let totalProjects = 0;

  // Generate real industry projects for each core topic using AI
  for (const topic of coreTopics) {
    const topicProjects = await generateAITopicProjects(
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
    
    projectCategories.push({
      topic: topic,
      projectCount: topicProjects.length,
      projects: topicProjects
    });
    
    totalProjects += topicProjects.length;
  }

  return {
    academicModule,
    totalProjects,
    categories: projectCategories,
    generatedAt: new Date().toISOString(),
    projectTypes: [
      "Entry-Level Industry Projects",
      "Mid-Level Professional Projects", 
      "Senior-Level Leadership Projects",
      "Principal/Staff Level Projects",
      "Real Company Case Studies",
      "Startup MVP Projects",
      "Enterprise Architecture Projects",
      "Innovation & Research Projects"
    ]
  };
}

async function generateAITopicProjects(
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
  const prompt = `You are an industry expert and career advisor specializing in ${academicModule}. Generate 8-12 REAL, current industry projects for the topic "${topic}" that students can build to become immediately employable.

Context:
- Academic Module: ${academicModule}
- Topic: ${topic}
- Industry Applications: ${industryApplications?.join(', ') || 'General applications'}
- Relevant Companies: ${relevantCompanies?.join(', ') || 'Tech companies'}
- Job Roles: ${jobRoles?.join(', ') || 'Various roles'}
- Technical Skills: ${technicalSkills?.join(', ') || 'Core skills'}
- Tools & Technologies: ${toolsAndTechnologies?.join(', ') || 'Modern tools'}
- Real-World Use Cases: ${realWorldUseCases?.join(', ') || 'Practical applications'}

Generate projects across 4 experience levels:
1. Entry Level (0-2 years) - 3 projects
2. Mid Level (2-5 years) - 3 projects  
3. Senior Level (5-8 years) - 3 projects
4. Principal/Staff Level (8+ years) - 2-3 projects

For each project, provide:
- title: Specific, actionable project name
- level: Experience level required
- description: What the project accomplishes and why it matters
- realWorldContext: Actual company scenario or market need this addresses
- deliverables: Specific, measurable outcomes (3-5 items)
- technologies: Current, in-demand tech stack
- timeEstimate: Realistic timeline
- portfolioValue: How this helps in job interviews
- skillsGained: Specific skills employers want
- industryRelevance: Why this matters in today's market
- implementationSteps: 3-4 key phases of development
- successMetrics: How to measure project success

Focus on:
- Current market demands and trending technologies
- Real problems companies are solving today
- Projects that demonstrate employable skills
- Specific, actionable deliverables
- Technologies actually used in industry
- Problems that showcase problem-solving ability

Make each project unique, valuable, and directly applicable to getting hired in ${academicModule} roles.

Return as a JSON array of project objects.`;

  try {
    const response = await aiModel.generate({
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse the AI response
    let projects = [];
    try {
      // Extract JSON from the response
      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        projects = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: try to parse the entire response
        projects = JSON.parse(response.text);
      }
    } catch (parseError) {
      console.warn("Failed to parse AI response as JSON, using fallback projects");
      projects = generateFallbackProjects(topic, academicModule);
    }

    // Validate and enhance projects
    return projects.map((project, index) => ({
      id: `${topic.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      ...project,
      topic,
      academicModule,
      generatedAt: new Date().toISOString(),
      aiGenerated: true
    }));

  } catch (error) {
    console.error("Error generating AI projects:", error);
    return generateFallbackProjects(topic, academicModule);
  }
}

function generateFallbackProjects(topic: string, academicModule: string) {
  return [
    {
      title: `${topic} Industry Analysis & Implementation`,
      level: "Entry Level (0-2 years)",
      description: `Research and implement current industry applications of ${topic} with practical examples`,
      realWorldContext: `Entry-level position requiring understanding of ${topic} in ${academicModule}`,
      deliverables: [
        "Industry research report with current trends",
        "Working implementation demonstrating core concepts",
        "Documentation with best practices",
        "Presentation to technical team"
      ],
      technologies: ["Python/JavaScript", "Git", "Documentation tools", "Basic frameworks"],
      timeEstimate: "3-4 weeks",
      portfolioValue: "Demonstrates research skills and practical implementation",
      skillsGained: ["Industry research", "Technical implementation", "Documentation", "Presentation skills"],
      industryRelevance: `Essential foundation for ${academicModule} roles`,
      implementationSteps: [
        "Research current industry applications",
        "Design and implement solution",
        "Document and test implementation",
        "Present findings and demo"
      ],
      successMetrics: ["Comprehensive research coverage", "Working implementation", "Clear documentation", "Effective presentation"]
    },
    {
      title: `${topic} Professional Development Project`,
      level: "Mid Level (2-5 years)",
      description: `Build a production-ready solution addressing real industry challenges in ${topic}`,
      realWorldContext: `Mid-level role requiring practical problem-solving in ${academicModule}`,
      deliverables: [
        "Production-ready application",
        "Automated testing suite",
        "Performance optimization report",
        "Deployment and monitoring setup"
      ],
      technologies: ["Modern frameworks", "Cloud platforms", "CI/CD tools", "Monitoring systems"],
      timeEstimate: "6-8 weeks",
      portfolioValue: "Shows ability to deliver production-quality solutions",
      skillsGained: ["Full-stack development", "DevOps practices", "Performance optimization", "Production deployment"],
      industryRelevance: `Directly applicable to ${academicModule} professional roles`,
      implementationSteps: [
        "Requirements analysis and design",
        "Development with testing",
        "Performance optimization",
        "Production deployment"
      ],
      successMetrics: ["Production deployment", "Test coverage >80%", "Performance benchmarks", "Monitoring setup"]
    },
    {
      title: `${topic} Leadership & Architecture Project`,
      level: "Senior Level (5-8 years)",
      description: `Lead a complex ${topic} initiative demonstrating architecture and team leadership skills`,
      realWorldContext: `Senior role requiring technical leadership in ${academicModule} projects`,
      deliverables: [
        "System architecture documentation",
        "Team coordination and mentoring plan",
        "Scalable solution implementation",
        "Knowledge transfer materials"
      ],
      technologies: ["Enterprise frameworks", "Architecture patterns", "Team collaboration tools", "Advanced platforms"],
      timeEstimate: "10-12 weeks",
      portfolioValue: "Demonstrates leadership and architectural thinking",
      skillsGained: ["System architecture", "Team leadership", "Strategic planning", "Knowledge transfer"],
      industryRelevance: `Essential for senior ${academicModule} positions`,
      implementationSteps: [
        "Architecture design and planning",
        "Team coordination and development",
        "Implementation and optimization",
        "Documentation and knowledge transfer"
      ],
      successMetrics: ["Scalable architecture", "Team productivity", "Solution performance", "Knowledge documentation"]
    }
  ];
}

export const IndustryAgent = createAgent({
  name: "Industry Agent",
  description: "Generates real, AI-powered industry projects based on current market demands and actual company requirements.",
  system: `You are an AI-powered Industry Project Generation Agent that creates real, current industry projects to make students immediately employable.

  Your ONLY responsibility:
  - Use the suggest-industry-tasks tool to generate 8-12 real industry projects per core topic
  - Leverage Claude AI to create projects based on current market demands
  - Generate projects that reflect actual company needs and hiring requirements
  - Create portfolio-worthy deliverables that demonstrate employable skills
  - Focus on trending technologies and in-demand skills
  
  CRITICAL RULES:
  - You MUST ONLY use the suggest-industry-tasks tool provided to you
  - Generate REAL projects that companies are actually working on today
  - Focus on current market trends and emerging technologies
  - Include specific, measurable deliverables that showcase skills
  - Create projects across experience levels (Entry → Mid → Senior → Principal)
  - After generating AI-powered industry projects, your job is complete
  
  The suggest-industry-tasks tool will:
  1. Access extracted academic data from network state
  2. Use Claude AI to generate real, current industry projects
  3. Create projects that bridge university knowledge with industry needs
  4. Ensure students are competitive in today's job market
  
  Generate projects that make students immediately hireable with real-world, applicable skills.`,
  model: anthropic({
    apiKey: config.anthropic.apiKey,
    model: config.anthropic.model,
    defaultParameters: { max_tokens: config.anthropic.maxTokens },
  }),
  tools: [suggestIndustryTasksTool],
});