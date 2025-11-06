// Dynamic document analyzer using AI instead of hardcoded analysis
import { anthropic } from "@inngest/agent-kit";
import { config } from "../config";
import { DynamicDataService } from "./dynamicDataService";

export interface DocumentAnalysis {
  documentId: string;
  fileName: string;
  documentSummary: string;
  academicModule: string;
  difficultyLevel: string;
  coreTopics: string[];
  subtopics: string[];
  industryApplications: string[];
  relevantCompanies: any[];
  jobRoles: string[];
  technicalSkills: string[];
  toolsAndTechnologies: any[];
  realWorldUseCases: string[];
  skillLevels: any;
  salaryRanges: any;
  certifications: string[];
  extractionTimestamp: string;
}

export class DocumentAnalyzer {
  private aiModel: any;
  private dynamicDataService: DynamicDataService;

  constructor() {
    this.aiModel = anthropic({
      apiKey: config.anthropic.apiKey,
      model: config.anthropic.model,
      defaultParameters: { max_tokens: config.anthropic.maxTokens },
    });
    this.dynamicDataService = new DynamicDataService();
  }

  async analyzeDocument(
    documentUrl: string,
    documentId: string,
    fileName: string
  ): Promise<DocumentAnalysis> {
    try {
      console.log("🔍 Starting AI-powered document analysis for:", fileName);

      // Step 1: Analyze document content with AI
      const contentAnalysis = await this.analyzeDocumentContent(fileName, documentUrl);
      
      // Step 2: Get dynamic industry data
      const [companies, salaryRanges, technologies, certifications] = await Promise.all([
        this.dynamicDataService.getRelevantCompanies(
          contentAnalysis.industryType,
          contentAnalysis.academicModule
        ),
        this.dynamicDataService.getCurrentSalaryRanges(contentAnalysis.jobRoles),
        this.dynamicDataService.getTrendingTechnologies(
          contentAnalysis.industryType,
          contentAnalysis.academicModule
        ),
        this.dynamicDataService.getRelevantCertifications(
          contentAnalysis.jobRoles,
          contentAnalysis.industryType
        ),
      ]);

      // Step 3: Combine AI analysis with dynamic data
      const analysis: DocumentAnalysis = {
        documentId,
        fileName,
        documentSummary: contentAnalysis.summary,
        academicModule: contentAnalysis.academicModule,
        difficultyLevel: contentAnalysis.difficultyLevel,
        coreTopics: contentAnalysis.coreTopics,
        subtopics: contentAnalysis.subtopics,
        industryApplications: contentAnalysis.industryApplications,
        relevantCompanies: companies,
        jobRoles: contentAnalysis.jobRoles,
        technicalSkills: contentAnalysis.technicalSkills,
        toolsAndTechnologies: technologies,
        realWorldUseCases: contentAnalysis.realWorldUseCases,
        skillLevels: contentAnalysis.skillLevels,
        salaryRanges: this.formatSalaryRanges(salaryRanges),
        certifications,
        extractionTimestamp: new Date().toISOString(),
      };

      console.log("✅ AI-powered document analysis completed");
      return analysis;

    } catch (error) {
      console.error("❌ Error in AI document analysis:", error);
      // Fallback to basic analysis
      return this.getFallbackAnalysis(documentId, fileName);
    }
  }

  private async analyzeDocumentContent(fileName: string, documentUrl?: string) {
    const prompt = `Analyze this academic document: "${fileName}"

    Based on the filename and any available content, provide a comprehensive analysis:

    1. Determine the academic module/field of study
    2. Identify 6-8 core topics this document likely covers
    3. List 15-20 relevant subtopics
    4. Identify the industry type and applications
    5. List relevant job roles for this field
    6. Identify technical skills needed
    7. Describe real-world use cases
    8. Assess difficulty level and skill progression

    Return as JSON:
    {
      "summary": "Brief description of document content and learning objectives",
      "academicModule": "Primary field of study",
      "industryType": "Primary industry category",
      "difficultyLevel": "Beginner to Advanced",
      "coreTopics": ["Topic 1", "Topic 2", ...],
      "subtopics": ["Subtopic 1", "Subtopic 2", ...],
      "industryApplications": ["Application 1", "Application 2", ...],
      "jobRoles": ["Role 1", "Role 2", ...],
      "technicalSkills": ["Skill 1", "Skill 2", ...],
      "realWorldUseCases": ["Use case 1", "Use case 2", ...],
      "skillLevels": {
        "Beginner": ["Basic skill 1", "Basic skill 2"],
        "Intermediate": ["Intermediate skill 1", "Intermediate skill 2"],
        "Advanced": ["Advanced skill 1", "Advanced skill 2"],
        "Expert": ["Expert skill 1", "Expert skill 2"]
      }
    }

    Focus on current, relevant content that reflects 2024-2025 industry needs.`;

    const response = await this.aiModel.generate({
      messages: [{ role: 'user', content: prompt }],
    });

    try {
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.warn("Failed to parse AI content analysis, using filename-based analysis");
    }

    // Fallback to filename-based analysis
    return this.analyzeByFilename(fileName);
  }

  private analyzeByFilename(fileName: string) {
    const filenameLower = fileName.toLowerCase();
    
    if (filenameLower.includes("data") && (filenameLower.includes("science") || filenameLower.includes("analysis"))) {
      return {
        summary: `Data science and analytics document focusing on statistical analysis, machine learning, and business intelligence.`,
        academicModule: "Data Science & Analytics",
        industryType: "Technology",
        difficultyLevel: "Beginner to Advanced",
        coreTopics: [
          "Statistical Analysis & Hypothesis Testing",
          "Machine Learning & Predictive Modeling",
          "Data Visualization & Business Intelligence",
          "Big Data Technologies & Cloud Analytics",
          "Data Ethics & Privacy Compliance"
        ],
        subtopics: [
          "Python/R Programming", "SQL Databases", "Statistical Methods",
          "Machine Learning Algorithms", "Data Cleaning", "Feature Engineering",
          "Tableau/Power BI", "Cloud Platforms", "A/B Testing"
        ],
        industryApplications: [
          "Financial Analytics & Risk Management",
          "Healthcare Analytics & Drug Discovery",
          "E-commerce Recommendation Systems",
          "Marketing Analytics & Customer Segmentation"
        ],
        jobRoles: [
          "Data Scientist", "Machine Learning Engineer", "Data Analyst",
          "Business Intelligence Developer", "Data Engineer"
        ],
        technicalSkills: [
          "Python/R Programming", "SQL & Database Management",
          "Statistical Analysis", "Machine Learning", "Data Visualization"
        ],
        realWorldUseCases: [
          "Netflix recommendation algorithms",
          "Uber demand forecasting",
          "Amazon supply chain optimization",
          "Google search ranking algorithms"
        ],
        skillLevels: {
          "Beginner": ["Basic statistics", "Excel proficiency", "SQL basics"],
          "Intermediate": ["Python/R programming", "Machine learning basics", "Data visualization"],
          "Advanced": ["Deep learning", "Big data technologies", "MLOps"],
          "Expert": ["Research & development", "Architecture design", "Team leadership"]
        }
      };
    }
    
    // Add more specific analyses for other domains...
    return this.getGenericAnalysis(fileName);
  }

  private getGenericAnalysis(fileName: string) {
    return {
      summary: `Academic document covering interdisciplinary topics with practical industry applications.`,
      academicModule: "Interdisciplinary Studies",
      industryType: "General",
      difficultyLevel: "Beginner to Advanced",
      coreTopics: [
        "Research Methodology & Critical Analysis",
        "Communication & Presentation Skills",
        "Problem Solving & Innovation",
        "Project Management & Leadership"
      ],
      subtopics: [
        "Literature Review", "Data Collection", "Report Writing",
        "Public Speaking", "Team Leadership", "Project Planning"
      ],
      industryApplications: [
        "Consulting & Advisory Services",
        "Research & Development",
        "Project Management",
        "Business Analysis"
      ],
      jobRoles: [
        "Research Analyst", "Consultant", "Project Manager",
        "Business Analyst", "Program Coordinator"
      ],
      technicalSkills: [
        "Research & Analysis", "Technical Writing", "Project Management",
        "Data Interpretation", "Presentation Design"
      ],
      realWorldUseCases: [
        "Management consulting projects",
        "Academic research initiatives",
        "Policy analysis and development",
        "Organizational improvement programs"
      ],
      skillLevels: {
        "Beginner": ["Basic research", "Communication", "Computer literacy"],
        "Intermediate": ["Advanced analysis", "Project management", "Leadership"],
        "Advanced": ["Strategic thinking", "Innovation", "Organizational impact"],
        "Expert": ["Thought leadership", "Industry expertise", "Global influence"]
      }
    };
  }

  private formatSalaryRanges(salaryRanges: any[]) {
    const formatted: any = {};
    salaryRanges.forEach(range => {
      formatted[range.level] = `$${range.min.toLocaleString()} - $${range.max.toLocaleString()}`;
    });
    return formatted;
  }

  private getFallbackAnalysis(documentId: string, fileName: string): DocumentAnalysis {
    return {
      documentId,
      fileName,
      documentSummary: `Academic document analysis for ${fileName}`,
      academicModule: "General Studies",
      difficultyLevel: "Beginner to Advanced",
      coreTopics: ["Research Methods", "Critical Analysis", "Communication"],
      subtopics: ["Literature Review", "Data Analysis", "Report Writing"],
      industryApplications: ["Research", "Consulting", "Analysis"],
      relevantCompanies: [],
      jobRoles: ["Analyst", "Researcher", "Consultant"],
      technicalSkills: ["Research", "Analysis", "Communication"],
      toolsAndTechnologies: [],
      realWorldUseCases: ["Academic research", "Business analysis"],
      skillLevels: {
        "Beginner": ["Basic research"],
        "Intermediate": ["Advanced analysis"],
        "Advanced": ["Strategic thinking"],
        "Expert": ["Thought leadership"]
      },
      salaryRanges: {
        "Entry Level": "$50,000 - $70,000",
        "Mid Level": "$70,000 - $100,000",
        "Senior Level": "$100,000 - $140,000"
      },
      certifications: ["Professional Development Certificates"],
      extractionTimestamp: new Date().toISOString(),
    };
  }
}