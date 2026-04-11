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

const validateForm = (values: SpecialistFormValues) => {
  const errors: { [key: string]: string } = {};

  if (!values.firstName) {
    errors.firstName = "First Name is required";
  } else if (values.firstName.length < 2 || values.firstName.length > 50) {
    errors.firstName = "First Name must be at least 2 characters";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  } else if (values.lastName.length < 2 || values.lastName.length > 50) {
    errors.lastName = "Last Name must be at least 2 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (!/^(\+?\d{10,15})$/.test(values.phone)) {
    errors.phone = "Phone must be 10-15 digits";
  }

  if (!values.specialty) {
    errors.specialty = "Specialty is required";
  } else if (values.specialty.length < 2 || values.specialty.length > 50) {
    errors.specialty = "Specialty must be at least 2 characters";
  }

  if (!values.organization) {
    errors.organization = "Organization is required";
  } else if (values.organization.length < 2 || values.organization.length > 100) {
    errors.organization = "Organization must be at least 2 characters";
  }

  if (!values.professionalBio) {
    errors.professionalBio = "Professional Bio is required";
  } else if (values.professionalBio.length < 20 || values.professionalBio.length > 1000) {
    errors.professionalBio = "Professional Bio must be at least 20 characters";
  }

  if (!values.gender) {
    errors.gender = "Gender is required";
  }

  return errors;
};

export default function SpecialistRegistrationForm({
  onSubmit,
  onBack,
  initialData,
}: SpecialistRegistrationFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);
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

  const handleSubmit = async (values: SpecialistFormValues) => {
    setApiError(null);
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
          setApiError(msg);
        } else {
          setApiError("An unexpected error occurred. Please try again later.");
        }
      }
  };

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 cursor-pointer"
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

      <Formik initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            {apiError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px]">
                {apiError}
              </div>
            )}

            <TextInput
              label="First Name *"
              placeholder="Enter your first name"
              name="firstName"
              error={touched.firstName && errors.firstName ? errors.firstName : undefined}
            />

            <TextInput
              label="Last Name *"
              placeholder="Enter your last name"
              name="lastName"
              error={touched.lastName && errors.lastName ? errors.lastName : undefined}
            />

            <TextInput
              label="Phone Number *"
              placeholder="(555) 123-4567"
              name="phone"
              error={touched.phone && errors.phone ? errors.phone : undefined}
            />

            <EmailInput
              label="Email Address *"
              placeholder="your.email@example.com"
              error={touched.email && errors.email ? errors.email : undefined}
              showIcon={false}
            />

            <TextInput
              label="Credentials"
              placeholder="MS, CCC-SLP"
              name="credentials"
              error={touched.credentials && errors.credentials ? errors.credentials : undefined}
            />

            <TextInput
              label="Specialty *"
              placeholder=""
              name="specialty"
              error={touched.specialty && errors.specialty ? errors.specialty : undefined}
            />

            <TextInput
              label="Organization *"
              placeholder="Children's Development Center"
              name="organization"
              error={touched.organization && errors.organization ? errors.organization : undefined}
            />

            <TextInput
              label="Professional Bio *"
              placeholder=""
              name="professionalBio"
              error={touched.professionalBio && errors.professionalBio ? errors.professionalBio : undefined}
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
              {touched.gender && errors.gender && (
                <div className="text-red-500 text-xs mt-1.5 font-medium">
                  {errors.gender}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#188147] text-white py-3 px-4 rounded-[12px] font-semibold hover:bg-[#116937] transition-colors flex items-center justify-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
