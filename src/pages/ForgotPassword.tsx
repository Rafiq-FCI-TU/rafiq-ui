import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import AuthHeader from '../components/AuthComponents/AuthHeader';
import BrandingSection from '../components/AuthComponents/BrandingSection';
import EmailInput from '../components/AuthComponents/EmailInput';
import PasswordInput from '../components/AuthComponents/PasswordInput';
import OtpInput from '../components/AuthComponents/OtpInput';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleEmailSubmit = async (values: { email: string }) => {
    const emailError = validateEmail(values.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await axios.post('https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/Auth/forgot-password', {
        email: values.email
      });

      if (response.data?.success) {
        setEmail(values.email);
        setStep('otp');
      } else {
        setErrors({ email: response.data?.message || 'Error sending reset link' });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data?.message ||
          error.response.data?.detail ||
          error.response.data?.title ||
          'Error sending reset link';
        setErrors({ email: msg });
      } else {
        setErrors({ email: 'An unexpected error occurred. Please try again later.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (otpValue: string) => {
    if (otpValue.length !== 6) {
      setErrors({ otp: 'Please enter the 6-digit code' });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await axios.post('https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/Auth/verify-otp', {
        email: email,
        otp: otpValue
      });

      if (response.data?.success) {
        setOtp(otpValue);
        setStep('reset');
      } else {
        setErrors({ otp: response.data?.message || 'Invalid verification code' });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data?.message ||
          error.response.data?.detail ||
          error.response.data?.title ||
          'Invalid verification code';
        setErrors({ otp: msg });
      } else {
        setErrors({ otp: 'An unexpected error occurred.' });
      }
    } finally {
      setIsLoading(false);
    }
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

  const handleResetSubmit = async (values: { password: string; confirmPassword: string }) => {
    const newErrors: { [key: string]: string } = {};

    const passwordError = validatePassword(values.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await axios.post('https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/Auth/reset-password', {
        email: email,
        otp: otp,
        newPassword: values.password,
        confirmPassword: values.confirmPassword
      });

      if (response.data?.success) {
        navigate('/login');
      } else {
        setErrors({ api: response.data?.message || 'Failed to reset password' });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data?.message ||
          error.response.data?.detail ||
          error.response.data?.title ||
          'Failed to reset password';
        setErrors({ api: msg });
      } else {
        setErrors({ api: 'An unexpected error occurred.' });
      }
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4 lg:p-8">
      <div className="w-full max-w-5xl flex bg-white rounded-[32px] shadow-xl overflow-hidden min-h-[700px]">
        {/* Left side: Branding */}
        <BrandingSection imageSrc="/login_photo.jpeg" imageAlt="Child playing with blocks" />

        {/* Right side: Form */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
          <div className="w-full max-w-[400px] mx-auto">
            <AuthHeader
              title="Forgot Password"
              subtitle={getStepTitle()}
              onBack={handleBackToLogin}
            />

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
                      disabled={isLoading}
                      className="w-full bg-[#188147] text-white py-3.5 px-4 rounded-[12px] font-semibold hover:bg-[#116937] transition-all duration-200 shadow-sm flex items-center justify-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Search
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            )}

            {step === 'otp' && (
              <div className="space-y-6">
                <div className="text-sm text-gray-600 mb-4 mt-6">
                  Verification code sent to {email}
                </div>

                <div className="flex justify-center mb-2">
                  {isLoading && <Loader2 className="w-6 h-6 animate-spin text-[#188147]" />}
                </div>

                {errors.otp && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-center mb-4">
                    {errors.otp}
                  </div>
                )}

                <OtpInput
                  length={6}
                  onComplete={handleOtpSubmit}
                  error={errors.otp}
                />

                <button
                  onClick={() => setStep('email')}
                  disabled={isLoading}
                  className="w-full text-[#188147] hover:text-[#116937] text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
                    {errors.api && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px] mb-4">
                        {errors.api}
                      </div>
                    )}

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
                      disabled={isLoading}
                      className="w-full bg-[#188147] text-white py-3.5 px-4 rounded-[12px] font-semibold hover:bg-[#116937] transition-all duration-200 shadow-sm flex items-center justify-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Reset Password
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
