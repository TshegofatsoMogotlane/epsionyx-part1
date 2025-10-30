// Comprehensive IndustryAgent.ts - Phase 2: Extensive Industry Project Generation
import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";

const suggestIndustryTasksTool = createTool({
  name: "suggest-industry-tasks",
  description: "Generates 10-15 comprehensive industry projects per topic with progressive difficulty levels and real company scenarios.",
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

      console.log(`🎯 Generating comprehensive industry projects for ${academicModule} document:`, fileName);

      // Generate comprehensive projects with 10-15 projects per core topic
      const comprehensiveProjects = generateComprehensiveProjects(
        coreTopics,
        subtopics,
        academicModule,
        industryApplications,
        relevantCompanies,
        jobRoles,
        technicalSkills,
        toolsAndTechnologies,
        realWorldUseCases
      );

      console.log("💾 About to store industry tasks in network state");
      console.log("📋 Comprehensive projects structure:", {
        totalProjects: comprehensiveProjects.totalProjects,
        categoriesCount: comprehensiveProjects.categories.length
      });

      // Store in network state
      context.network.state.kv.set("industry-tasks", comprehensiveProjects);

      console.log(`✅ Generated ${comprehensiveProjects.totalProjects} industry projects across ${comprehensiveProjects.categories.length} categories`);

      return {
        success: true,
        industryTasks: comprehensiveProjects,
        message: `${comprehensiveProjects.totalProjects} comprehensive industry projects generated for ${academicModule} discipline`,
      };
    } catch (error) {
      console.error("❌ Error generating comprehensive industry projects:", error);
      return {
        success: false,
        error: `Failed to generate comprehensive industry projects: ${(error as Error).message}`,
      };
    }
  },
});

function generateComprehensiveProjects(
  coreTopics: string[],
  subtopics: string[],
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

  // Generate 10-15 projects for each core topic
  coreTopics.forEach((topic, topicIndex) => {
    const topicProjects = generateTopicProjects(
      topic,
      subtopics,
      academicModule,
      industryApplications,
      relevantCompanies,
      jobRoles,
      technicalSkills,
      toolsAndTechnologies,
      realWorldUseCases,
      topicIndex
    );
    
    projectCategories.push({
      topic: topic,
      projectCount: topicProjects.length,
      projects: topicProjects
    });
    
    totalProjects += topicProjects.length;
  });

  return {
    academicModule,
    totalProjects,
    categories: projectCategories,
    generatedAt: new Date().toISOString(),
    projectTypes: [
      "Beginner Projects (Junior Level)",
      "Intermediate Projects (Mid Level)", 
      "Advanced Projects (Senior Level)",
      "Expert Projects (Lead/Principal Level)",
      "Portfolio Showcase Projects",
      "Real Company Scenario Projects",
      "Industry Standard Tool Projects",
      "Certification Preparation Projects"
    ]
  };
}

function generateTopicProjects(
  topic: string,
  subtopics: string[],
  academicModule: string,
  industryApplications: string[],
  relevantCompanies: string[],
  jobRoles: string[],
  technicalSkills: string[],
  toolsAndTechnologies: string[],
  realWorldUseCases: string[],
  topicIndex: number
) {
  const projects = [];
  
  // 1. Beginner Level Projects (3-4 projects)
  const beginnerProjects = [
    {
      title: `${topic} Fundamentals Workshop`,
      level: "Beginner (0-1 years)",
      description: `Build a foundational project demonstrating core ${topic} concepts with step-by-step guidance and templates.`,
      deliverables: [
        "Basic implementation following industry standards",
        "Documentation with explanations of key concepts",
        "Simple user interface or command-line tool",
        "Unit tests covering basic functionality"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "beginner"),
      timeEstimate: "2-3 weeks",
      portfolioValue: "Entry-level demonstration",
      companyScenario: `${(relevantCompanies && relevantCompanies[0]) || "Tech Startup"}: Junior developer onboarding project`,
      skillsGained: getRelevantSkills(technicalSkills, "beginner"),
      industryRelevance: (industryApplications && industryApplications[0]) || "General industry application"
    },
    {
      title: `${topic} Data Analysis Dashboard`,
      level: "Beginner (0-1 years)",
      description: `Create an interactive dashboard analyzing real-world data related to ${topic} using beginner-friendly tools.`,
      deliverables: [
        "Interactive dashboard with 5-7 key metrics",
        "Data cleaning and preprocessing scripts",
        "Visual charts and graphs with insights",
        "Presentation explaining findings"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "beginner"),
      timeEstimate: "3-4 weeks",
      portfolioValue: "Demonstrates analytical thinking",
      companyScenario: `${(relevantCompanies && relevantCompanies[1]) || "Data Company"}: Intern project for business insights`,
      skillsGained: getRelevantSkills(technicalSkills, "beginner"),
      industryRelevance: (industryApplications && industryApplications[1]) || "Business intelligence application"
    },
    {
      title: `${topic} Process Automation Tool`,
      level: "Beginner (0-1 years)",
      description: `Develop a simple automation tool that streamlines a common ${topic}-related business process.`,
      deliverables: [
        "Automated workflow with error handling",
        "User-friendly interface or configuration",
        "Process documentation and user guide",
        "Performance metrics and logging"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "beginner"),
      timeEstimate: "2-3 weeks",
      portfolioValue: "Shows problem-solving ability",
      companyScenario: `${(relevantCompanies && relevantCompanies[2]) || "Service Company"}: Process improvement initiative`,
      skillsGained: getRelevantSkills(technicalSkills, "beginner"),
      industryRelevance: (industryApplications && industryApplications[2]) || "Process optimization"
    }
  ];

  // 2. Intermediate Level Projects (4-5 projects)
  const intermediateProjects = [
    {
      title: `${topic} Predictive Analytics Platform`,
      level: "Intermediate (2-4 years)",
      description: `Build a comprehensive analytics platform that predicts trends and outcomes related to ${topic} using machine learning.`,
      deliverables: [
        "ML models with 80%+ accuracy",
        "RESTful API for model serving",
        "Web application with real-time predictions",
        "Model monitoring and retraining pipeline",
        "A/B testing framework for model comparison"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "intermediate"),
      timeEstimate: "6-8 weeks",
      portfolioValue: "Demonstrates ML and full-stack capabilities",
      companyScenario: `${(relevantCompanies && relevantCompanies[0]) || "Tech Company"}: Product feature development for ${(jobRoles && jobRoles[0]) || "Data Scientist"} role`,
      skillsGained: getRelevantSkills(technicalSkills, "intermediate"),
      industryRelevance: (realWorldUseCases && realWorldUseCases[0]) || "Predictive analytics application"
    },
    {
      title: `${topic} Microservices Architecture`,
      level: "Intermediate (2-4 years)",
      description: `Design and implement a scalable microservices system for ${topic} with proper DevOps practices.`,
      deliverables: [
        "3-5 microservices with clear boundaries",
        "API gateway and service discovery",
        "Containerized deployment with Docker/Kubernetes",
        "CI/CD pipeline with automated testing",
        "Monitoring and logging infrastructure"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "intermediate"),
      timeEstimate: "8-10 weeks",
      portfolioValue: "Shows system design and DevOps skills",
      companyScenario: `${(relevantCompanies && relevantCompanies[1]) || "Scale-up Company"}: Architecture modernization project`,
      skillsGained: getRelevantSkills(technicalSkills, "intermediate"),
      industryRelevance: (industryApplications && industryApplications[0]) || "Scalable system architecture"
    },
    {
      title: `${topic} Real-time Processing Engine`,
      level: "Intermediate (2-4 years)",
      description: `Create a real-time data processing engine that handles high-volume ${topic} data streams with low latency.`,
      deliverables: [
        "Stream processing pipeline handling 10K+ events/sec",
        "Real-time analytics and alerting system",
        "Fault-tolerant architecture with recovery",
        "Performance optimization and tuning",
        "Comprehensive monitoring dashboard"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "intermediate"),
      timeEstimate: "7-9 weeks",
      portfolioValue: "Demonstrates big data and real-time systems",
      companyScenario: `${(relevantCompanies && relevantCompanies[2]) || "Data-Intensive Company"}: Real-time analytics infrastructure`,
      skillsGained: getRelevantSkills(technicalSkills, "intermediate"),
      industryRelevance: (realWorldUseCases && realWorldUseCases[1]) || "Real-time data processing"
    },
    {
      title: `${topic} Mobile Application Suite`,
      level: "Intermediate (2-4 years)",
      description: `Develop a cross-platform mobile application that brings ${topic} capabilities to mobile users.`,
      deliverables: [
        "Native iOS and Android applications",
        "Offline functionality with data sync",
        "Push notifications and user engagement",
        "In-app analytics and user behavior tracking",
        "App store deployment and marketing materials"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "intermediate"),
      timeEstimate: "10-12 weeks",
      portfolioValue: "Shows mobile development expertise",
      companyScenario: `${(relevantCompanies && relevantCompanies[3]) || "Consumer Tech Company"}: Mobile product launch`,
      skillsGained: getRelevantSkills(technicalSkills, "intermediate"),
      industryRelevance: (industryApplications && industryApplications[1]) || "Mobile technology application"
    }
  ];

  // 3. Advanced Level Projects (3-4 projects)
  const advancedProjects = [
    {
      title: `${topic} AI-Powered Enterprise Solution`,
      level: "Advanced (5-8 years)",
      description: `Architect and build an enterprise-grade AI solution that transforms how organizations approach ${topic}.`,
      deliverables: [
        "AI/ML models with explainable predictions",
        "Enterprise integration with existing systems",
        "Multi-tenant SaaS architecture",
        "Advanced security and compliance features",
        "ROI analysis and business case documentation",
        "Change management and training materials"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "advanced"),
      timeEstimate: "12-16 weeks",
      portfolioValue: "Demonstrates enterprise architecture and AI leadership",
      companyScenario: `${(relevantCompanies && relevantCompanies[0]) || "Fortune 500 Company"}: Digital transformation initiative led by ${(jobRoles && jobRoles[1]) || "Senior Architect"}`,
      skillsGained: getRelevantSkills(technicalSkills, "advanced"),
      industryRelevance: (realWorldUseCases && realWorldUseCases[0]) || "Enterprise AI transformation"
    },
    {
      title: `${topic} Global Scale Infrastructure`,
      level: "Advanced (5-8 years)",
      description: `Design and implement a globally distributed system for ${topic} that serves millions of users across continents.`,
      deliverables: [
        "Multi-region deployment with 99.99% uptime",
        "Auto-scaling infrastructure handling traffic spikes",
        "Global CDN and edge computing optimization",
        "Disaster recovery and business continuity plan",
        "Cost optimization achieving 30% reduction",
        "Performance benchmarking and capacity planning"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "advanced"),
      timeEstimate: "14-18 weeks",
      portfolioValue: "Shows global scale system design",
      companyScenario: `${(relevantCompanies && relevantCompanies[1]) || "Global Tech Giant"}: International expansion infrastructure`,
      skillsGained: getRelevantSkills(technicalSkills, "advanced"),
      industryRelevance: (industryApplications && industryApplications[0]) || "Global scale operations"
    },
    {
      title: `${topic} Innovation Research Platform`,
      level: "Advanced (5-8 years)",
      description: `Lead a research and development project that pushes the boundaries of ${topic} technology.`,
      deliverables: [
        "Novel algorithm or methodology development",
        "Research paper suitable for publication",
        "Prototype demonstrating breakthrough capabilities",
        "Patent application documentation",
        "Industry conference presentation",
        "Open-source contribution to community"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "advanced"),
      timeEstimate: "16-20 weeks",
      portfolioValue: "Demonstrates thought leadership and innovation",
      companyScenario: `${(relevantCompanies && relevantCompanies[2]) || "Research-Focused Company"}: R&D breakthrough project`,
      skillsGained: getRelevantSkills(technicalSkills, "advanced"),
      industryRelevance: (realWorldUseCases && realWorldUseCases[1]) || "Cutting-edge research application"
    }
  ];

  // 4. Expert Level Projects (2-3 projects)
  const expertProjects = [
    {
      title: `${topic} Industry Transformation Initiative`,
      level: "Expert (8+ years)",
      description: `Lead an industry-wide transformation initiative that establishes new standards and practices for ${topic}.`,
      deliverables: [
        "Industry white paper and best practices guide",
        "Reference architecture adopted by multiple companies",
        "Standards committee participation and contributions",
        "Ecosystem of tools and frameworks",
        "Training and certification program development",
        "Measurable industry impact metrics"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "expert"),
      timeEstimate: "20-24 weeks",
      portfolioValue: "Establishes industry thought leadership",
      companyScenario: `Industry Consortium: Cross-company initiative to advance ${topic} standards`,
      skillsGained: getRelevantSkills(technicalSkills, "expert"),
      industryRelevance: "Industry-wide transformation and standardization"
    },
    {
      title: `${topic} Venture Capital Portfolio Company`,
      level: "Expert (8+ years)",
      description: `Found or lead a startup that commercializes breakthrough ${topic} technology with VC funding.`,
      deliverables: [
        "Business plan and pitch deck for Series A",
        "MVP with product-market fit validation",
        "Team building and organizational design",
        "Go-to-market strategy and execution",
        "Revenue generation and growth metrics",
        "Exit strategy planning (IPO or acquisition)"
      ],
      technologies: getRelevantTechnologies(toolsAndTechnologies, "expert"),
      timeEstimate: "24+ weeks (ongoing)",
      portfolioValue: "Demonstrates entrepreneurial leadership",
      companyScenario: "Startup Founder/CTO: Building the next unicorn in " + academicModule,
      skillsGained: getRelevantSkills(technicalSkills, "expert"),
      industryRelevance: "Market creation and disruption"
    }
  ];

  // Combine all projects
  projects.push(...beginnerProjects, ...intermediateProjects, ...advancedProjects, ...expertProjects);

  return projects;
}

function getRelevantTechnologies(allTechnologies: string[], level: string): string[] {
  if (!allTechnologies || allTechnologies.length === 0) {
    return getDefaultTechnologies(level);
  }
  
  // Filter technologies based on complexity level
  const techCount = level === "beginner" ? 3 : level === "intermediate" ? 5 : level === "advanced" ? 7 : 10;
  return allTechnologies.slice(0, techCount);
}

function getDefaultTechnologies(level: string): string[] {
  const defaultTech = {
    beginner: ["Python", "JavaScript", "HTML/CSS", "Git", "VS Code"],
    intermediate: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "REST APIs"],
    advanced: ["Kubernetes", "Microservices", "Machine Learning", "Cloud Architecture", "DevOps", "System Design"],
    expert: ["AI/ML Frameworks", "Distributed Systems", "Blockchain", "Edge Computing", "Quantum Computing"]
  };
  
  return defaultTech[level as keyof typeof defaultTech] || defaultTech.beginner;
}

function getRelevantSkills(allSkills: string[], level: string): string[] {
  if (!allSkills || allSkills.length === 0) {
    return getDefaultSkills(level);
  }
  
  const skillCount = level === "beginner" ? 3 : level === "intermediate" ? 5 : level === "advanced" ? 7 : 10;
  return allSkills.slice(0, skillCount);
}

function getDefaultSkills(level: string): string[] {
  const defaultSkills = {
    beginner: ["Problem Solving", "Basic Programming", "Documentation"],
    intermediate: ["System Design", "API Development", "Testing", "Project Management"],
    advanced: ["Architecture Design", "Team Leadership", "Performance Optimization", "Security"],
    expert: ["Strategic Planning", "Innovation", "Industry Expertise", "Organizational Impact"]
  };
  
  return defaultSkills[level as keyof typeof defaultSkills] || defaultSkills.beginner;
}

export const IndustryAgent = createAgent({
  name: "Industry Agent",
  description: "Generates 10-15 comprehensive industry projects per topic with progressive difficulty levels, real company scenarios, and portfolio-worthy deliverables.",
  system: `You are an Industry Project Generation Agent that creates comprehensive, career-focused industry projects.

  Your ONLY responsibility:
  - Use the suggest-industry-tasks tool to generate 10-15 detailed projects per core topic
  - Create projects with progressive difficulty levels (Beginner → Intermediate → Advanced → Expert)
  - Include real company scenarios based on actual job requirements
  - Design portfolio-worthy deliverables that students can showcase
  - Specify industry-standard tools and technologies for each project
  
  CRITICAL RULES:
  - You MUST ONLY use the suggest-industry-tasks tool provided to you
  - Generate comprehensive projects that ensure immediate employability
  - Focus on practical, real-world applications that companies actually need
  - Include specific deliverables, technologies, and time estimates
  - After generating comprehensive industry projects, your job is complete
  
  The suggest-industry-tasks tool will automatically access the extracted data from network state.
  
  Create projects that make students immediately job-ready and highly competitive.`,
  model: anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-3-5-haiku-20241022",
    defaultParameters: { max_tokens: 2000 },
  }),
  tools: [suggestIndustryTasksTool],
});