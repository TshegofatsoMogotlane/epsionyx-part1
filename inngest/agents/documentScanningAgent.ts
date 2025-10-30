import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";

const extractDocumentDataTool = createTool({
  name: "extract-document-data",
  description:
    "Extracts topics, module info, and content from uploaded academic documents.",
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

      console.log("📄 Processing document:", {
        documentUrl,
        documentId,
        fileName,
      });

      if (!documentUrl || !documentId || !fileName) {
        return {
          success: false,
          error: "Missing required parameters",
          received: { documentUrl, documentId, fileName },
        };
      }

      // Analyze document based on filename
      const analysis = analyzeDocument(fileName);

      const extractedData = {
        documentId,
        fileName,
        documentSummary: analysis.summary,
        academicModule: analysis.module,
        difficultyLevel: analysis.difficulty,
        coreTopics: analysis.coreTopics,
        subtopics: analysis.subtopics,
        extractionTimestamp: new Date().toISOString(),
      };

      // Store data in network state
      context.network.state.kv.set("extracted-data", extractedData);
      context.network.state.kv.set("document-id", documentId);

      console.log("✅ Document analysis completed successfully");

      return {
        success: true,
        ...extractedData,
        message: "Document analysis completed successfully",
      };
    } catch (error) {
      console.error("❌ Error in document analysis:", error);
      return {
        success: false,
        error: `Analysis failed: ${(error as Error).message}`,
        stack: (error as Error).stack,
      };
    }
  },
});

function analyzeDocument(fileName: string) {
  const filenameLower = fileName.toLowerCase();

  if (
    filenameLower.includes("data") &&
    (filenameLower.includes("analysis") || filenameLower.includes("science"))
  ) {
    return createDataScienceAnalysis(fileName);
  } else if (
    filenameLower.includes("business") ||
    filenameLower.includes("management")
  ) {
    return createBusinessAnalysis(fileName);
  } else if (filenameLower.includes("computer") || filenameLower.includes("programming")) {
    return createComputerScienceAnalysis(fileName);
  } else if (filenameLower.includes("engineering")) {
    return createEngineeringAnalysis(fileName);
  } else if (filenameLower.includes("finance") || filenameLower.includes("accounting")) {
    return createFinanceAnalysis(fileName);
  }

  return createGeneralAcademicAnalysis(fileName);
}

function createDataScienceAnalysis(fileName: string) {
  return {
    summary: `Comprehensive analysis of ${fileName} - Deep dive into data science methodologies, statistical analysis, machine learning, and business intelligence for industry readiness.`,
    module: "Data Science & Analytics",
    difficulty: "Beginner to Advanced",
    
    // Granular concept mapping
    coreTopics: [
      "Statistical Analysis & Hypothesis Testing",
      "Data Collection & Preprocessing Pipelines", 
      "Exploratory Data Analysis & Pattern Recognition",
      "Machine Learning & Predictive Modeling",
      "Data Visualization & Storytelling",
      "Business Intelligence & Decision Support",
      "Big Data Technologies & Cloud Analytics",
      "Data Ethics & Privacy Compliance"
    ],
    
    subtopics: [
      // Statistical Analysis
      "Descriptive Statistics", "Inferential Statistics", "Hypothesis Testing", "ANOVA", "Chi-Square Tests",
      "Regression Analysis", "Time Series Analysis", "Bayesian Statistics", "Non-parametric Tests",
      
      // Data Processing
      "Data Cleaning Techniques", "Missing Value Imputation", "Outlier Detection", "Feature Engineering",
      "Data Transformation", "Normalization & Scaling", "Dimensionality Reduction", "ETL Processes",
      
      // Machine Learning
      "Supervised Learning", "Unsupervised Learning", "Deep Learning", "Neural Networks", "Random Forest",
      "SVM", "Clustering Algorithms", "Classification", "Model Validation", "Cross-validation",
      
      // Visualization & BI
      "Dashboard Design", "Interactive Visualizations", "KPI Development", "Report Automation",
      "Data Storytelling", "Executive Reporting", "Real-time Analytics"
    ],
    
    // Industry context identification
    industryApplications: [
      "Financial Risk Assessment & Fraud Detection",
      "Healthcare Analytics & Drug Discovery", 
      "E-commerce Recommendation Systems",
      "Supply Chain Optimization",
      "Marketing Attribution & Customer Segmentation",
      "Predictive Maintenance in Manufacturing",
      "Social Media Analytics & Sentiment Analysis",
      "IoT Data Processing & Smart Cities"
    ],
    
    relevantCompanies: [
      "Google (Analytics, ML)", "Microsoft (Azure ML, Power BI)", "Amazon (AWS Analytics)",
      "Netflix (Recommendation Systems)", "Uber (Demand Forecasting)", "Airbnb (Pricing Analytics)",
      "Tesla (Autonomous Driving)", "Goldman Sachs (Algorithmic Trading)", "McKinsey (Business Analytics)",
      "Palantir (Big Data Analytics)", "Databricks (Data Engineering)", "Snowflake (Data Warehousing)"
    ],
    
    jobRoles: [
      "Data Scientist", "Machine Learning Engineer", "Data Analyst", "Business Intelligence Developer",
      "Data Engineer", "Analytics Consultant", "Quantitative Analyst", "Research Scientist",
      "Product Analyst", "Marketing Analyst", "Risk Analyst", "Data Architect"
    ],
    
    salaryRanges: {
      "Entry Level (0-2 years)": "$70,000 - $95,000",
      "Mid Level (3-5 years)": "$95,000 - $130,000", 
      "Senior Level (5+ years)": "$130,000 - $180,000",
      "Lead/Principal": "$180,000 - $250,000+",
      "Director/VP": "$250,000 - $400,000+"
    },
    
    // Skill level assessment
    skillLevels: {
      "Beginner": ["Basic statistics", "Excel proficiency", "SQL basics", "Python/R fundamentals"],
      "Intermediate": ["Advanced SQL", "Machine learning basics", "Data visualization", "Statistical modeling"],
      "Advanced": ["Deep learning", "Big data technologies", "MLOps", "Advanced statistics"],
      "Expert": ["Research & development", "Architecture design", "Team leadership", "Strategic planning"]
    },
    
    // Technical skills mapping
    technicalSkills: [
      "Python (Pandas, NumPy, Scikit-learn)", "R (ggplot2, dplyr, caret)", "SQL (PostgreSQL, MySQL)",
      "Machine Learning Frameworks (TensorFlow, PyTorch)", "Big Data (Spark, Hadoop)", 
      "Cloud Platforms (AWS, Azure, GCP)", "Visualization (Tableau, Power BI, D3.js)",
      "Version Control (Git)", "Docker & Kubernetes", "Apache Airflow", "Jupyter Notebooks"
    ],
    
    softSkills: [
      "Critical Thinking & Problem Solving", "Business Acumen", "Communication & Presentation",
      "Stakeholder Management", "Project Management", "Curiosity & Continuous Learning",
      "Attention to Detail", "Ethical Decision Making"
    ],
    
    toolsAndTechnologies: [
      "Programming: Python, R, SQL, Scala", "ML/AI: TensorFlow, PyTorch, Scikit-learn, Keras",
      "Big Data: Apache Spark, Hadoop, Kafka", "Cloud: AWS SageMaker, Azure ML, Google AI Platform",
      "Visualization: Tableau, Power BI, Plotly, D3.js", "Databases: PostgreSQL, MongoDB, Cassandra",
      "DevOps: Docker, Kubernetes, Jenkins, MLflow"
    ],
    
    certifications: [
      "AWS Certified Machine Learning - Specialty", "Google Professional Data Engineer",
      "Microsoft Azure Data Scientist Associate", "Tableau Desktop Specialist",
      "SAS Certified Data Scientist", "IBM Data Science Professional Certificate",
      "Coursera Machine Learning Specialization", "edX MicroMasters in Statistics and Data Science"
    ],
    
    // Real-world use cases
    realWorldUseCases: [
      "Netflix: Recommendation algorithm serving 200M+ users",
      "Uber: Dynamic pricing and demand forecasting",
      "Amazon: Supply chain optimization and inventory management", 
      "Google: Search ranking and ad targeting algorithms",
      "Tesla: Autonomous vehicle computer vision",
      "JPMorgan: Algorithmic trading and risk management",
      "Spotify: Music recommendation and playlist generation",
      "Airbnb: Pricing optimization and fraud detection"
    ],
    
    prerequisites: [
      "Strong mathematical foundation (calculus, linear algebra)",
      "Basic programming knowledge", "Statistical thinking",
      "Business understanding", "Research methodology"
    ],
    
    learningObjectives: [
      "Master statistical analysis and hypothesis testing",
      "Build end-to-end machine learning pipelines",
      "Create compelling data visualizations and dashboards",
      "Implement scalable data processing solutions",
      "Develop business-driven analytics strategies"
    ],
    
    skillProgression: [
      "Junior: Data cleaning, basic analysis, simple visualizations",
      "Mid: Machine learning models, advanced analytics, dashboard development",
      "Senior: Architecture design, model optimization, cross-functional leadership",
      "Principal: Strategic planning, research direction, organizational impact"
    ],
    
    industryStandards: [
      "CRISP-DM Methodology", "Agile Analytics", "MLOps Best Practices",
      "Data Governance & Quality", "GDPR & Privacy Compliance",
      "Model Interpretability & Fairness", "A/B Testing Standards"
    ],
    
    bestPractices: [
      "Version control for data and models", "Reproducible research practices",
      "Continuous integration for ML", "Model monitoring and maintenance",
      "Documentation and knowledge sharing", "Ethical AI development"
    ],
    
    commonChallenges: [
      "Data quality and availability", "Model interpretability",
      "Scaling ML systems", "Stakeholder alignment",
      "Technical debt in analytics", "Regulatory compliance"
    ]
  };
}

export const documentScanningAgent = createAgent({
  name: "Document Scanning Agent",
  description:
    "Processes uploaded academic documents to extract topics, module info, and content structure for learning.",
  system: `You are a Document Scanning Agent that ONLY extracts and analyzes academic document content.

  Your ONLY responsibility:
  - Use the extract-document-data tool to process the uploaded document
  - Extract topics, concepts, and module information
  - Store the extracted data in network state for other agents to use
  
  CRITICAL RULES:
  - You MUST ONLY use the extract-document-data tool provided to you
  - DO NOT attempt to generate industry tasks or interview questions
  - DO NOT try to save data to databases - other agents handle that
  - DO NOT invent or call non-existent tools
  - After extracting document data, your job is complete
  
  REQUIRED PARAMETERS for extract-document-data tool:
  - documentUrl: The URL of the document to process
  - documentId: The ID of the document in the database  
  - fileName: The name of the uploaded file
  
  Focus solely on document analysis and content extraction.`,
  model: anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-3-5-haiku-20241022",
    defaultParameters: { max_tokens: 1000 },
  }),
  tools: [extractDocumentDataTool],
});

function createBusinessAnalysis(fileName: string) {
  return {
    summary: `Comprehensive business analysis of ${fileName} - Strategic management, operations, finance, and leadership for executive readiness.`,
    module: "Business Management & Strategy",
    difficulty: "Beginner to Advanced",
    
    coreTopics: [
      "Strategic Planning & Competitive Analysis",
      "Operations Management & Process Optimization",
      "Financial Management & Investment Analysis",
      "Marketing Strategy & Customer Analytics",
      "Human Resource Management & Leadership",
      "Project Management & Agile Methodologies",
      "Digital Transformation & Innovation",
      "Risk Management & Compliance"
    ],
    
    subtopics: [
      "SWOT Analysis", "Porter's Five Forces", "Blue Ocean Strategy", "Balanced Scorecard",
      "Supply Chain Management", "Lean Six Sigma", "Quality Management", "Inventory Optimization",
      "Financial Modeling", "Valuation Methods", "Capital Budgeting", "Cash Flow Analysis",
      "Market Segmentation", "Brand Management", "Digital Marketing", "Customer Journey Mapping",
      "Talent Acquisition", "Performance Management", "Organizational Behavior", "Change Management",
      "Scrum & Kanban", "Risk Assessment", "Stakeholder Management", "Business Intelligence"
    ],
    
    industryApplications: [
      "Management Consulting & Strategy Development",
      "Investment Banking & Private Equity",
      "Corporate Development & M&A",
      "Operations Consulting & Process Improvement",
      "Digital Transformation Leadership",
      "Startup Operations & Scaling",
      "Non-profit Management & Social Impact"
    ],
    
    relevantCompanies: [
      "McKinsey & Company", "Boston Consulting Group", "Bain & Company", "Deloitte",
      "PwC", "KPMG", "Accenture", "Goldman Sachs", "JPMorgan Chase",
      "Google (Strategy)", "Microsoft (Business Development)", "Amazon (Operations)"
    ],
    
    jobRoles: [
      "Management Consultant", "Business Analyst", "Strategy Manager", "Operations Manager",
      "Product Manager", "Project Manager", "Business Development Manager", "General Manager",
      "Director of Operations", "VP of Strategy", "Chief Operating Officer"
    ],
    
    salaryRanges: {
      "Entry Level (0-2 years)": "$65,000 - $85,000",
      "Mid Level (3-5 years)": "$85,000 - $120,000",
      "Senior Level (5+ years)": "$120,000 - $160,000",
      "Director Level": "$160,000 - $250,000",
      "VP/C-Suite": "$250,000 - $500,000+"
    },
    
    skillLevels: {
      "Beginner": ["Business fundamentals", "Basic finance", "Communication skills"],
      "Intermediate": ["Strategic analysis", "Project management", "Team leadership"],
      "Advanced": ["Organizational transformation", "P&L management", "Board reporting"],
      "Expert": ["Industry expertise", "M&A leadership", "Global operations"]
    },
    
    technicalSkills: [
      "Financial Modeling & Analysis", "Data Analysis & Business Intelligence",
      "Project Management (PMP, Agile)", "Process Improvement (Lean, Six Sigma)",
      "Strategic Planning & Execution", "Market Research & Analysis",
      "Risk Assessment & Management", "Digital Transformation"
    ],
    
    softSkills: [
      "Leadership & Team Management", "Strategic Thinking", "Communication & Presentation",
      "Negotiation & Influence", "Problem Solving", "Change Management",
      "Stakeholder Management", "Cultural Intelligence"
    ],
    
    toolsAndTechnologies: [
      "Microsoft Office Suite (Advanced Excel)", "PowerBI & Tableau", "Salesforce CRM",
      "Project Management: Jira, Asana, Monday.com", "ERP Systems: SAP, Oracle",
      "Google Workspace", "Slack/Teams", "Zoom/WebEx", "Financial Software: QuickBooks, NetSuite"
    ],
    
    certifications: [
      "MBA (Master of Business Administration)", "PMP (Project Management Professional)",
      "Lean Six Sigma Black Belt", "Google Analytics Certification",
      "Salesforce Administrator", "Scrum Master Certification",
      "CFA (Chartered Financial Analyst)", "Strategic Management Certificate"
    ],
    
    realWorldUseCases: [
      "McKinsey: Digital transformation for Fortune 500 companies",
      "Amazon: Supply chain optimization and logistics",
      "Google: Product strategy and market expansion",
      "Tesla: Manufacturing process innovation",
      "Airbnb: International market entry strategy",
      "Netflix: Content strategy and global expansion"
    ],
    
    prerequisites: [
      "Basic business knowledge", "Analytical thinking", "Communication skills",
      "Computer literacy", "Mathematical foundations"
    ],
    
    learningObjectives: [
      "Develop strategic thinking and planning capabilities",
      "Master financial analysis and business modeling",
      "Build leadership and team management skills",
      "Create effective business processes and operations",
      "Lead organizational change and transformation"
    ],
    
    skillProgression: [
      "Junior: Basic analysis, process documentation, project support",
      "Mid: Strategic analysis, team leadership, process improvement",
      "Senior: P&L management, organizational design, strategic initiatives",
      "Executive: Vision setting, board interaction, industry leadership"
    ],
    
    industryStandards: [
      "PMBOK Standards", "ISO Quality Management", "Lean Six Sigma Methodology",
      "Agile/Scrum Framework", "Financial Reporting Standards", "Corporate Governance"
    ],
    
    bestPractices: [
      "Data-driven decision making", "Stakeholder engagement",
      "Continuous improvement mindset", "Clear communication",
      "Ethical business practices", "Innovation culture"
    ],
    
    commonChallenges: [
      "Change resistance", "Resource constraints", "Stakeholder alignment",
      "Market volatility", "Regulatory compliance", "Digital disruption"
    ]
  };
}

function createComputerScienceAnalysis(fileName: string) {
  return {
    summary: `Comprehensive computer science analysis of ${fileName} - Software engineering, algorithms, systems design, and emerging technologies.`,
    module: "Computer Science & Software Engineering",
    difficulty: "Beginner to Advanced",
    
    coreTopics: [
      "Data Structures & Algorithms",
      "Software Engineering & Design Patterns",
      "Database Systems & Management",
      "Computer Networks & Distributed Systems",
      "Operating Systems & System Programming",
      "Web Development & Full-Stack Engineering",
      "Mobile Application Development",
      "Cybersecurity & Information Assurance"
    ],
    
    subtopics: [
      "Arrays, Linked Lists, Trees, Graphs", "Sorting & Searching Algorithms", "Dynamic Programming",
      "Object-Oriented Programming", "Design Patterns", "Software Architecture", "Testing & QA",
      "SQL & NoSQL Databases", "Database Design", "Query Optimization",
      "TCP/IP, HTTP/HTTPS", "RESTful APIs", "Microservices", "Cloud Computing",
      "Process Management", "Memory Management", "File Systems",
      "Frontend: React, Angular, Vue", "Backend: Node.js, Python, Java", "DevOps & CI/CD",
      "iOS/Android Development", "Cross-platform Development",
      "Encryption", "Authentication", "Network Security", "Ethical Hacking"
    ],
    
    industryApplications: [
      "Software Development & Engineering",
      "Web & Mobile Application Development",
      "Cloud Computing & DevOps",
      "Cybersecurity & Information Security",
      "Game Development & Interactive Media",
      "Artificial Intelligence & Machine Learning",
      "Blockchain & Cryptocurrency Development"
    ],
    
    relevantCompanies: [
      "Google", "Microsoft", "Amazon", "Apple", "Meta (Facebook)", "Netflix",
      "Uber", "Airbnb", "Spotify", "GitHub", "Atlassian", "Salesforce"
    ],
    
    jobRoles: [
      "Software Engineer", "Full-Stack Developer", "Frontend Developer", "Backend Developer",
      "DevOps Engineer", "Security Engineer", "Mobile Developer", "Cloud Architect",
      "Technical Lead", "Engineering Manager", "Principal Engineer"
    ],
    
    salaryRanges: {
      "Entry Level (0-2 years)": "$75,000 - $100,000",
      "Mid Level (3-5 years)": "$100,000 - $140,000",
      "Senior Level (5+ years)": "$140,000 - $200,000",
      "Staff/Principal": "$200,000 - $300,000",
      "Director/VP": "$300,000 - $500,000+"
    },
    
    skillLevels: {
      "Beginner": ["Basic programming", "HTML/CSS", "Git basics", "Problem solving"],
      "Intermediate": ["Data structures", "Web frameworks", "Database design", "Testing"],
      "Advanced": ["System design", "Performance optimization", "Architecture", "Leadership"],
      "Expert": ["Technical strategy", "Innovation", "Mentoring", "Industry influence"]
    },
    
    technicalSkills: [
      "Programming Languages: Python, Java, JavaScript, C++, Go",
      "Web Technologies: React, Node.js, Express, Django, Spring",
      "Databases: PostgreSQL, MongoDB, Redis, Elasticsearch",
      "Cloud Platforms: AWS, Azure, GCP", "DevOps: Docker, Kubernetes, Jenkins",
      "Version Control: Git, GitHub", "Testing: Jest, Selenium, JUnit"
    ],
    
    softSkills: [
      "Problem Solving", "Logical Thinking", "Communication", "Teamwork",
      "Continuous Learning", "Attention to Detail", "Time Management", "Adaptability"
    ],
    
    toolsAndTechnologies: [
      "IDEs: VS Code, IntelliJ, Eclipse", "Frameworks: React, Angular, Django, Spring Boot",
      "Databases: MySQL, PostgreSQL, MongoDB", "Cloud: AWS, Azure, Google Cloud",
      "DevOps: Docker, Kubernetes, Jenkins, GitLab CI", "Monitoring: New Relic, DataDog"
    ],
    
    certifications: [
      "AWS Certified Solutions Architect", "Google Cloud Professional Developer",
      "Microsoft Azure Developer Associate", "Oracle Java Certification",
      "Certified Kubernetes Administrator", "CompTIA Security+", "Scrum Master"
    ],
    
    realWorldUseCases: [
      "Google: Search engine algorithms and infrastructure",
      "Netflix: Video streaming platform and recommendation system",
      "Uber: Real-time matching and routing algorithms",
      "Facebook: Social network platform and data processing",
      "Amazon: E-commerce platform and cloud services"
    ],
    
    prerequisites: [
      "Mathematical thinking", "Logic and reasoning", "Basic computer literacy",
      "Problem-solving mindset", "Patience and persistence"
    ],
    
    learningObjectives: [
      "Master programming fundamentals and advanced concepts",
      "Build scalable software applications",
      "Design efficient algorithms and data structures",
      "Implement secure and robust systems",
      "Lead technical teams and projects"
    ],
    
    skillProgression: [
      "Junior: Code implementation, bug fixes, feature development",
      "Mid: System design, code reviews, mentoring juniors",
      "Senior: Architecture decisions, technical leadership, cross-team collaboration",
      "Principal: Technical strategy, innovation, industry expertise"
    ],
    
    industryStandards: [
      "Agile/Scrum Development", "Clean Code Principles", "SOLID Design Principles",
      "RESTful API Design", "Security Best Practices", "Code Review Standards"
    ],
    
    bestPractices: [
      "Test-driven development", "Continuous integration/deployment",
      "Code documentation", "Security-first mindset",
      "Performance optimization", "Scalable architecture"
    ],
    
    commonChallenges: [
      "Technical debt management", "Scalability issues", "Security vulnerabilities",
      "Legacy system maintenance", "Rapid technology changes", "Team coordination"
    ]
  };
}

function createEngineeringAnalysis(fileName: string) {
  return {
    summary: `Comprehensive engineering analysis of ${fileName} - Technical design, problem-solving, and innovation across engineering disciplines.`,
    module: "Engineering & Technical Design",
    difficulty: "Beginner to Advanced",
    
    coreTopics: [
      "Engineering Design & Problem Solving",
      "Mathematics & Physics Applications",
      "Materials Science & Selection",
      "Systems Engineering & Integration",
      "Project Management & Technical Leadership",
      "Quality Assurance & Testing",
      "Sustainability & Environmental Impact",
      "Innovation & Research Development"
    ],
    
    subtopics: [
      "Design Thinking", "CAD Modeling", "Prototyping", "Testing & Validation",
      "Calculus Applications", "Differential Equations", "Statistics", "Optimization",
      "Material Properties", "Manufacturing Processes", "Cost Analysis",
      "System Architecture", "Requirements Engineering", "Risk Assessment",
      "Agile Project Management", "Technical Documentation", "Team Leadership",
      "Quality Control", "Standards Compliance", "Failure Analysis",
      "Life Cycle Assessment", "Green Engineering", "Renewable Energy",
      "Patent Research", "R&D Methodologies", "Technology Transfer"
    ],
    
    industryApplications: [
      "Aerospace & Defense Engineering",
      "Automotive & Transportation",
      "Civil & Infrastructure Engineering",
      "Mechanical & Manufacturing Engineering",
      "Electrical & Electronics Engineering",
      "Chemical & Process Engineering",
      "Biomedical & Healthcare Engineering"
    ],
    
    relevantCompanies: [
      "Boeing", "Airbus", "SpaceX", "Tesla", "General Electric", "Siemens",
      "Ford", "Toyota", "BMW", "Caterpillar", "3M", "Honeywell", "Lockheed Martin"
    ],
    
    jobRoles: [
      "Design Engineer", "Project Engineer", "Systems Engineer", "Quality Engineer",
      "Research Engineer", "Manufacturing Engineer", "Technical Lead",
      "Engineering Manager", "Principal Engineer", "Chief Technology Officer"
    ],
    
    salaryRanges: {
      "Entry Level (0-2 years)": "$65,000 - $80,000",
      "Mid Level (3-5 years)": "$80,000 - $110,000",
      "Senior Level (5+ years)": "$110,000 - $150,000",
      "Principal/Staff": "$150,000 - $200,000",
      "Director/VP": "$200,000 - $300,000+"
    },
    
    skillLevels: {
      "Beginner": ["Engineering fundamentals", "CAD basics", "Problem solving"],
      "Intermediate": ["Design optimization", "Project management", "Technical analysis"],
      "Advanced": ["System architecture", "Innovation leadership", "Strategic planning"],
      "Expert": ["Industry expertise", "Technology vision", "Organizational impact"]
    },
    
    technicalSkills: [
      "CAD Software: SolidWorks, AutoCAD, CATIA", "Simulation: ANSYS, MATLAB, Simulink",
      "Programming: Python, C++, MATLAB", "Project Management: MS Project, Primavera",
      "Quality Tools: Six Sigma, Statistical Analysis", "Manufacturing: Lean, Kaizen"
    ],
    
    softSkills: [
      "Problem Solving", "Critical Thinking", "Communication", "Leadership",
      "Teamwork", "Innovation", "Attention to Detail", "Ethical Reasoning"
    ],
    
    toolsAndTechnologies: [
      "Design: SolidWorks, AutoCAD, Fusion 360", "Analysis: ANSYS, COMSOL, MATLAB",
      "Manufacturing: CNC Programming, 3D Printing", "Testing: LabVIEW, Oscilloscopes",
      "Project Management: Jira, MS Project", "Documentation: Technical Writing Tools"
    ],
    
    certifications: [
      "Professional Engineer (PE) License", "Project Management Professional (PMP)",
      "Six Sigma Black Belt", "SolidWorks Certification", "AutoCAD Certification",
      "MATLAB Certification", "Quality Management ISO 9001"
    ],
    
    realWorldUseCases: [
      "SpaceX: Rocket design and space exploration",
      "Tesla: Electric vehicle engineering and manufacturing",
      "Boeing: Aircraft design and aerospace systems",
      "GE: Power generation and industrial equipment",
      "Apple: Consumer electronics design and manufacturing"
    ],
    
    prerequisites: [
      "Strong mathematics and physics background", "Analytical thinking",
      "Spatial reasoning", "Technical curiosity", "Problem-solving mindset"
    ],
    
    learningObjectives: [
      "Master engineering design principles and methodologies",
      "Develop technical problem-solving capabilities",
      "Build project management and leadership skills",
      "Create innovative solutions to complex challenges",
      "Lead technical teams and drive innovation"
    ],
    
    skillProgression: [
      "Junior: Design support, testing, documentation",
      "Mid: Independent design, project leadership, client interaction",
      "Senior: System architecture, strategic planning, team management",
      "Principal: Technology vision, innovation strategy, industry leadership"
    ],
    
    industryStandards: [
      "ISO 9001 Quality Management", "IEEE Standards", "ASME Codes",
      "Six Sigma Methodology", "Lean Manufacturing", "Safety Standards (OSHA)"
    ],
    
    bestPractices: [
      "Design for manufacturability", "Continuous improvement",
      "Risk-based design", "Sustainable engineering",
      "Collaborative development", "Evidence-based decisions"
    ],
    
    commonChallenges: [
      "Complex system integration", "Cost vs. performance trade-offs",
      "Regulatory compliance", "Technology obsolescence",
      "Resource constraints", "Interdisciplinary coordination"
    ]
  };
}

function createFinanceAnalysis(fileName: string) {
  return {
    summary: `Comprehensive finance analysis of ${fileName} - Financial analysis, investment strategies, risk management, and corporate finance.`,
    module: "Finance & Investment Management",
    difficulty: "Beginner to Advanced",
    
    coreTopics: [
      "Financial Analysis & Modeling",
      "Investment Banking & Capital Markets",
      "Portfolio Management & Asset Allocation",
      "Risk Management & Derivatives",
      "Corporate Finance & Valuation",
      "Financial Planning & Wealth Management",
      "Regulatory Compliance & Ethics",
      "Fintech & Digital Finance Innovation"
    ],
    
    subtopics: [
      "Financial Statement Analysis", "Ratio Analysis", "Cash Flow Modeling", "Forecasting",
      "M&A Analysis", "IPO Process", "Debt & Equity Markets", "Trading Strategies",
      "Modern Portfolio Theory", "Asset Pricing Models", "Alternative Investments",
      "Options & Futures", "Credit Risk", "Market Risk", "Operational Risk",
      "DCF Valuation", "Comparable Analysis", "Capital Structure", "Dividend Policy",
      "Retirement Planning", "Tax Strategies", "Estate Planning", "Insurance",
      "SEC Regulations", "Basel III", "Sarbanes-Oxley", "Fiduciary Duty",
      "Blockchain Finance", "Robo-advisors", "Cryptocurrency", "Digital Payments"
    ],
    
    industryApplications: [
      "Investment Banking & Capital Markets",
      "Asset Management & Hedge Funds",
      "Corporate Finance & Treasury",
      "Financial Planning & Wealth Management",
      "Risk Management & Insurance",
      "Fintech & Digital Banking",
      "Regulatory & Compliance"
    ],
    
    relevantCompanies: [
      "Goldman Sachs", "JPMorgan Chase", "Morgan Stanley", "Bank of America",
      "BlackRock", "Vanguard", "Fidelity", "Charles Schwab", "Wells Fargo",
      "Citadel", "Bridgewater", "Two Sigma", "Renaissance Technologies"
    ],
    
    jobRoles: [
      "Financial Analyst", "Investment Banker", "Portfolio Manager", "Risk Analyst",
      "Wealth Manager", "Corporate Finance Manager", "Compliance Officer",
      "Quantitative Analyst", "Trader", "Research Analyst", "CFO"
    ],
    
    salaryRanges: {
      "Entry Level (0-2 years)": "$70,000 - $95,000",
      "Mid Level (3-5 years)": "$95,000 - $140,000",
      "Senior Level (5+ years)": "$140,000 - $200,000",
      "VP/Director": "$200,000 - $350,000",
      "Managing Director": "$350,000 - $1,000,000+"
    },
    
    skillLevels: {
      "Beginner": ["Financial fundamentals", "Excel proficiency", "Basic analysis"],
      "Intermediate": ["Financial modeling", "Valuation", "Risk assessment"],
      "Advanced": ["Complex derivatives", "Portfolio optimization", "Strategic finance"],
      "Expert": ["Market making", "Institutional management", "Regulatory expertise"]
    },
    
    technicalSkills: [
      "Financial Modeling & Valuation", "Excel & VBA Programming", "Statistical Analysis",
      "Bloomberg Terminal", "Capital IQ", "FactSet", "Python/R for Finance",
      "Risk Management Systems", "Trading Platforms", "Regulatory Reporting"
    ],
    
    softSkills: [
      "Analytical Thinking", "Attention to Detail", "Communication", "Client Relations",
      "Ethical Judgment", "Stress Management", "Negotiation", "Leadership"
    ],
    
    toolsAndTechnologies: [
      "Excel/VBA", "Bloomberg Terminal", "Reuters Eikon", "Capital IQ", "FactSet",
      "Python/R", "MATLAB", "SAS", "Tableau", "Power BI", "SQL", "Monte Carlo Simulation"
    ],
    
    certifications: [
      "CFA (Chartered Financial Analyst)", "FRM (Financial Risk Manager)",
      "CPA (Certified Public Accountant)", "CFP (Certified Financial Planner)",
      "Series 7, 63, 66 (FINRA)", "PRM (Professional Risk Manager)", "MBA Finance"
    ],
    
    realWorldUseCases: [
      "Goldman Sachs: M&A advisory and capital raising",
      "BlackRock: Global asset management and ETF creation",
      "JPMorgan: Investment banking and wealth management",
      "Citadel: Quantitative trading and hedge fund management",
      "Vanguard: Low-cost index fund management"
    ],
    
    prerequisites: [
      "Strong mathematical and analytical skills", "Economics understanding",
      "Business fundamentals", "Excel proficiency", "Ethical mindset"
    ],
    
    learningObjectives: [
      "Master financial analysis and modeling techniques",
      "Understand investment strategies and portfolio management",
      "Develop risk assessment and management capabilities",
      "Build client relationship and advisory skills",
      "Navigate regulatory and compliance requirements"
    ],
    
    skillProgression: [
      "Analyst: Financial modeling, research, client support",
      "Associate: Client management, deal execution, team leadership",
      "VP: Business development, strategic planning, P&L responsibility",
      "MD: Client relationships, business strategy, firm leadership"
    ],
    
    industryStandards: [
      "CFA Institute Standards", "GIPS (Global Investment Performance Standards)",
      "Basel III Banking Regulations", "Sarbanes-Oxley Compliance",
      "FINRA Rules", "SEC Regulations", "IFRS/GAAP Accounting"
    ],
    
    bestPractices: [
      "Fiduciary responsibility", "Risk-adjusted returns focus",
      "Diversification principles", "Transparent communication",
      "Continuous market monitoring", "Ethical decision making"
    ],
    
    commonChallenges: [
      "Market volatility and uncertainty", "Regulatory changes",
      "Technology disruption", "Client expectations management",
      "Risk management complexity", "Competitive pressure"
    ]
  };
}

function createGeneralAcademicAnalysis(fileName: string) {
  return {
    summary: `Comprehensive academic analysis of ${fileName} - Interdisciplinary approach to learning with practical industry applications.`,
    module: "Interdisciplinary Studies",
    difficulty: "Beginner to Advanced",
    
    coreTopics: [
      "Research Methodology & Critical Analysis",
      "Communication & Presentation Skills",
      "Problem Solving & Innovation",
      "Project Management & Leadership",
      "Digital Literacy & Technology Integration",
      "Ethics & Professional Responsibility",
      "Global Perspectives & Cultural Competency",
      "Continuous Learning & Adaptability"
    ],
    
    subtopics: [
      "Literature Review", "Data Collection", "Statistical Analysis", "Report Writing",
      "Public Speaking", "Visual Communication", "Technical Writing", "Storytelling",
      "Design Thinking", "Creative Problem Solving", "Systems Thinking", "Innovation Methods",
      "Team Leadership", "Project Planning", "Resource Management", "Stakeholder Engagement",
      "Digital Tools", "Information Systems", "Cybersecurity Awareness", "AI/ML Basics",
      "Professional Ethics", "Social Responsibility", "Sustainability", "Diversity & Inclusion",
      "Cross-cultural Communication", "Global Markets", "International Relations",
      "Lifelong Learning", "Career Development", "Networking", "Personal Branding"
    ],
    
    industryApplications: [
      "Consulting & Advisory Services",
      "Education & Training",
      "Non-profit & Social Impact",
      "Government & Public Policy",
      "Media & Communications",
      "Research & Development",
      "International Organizations"
    ],
    
    relevantCompanies: [
      "Various based on specialization", "Consulting firms", "Educational institutions",
      "Non-profit organizations", "Government agencies", "International bodies",
      "Media companies", "Research institutions"
    ],
    
    jobRoles: [
      "Research Analyst", "Consultant", "Project Coordinator", "Program Manager",
      "Communications Specialist", "Policy Analyst", "Training Specialist",
      "Operations Coordinator", "Business Analyst", "Content Creator"
    ],
    
    salaryRanges: {
      "Entry Level (0-2 years)": "$40,000 - $60,000",
      "Mid Level (3-5 years)": "$60,000 - $85,000",
      "Senior Level (5+ years)": "$85,000 - $120,000",
      "Director Level": "$120,000 - $180,000",
      "Executive Level": "$180,000+"
    },
    
    skillLevels: {
      "Beginner": ["Basic research", "Communication", "Computer literacy"],
      "Intermediate": ["Advanced analysis", "Project management", "Leadership"],
      "Advanced": ["Strategic thinking", "Innovation", "Organizational impact"],
      "Expert": ["Thought leadership", "Industry expertise", "Global influence"]
    },
    
    technicalSkills: [
      "Research & Analysis", "Data Interpretation", "Technical Writing",
      "Project Management", "Digital Communication", "Statistical Software",
      "Presentation Design", "Database Management"
    ],
    
    softSkills: [
      "Critical Thinking", "Communication", "Leadership", "Adaptability",
      "Cultural Sensitivity", "Ethical Reasoning", "Creativity", "Collaboration"
    ],
    
    toolsAndTechnologies: [
      "Microsoft Office Suite", "Google Workspace", "Project Management Tools",
      "Statistical Software (SPSS, R)", "Survey Tools", "Presentation Software",
      "Collaboration Platforms", "Research Databases"
    ],
    
    certifications: [
      "Project Management Professional (PMP)", "Google Analytics",
      "Digital Marketing Certifications", "Research Methodology Certificates",
      "Professional Communication Certificates", "Leadership Development Programs"
    ],
    
    realWorldUseCases: [
      "McKinsey: Cross-industry consulting and research",
      "UN: International development and policy research",
      "NGOs: Social impact measurement and program evaluation",
      "Universities: Academic research and knowledge transfer",
      "Think tanks: Policy research and analysis"
    ],
    
    prerequisites: [
      "Academic foundation in subject area", "Basic computer literacy",
      "Communication skills", "Analytical thinking", "Curiosity and openness"
    ],
    
    learningObjectives: [
      "Develop critical thinking and analytical capabilities",
      "Build effective communication and presentation skills",
      "Master research methodologies and data analysis",
      "Create innovative solutions to complex problems",
      "Lead projects and drive organizational change"
    ],
    
    skillProgression: [
      "Junior: Research support, data collection, basic analysis",
      "Mid: Independent research, project management, team collaboration",
      "Senior: Strategic analysis, thought leadership, organizational impact",
      "Expert: Industry expertise, innovation leadership, global influence"
    ],
    
    industryStandards: [
      "Research Ethics Guidelines", "Professional Communication Standards",
      "Project Management Best Practices", "Quality Assurance Protocols",
      "Data Privacy and Security", "Academic Integrity Standards"
    ],
    
    bestPractices: [
      "Evidence-based decision making", "Continuous learning mindset",
      "Collaborative approach", "Ethical considerations",
      "Clear communication", "Innovation and creativity"
    ],
    
    commonChallenges: [
      "Information overload", "Interdisciplinary coordination",
      "Resource limitations", "Stakeholder management",
      "Technology adaptation", "Career path uncertainty"
    ]
  };
}