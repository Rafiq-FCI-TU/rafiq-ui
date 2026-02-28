import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ConsentFormValues {
  hipaaConsent: boolean;
  coppaConsent: boolean;
  termsConsent: boolean;
}

interface ConsentFormProps {
  onSubmit: (values: ConsentFormValues) => void;
  onBack: () => void;
  initialData?: ConsentFormValues | null;
}

export default function ConsentForm({ onSubmit, onBack, initialData }: ConsentFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const initialValues: ConsentFormValues = initialData || {
    hipaaConsent: false,
    coppaConsent: false,
    termsConsent: false,
  };

  const validateForm = (values: ConsentFormValues) => {
    const newErrors: { [key: string]: string } = {};

    if (!values.hipaaConsent) newErrors.hipaaConsent = 'HIPAA consent must be accepted';
    if (!values.coppaConsent) newErrors.coppaConsent = 'COPPA consent must be accepted';
    if (!values.termsConsent) newErrors.termsConsent = 'Terms and Conditions must be accepted';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (values: ConsentFormValues) => {
    if (validateForm(values)) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="hipaaConsent"
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 mr-3"
                required
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">HIPAA Consent</h3>
                <p className="text-sm text-gray-600">
                  I agree to the site's system and data disclosure for the purpose of developing the child's skills
                </p>
              </div>
            </div>
            {errors.hipaaConsent && (
              <p className="text-red-500 text-xs mt-2 ml-8">{errors.hipaaConsent}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="coppaConsent"
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 mr-3"
                required
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">COPPA Consent</h3>
                <p className="text-sm text-gray-600">
                  I am the child's guardian and I agree to collect the child's information for the child's development
                </p>
              </div>
            </div>
            {errors.coppaConsent && (
              <p className="text-red-500 text-xs mt-2 ml-8">{errors.coppaConsent}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="termsConsent"
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 mr-3"
                required
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Terms and Conditions</h3>
                <p className="text-sm text-gray-600">
                  I agree to the terms of service and privacy policy
                </p>
              </div>
            </div>
            {errors.termsConsent && (
              <p className="text-red-500 text-xs mt-2 ml-8">{errors.termsConsent}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
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
