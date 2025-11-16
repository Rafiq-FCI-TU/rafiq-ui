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
    if (!value) return 'البريد الإلكتروني مطلوب';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'البريد الإلكتروني غير صحيح';
    }
    return null;
  },
  password: (value: string) => {
    if (!value) return 'كلمة المرور مطلوبة';
    if (value.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    return null;
  },
};

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const validateForm = (values: FormValues) => {
    const newErrors: {[key: string]: string} = {};
    
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
        <Form className="space-y-4">
          <EmailInput 
            label="الايميل"
            placeholder="ادخل الايميل الخاص بك"
            error={errors.email}
          />

          <PasswordInput 
            label="كلمة المرور"
            placeholder="ادخل كلمة المرور"
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <Field
                type="checkbox"
                name="rememberMe"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <span className="mr-2 text-sm text-gray-700">حفظ البيانات</span>
            </label>
            <Link
              to="/forgotPassword"
              className="text-sm text-red-500 hover:text-red-700"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 ml-2" />
            سجل الآن
          </button>

          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <div className="w-5 h-5 m-1 rounded-full flex items-center justify-center mr-2">
              <span className=""><img src="/search.png" alt="google" className='w-5 h-5' /></span>
            </div>
            استمرار باستخدام Google
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="text-green-500 hover:text-green-700 font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
