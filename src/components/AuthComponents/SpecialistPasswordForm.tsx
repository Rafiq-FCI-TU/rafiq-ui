import { useState } from 'react';
import { Formik, Form } from 'formik';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PasswordInput from './PasswordInput';

interface FormValues {
    password: string;
    confirmPassword: string;
}

interface SpecialistPasswordFormProps {
    onSubmit: (values: FormValues) => void;
    onBack: () => void;
}

const validationSchema = {
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

export default function SpecialistPasswordForm({ onSubmit, onBack }: SpecialistPasswordFormProps) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const initialValues: FormValues = {
        password: '',
        confirmPassword: '',
    };

    const validateForm = (values: FormValues) => {
        const newErrors: { [key: string]: string } = {};

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
        <div className="w-full">
            <button
                onClick={onBack}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back
            </button>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Specialist Registration</h2>
                <p className="text-sm font-medium text-gray-500">Let's start with your information</p>
            </div>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {() => (
                    <Form className="space-y-4">
                        <PasswordInput
                            label="Password *"
                            placeholder="Create a strong password"
                            error={errors.password}
                        />

                        <PasswordInput
                            label="Confirm Password *"
                            placeholder="Create a strong password"
                            name="confirmPassword"
                            error={errors.confirmPassword}
                        />

                        <button
                            type="submit"
                            className="w-full bg-[#188147] text-white py-3 px-4 rounded-[12px] font-semibold hover:bg-[#116937] transition-colors flex items-center justify-center mt-6"
                        >
                            Complete Registration
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
