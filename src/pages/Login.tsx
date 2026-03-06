import { useNavigate } from 'react-router';
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4 lg:p-8">
      <div className="w-full max-w-5xl flex bg-white rounded-[32px] shadow-xl overflow-hidden min-h-[700px]">
        {/* Left side: Branding */}
        <BrandingSection imageSrc="/login_photo.jpeg" imageAlt="Child playing with blocks" />

        {/* Right side: Form */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
          <div className="w-full max-w-[400px] mx-auto">
            <AuthHeader
              title="Sign In"
              subtitle="Enter your details to access your account"
              onBack={handleBackToHome}
            />
            <AuthToggle
              activeTab="login"
              loginLabel="Sign In"
              registerLabel="Register"
            />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
