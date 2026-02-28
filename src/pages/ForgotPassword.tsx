import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Formik, Form } from 'formik';
import AuthLogo from '../components/AuthComponents/AuthLogo';
import BrandingSection from '../components/AuthComponents/BrandingSection';
import EmailInput from '../components/AuthComponents/EmailInput';
import PasswordInput from '../components/AuthComponents/PasswordInput';
import OtpInput from '../components/AuthComponents/OtpInput';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const validateEmail = (emailValue: string) => {
    if (!emailValue) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailValue)) {
      return 'Invalid email address';
    }
    return null;
  };

  const handleEmailSubmit = (values: { email: string }) => {
    const emailError = validateEmail(values.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setEmail(values.email);
    setErrors({});
    setStep('otp');
  };

  const handleOtpSubmit = (otpValue: string) => {
    if (otpValue.length !== 4) {
      setErrors({ otp: 'Please enter the 4-digit code' });
      return;
    }
    setErrors({});
    setStep('reset');
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return 'Confirm password is required';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleResetSubmit = (values: { password: string; confirmPassword: string }) => {
    const newErrors: { [key: string]: string } = {};

    const passwordError = validatePassword(values.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    navigate('/login');
  };

  const getStepTitle = () => {
    switch (step) {
      case 'email': return 'Enter Email';
      case 'otp': return 'Enter Verification Code';
      case 'reset': return 'Enter New Password';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-6 lg:px-12 py-4">
        <div className="w-full max-w-md">
          <button
            onClick={handleBackToLogin}
            className="mb-3 flex items-center text-gray-600 hover:text-green-600 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 ml-1" />
            <span>Back to Home</span>
          </button>

          <AuthLogo />

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Rafiq</h1>
            <p className="text-sm text-gray-600">
              {getStepTitle()}
            </p>
          </div>

          {step === 'email' && (
            <Formik
              initialValues={{ email: '' }}
              onSubmit={handleEmailSubmit}
            >
              {() => (
                <Form className="space-y-4">
                  <EmailInput
                    label="Email"
                    placeholder="Enter your email"
                    error={errors.email}
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                    Search
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    Back
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center text-sm text-gray-600 mb-4">
                Verification code sent to {email}
              </div>

              <OtpInput
                length={4}
                onComplete={handleOtpSubmit}
                error={errors.otp}
              />

              <button
                onClick={() => setStep('email')}
                className="w-full text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
              >
                Change Email
              </button>
            </div>
          )}

          {step === 'reset' && (
            <Formik
              initialValues={{ password: '', confirmPassword: '' }}
              onSubmit={handleResetSubmit}
            >
              {() => (
                <Form className="space-y-4">
                  <PasswordInput
                    label="New Password"
                    placeholder="Enter new password"
                    name="password"
                    error={errors.password}
                  />

                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    error={errors.confirmPassword}
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                    Reset Password
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>

      <BrandingSection imageSrc="/loginphoto.png" imageAlt="Children" />
    </div>
  );
}
