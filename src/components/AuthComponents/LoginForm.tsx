import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
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
            label="Email"
            placeholder="Enter your email"
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
          />

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center group cursor-pointer">
              <Field
                type="checkbox"
                name="rememberMe"
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 transition-colors cursor-pointer"
                required
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
            </label>
            <Link
              to="/forgotPassword"
              className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-green-600 hover:-translate-y-0.5 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center mb-4"
          >
            Sign In
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-4 text-sm text-gray-500 absolute font-medium">Or continue with</span>
          </div>

          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 px-4 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            <img src="/search.png" alt="Google" className='w-5 h-5 mr-3' />
            Google
          </button>

          <div className="text-center mt-8 pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-gray-900 hover:underline font-semibold">
                Create new account
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
