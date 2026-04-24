import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import TextInput from "./TextInput";
import DateInput from "./DateInput";

interface ChildFormValues {
  childFirstName: string;
  childLastName: string;
  birthDate: string;
  gender: string;
  token?: string;
}

interface ChildDetailsFormProps {
  onSubmit: (values: ChildFormValues) => void;
  onBack: () => void;
  initialData?: ChildFormValues | null;
  token?: string;
}

const validateChildForm = (values: ChildFormValues) => {
  const errors: { [key: string]: string } = {};

  if (!values.childFirstName) {
    errors.childFirstName = "First Name is required";
  } else if (
    values.childFirstName.length < 2 ||
    values.childFirstName.length > 50
  ) {
    errors.childFirstName = "First Name must be at least 2 characters";
  }

  if (!values.childLastName) {
    errors.childLastName = "Last Name is required";
  } else if (
    values.childLastName.length < 2 ||
    values.childLastName.length > 50
  ) {
    errors.childLastName = "Last Name must be at least 2 characters";
  }

  if (!values.birthDate) {
    errors.birthDate = "Birth date is required";
  }

  if (!values.gender) {
    errors.gender = "Gender is required";
  }

  return errors;
};

export default function ChildDetailsForm({
  onSubmit,
  onBack,
  initialData,
  token,
}: ChildDetailsFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const childInitialValues: ChildFormValues = initialData || {
    childFirstName: "",
    childLastName: "",
    birthDate: "",
    gender: "",
  };

  const handleSubmit = async (values: ChildFormValues) => {
    setApiError(null);
    try {
      let dateOfBirthIso = "";
      try {
        dateOfBirthIso = new Date(values.birthDate).toISOString();
      } catch (e) {
        dateOfBirthIso = new Date().toISOString(); // Fallback date if parsing fails
      }

      const payload = {
        token: token || "",
        firstName: values.childFirstName,
        lastName: values.childLastName,
        dateOfBirth: dateOfBirthIso,
        gender: values.gender,
      };

      const response = await axios.post(
        "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api/FamilyRegistration/step2",
        payload,
      );

      if (response.data?.success) {
        // Extract the newly generated token from Step 2
        const receivedToken = response.data?.data?.token || "";

        // Pass this new token along to Step 3
        onSubmit({ ...values, token: receivedToken || token || "" });
      } else {
        setApiError(response.data?.message || "Registration failed");
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
          Family Registration
        </h2>
        <p className="text-sm font-medium text-gray-500">
          Add information of your child
        </p>
      </div>

      <Formik
        initialValues={childInitialValues}
        validate={validateChildForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            {apiError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-[12px]">
                {apiError}
              </div>
            )}
            <TextInput
              label="Child's First Name *"
              placeholder="Amira"
              name="childFirstName"
              error={
                touched.childFirstName && errors.childFirstName
                  ? errors.childFirstName
                  : undefined
              }
            />

            <TextInput
              label="Child's Last Name *"
              placeholder="Hassan"
              name="childLastName"
              error={
                touched.childLastName && errors.childLastName
                  ? errors.childLastName
                  : undefined
              }
            />

            <DateInput
              label="Date of Birth *"
              name="birthDate"
              error={
                touched.birthDate && errors.birthDate
                  ? errors.birthDate
                  : undefined
              }
            />

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-[13px] font-semibold text-gray-700 mb-1.5 pl-1"
              >
                Gender *
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
