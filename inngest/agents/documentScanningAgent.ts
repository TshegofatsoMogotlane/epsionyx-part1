import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic } from "@inngest/agent-kit";
import { DocumentAnalyzer } from "@/lib/services/documentAnalyzer";
import { config } from "@/lib/config";

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

      console.log("📄 Processing document with AI-powered analysis:", {
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

      // Use AI-powered dynamic document analysis
      const analyzer = new DocumentAnalyzer();
      const extractedData = await analyzer.analyzeDocument(documentUrl, documentId, fileName);

      // Store data in network state
      context.network.state.kv.set("extracted-data", extractedData);
      context.network.state.kv.set("document-id", documentId);

      console.log("✅ AI-powered document analysis completed successfully");
      console.log("📊 Analysis results:", {
        academicModule: extractedData.academicModule,
        coreTopicsCount: extractedData.coreTopics.length,
        companiesCount: extractedData.relevantCompanies.length,
        jobRolesCount: extractedData.jobRoles.length
      });

      return {
        success: true,
        ...extractedData,
        message: "AI-powered document analysis completed successfully",
      };
    } catch (error) {
      console.error("❌ Error in AI document analysis:", error);
      return {
        success: false,
        error: `AI analysis failed: ${(error as Error).message}`,
        stack: (error as Error).stack,
      };
    }
  },
});

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
    apiKey: config.anthropic.apiKey,
    model: config.anthropic.model,
    defaultParameters: { max_tokens: config.anthropic.maxTokens },
  }),
  tools: [extractDocumentDataTool],
});

