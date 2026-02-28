import { useState } from 'react';
import { Formik, Form } from 'formik';
import { User, ArrowRight } from 'lucide-react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FamilyRegistrationFormProps {
  onSubmit: (values: FormValues) => void;
  initialData?: FormValues | null;
}

const validationSchema = {
  name: (value: string) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    return null;
  },
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
  confirmPassword: (value: string, password: string) => {
    if (!value) return 'Confirm password is required';
    if (value !== password) return 'Passwords do not match';
    return null;
  },
};

export default function FamilyRegistrationForm({ onSubmit, initialData }: FamilyRegistrationFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const initialValues: FormValues = initialData || {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validateForm = (values: FormValues) => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validationSchema.name(values.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validationSchema.email(values.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validationSchema.password(values.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validationSchema.confirmPassword(values.confirmPassword, values.password);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (values: FormValues) => {
    if (validateForm(values)) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-4">
          <TextInput
            label="Name"
            placeholder="Please enter your name"
            name="name"
            icon={User}
            error={errors.name}
          />

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
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
}
