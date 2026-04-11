import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import EmailInput from "./EmailInput";
import TextInput from "./TextInput";

interface SpecialistFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  credentials: string;
  specialty: string;
  organization: string;
  professionalBio: string;
  gender: string;
  token?: string;
}

interface SpecialistRegistrationFormProps {
  onSubmit: (values: SpecialistFormValues) => void;
  onBack: () => void;
  initialData?: SpecialistFormValues | null;
}

const validationSchema = {
  name: (value: string) => {
    if (!value) return "Required field";
    return null;
  },
  email: (value: string) => {
    if (!value) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Invalid email";
    }
    return null;
  },
};

export default function SpecialistRegistrationForm({
  onSubmit,
  onBack,
  initialData,
}: SpecialistRegistrationFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const initialValues: SpecialistFormValues = initialData || {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    credentials: "",
    specialty: "",
    organization: "",
    professionalBio: "",
    gender: "",
  };

  const validateForm = (values: SpecialistFormValues) => {
    const newErrors: { [key: string]: string } = {};

    if (validationSchema.name(values.firstName))
      newErrors.firstName = "First Name is required";
    if (validationSchema.name(values.lastName))
      newErrors.lastName = "Last Name is required";
    const emailError = validationSchema.email(values.email);
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (values: SpecialistFormValues) => {
    if (validateForm(values)) {
      setErrors({});
      try {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          credentials: values.credentials,
          specialty: values.specialty,
          organization: values.organization,
          professionalBio: values.professionalBio,
          gender: values.gender,
        };

        const response = await axios.post(
          "https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/SpecialistRegistration/step1",
          payload,
        );

        // Extract token from response.data.data.token as per the actual API response
        const receivedToken =
          response.data?.data?.token || response.data?.token || "";

        // Advance to next step
        onSubmit({ ...values, token: receivedToken });
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
          Specialist Registration
        </h2>
        <p className="text-sm font-medium text-gray-500">
          Let's start with your information
        </p>
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

            <TextInput
              label="Phone Number *"
              placeholder="(555) 123-4567"
              name="phone"
              error={errors.phone}
            />

            <EmailInput
              label="Email Address"
              placeholder="your.email@example.com"
              error={errors.email}
              showIcon={false}
            />

            <TextInput
              label="Credentials *"
              placeholder="MS, CCC-SLP"
              name="credentials"
              error={errors.credentials}
            />

            <TextInput
              label="Specialty *"
              placeholder=""
              name="specialty"
              error={errors.specialty}
            />

            <TextInput
              label="Organization"
              placeholder="Children's Development Center"
              name="organization"
              error={errors.organization}
            />

            <TextInput
              label="Professional Bio"
              placeholder=""
              name="professionalBio"
              error={errors.professionalBio}
            />

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-[13px] font-semibold text-gray-700 mb-1.5 pl-1"
              >
                Gender
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#188147]/50 focus:border-[#188147] text-sm transition-all shadow-sm text-gray-700"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
            </div>

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
