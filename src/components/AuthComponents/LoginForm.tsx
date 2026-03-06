import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const validationSchema = {
  email: (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address';
    }
    return null;
  },
  password: (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return null;
  },
};

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const validateForm = (values: FormValues) => {
    const newErrors: { [key: string]: string } = {};

    const emailError = validationSchema.email(values.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validationSchema.password(values.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (values: FormValues) => {
    if (validateForm(values)) {
      console.log('Form submitted:', values);
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        console.log('Google login success:', userInfo.data);

        navigate('/dashboard');
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
    },
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-5">
          <EmailInput
            label="Email Address"
            placeholder="name@example.com"
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            error={errors.password}
          />

          <div className="flex justify-end mb-6">
            <Link
              to="/forgotPassword"
              className="text-sm font-semibold text-[#188146] hover:text-[#116937] transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#188147] text-white py-3.5 px-4 rounded-[12px] font-semibold hover:bg-[#116937] transition-all duration-200 shadow-sm flex items-center justify-center mb-4"
          >
            Sign In
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-4 text-sm text-gray-500 absolute font-medium">Or continue with</span>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-[12px] font-semibold text-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center shadow-sm"
            >
              Google
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
