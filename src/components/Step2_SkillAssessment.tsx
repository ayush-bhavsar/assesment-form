import React, { useState } from 'react';
import styled from 'styled-components';
import type { Question } from '../types/';

// Mock Data - In a real app, this would come from your backend/Gemini API
const mockQuestions: Question[] = [
  {
    id: 1,
    text: 'What is the primary purpose of the `useState` hook in React?',
    options: ['To manage side effects', 'To manage state in functional components', 'To fetch data', 'To create context'],
  },
  {
    id: 2,
    text: 'In TypeScript, which type is used to represent a value that can be one of several types?',
    options: ['Interface', 'Enum', 'Union Type', 'Any'],
  },
  {
    id: 3,
    text: 'What does the `git clone` command do?',
    options: ['Creates a new branch', 'Stages changes for a commit', 'Creates a local copy of a remote repository', 'Pushes changes to a remote repository'],
  }
];

// Styled Components
const AssessmentContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e2e8f0;
  border-radius: 999px;
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 10px;
  width: ${props => props.progress}%;
  background-color: #3b82f6;
  border-radius: 999px;
  transition: width 0.3s ease-in-out;
`;

const QuestionHeader = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionLabel = styled.label<{ isSelected: boolean }>`
  display: block;
  padding: 1rem;
  border: 1px solid ${props => props.isSelected ? '#3b82f6' : '#cbd5e1'};
  background-color: ${props => props.isSelected ? '#eff6ff' : 'transparent'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
  }
`;

const OptionInput = styled.input`
  display: none;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
`;

const NavButton = styled.button`
  padding: 0.7rem 1.5rem;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  color: #334155;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: 0.7rem 1.5rem;
  border: none;
  background-color: #16a34a;
  color: white;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #15803d;
  }
`;

// Component Props
interface Step2Props {
  onTestSubmit: (answers: Record<number, string>) => void;
}

const Step2_SkillAssessment: React.FC<Step2Props> = ({ onTestSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleOptionChange = (questionId: number, option: string) => {
    setAnswers(prev => ({...prev, [questionId]: option}));
  };

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  return (
    <AssessmentContainer>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      
      <QuestionHeader>Question {currentQuestionIndex + 1} of {mockQuestions.length}</QuestionHeader>
      <QuestionText>{currentQuestion.text}</QuestionText>
      
      <OptionsContainer>
        {currentQuestion.options.map(option => (
          <OptionLabel key={option} isSelected={answers[currentQuestion.id] === option}>
            <OptionInput 
              type="radio" 
              name={`question-${currentQuestion.id}`}
              value={option}
              checked={answers[currentQuestion.id] === option}
              onChange={() => handleOptionChange(currentQuestion.id, option)}
            />
            {option}
          </OptionLabel>
        ))}
      </OptionsContainer>

      <Navigation>
        <NavButton 
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </NavButton>
        {currentQuestionIndex < mockQuestions.length - 1 ? (
          <NavButton onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
            Next
          </NavButton>
        ) : (
          <SubmitButton onClick={() => onTestSubmit(answers)}>
            Submit Test
          </SubmitButton>
        )}
      </Navigation>
    </AssessmentContainer>
  );
};

export default Step2_SkillAssessment;