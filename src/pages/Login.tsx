import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import AuthLogo from '../components/AuthComponents/AuthLogo';
import AuthHeader from '../components/AuthComponents/AuthHeader';
import AuthToggle from '../components/AuthComponents/AuthToggle';
import LoginForm from '../components/AuthComponents/LoginForm';
import BrandingSection from '../components/AuthComponents/BrandingSection';

export default function Login() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
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
            <span>Back to Home</span>
          </button>
          
          <AuthLogo />
          <AuthHeader title="Welcome" subtitle="Login to start the journey" />
          <AuthToggle 
            activeTab="login" 
            loginLabel="Sign In" 
            registerLabel="New Account" 
          />
          <LoginForm />
        </div>
      </div>

      <BrandingSection imageSrc="/loginphoto.png" imageAlt="Children" />
    </div>
  );
}
