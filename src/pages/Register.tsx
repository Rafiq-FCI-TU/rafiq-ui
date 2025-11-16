import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import AuthLogo from '../components/AuthComponents/AuthLogo';
import AuthHeader from '../components/AuthComponents/AuthHeader';
import AuthToggle from '../components/AuthComponents/AuthToggle';
import ProgressBar from '../components/AuthComponents/ProgressBar';
import BrandingSection from '../components/AuthComponents/BrandingSection';
import AccountTypeSelector from '../components/AuthComponents/AccountTypeSelector';
import FamilyRegistrationForm from '../components/AuthComponents/FamilyRegistrationForm';
import SpecialistRegistrationForm from '../components/AuthComponents/SpecialistRegistrationForm';
import ChildDetailsForm from '../components/AuthComponents/ChildDetailsForm';
import ConsentForm from '../components/AuthComponents/ConsentForm';
import AssessmentQuestionnaire from '../components/AuthComponents/AssessmentQuestionnaire';

export default function Register() {
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  const [showSpecialistForm, setShowSpecialistForm] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);
  const [showConsentForm, setShowConsentForm] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  
  const [familyData, setFamilyData] = useState<any>(null);
  const [childData, setChildData] = useState<any>(null);
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

  const handleFamilyFormSubmit = (values: any) => {
    console.log('Family form submitted:', values);
    setFamilyData(values);
    setShowChildForm(true);
  };

  const handleSpecialistFormSubmit = (values: any) => {
    console.log('Specialist form submitted:', values);
    navigate('/dashboard');
  };

  const handleChildFormSubmit = (values: any) => {
    console.log('Child form submitted:', values);
    setChildData(values);
    setShowConsentForm(true);
  };

  const handleConsentFormSubmit = (values: any) => {
    console.log('Consent form submitted:', values);
    setConsentData(values);
    setShowAssessmentForm(true);
  };

  const handleAssessmentFormSubmit = (values: any) => {
    console.log('Assessment form submitted:', values);
    setAssessmentData(values);
    console.log('Complete registration data:', { familyData, childData, consent: consentData, assessment: values });
    navigate('/dashboard');
  };

  const handleBackToConsentForm = () => {
    setShowAssessmentForm(false);
  };

  const handleBackToChildForm = () => {
    setShowConsentForm(false);
  };

  const handleBackToFamilyForm = () => {
    setShowChildForm(false);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const getCurrentStep = () => {
    if (!showFamilyForm && !showSpecialistForm && !showChildForm && !showConsentForm && !showAssessmentForm) return 1;
    if ((showFamilyForm || showSpecialistForm) && !showChildForm && !showConsentForm && !showAssessmentForm) return 1;
    if (showChildForm && !showConsentForm && !showAssessmentForm) return 2;
    if (showConsentForm && !showAssessmentForm) return 3;
    if (showAssessmentForm) return 4;
    return 1;
  };

  const getProgressPercentage = () => {
    const step = getCurrentStep();
    return Math.round((step / 4) * 100);
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-6 lg:px-12 py-4">
        <div className="w-full max-w-md">
          <button
            onClick={handleBackToHome}
            className="mb-3 flex items-center text-gray-600 hover:text-green-600 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 ml-1" />
            <span>العودة للصفحة الرئيسية</span>
          </button>
          
          <AuthLogo />
          <AuthHeader title="مرحبا" subtitle="سجل لتبداء رحلتك الان" />
          <AuthToggle 
            activeTab="register" 
            loginLabel="سجل الان" 
            registerLabel="حساب جديد" 
          />

          {(showFamilyForm || showSpecialistForm || showChildForm || showConsentForm || showAssessmentForm) && (
            <ProgressBar 
              currentStep={getCurrentStep()} 
              totalSteps={4} 
              percentage={getProgressPercentage()}
            />
          )}

          {!showFamilyForm && !showSpecialistForm && !showChildForm && !showConsentForm && !showAssessmentForm ? (
            <AccountTypeSelector onSelectAccountType={handleAccountTypeSelect} />
          ) : showFamilyForm && !showChildForm && !showConsentForm && !showAssessmentForm ? (
            <FamilyRegistrationForm 
              onSubmit={handleFamilyFormSubmit} 
              initialData={familyData}
            />
          ) : showSpecialistForm ? (
            <SpecialistRegistrationForm onSubmit={handleSpecialistFormSubmit} />
          ) : showChildForm && !showConsentForm && !showAssessmentForm ? (
            <ChildDetailsForm 
              onSubmit={handleChildFormSubmit} 
              onBack={handleBackToFamilyForm}
              initialData={childData}
            />
          ) : showConsentForm && !showAssessmentForm ? (
            <ConsentForm
              onSubmit={handleConsentFormSubmit}
              onBack={handleBackToChildForm}
              initialData={consentData}
            />
          ) : showAssessmentForm ? (
            <AssessmentQuestionnaire
              onSubmit={handleAssessmentFormSubmit}
              onBack={handleBackToConsentForm}
              initialData={assessmentData}
            />
          ) : null}
        </div>
      </div>

      <BrandingSection imageSrc="/loginphoto2.png" imageAlt="Children" />
    </div>
  );
}