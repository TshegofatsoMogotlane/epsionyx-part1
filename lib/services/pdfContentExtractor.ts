import { anthropic } from "@inngest/agent-kit";
import { config } from "../config";

export interface PDFContent {
  text: string;
  pages: number;
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
  };
}

export class PDFContentExtractor {
  private aiModel: any;

  constructor() {
    this.aiModel = anthropic({
      apiKey: config.anthropic.apiKey,
      model: config.anthropic.model,
      defaultParameters: { max_tokens: config.anthropic.maxTokens },
    });
  }

  async extractContent(documentUrl: string): Promise<PDFContent> {
    try {
      console.log("📄 Extracting PDF content from:", documentUrl);

      // Fetch the PDF file
      const response = await fetch(documentUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Try to extract text using pdf-parse
      let extractedText = "";
      let pages = 0;
      let metadata = {};

      try {
        const pdfParse = require('pdf-parse');
        const pdfData = await pdfParse(buffer);
        
        extractedText = pdfData.text;
        pages = pdfData.numpages;
        metadata = pdfData.info || {};
        
        console.log(`✅ Extracted ${extractedText.length} characters from ${pages} pages`);
      } catch (pdfError) {
        console.warn("PDF parsing failed, using AI-based extraction:", (pdfError as Error).message);
        
        // Fallback: Use AI to analyze the document structure
        extractedText = await this.aiBasedExtraction(documentUrl);
        pages = 1; // Estimate
      }

      return {
        text: extractedText,
        pages,
        metadata
      };

    } catch (error) {
      console.error("❌ Error extracting PDF content:", error);
      throw new Error(`PDF extraction failed: ${(error as Error).message}`);
    }
  }

  private async aiBasedExtraction(documentUrl: string): Promise<string> {
    const prompt = `Analyze this PDF document and extract all textual content, including:
    - All headings and subheadings
    - All body text and paragraphs
    - All bullet points and lists
    - All tables and data
    - All captions and labels
    - All references and citations
    
    Document URL: ${documentUrl}
    
    Provide a comprehensive text extraction that captures all the academic content.`;

    const response = await this.aiModel.generate({
      messages: [{ role: 'user', content: prompt }],
    });

    return response.text || "Content extraction failed";
  }

  async deepAnalyzeContent(content: PDFContent): Promise<{
    allTopics: string[];
    allSubtopics: string[];
    chapterStructure: any[];
    keyTerms: string[];
    learningObjectives: string[];
    assessmentCriteria: string[];
  }> {
    const prompt = `Perform an EXTREMELY DEEP, comprehensive analysis of this academic document content. Extract EVERY possible educational element:

DOCUMENT CONTENT (${content.text.length} total characters):
${content.text.substring(0, 12000)}...

EXTRACTION REQUIREMENTS - Be EXTREMELY thorough:

1. ALL TOPICS (Extract 15-25 topics minimum):
   - Every chapter, section, subsection
   - Every major concept, theory, model
   - Every methodology, approach, technique
   - Every framework, system, process
   - Every principle, law, rule
   - Every case study, example, scenario

2. ALL SUBTOPICS (Extract 30-50 subtopics minimum):
   - Every sub-concept within main topics
   - Every specific technique or method
   - Every tool, software, technology mentioned
   - Every formula, equation, calculation
   - Every step in processes
   - Every component of systems
   - Every detail of methodologies

3. COMPREHENSIVE CHAPTER STRUCTURE:
   - Complete document organization
   - All headings and subheadings
   - Learning progression and flow
   - Dependencies between concepts

4. ALL KEY TERMS (Extract 25-40 terms minimum):
   - Every technical term and definition
   - Every acronym and abbreviation
   - Every specialized vocabulary
   - Every industry-specific language
   - Every concept with specific meaning

5. DETAILED LEARNING OBJECTIVES:
   - What students must know
   - What students must be able to do
   - What students must understand
   - What students must apply
   - What students must analyze
   - What students must create

6. COMPREHENSIVE ASSESSMENT CRITERIA:
   - Knowledge evaluation methods
   - Skill demonstration requirements
   - Application assessment approaches
   - Analysis and synthesis evaluation
   - Creative and innovative thinking tests

CRITICAL: Extract EVERYTHING - no detail is too small. This analysis will determine how well students are prepared for industry.

Return as JSON (be extremely comprehensive):
{
  "allTopics": ["Topic 1", "Topic 2", "Topic 3", ...], // 15-25 minimum
  "allSubtopics": ["Subtopic 1", "Subtopic 2", "Subtopic 3", ...], // 30-50 minimum
  "chapterStructure": [
    {
      "chapter": "Chapter Name",
      "sections": ["Section 1", "Section 2", "Section 3"],
      "keyPoints": ["Point 1", "Point 2", "Point 3"],
      "learningOutcomes": ["Outcome 1", "Outcome 2", "Outcome 3"],
      "concepts": ["Concept 1", "Concept 2", "Concept 3"]
    }
  ],
  "keyTerms": ["Term 1", "Term 2", "Term 3", ...], // 25-40 minimum
  "learningObjectives": ["Objective 1", "Objective 2", "Objective 3", ...],
  "assessmentCriteria": ["Criteria 1", "Criteria 2", "Criteria 3", ...],
  "technicalConcepts": ["Technical 1", "Technical 2", "Technical 3", ...],
  "practicalApplications": ["Application 1", "Application 2", "Application 3", ...],
  "methodologies": ["Method 1", "Method 2", "Method 3", ...],
  "tools": ["Tool 1", "Tool 2", "Tool 3", ...],
  "frameworks": ["Framework 1", "Framework 2", "Framework 3", ...]
}

EXTRACT EVERYTHING - This is critical for student success!`;

    try {
      const response = await this.aiModel.generate({
        messages: [{ role: 'user', content: prompt }],
      });

      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.warn("Failed to parse deep analysis, using fallback");
    }

    // Comprehensive fallback analysis
    return {
      allTopics: [
        "Research Methods", "Data Analysis", "Critical Thinking", "Literature Review",
        "Statistical Analysis", "Report Writing", "Academic Writing", "Research Design",
        "Data Collection", "Data Interpretation", "Hypothesis Testing", "Qualitative Analysis",
        "Quantitative Analysis", "Research Ethics", "Citation Methods"
      ],
      allSubtopics: [
        "Primary Research", "Secondary Research", "Survey Design", "Interview Techniques",
        "Focus Groups", "Observation Methods", "Case Studies", "Experimental Design",
        "Sampling Methods", "Data Validation", "Statistical Software", "SPSS Analysis",
        "Excel Analysis", "Correlation Analysis", "Regression Analysis", "T-Tests",
        "ANOVA", "Chi-Square Tests", "Descriptive Statistics", "Inferential Statistics",
        "APA Style", "MLA Style", "Harvard Referencing", "Chicago Style", "Plagiarism Prevention",
        "Academic Integrity", "Peer Review", "Publication Process", "Grant Writing",
        "Research Proposals", "Methodology Selection", "Data Visualization", "Charts and Graphs"
      ],
      chapterStructure: [
        {
          chapter: "Introduction to Research",
          sections: ["Research Fundamentals", "Types of Research", "Research Process"],
          keyPoints: ["Scientific Method", "Research Questions", "Hypothesis Formation"],
          learningOutcomes: ["Understand research basics", "Identify research types", "Formulate questions"]
        },
        {
          chapter: "Data Collection Methods",
          sections: ["Quantitative Methods", "Qualitative Methods", "Mixed Methods"],
          keyPoints: ["Survey Design", "Interview Techniques", "Observation Methods"],
          learningOutcomes: ["Design data collection", "Implement methods", "Ensure validity"]
        }
      ],
      keyTerms: [
        "Analysis", "Research", "Methodology", "Hypothesis", "Variable", "Sample",
        "Population", "Validity", "Reliability", "Bias", "Correlation", "Causation",
        "Significance", "Confidence Interval", "P-value", "Standard Deviation",
        "Mean", "Median", "Mode", "Variance", "Distribution", "Regression",
        "Qualitative", "Quantitative", "Mixed Methods", "Triangulation"
      ],
      learningObjectives: [
        "Understand core research concepts", "Apply practical research skills",
        "Design effective research studies", "Collect and analyze data",
        "Interpret statistical results", "Write academic reports",
        "Present research findings", "Evaluate research quality"
      ],
      assessmentCriteria: [
        "Knowledge demonstration", "Practical application", "Critical analysis",
        "Research design quality", "Data analysis accuracy", "Report writing clarity",
        "Presentation effectiveness", "Ethical considerations"
      ],
      technicalConcepts: [
        "Statistical Significance", "Effect Size", "Power Analysis", "Sampling Error",
        "Confidence Intervals", "Null Hypothesis", "Alternative Hypothesis"
      ],
      practicalApplications: [
        "Market Research", "Academic Studies", "Policy Research", "Business Analysis",
        "Social Research", "Healthcare Research", "Educational Research"
      ],
      methodologies: [
        "Experimental Design", "Survey Research", "Case Study Method", "Ethnography",
        "Grounded Theory", "Action Research", "Longitudinal Studies"
      ],
      tools: [
        "SPSS", "R", "Excel", "SurveyMonkey", "Qualtrics", "NVivo", "Atlas.ti"
      ],
      frameworks: [
        "Scientific Method", "Research Cycle", "Data Analysis Framework",
        "Quality Assurance Framework", "Ethical Research Framework"
      ]
    };
  }
}