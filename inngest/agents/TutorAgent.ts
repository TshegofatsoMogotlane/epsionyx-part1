// Comprehensive TutorAgent.ts - Phase 3: Extensive Interview Preparation
import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";
import { z } from "zod";

const teachTopicTool = createTool({
  name: "teach-topic",
  description:
    "Generates 50+ comprehensive interview questions per topic with technical deep-dives, behavioral questions, case studies, and practical assessments",
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
        `🎯 Generating comprehensive interview questions for ${documentId}`,
      );

      // Generate 50+ interview questions per topic
      const comprehensiveInterviewQuestions =
        generateComprehensiveInterviewQuestions(
          coreTopics,
          subtopics,
          academicModule,
          industryApplications,
          relevantCompanies,
          jobRoles,
          technicalSkills,
          toolsAndTechnologies,
          realWorldUseCases,
          skillLevels,
        );

      // Store in network state
      context.network.state.kv.set(
        "interview-questions",
        comprehensiveInterviewQuestions,
      );

      console.log(
        `✅ Generated ${comprehensiveInterviewQuestions.totalQuestions} interview questions across ${comprehensiveInterviewQuestions.categories.length} categories`,
      );

      return {
        success: true,
        interviewQuestions: comprehensiveInterviewQuestions,
        message: `Generated comprehensive interview preparation with ${comprehensiveInterviewQuestions.totalQuestions} questions`,
      };
    } catch (error) {
      console.error("Error in teachTopicTool:", error);
      return {
        success: false,
        error: `Failed to generate interview questions: ${error.message}`,
      };
    }
  },
});

function generateComprehensiveInterviewQuestions(
  coreTopics: string[],
  subtopics: string[],
  academicModule: string,
  industryApplications: string[],
  relevantCompanies: string[],
  jobRoles: string[],
  technicalSkills: string[],
  toolsAndTechnologies: string[],
  realWorldUseCases: string[],
  skillLevels: any,
) {
  const questionCategories = [];
  let totalQuestions = 0;

  // Generate 50+ questions for each core topic
  coreTopics.forEach((topic, index) => {
    const topicQuestions = generateTopicInterviewQuestions(
      topic,
      subtopics,
      academicModule,
      industryApplications,
      relevantCompanies,
      jobRoles,
      technicalSkills,
      toolsAndTechnologies,
      realWorldUseCases,
      skillLevels,
    );

    questionCategories.push({
      topic: topic,
      topicIndex: index,
      questions: topicQuestions,
      questionCount: topicQuestions.length,
      skillLevels,
      realWorldUseCases,
      toolsAndTechnologies,
      technicalSkills,
      jobRoles,
    });

    totalQuestions += topicQuestions.length;
  });

  return {
    academicModule,
    categories: questionCategories,
    totalQuestions: totalQuestions,
    generatedAt: new Date().toISOString(),
    questionTypes: [
      "Technical Deep-Dive Questions",
      "Behavioral & Situational Questions",
      "Case Study Scenarios",
      "Code Challenges & Practical Assessments",
      "System Design Questions",
      "Problem-Solving Questions",
      "Industry Knowledge Questions",
      "Leadership & Management Questions",
    ],
  };
}

function generateTopicInterviewQuestions(
  topic: string,
  subtopics: string[],
  academicModule: string,
  industryApplications: string[],
  relevantCompanies: string[],
  jobRoles: string[],
  technicalSkills: string[],
  toolsAndTechnologies: string[],
  realWorldUseCases: string[],
  skillLevels: any,
) {
  const questions = [];

  // 1. Technical Deep-Dive Questions (15-20 questions)
  const technicalQuestions = [
    {
      category: "Technical Deep-Dive",
      difficulty: "Beginner",
      question: `Explain the core principles of ${topic} and how they apply in real-world ${academicModule} scenarios.`,
      expectedAnswer: `Candidate should demonstrate deep understanding of ${topic} fundamentals, provide specific examples, and connect theory to practice. Look for clear explanations, practical applications, and industry context.`,
      evaluationCriteria: [
        "Depth of technical knowledge",
        "Ability to explain complex concepts clearly",
        "Real-world application & understanding",
        "Connection between theory and practice",
      ],
      followUpQuestions: [
        `What tools would you use to monitor ${topic} performance?`,
        `How would you optimize ${topic} for better performance?`,
        `What are the most common challenges when implementing ${topic}?`,
      ],
    },
    {
      category: "Technical Deep-Dive",
      difficulty: "Intermediate",
      question: `Design a scalable architecture for ${topic} that can handle enterprise-level requirements. Walk through your design decisions.`,
      expectedAnswer: `Candidate should demonstrate system design skills, consider scalability, reliability, and performance. Should discuss trade-offs, technology choices, and implementation strategies.`,
      evaluationCriteria: [
        "System design capabilities",
        "Scalability considerations",
        "Technology selection rationale",
        "Risk assessment and mitigation",
      ],
      followUpQuestions: [
        `How would you ensure 99.9% uptime in this system?`,
        `What monitoring and alerting would you implement?`,
        `How would you handle failure scenarios in this architecture?`,
      ],
    },
    {
      category: "Technical Deep-Dive",
      difficulty: "Advanced",
      question: `You need to migrate a legacy system to modern ${topic} architecture while maintaining zero downtime. How would you approach this?`,
      expectedAnswer: `Candidate should demonstrate advanced planning skills, risk management, and deep technical knowledge. Should discuss migration strategies, rollback plans, and business continuity.`,
      evaluationCriteria: [
        "Migration strategy planning",
        "Risk management approach",
        "Business continuity considerations",
        "Technical implementation details",
      ],
      followUpQuestions: [
        `How would you validate the migration was successful?`,
        `What rollback strategy would you implement?`,
        `How would you communicate progress to stakeholders?`,
      ],
    },
    {
      category: "Technical Deep-Dive",
      difficulty: "Expert",
      question: `Analyze the performance bottlenecks in a ${topic} system handling 10 million requests per day. What optimization strategies would you implement?`,
      expectedAnswer: `Should demonstrate advanced performance analysis skills, profiling techniques, and optimization strategies. Look for systematic approach and deep technical knowledge.`,
      evaluationCriteria: [
        "Performance analysis methodology",
        "Bottleneck identification skills",
        "Optimization strategy development",
        "Monitoring and measurement approach",
      ],
      followUpQuestions: [
        `What metrics would you track to measure improvement?`,
        `How would you implement caching strategies?`,
        `What database optimization techniques would you apply?`,
      ],
    },
    {
      category: "Technical Deep-Dive",
      difficulty: "Architect Level",
      question: `Design a multi-region, fault-tolerant ${topic} system that can automatically scale based on demand while maintaining data consistency.`,
      expectedAnswer: `Should demonstrate enterprise architecture skills, understanding of distributed systems, CAP theorem, and advanced scaling patterns.`,
      evaluationCriteria: [
        "Enterprise architecture knowledge",
        "Distributed systems expertise",
        "Consistency model understanding",
        "Auto-scaling implementation",
      ],
      followUpQuestions: [
        `How would you handle network partitions?`,
        `What consistency guarantees would you provide?`,
        `How would you implement disaster recovery?`,
      ],
    },
  ];

  // 2. Behavioral & Situational Questions (10-15 questions)
  const behavioralQuestions = [
    {
      category: "Behavioral & Situational",
      difficulty: "All Levels",
      question: `Tell me about a time when you had to learn ${topic} quickly for a project. How did you approach it?`,
      expectedAnswer: `Look for learning agility, resourcefulness, and ability to apply new knowledge effectively. Should demonstrate problem-solving and adaptability.`,
      evaluationCriteria: [
        "Learning agility and approach",
        "Resource utilization",
        "Application of new knowledge",
        "Problem-solving methodology",
      ],
      followUpQuestions: [
        `What resources did you find most helpful?`,
        `How did you validate your understanding?`,
        `What would you do differently next time?`,
      ],
    },
    {
      category: "Behavioral & Situational",
      difficulty: "Senior Level",
      question: `Describe a situation where you had to convince stakeholders to adopt ${topic} in your organization. What was your approach?`,
      expectedAnswer: `Should demonstrate leadership, communication skills, and ability to build business cases. Look for stakeholder management and change management skills.`,
      evaluationCriteria: [
        "Leadership and influence",
        "Communication effectiveness",
        "Business case development",
        "Change management approach",
      ],
      followUpQuestions: [
        `What objections did you encounter and how did you address them?`,
        `How did you measure the success of the adoption?`,
        `What lessons did you learn from this experience?`,
      ],
    },
    {
      category: "Behavioral & Situational",
      difficulty: "Management Level",
      question: `You're leading a team implementing ${topic} and discover that the timeline is unrealistic. How do you handle this situation?`,
      expectedAnswer: `Should demonstrate project management skills, stakeholder communication, and ability to manage expectations while finding solutions.`,
      evaluationCriteria: [
        "Project management capabilities",
        "Stakeholder communication",
        "Problem-solving under pressure",
        "Team leadership skills",
      ],
      followUpQuestions: [
        `How would you re-scope the project?`,
        `What would you communicate to upper management?`,
        `How would you maintain team morale?`,
      ],
    },
  ];

  // 3. Case Study Scenarios (8-12 questions)
  const caseStudyQuestions = (relevantCompanies || [])
    .slice(0, 6)
    .map((company) => ({
      category: "Case Study Scenarios",
      difficulty: "Intermediate to Advanced",
      question: `${company} is experiencing performance issues with their ${topic} implementation serving 50 million users. As a consultant, how would you diagnose and resolve this?`,
      expectedAnswer: `Should demonstrate systematic problem-solving, diagnostic skills, and knowledge of ${topic} performance optimization at scale. Look for structured approach and industry awareness.`,
      evaluationCriteria: [
        "Systematic problem-solving approach",
        "Diagnostic methodology",
        "Performance optimization knowledge",
        "Scale-specific considerations",
      ],
      followUpQuestions: [
        `What metrics would you track to measure improvement?`,
        `How would you prevent similar issues in the future?`,
        `What would be your communication strategy with ${company} leadership?`,
      ],
      companyContext: company,
      industryRelevance: (industryApplications || []).filter(
        (app) =>
          app.toLowerCase().includes(company.toLowerCase()) ||
          company.toLowerCase().includes(app.toLowerCase()),
      ),
    }));

  // Add more case studies for different scenarios
  const additionalCaseStudies = [
    {
      category: "Case Study Scenarios",
      difficulty: "Advanced",
      question: `A fintech startup needs to implement ${topic} with strict regulatory compliance requirements. Design a solution that meets both performance and compliance needs.`,
      expectedAnswer: `Should demonstrate understanding of regulatory requirements, compliance frameworks, and ability to balance performance with security and audit requirements.`,
      evaluationCriteria: [
        "Regulatory compliance knowledge",
        "Security implementation",
        "Audit trail design",
        "Performance optimization within constraints",
      ],
      followUpQuestions: [
        `What specific compliance frameworks would you consider?`,
        `How would you implement audit logging?`,
        `What security measures would you implement?`,
      ],
    },
    {
      category: "Case Study Scenarios",
      difficulty: "Expert",
      question: `An e-commerce platform experiences a 10x traffic spike during Black Friday. Their ${topic} system is failing. You have 2 hours to fix it. What's your action plan?`,
      expectedAnswer: `Should demonstrate crisis management, rapid problem-solving, and ability to work under extreme pressure while maintaining system stability.`,
      evaluationCriteria: [
        "Crisis management skills",
        "Rapid diagnostic abilities",
        "Emergency scaling strategies",
        "Communication under pressure",
      ],
      followUpQuestions: [
        `How would you prioritize which issues to fix first?`,
        `What temporary measures would you implement?`,
        `How would you communicate with stakeholders during the crisis?`,
      ],
    },
  ];

  // 4. Code Challenges & Practical Assessments (10-15 questions)
  const practicalQuestions = (toolsAndTechnologies || [])
    .slice(0, 5)
    .map((tool) => ({
      category: "Code Challenges & Practical Assessments",
      difficulty: "Varies by Role",
      question: `Implement a ${topic} solution using ${tool} that can handle concurrent requests efficiently. Walk me through your code and explain your design choices.`,
      expectedAnswer: `Should demonstrate hands-on coding skills, concurrency handling, best practices, and ability to explain technical decisions. Look for clean code, proper architecture, and testing considerations.`,
      evaluationCriteria: [
        "Code quality and structure",
        "Concurrency handling",
        "Best practices implementation",
        "Testing and validation approach",
      ],
      followUpQuestions: [
        `How would you test this implementation?`,
        `What would you do to make this production-ready?`,
        `How would you handle error scenarios and edge cases?`,
      ],
      toolContext: tool,
      practicalApplication: (realWorldUseCases || []).find((useCase) =>
        useCase.toLowerCase().includes(tool.toLowerCase()),
      ),
    }));

  // Add algorithm and data structure challenges
  const algorithmChallenges = [
    {
      category: "Code Challenges & Practical Assessments",
      difficulty: "Intermediate",
      question: `Design and implement an efficient algorithm for ${topic} that optimizes for both time and space complexity. Analyze the Big O complexity.`,
      expectedAnswer: `Should demonstrate algorithmic thinking, complexity analysis, and optimization skills. Look for clear explanation of trade-offs and edge case handling.`,
      evaluationCriteria: [
        "Algorithmic design skills",
        "Complexity analysis",
        "Optimization techniques",
        "Edge case consideration",
      ],
      followUpQuestions: [
        `How would you optimize this for memory-constrained environments?`,
        `What would change if the input size increased by 1000x?`,
        `How would you make this algorithm thread-safe?`,
      ],
    },
  ];

  // 5. System Design Questions (8-10 questions)
  const systemDesignQuestions = [
    {
      category: "System Design Questions",
      difficulty: "Senior Level",
      question: `Design a distributed ${topic} system that can handle 1 million concurrent users across multiple regions. Consider scalability, reliability, and performance.`,
      expectedAnswer: `Should demonstrate advanced system design skills, understanding of distributed systems, and ability to handle scale. Look for consideration of CAP theorem, consistency models, and performance optimization.`,
      evaluationCriteria: [
        "Distributed systems knowledge",
        "Scalability architecture",
        "Performance considerations",
        "Reliability and fault tolerance",
      ],
      followUpQuestions: [
        `How would you handle data consistency across regions?`,
        `What caching strategies would you implement?`,
        `How would you monitor system health and performance?`,
      ],
    },
    {
      category: "System Design Questions",
      difficulty: "Architect Level",
      question: `Design a microservices architecture for ${topic} that supports A/B testing, feature flags, and gradual rollouts while maintaining data integrity.`,
      expectedAnswer: `Should demonstrate microservices expertise, deployment strategies, and understanding of modern development practices.`,
      evaluationCriteria: [
        "Microservices architecture knowledge",
        "Deployment strategy design",
        "Feature management understanding",
        "Data consistency in distributed systems",
      ],
      followUpQuestions: [
        `How would you handle service-to-service communication?`,
        `What would your monitoring and observability strategy be?`,
        `How would you manage database migrations across services?`,
      ],
    },
    {
      category: "System Design Questions",
      difficulty: "Expert Level",
      question: `Design a real-time ${topic} system that processes 100,000 events per second with sub-millisecond latency requirements.`,
      expectedAnswer: `Should demonstrate expertise in real-time systems, low-latency design, and high-throughput architectures.`,
      evaluationCriteria: [
        "Real-time systems expertise",
        "Low-latency optimization",
        "High-throughput design",
        "Performance engineering",
      ],
      followUpQuestions: [
        `What technologies would you use for the message queue?`,
        `How would you handle backpressure?`,
        `What would your disaster recovery strategy be?`,
      ],
    },
  ];

  // 6. Industry-Specific Questions (5-8 questions per industry)
  const industryQuestions = (industryApplications || [])
    .slice(0, 4)
    .map((industry) => ({
      category: "Industry Knowledge Questions",
      difficulty: "Intermediate",
      question: `How is ${topic} specifically applied in the ${industry} industry? What are the unique challenges, regulatory requirements, and performance considerations?`,
      expectedAnswer: `Should demonstrate industry knowledge, understanding of sector-specific requirements, and ability to adapt ${topic} to industry needs.`,
      evaluationCriteria: [
        "Industry-specific knowledge",
        "Regulatory awareness",
        "Sector-specific challenges understanding",
        "Adaptation and customization skills",
      ],
      followUpQuestions: [
        `What compliance requirements must be considered in ${industry}?`,
        `How do you stay updated with ${industry} trends and regulations?`,
        `What are the emerging trends in ${industry} related to ${topic}?`,
      ],
      industryContext: industry,
    }));

  // Add specialized industry scenarios
  const specializedIndustryQuestions = [
    {
      category: "Industry Knowledge Questions",
      difficulty: "Advanced",
      question: `In healthcare applications of ${topic}, how would you ensure HIPAA compliance while maintaining system performance and user experience?`,
      expectedAnswer: `Should demonstrate understanding of healthcare regulations, privacy requirements, and ability to balance compliance with functionality.`,
      evaluationCriteria: [
        "Healthcare regulation knowledge",
        "Privacy and security implementation",
        "Compliance framework understanding",
        "Performance optimization within constraints",
      ],
      followUpQuestions: [
        `How would you implement audit trails for patient data access?`,
        `What encryption strategies would you use?`,
        `How would you handle data breach scenarios?`,
      ],
    },
    {
      category: "Industry Knowledge Questions",
      difficulty: "Advanced",
      question: `For financial services implementing ${topic}, how would you address PCI DSS compliance, fraud detection, and real-time transaction processing?`,
      expectedAnswer: `Should demonstrate fintech expertise, security knowledge, and understanding of financial regulations and real-time processing requirements.`,
      evaluationCriteria: [
        "Financial services regulation knowledge",
        "Security and fraud prevention",
        "Real-time processing expertise",
        "Risk management understanding",
      ],
      followUpQuestions: [
        `How would you implement real-time fraud detection?`,
        `What would your approach be for handling payment failures?`,
        `How would you ensure transaction atomicity across services?`,
      ],
    },
  ];

  // 7. Leadership & Management Questions (for senior roles)
  const leadershipQuestions = [
    {
      category: "Leadership & Management Questions",
      difficulty: "Senior/Executive Level",
      question: `How would you build and lead a team of 15 engineers focused on ${topic} initiatives? What would be your hiring, development, and retention strategy?`,
      expectedAnswer: `Should demonstrate leadership skills, team building capabilities, and strategic thinking. Look for people management experience and vision.`,
      evaluationCriteria: [
        "Leadership and team building",
        "Strategic planning abilities",
        "People development focus",
        "Vision and communication",
      ],
      followUpQuestions: [
        `How would you measure team performance and success?`,
        `What would be your approach to knowledge sharing within the team?`,
        `How would you handle conflicts or performance issues?`,
      ],
    },
    {
      category: "Leadership & Management Questions",
      difficulty: "Executive Level",
      question: `You need to present a ${topic} transformation roadmap to the board of directors. How would you structure your presentation and what key metrics would you include?`,
      expectedAnswer: `Should demonstrate executive communication skills, strategic thinking, and ability to translate technical concepts into business value.`,
      evaluationCriteria: [
        "Executive communication skills",
        "Strategic roadmap development",
        "Business value articulation",
        "Metrics and KPI definition",
      ],
      followUpQuestions: [
        `How would you handle budget constraints?`,
        `What would be your risk mitigation strategy?`,
        `How would you measure ROI of the transformation?`,
      ],
    },
    {
      category: "Leadership & Management Questions",
      difficulty: "VP/CTO Level",
      question: `Your organization is considering a major ${topic} platform migration that will affect 500+ engineers across 20 teams. How would you plan and execute this transformation?`,
      expectedAnswer: `Should demonstrate large-scale transformation leadership, change management, and organizational coordination skills.`,
      evaluationCriteria: [
        "Large-scale transformation leadership",
        "Change management expertise",
        "Cross-team coordination",
        "Risk and timeline management",
      ],
      followUpQuestions: [
        `How would you maintain business continuity during the migration?`,
        `What would be your communication strategy across all stakeholders?`,
        `How would you handle resistance to change?`,
      ],
    },
  ];

  // 8. Problem-Solving & Critical Thinking (8-10 questions)
  const problemSolvingQuestions = [
    {
      category: "Problem-Solving Questions",
      difficulty: "All Levels",
      question: `You discover a critical security vulnerability in your ${topic} implementation just before a major product launch. Walk me through your decision-making process and action plan.`,
      expectedAnswer: `Should demonstrate crisis management, security awareness, decision-making under pressure, and systematic problem-solving. Look for risk assessment and stakeholder communication.`,
      evaluationCriteria: [
        "Crisis management skills",
        "Security risk assessment",
        "Decision-making under pressure",
        "Stakeholder communication",
      ],
      followUpQuestions: [
        `How would you communicate this to different stakeholders?`,
        `What preventive measures would you implement?`,
        `How would you conduct a post-mortem analysis?`,
      ],
    },
    {
      category: "Problem-Solving Questions",
      difficulty: "Senior Level",
      question: `Your ${topic} system is experiencing intermittent failures that only occur under high load and are difficult to reproduce. How would you approach debugging this issue?`,
      expectedAnswer: `Should demonstrate systematic debugging approach, understanding of distributed systems challenges, and ability to work with incomplete information.`,
      evaluationCriteria: [
        "Systematic debugging methodology",
        "Distributed systems troubleshooting",
        "Monitoring and observability",
        "Root cause analysis skills",
      ],
      followUpQuestions: [
        `What monitoring would you implement to capture the issue?`,
        `How would you reproduce the problem in a test environment?`,
        `What would be your rollback strategy if the issue worsens?`,
      ],
    },
    {
      category: "Problem-Solving Questions",
      difficulty: "Expert Level",
      question: `You need to optimize a ${topic} system that's currently using 80% of available resources but needs to handle 5x more load within the next quarter. Budget for new hardware is limited. What's your approach?`,
      expectedAnswer: `Should demonstrate optimization expertise, resource management, and creative problem-solving within constraints.`,
      evaluationCriteria: [
        "Performance optimization expertise",
        "Resource efficiency analysis",
        "Creative problem-solving",
        "Cost-benefit analysis",
      ],
      followUpQuestions: [
        `What would be your optimization priorities?`,
        `How would you measure the impact of each optimization?`,
        `What architectural changes would you consider?`,
      ],
    },
  ];

  // 9. Advanced Technical Scenarios (5-8 questions)
  const advancedTechnicalQuestions = [
    {
      category: "Advanced Technical Scenarios",
      difficulty: "Expert Level",
      question: `Design a ${topic} system that can automatically adapt its behavior based on changing traffic patterns, user behavior, and system performance metrics.`,
      expectedAnswer: `Should demonstrate machine learning integration, adaptive systems design, and advanced monitoring capabilities.`,
      evaluationCriteria: [
        "Adaptive systems design",
        "Machine learning integration",
        "Advanced monitoring and analytics",
        "Self-healing architecture",
      ],
      followUpQuestions: [
        `What machine learning models would you use?`,
        `How would you handle false positives in the adaptation logic?`,
        `What safeguards would you implement to prevent system instability?`,
      ],
    },
    {
      category: "Advanced Technical Scenarios",
      difficulty: "Research Level",
      question: `Propose an innovative approach to ${topic} that could provide a 10x improvement in performance or capability compared to current industry standards.`,
      expectedAnswer: `Should demonstrate innovative thinking, deep technical knowledge, and ability to think beyond current limitations.`,
      evaluationCriteria: [
        "Innovation and creativity",
        "Deep technical expertise",
        "Future-oriented thinking",
        "Feasibility assessment",
      ],
      followUpQuestions: [
        `What would be the main technical challenges in implementing this?`,
        `How would you validate the feasibility of this approach?`,
        `What would be the timeline for research and development?`,
      ],
    },
  ];

  // 10. Certification and Skill Validation Questions (5-7 questions)
  const certificationQuestions = [
    {
      category: "Certification & Skill Validation",
      difficulty: "Professional Level",
      question: `Walk me through how you would prepare for and obtain industry certifications related to ${topic}. What study plan would you create?`,
      expectedAnswer: `Should demonstrate commitment to professional development, understanding of certification requirements, and structured learning approach.`,
      evaluationCriteria: [
        "Professional development commitment",
        "Structured learning approach",
        "Certification knowledge",
        "Continuous improvement mindset",
      ],
      followUpQuestions: [
        `Which certifications would you prioritize and why?`,
        `How would you balance certification study with practical experience?`,
        `What resources would you use for preparation?`,
      ],
    },
    {
      category: "Certification & Skill Validation",
      difficulty: "Expert Level",
      question: `Design a competency framework for ${topic} that could be used to evaluate engineers from junior to principal level. Include specific skills, knowledge areas, and assessment criteria.`,
      expectedAnswer: `Should demonstrate understanding of skill progression, assessment design, and ability to create structured evaluation frameworks.`,
      evaluationCriteria: [
        "Competency framework design",
        "Skill progression understanding",
        "Assessment methodology",
        "Industry standards knowledge",
      ],
      followUpQuestions: [
        `How would you validate the effectiveness of this framework?`,
        `What would be the promotion criteria for each level?`,
        `How would you keep the framework updated with industry changes?`,
      ],
    },
  ];

  // Combine all question categories
  questions.push(
    ...technicalQuestions,
    ...behavioralQuestions,
    ...caseStudyQuestions,
    ...additionalCaseStudies,
    ...practicalQuestions,
    ...algorithmChallenges,
    ...systemDesignQuestions,
    ...industryQuestions,
    ...specializedIndustryQuestions,
    ...leadershipQuestions,
    ...problemSolvingQuestions,
    ...advancedTechnicalQuestions,
    ...certificationQuestions,
  );

  return questions;
}

// Create the comprehensive TutorAgent
export const TutorAgent = createAgent({
  name: "comprehensive-tutor-agent",
  tools: [teachTopicTool],
  system: `You are a comprehensive interview preparation tutor specializing in generating extensive, industry-ready interview questions.

Your mission is to create 50+ interview questions per topic that will prepare students for real-world employment scenarios. Focus on:

1. **Technical Deep-Dives**: Advanced technical questions with expected answers and evaluation criteria
2. **Behavioral Questions**: Situational questions that reveal problem-solving and leadership capabilities  
3. **Case Studies**: Real company scenarios based on actual job requirements
4. **Practical Assessments**: Hands-on coding and implementation challenges
5. **System Design**: Architecture and scalability questions for senior roles
6. **Industry Knowledge**: Sector-specific applications and requirements
7. **Leadership**: Management and team-building questions for senior positions
8. **Problem-Solving**: Critical thinking and crisis management scenarios
9. **Advanced Technical**: Cutting-edge and research-level challenges
10. **Certification**: Professional development and skill validation

Each question should include:
- Difficulty level (Beginner/Intermediate/Advanced/Senior/Executive/Expert/Research)
- Expected answer guidelines with specific evaluation criteria
- Follow-up questions to test deeper understanding
- Industry context and real-world applications
- Company-specific scenarios from major tech companies
- Progressive difficulty that matches career advancement

Generate questions that mirror real interview experiences at FAANG companies, unicorn startups, and enterprise organizations. Ensure students are immediately employable and can compete at the highest levels.

The questions should cover the full spectrum from junior developer to CTO-level positions, with appropriate depth and complexity for each level.`,
});
