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
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const initialValues: ConsentFormValues = initialData || {
    hipaaConsent: false,
    coppaConsent: false,
    termsConsent: false,
  };

  const validateForm = (values: ConsentFormValues) => {
    const newErrors: {[key: string]: string} = {};
    
    if (!values.hipaaConsent) newErrors.hipaaConsent = 'يجب الموافقة على موافقة HIPAA';
    if (!values.coppaConsent) newErrors.coppaConsent = 'يجب الموافقة على موافقة COPPA';
    if (!values.termsConsent) newErrors.termsConsent = 'يجب الموافقة على الشروط والأحكام';
    
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
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 ml-3"
                required
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">موافقة HIPAA</h3>
                <p className="text-sm text-gray-600">
                  اوافق على نظام الموقع والكشف عن البيانات لغرض تنمية مهارات الطفل
                </p>
              </div>
            </div>
            {errors.hipaaConsent && (
              <p className="text-red-500 text-xs mt-2 mr-8">{errors.hipaaConsent}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="coppaConsent"
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 ml-3"
                required
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">موافقة COPPA</h3>
                <p className="text-sm text-gray-600">
                  انا ولي امر الطفل و اوافق على جمع معلومات الطفل من اجل تنمية الطفل
                </p>
              </div>
            </div>
            {errors.coppaConsent && (
              <p className="text-red-500 text-xs mt-2 mr-8">{errors.coppaConsent}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="termsConsent"
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 ml-3"
                required
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">الشروط والأحكام</h3>
                <p className="text-sm text-gray-600">
                  اوافق على شروط الخدمة وسياسة الخصوصية
                </p>
              </div>
            </div>
            {errors.termsConsent && (
              <p className="text-red-500 text-xs mt-2 mr-8">{errors.termsConsent}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-green-100 text-green-600 py-2.5 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              العودة
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              التالي
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
