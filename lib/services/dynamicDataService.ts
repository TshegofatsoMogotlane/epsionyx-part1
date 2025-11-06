// Dynamic data service for real-time industry information
import { anthropic } from "@inngest/agent-kit";
import { config } from "../config";

export interface SalaryRange {
  level: string;
  min: number;
  max: number;
  currency: string;
  location: string;
}

export interface CompanyInfo {
  name: string;
  industry: string;
  size: string;
  relevance: string;
}

export interface TechnologyTrend {
  name: string;
  category: string;
  popularity: number;
  growth: string;
}

export class DynamicDataService {
  private aiModel: any;

  constructor() {
    this.aiModel = anthropic({
      apiKey: config.anthropic.apiKey,
      model: config.anthropic.model,
      defaultParameters: { max_tokens: config.anthropic.maxTokens },
    });
  }

  async getCurrentSalaryRanges(
    jobRoles: string[],
    location: string = "United States",
    year: number = new Date().getFullYear()
  ): Promise<SalaryRange[]> {
    try {
      const prompt = `Provide current ${year} salary ranges for these job roles in ${location}:
      ${jobRoles.join(', ')}
      
      Return as JSON array with format:
      [{"level": "Entry Level (0-2 years)", "min": 70000, "max": 95000, "currency": "USD", "location": "${location}"}]
      
      Use current market data and be realistic about salary ranges.`;

      const response = await this.aiModel.generate({
        messages: [{ role: 'user', content: prompt }],
      });

      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackSalaryRanges();
    } catch (error) {
      console.warn("Failed to fetch current salary data, using fallback:", error);
      return this.getFallbackSalaryRanges();
    }
  }

  async getRelevantCompanies(
    industry: string,
    academicModule: string,
    limit: number = 15
  ): Promise<CompanyInfo[]> {
    try {
      const prompt = `List ${limit} most relevant companies currently hiring for ${academicModule} roles in ${industry}.
      
      Focus on:
      - Companies actively hiring in 2024-2025
      - Mix of FAANG, unicorns, and established companies
      - Companies with strong ${academicModule} teams
      
      Return as JSON array:
      [{"name": "Google", "industry": "Technology", "size": "Large", "relevance": "Leading AI/ML research"}]`;

      const response = await this.aiModel.generate({
        messages: [{ role: 'user', content: prompt }],
      });

      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackCompanies(industry);
    } catch (error) {
      console.warn("Failed to fetch current company data, using fallback:", error);
      return this.getFallbackCompanies(industry);
    }
  }

  async getTrendingTechnologies(
    industry: string,
    academicModule: string,
    year: number = new Date().getFullYear()
  ): Promise<TechnologyTrend[]> {
    try {
      const prompt = `List trending technologies for ${academicModule} in ${industry} for ${year}.
      
      Include:
      - Programming languages and frameworks
      - Tools and platforms
      - Emerging technologies
      - Industry-specific tech stacks
      
      Return as JSON array:
      [{"name": "Python", "category": "Programming Language", "popularity": 95, "growth": "Stable"}]`;

      const response = await this.aiModel.generate({
        messages: [{ role: 'user', content: prompt }],
      });

      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackTechnologies();
    } catch (error) {
      console.warn("Failed to fetch trending technologies, using fallback:", error);
      return this.getFallbackTechnologies();
    }
  }

  async getRelevantCertifications(
    jobRoles: string[],
    industry: string
  ): Promise<string[]> {
    try {
      const prompt = `List most valuable certifications for these roles in ${industry}:
      ${jobRoles.join(', ')}
      
      Focus on:
      - Currently recognized certifications
      - Industry-standard credentials
      - Certifications that improve hiring chances
      
      Return as JSON array of strings:
      ["AWS Certified Solutions Architect", "Google Cloud Professional"]`;

      const response = await this.aiModel.generate({
        messages: [{ role: 'user', content: prompt }],
      });

      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getFallbackCertifications();
    } catch (error) {
      console.warn("Failed to fetch certifications, using fallback:", error);
      return this.getFallbackCertifications();
    }
  }

  // Fallback methods for when AI calls fail
  private getFallbackSalaryRanges(): SalaryRange[] {
    return [
      { level: "Entry Level (0-2 years)", min: 65000, max: 85000, currency: "USD", location: "United States" },
      { level: "Mid Level (3-5 years)", min: 85000, max: 120000, currency: "USD", location: "United States" },
      { level: "Senior Level (5+ years)", min: 120000, max: 160000, currency: "USD", location: "United States" },
      { level: "Staff/Principal", min: 160000, max: 250000, currency: "USD", location: "United States" },
    ];
  }

  private getFallbackCompanies(industry: string): CompanyInfo[] {
    return [
      { name: "Google", industry: "Technology", size: "Large", relevance: "Leading tech innovation" },
      { name: "Microsoft", industry: "Technology", size: "Large", relevance: "Enterprise solutions" },
      { name: "Amazon", industry: "Technology", size: "Large", relevance: "Cloud computing leader" },
      { name: "Meta", industry: "Technology", size: "Large", relevance: "Social media and VR" },
      { name: "Apple", industry: "Technology", size: "Large", relevance: "Consumer technology" },
    ];
  }

  private getFallbackTechnologies(): TechnologyTrend[] {
    return [
      { name: "Python", category: "Programming Language", popularity: 95, growth: "Stable" },
      { name: "JavaScript", category: "Programming Language", popularity: 90, growth: "Stable" },
      { name: "React", category: "Frontend Framework", popularity: 85, growth: "Growing" },
      { name: "AWS", category: "Cloud Platform", popularity: 80, growth: "Growing" },
      { name: "Docker", category: "DevOps Tool", popularity: 75, growth: "Stable" },
    ];
  }

  private getFallbackCertifications(): string[] {
    return [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional",
      "Microsoft Azure Fundamentals",
      "Project Management Professional (PMP)",
      "Certified Scrum Master",
    ];
  }
}