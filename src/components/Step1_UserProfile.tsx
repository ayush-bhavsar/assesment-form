import React, { useState } from 'react';
import styled from 'styled-components';

// Import the type we defined
import type { UserProfile } from '../types/index.ts';

// Styled Components for this form
const FormContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`;

const NextButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;


// Component props definition
interface Step1Props {
  onProfileSubmit: (data: UserProfile) => void;
}

const Step1_UserProfile: React.FC<Step1Props> = ({ onProfileSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({
    qualification: '',
    knownSkills: '',
    skillsToLearn: '',
    workExperience: '',
    hobbies: '',
    jobStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send data to the backend (Gemini API)
    // For now, we'll just pass it to the parent component
    console.log('Profile Submitted:', profile);
    onProfileSubmit(profile);
  };

  return (
    <FormContainer>
      <Title>Complete Your Profile</Title>
      <Subtitle>Tell us a bit about yourself to get personalized career recommendations.</Subtitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="qualification">Highest Qualification</Label>
          <Select id="qualification" name="qualification" value={profile.qualification} onChange={handleChange} required>
            <option value="">Select your highest qualification</option>
            <option value="highschool">High School</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="knownSkills">Known Skills (comma-separated)</Label>
          <Input id="knownSkills" name="knownSkills" value={profile.knownSkills} onChange={handleChange} placeholder="e.g., JavaScript, Python, Data Analysis" required />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="skillsToLearn">Skills to Learn (comma-separated)</Label>
          <Input id="skillsToLearn" name="skillsToLearn" value={profile.skillsToLearn} onChange={handleChange} placeholder="e.g., Machine Learning, Cloud Computing" required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="workExperience">Work Experience</Label>
          <TextArea id="workExperience" name="workExperience" value={profile.workExperience} onChange={handleChange} placeholder="Describe your work experience" />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="hobbies">Hobbies/Interests</Label>
          <TextArea id="hobbies" name="hobbies" value={profile.hobbies} onChange={handleChange} placeholder="List your hobbies and interests" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="jobStatus">Current Job Status</Label>
          <Select id="jobStatus" name="jobStatus" value={profile.jobStatus} onChange={handleChange} required>
            <option value="">Select your current status</option>
            <option value="student">Student</option>
            <option value="fresher">Fresher</option>
            <option value="employed">Employed</option>
          </Select>
        </FormGroup>
        
        <NextButton type="submit">Next</NextButton>
      </Form>
    </FormContainer>
  );
};

export default Step1_UserProfile;