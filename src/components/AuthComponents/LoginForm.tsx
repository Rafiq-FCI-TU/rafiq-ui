import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router';
import { useGoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
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

  const handleSubmit = async (values: FormValues) => {
    if (validateForm(values)) {
      setErrors({});
      try {
        const response = await axios.post('https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/Auth/login', {
          email: values.email,
          password: values.password,
        });

        // The API returns { success: true, message: "OK", data: { isAuthenticated: true, token: "...", refreshToken: "..." } }
        const responseData = response.data?.data || response.data;

        if (responseData?.isAuthenticated || response.data?.success) {
          // Store tokens securely (localStorage used here for simplicity)
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('refreshToken', responseData.refreshToken);

          console.log('Login success:', response.data);
          navigate('/dashboard');
        } else {
          setErrors({ api: 'Login failed' });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Extract specific message based on API response
          const msg = error.response.data?.message ||
            error.response.data?.detail ||
            error.response.data?.title ||
            (typeof error.response.data === 'string' ? error.response.data : 'Invalid credentials');
          setErrors({ api: msg });
        } else {
          setErrors({ api: 'An unexpected error occurred. Please try again later.' });
        }
      }
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
      {({ isSubmitting }) => (
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

          {errors.api && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px] mt-2">
              {errors.api}
            </div>
          )}

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
            disabled={isSubmitting}
            className="w-full bg-[#188147] text-white py-3.5 px-4 rounded-[12px] font-semibold hover:bg-[#116937] transition-all duration-200 shadow-sm flex items-center justify-center mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Sign In'
            )}
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
