import { useState } from 'react';
import { Formik, Form } from 'formik';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';
import TextInput from './TextInput';
import DateInput from './DateInput';

interface ChildFormValues {
  childName: string;
  birthDate: string;
  diagnosisDate: string;
}

interface ChildDetailsFormProps {
  onSubmit: (values: ChildFormValues) => void;
  onBack: () => void;
  initialData?: ChildFormValues | null;
}

const childValidationSchema = {
  childName: (value: string) => {
    if (!value) return 'Child name is required';
    if (value.length < 3) return 'Child name must be at least 3 characters';
    return null;
  },
  birthDate: (value: string) => {
    if (!value) return 'Birth date is required';
    return null;
  },
  diagnosisDate: (value: string) => {
    if (!value) return 'Diagnosis date is required';
    return null;
  },
};

export default function ChildDetailsForm({ onSubmit, onBack, initialData }: ChildDetailsFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const childInitialValues: ChildFormValues = initialData || {
    childName: '',
    birthDate: '',
    diagnosisDate: '',
  };

  const validateChildForm = (values: ChildFormValues) => {
    const newErrors: { [key: string]: string } = {};

    const childNameError = childValidationSchema.childName(values.childName);
    if (childNameError) newErrors.childName = childNameError;

    const birthDateError = childValidationSchema.birthDate(values.birthDate);
    if (birthDateError) newErrors.birthDate = birthDateError;

    const diagnosisDateError = childValidationSchema.diagnosisDate(values.diagnosisDate);
    if (diagnosisDateError) newErrors.diagnosisDate = diagnosisDateError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (values: ChildFormValues) => {
    if (validateChildForm(values)) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={childInitialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-4">
          <TextInput
            label="Child Name"
            placeholder="Please enter the child's name"
            name="childName"
            icon={User}
            error={errors.childName}
          />

          <DateInput
            label="Birth Date"
            name="birthDate"
            error={errors.birthDate}
          />

          <DateInput
            label="Diagnosis Date"
            name="diagnosisDate"
            error={errors.diagnosisDate}
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-green-100 text-green-600 py-2.5 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              <span>Next</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
