import  { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import type { UserProfile, ReportData } from './types';

// Import Components
import Step1_UserProfile from './components/Step1_UserProfile';
import Step2_SkillAssessment from './components/Step2_SkillAssessment';
import Step3_Report, { mockReport } from './components/Step3_Report';

// Global styles for the app
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
  }
`;

const AppContainer = styled.div`
  padding: 1rem;
`;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleProfileSubmit = (data: UserProfile) => {
    setUserProfile(data);
    // In a real app, you would now make an API call to Gemini
    // to generate questions based on the user's profile.
    setCurrentStep(2);
  };

  const handleTestSubmit = (answers: Record<number, string>) => {
    console.log('Final Answers:', answers);
    // Here, you would send the answers to your backend,
    // which then sends them to Gemini for evaluation and report generation.
    // We will use mock data for the report.
    setReportData(mockReport);
    setCurrentStep(3);
  };
  
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <Step1_UserProfile onProfileSubmit={handleProfileSubmit} />;
      case 2:
        return <Step2_SkillAssessment onTestSubmit={handleTestSubmit} />;
      case 3:
        // Ensure reportData is not null before rendering
        return reportData ? <Step3_Report reportData={reportData} /> : <p>Generating report...</p>;
      default:
        return <Step1_UserProfile onProfileSubmit={handleProfileSubmit} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {renderStep()}
      </AppContainer>
    </>
  );
}

export default App;