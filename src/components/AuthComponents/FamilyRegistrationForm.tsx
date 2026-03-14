import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import EmailInput from './EmailInput';
import TextInput from './TextInput';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  token?: string;
}

interface FamilyRegistrationFormProps {
  onSubmit: (values: FormValues) => void;
  onBack: () => void;
  initialData?: FormValues | null;
}

const validationSchema = {
  name: (value: string) => {
    if (!value) return 'Required field';
    return null;
  },
  email: (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email';
    }
    return null;
  },
};

export default function FamilyRegistrationForm({ onSubmit, onBack, initialData }: FamilyRegistrationFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const initialValues: FormValues = initialData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    relationship: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  };

  const validateForm = (values: FormValues) => {
    const newErrors: { [key: string]: string } = {};

    if (validationSchema.name(values.firstName)) newErrors.firstName = 'First Name is required';
    if (validationSchema.name(values.lastName)) newErrors.lastName = 'Last Name is required';
    const emailError = validationSchema.email(values.email);
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (values: FormValues) => {
    if (validateForm(values)) {
      setErrors({});
      try {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phone,
          relationship: values.relationship,
          address: values.address,
          emergencyContactName: values.emergencyContactName,
          emergencyContactPhone: values.emergencyContactPhone
        };

        const response = await axios.post('https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/FamilyRegistration/step1', payload);

        if (response.data?.success) {
          
          const receivedToken = response.data?.data?.token || "";
          onSubmit({ ...values, token: receivedToken });
        } else {
          setErrors({ api: response.data?.message || 'Registration failed' });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const msg = error.response.data?.message ||
            error.response.data?.detail ||
            error.response.data?.title ||
            (typeof error.response.data === 'string' ? error.response.data : 'Registration failed');
          setErrors({ api: msg });
        } else {
          setErrors({ api: 'An unexpected error occurred. Please try again later.' });
        }
      }
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Family Registration</h2>
        <p className="text-sm font-medium text-gray-500">Let's start with your information</p>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {errors.api && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px]">
                {errors.api}
              </div>
            )}
            <TextInput
              label="First Name *"
              placeholder="Enter your first name"
              name="firstName"
              error={errors.firstName}
            />

            <TextInput
              label="Last Name *"
              placeholder="Enter your last name"
              name="lastName"
              error={errors.lastName}
            />

            <EmailInput
              label="Email Address"
              placeholder="your.email@example.com"
              error={errors.email}
              showIcon={false}
            />

            <TextInput
              label="Phone Number *"
              placeholder="(555) 123-4567"
              name="phone"
              error={errors.phone}
            />

            <div className="mb-4">
              <label htmlFor="relationship" className="block text-[13px] font-semibold text-gray-700 mb-1.5 pl-1">
                Relationship to Child *
              </label>
              <Field
                as="select"
                id="relationship"
                name="relationship"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#188147]/50 focus:border-[#188147] text-sm transition-all shadow-sm text-gray-700"
              >
                <option value="" disabled>Select relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Other">Other</option>
              </Field>
            </div>

            <TextInput
              label="Address"
              placeholder="Enter your address"
              name="address"
              error={errors.address}
            />

            <TextInput
              label="Emergency Contact Name *"
              placeholder="Enter full name"
              name="emergencyContactName"
              error={errors.emergencyContactName}
            />

            <TextInput
              label="Emergency Contact Phone *"
              placeholder="(555) 123-4567"
              name="emergencyContactPhone"
              error={errors.emergencyContactPhone}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#188147] text-white py-3 px-4 rounded-[12px] font-semibold hover:bg-[#116937] transition-colors flex items-center justify-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
