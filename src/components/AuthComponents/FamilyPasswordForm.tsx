import { useState } from "react";
import { Formik, Form } from "formik";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import PasswordInput from "./PasswordInput";

interface FormValues {
  password: string;
  confirmPassword: string;
  patientId?: number;
}

interface FamilyPasswordFormProps {
  onSubmit: (values: FormValues) => void;
  onBack: () => void;
  token?: string;
}

const validationSchema = {
  password: (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return null;
  },
  confirmPassword: (value: string, password: string) => {
    if (!value) return "Confirm password is required";
    if (value !== password) return "Passwords do not match";
    return null;
  },
};

export default function FamilyPasswordForm({
  onSubmit,
  onBack,
  token,
}: FamilyPasswordFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
  };

  const validateForm = (values: FormValues) => {
    const newErrors: { [key: string]: string } = {};

    const passwordError = validationSchema.password(values.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validationSchema.confirmPassword(
      values.confirmPassword,
      values.password,
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (values: FormValues) => {
    if (validateForm(values)) {
      setErrors({});
      try {
        const payload = {
          token: token || "",
          password: values.password,
          confirmPassword: values.confirmPassword,
        };

        const response = await axios.post(
          "https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/FamilyRegistration/step3",
          payload,
        );

        console.log("Step 3 Response Body:", response.data);

        if (response.data?.success) {
          const patientId = response.data?.data?.patientId;
          console.log("Extracted Patient ID:", patientId);
          onSubmit({ ...values, patientId });
        } else {
          setErrors({ api: response.data?.message || "Registration failed" });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const msg =
            error.response.data?.message ||
            error.response.data?.detail ||
            error.response.data?.title ||
            (typeof error.response.data === "string"
              ? error.response.data
              : "Registration failed");
          setErrors({ api: msg });
        } else {
          setErrors({
            api: "An unexpected error occurred. Please try again later.",
          });
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Family Registration
        </h2>
        <p className="text-sm font-medium text-gray-500">Just a step away!</p>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {errors.api && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {errors.api}
              </div>
            )}
            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
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
              disabled={isSubmitting}
              className="w-full bg-[#188147] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#116937] transition-colors flex items-center justify-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Assessment
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
