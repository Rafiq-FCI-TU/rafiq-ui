import { useState } from 'react';
import { Formik, Form } from 'formik';
import { User, ArrowRight, Stethoscope } from 'lucide-react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

interface SpecialistFormValues {
  name: string;
  specialty: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SpecialistRegistrationFormProps {
  onSubmit: (values: SpecialistFormValues) => void;
}

const validationSchema = {
  name: (value: string) => {
    if (!value) return 'الاسم مطلوب';
    if (value.length < 2) return 'الاسم يجب أن يكون حرفين على الأقل';
    return null;
  },
  specialty: (value: string) => {
    if (!value) return 'التخصص مطلوب';
    if (value.length < 2) return 'التخصص يجب أن يكون حرفين على الأقل';
    return null;
  },
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
  confirmPassword: (value: string, password: string) => {
    if (!value) return 'تأكيد كلمة المرور مطلوب';
    if (value !== password) return 'كلمة المرور غير متطابقة';
    return null;
  },
};

export default function SpecialistRegistrationForm({ onSubmit }: SpecialistRegistrationFormProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const initialValues: SpecialistFormValues = {
    name: '',
    specialty: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validateForm = (values: SpecialistFormValues) => {
    const newErrors: {[key: string]: string} = {};
    
    const nameError = validationSchema.name(values.name);
    if (nameError) newErrors.name = nameError;
    
    const specialtyError = validationSchema.specialty(values.specialty);
    if (specialtyError) newErrors.specialty = specialtyError;
    
    const emailError = validationSchema.email(values.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validationSchema.password(values.password);
    if (passwordError) newErrors.password = passwordError;
    
    const confirmPasswordError = validationSchema.confirmPassword(values.confirmPassword, values.password);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (values: SpecialistFormValues) => {
    if (validateForm(values)) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-4">
          <TextInput
            label="الاسم"
            placeholder="من فضلك ادخل اسمك"
            name="name"
            icon={User}
            error={errors.name}
          />

          <TextInput
            label="التخصص"
            placeholder="ادخل التخصص الطبي الخاص بك"
            name="specialty"
            icon={Stethoscope}
            error={errors.specialty}
          />

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

          <PasswordInput 
            label="تاكيد كلمة المرور"
            placeholder="تاكيد كلمة المرور"
            name="confirmPassword"
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 ml-2" />
            التالي
          </button>
        </Form>
      )}
    </Formik>
  );
}
