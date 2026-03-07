import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthHeader from '../components/AuthComponents/AuthHeader';
import AuthToggle from '../components/AuthComponents/AuthToggle';
import BrandingSection from '../components/AuthComponents/BrandingSection';
import AccountTypeSelector from '../components/AuthComponents/AccountTypeSelector';
import FamilyRegistrationForm from '../components/AuthComponents/FamilyRegistrationForm';
import ChildDetailsForm from '../components/AuthComponents/ChildDetailsForm';
import FamilyPasswordForm from '../components/AuthComponents/FamilyPasswordForm';
import SpecialistRegistrationForm from '../components/AuthComponents/SpecialistRegistrationForm';
import SpecialistPasswordForm from '../components/AuthComponents/SpecialistPasswordForm';
import ConsentForm from '../components/AuthComponents/ConsentForm';
import AssessmentQuestionnaire from '../components/AuthComponents/AssessmentQuestionnaire';

export default function Register() {
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);
  const [showFamilyPasswordForm, setShowFamilyPasswordForm] = useState(false);
  const [familyData, setFamilyData] = useState<any>(null);
  const [childData, setChildData] = useState<any>(null);

  const [showSpecialistForm, setShowSpecialistForm] = useState(false);
  const [showSpecialistPasswordForm, setShowSpecialistPasswordForm] = useState(false);
  const [specialistData, setSpecialistData] = useState<any>(null);

  const [showConsentForm, setShowConsentForm] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [currentAssessmentQuestion, setCurrentAssessmentQuestion] = useState(1);

  const getAssessmentImage = () => {
    if (currentAssessmentQuestion <= 3) return '/Q1.jpeg';
    if (currentAssessmentQuestion <= 6) return '/Q2.jpeg';
    return '/Q3.jpeg';
  };

  const [consentData, setConsentData] = useState<any>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const navigate = useNavigate();

  const handleAccountTypeSelect = (type: 'family' | 'specialist') => {
    if (type === 'family') {
      setShowFamilyForm(true);
      setShowSpecialistForm(false);
    } else {
      setShowSpecialistForm(true);
      setShowFamilyForm(false);
    }
  };

  // --- Family Handlers ---
  const handleFamilyFormSubmit = (values: any) => {
    console.log('Family form submitted:', values);
    setFamilyData(values);
    setShowChildForm(true);
  };

  const handleChildFormSubmit = (values: any) => {
    console.log('Child form submitted:', values);
    setChildData(values);
    setShowFamilyPasswordForm(true);
  };

  const handleFamilyPasswordSubmit = (values: any) => {
    console.log('Family Password form submitted:', values);
    setShowConsentForm(true);
  };

  // --- Specialist Handlers ---
  const handleSpecialistFormSubmit = (values: any) => {
    console.log('Specialist form submitted:', values);
    setSpecialistData(values);
    setShowSpecialistPasswordForm(true);
  };

  const handleSpecialistPasswordSubmit = (values: any) => {
    console.log('Specialist Password form submitted:', values);
    console.log('Complete registration data (Specialist):', { specialistData, passwordData: values });
    navigate('/dashboard');
  };

  // --- Common Handlers ---
  const handleConsentFormSubmit = (values: any) => {
    console.log('Consent form submitted:', values);
    setConsentData(values);
    setShowAssessmentForm(true);
  };

  const handleAssessmentFormSubmit = (values: any) => {
    console.log('Assessment form submitted:', values);
    setAssessmentData(values);
    console.log('Complete registration data:', { familyData, childData, specialistData, consent: consentData, assessment: values });
    navigate('/dashboard');
  };

  // --- Back Handlers ---
  const handleBackToHome = () => {
    navigate('/');
  };

  // Family Backs
  const handleBackToFamilyForm = () => {
    setShowChildForm(false);
  };

  const handleBackToChildForm = () => {
    setShowFamilyPasswordForm(false);
  };

  // Specialist Backs
  const handleBackToSpecialistForm = () => {
    setShowSpecialistPasswordForm(false);
  };

  // Common Backs
  const handleBackToPasswordForm = () => {
    setShowConsentForm(false);
  };

  const isFullScreenFlowActive =
    showFamilyForm || showChildForm || showFamilyPasswordForm ||
    showSpecialistForm || showSpecialistPasswordForm ||
    showConsentForm || showAssessmentForm;

  if (isFullScreenFlowActive) {
    return (
      <div className="min-h-screen bg-[#DDE4DE] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Logo Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-[42px] h-[42px] bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Rafiq" className="w-[85%] h-[85%] object-contain" />
          </div>
          <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">Rafiq</h1>
        </div>

        {/* Form Container */}
        <div className={`w-full bg-white rounded-[24px] shadow-sm overflow-hidden flex ${showAssessmentForm ? 'max-w-[800px]' : 'max-w-[500px]'}`}>

          {/* Left Image Pane (Assessment Only) */}
          {showAssessmentForm && (
            <div className="hidden md:block w-1/2 relative bg-gray-100">
              <img
                src={getAssessmentImage()}
                alt="Child Assessment"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              />
            </div>
          )}

          <div className={`p-8 md:p-10 ${showAssessmentForm ? 'w-full md:w-1/2' : 'w-full'}`}>
            {/* Family Paths */}
            {showFamilyForm && !showChildForm && !showFamilyPasswordForm && !showConsentForm && !showAssessmentForm && (
              <FamilyRegistrationForm
                onSubmit={handleFamilyFormSubmit}
                onBack={() => setShowFamilyForm(false)}
                initialData={familyData}
              />
            )}
            {showChildForm && !showFamilyPasswordForm && !showConsentForm && !showAssessmentForm && (
              <ChildDetailsForm
                onSubmit={handleChildFormSubmit}
                onBack={handleBackToFamilyForm}
                initialData={childData}
                token={familyData?.token}
              />
            )}
            {showFamilyPasswordForm && !showConsentForm && !showAssessmentForm && (
              <FamilyPasswordForm
                onSubmit={handleFamilyPasswordSubmit}
                onBack={handleBackToChildForm}
                token={familyData?.token}
              />
            )}

            {/* Specialist Paths */}
            {showSpecialistForm && !showSpecialistPasswordForm && !showConsentForm && !showAssessmentForm && (
              <SpecialistRegistrationForm
                onSubmit={handleSpecialistFormSubmit}
                onBack={() => setShowSpecialistForm(false)}
                initialData={specialistData}
              />
            )}
            {showSpecialistPasswordForm && !showConsentForm && !showAssessmentForm && (
              <SpecialistPasswordForm
                onSubmit={handleSpecialistPasswordSubmit}
                onBack={handleBackToSpecialistForm}
                token={specialistData?.token}
              />
            )}

            {/* Common Paths */}
            {showConsentForm && !showAssessmentForm && (
              <ConsentForm
                onSubmit={handleConsentFormSubmit}
                onBack={handleBackToPasswordForm}
                initialData={consentData}
              />
            )}
            {showAssessmentForm && (
              <AssessmentQuestionnaire
                onSubmit={handleAssessmentFormSubmit}
                onBack={() => setShowAssessmentForm(false)}
                initialData={assessmentData}
                onQuestionChange={setCurrentAssessmentQuestion}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4 lg:p-8">
      <div className="w-full max-w-5xl flex bg-white rounded-[32px] shadow-xl overflow-hidden min-h-[700px]">
        {/* Left side: Branding */}
        <BrandingSection imageSrc="/register_photo.jpeg" imageAlt="Registration" hideOverlayText />

        {/* Right side: Form area */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 relative">
          <div className="w-full max-w-[400px] mx-auto">
            <AuthHeader
              title="Register"
              subtitle="Enter your details to access your account"
              onBack={handleBackToHome}
            />

            <AuthToggle
              activeTab="register"
              loginLabel="Sign In"
              registerLabel="Register"
            />

            <AccountTypeSelector onSelectAccountType={handleAccountTypeSelect} />

          </div>
        </div>
      </div>
    </div>
  );
}