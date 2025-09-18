export interface UserProfile {
  qualification: string;
  knownSkills: string;
  skillsToLearn: string;
  workExperience: string;
  hobbies: string;
  jobStatus: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface SkillScore {
  skill: string;
  score: number; // e.g., 85 for 85%
}

export interface LearningPath {
  id: number;
  title: string;
  description: string;
}

export interface ReportData {
  skillProficiency: {
    overall: number;
    breakdown: SkillScore[];
  };
  careerReadiness: number;
  summary: string;
  recommendedSkills: string[];
  learningPaths: LearningPath[];
}