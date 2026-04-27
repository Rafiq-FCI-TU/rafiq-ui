import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Plus,
  X,
  Send,
  Sparkles,
  Loader2,
  Tag,
  AlertCircle,
  Link as LinkIcon,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const HASHTAGS = ["article", "video", "guide", "tool"];

interface FormValues {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .trim()
    .min(1, "Title cannot be empty"),
  link: Yup.string().url("Must be a valid URL").required("Link is required"),
  description: Yup.string()
    .required("Description is required")
    .trim()
    .min(1, "Description cannot be empty"),
  tags: Yup.array().of(Yup.string().required()),
});

interface CreateResourceFormProps {
  onCreate: (values: FormValues) => void;
}

export function CreateResourceForm({ onCreate }: CreateResourceFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const initialValues: FormValues = {
    title: "",
    link: "",
    description: "",
    tags: [],
  };

  const toggleTag = (tags: string[], tag: string): string[] => {
    return tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
  };

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ) => {
    try {
      onCreate(values);
      helpers.resetForm();
      setTagInput("");
      setIsExpanded(false);
    } catch {
      helpers.setStatus("Failed to create resource");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        status,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        resetForm,
      }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-lg hover:border-gray-200 transition-all duration-300 mb-6 overflow-hidden">
          {/* Collapsed Header — click to expand */}
          <button
            type="button"
            onClick={() => {
              if (isExpanded) {
                resetForm();
                setTagInput("");
              }
              setIsExpanded(!isExpanded);
            }}
            className="w-full cursor-pointer flex items-center gap-4 p-5 text-left group"
          >
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md shadow-green-500/20 group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all duration-300 group-hover:scale-105">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-[15px] group-hover:text-green-700 transition-colors">
                Share a Resource
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-green-500" />
                Help others discover useful articles, guides & tools
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {/* Expanded Form */}
          {isExpanded && (
            <Form className="animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Gradient accent line */}
              <div className="h-1 bg-linear-to-r from-green-500 to-teal-600 mx-5 rounded-full" />

              {status && (
                <div className="mx-5 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{status}</span>
                </div>
              )}

              <div className="p-5 pt-4 space-y-4">
                {/* Title + Link row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Title
                    </label>
                    <input
                      name="title"
                      placeholder="e.g. Understanding Anxiety"
                      value={values.title}
                      onChange={(e) => setFieldValue("title", e.target.value)}
                      onBlur={() => setFieldTouched("title", true)}
                      className={`w-full px-4 py-2.5 text-sm bg-gray-50/80 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white ${
                        touched.title && errors.title
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200"
                      }`}
                    />
                    {touched.title && errors.title && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Link
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <input
                        name="link"
                        placeholder="https://example.com"
                        value={values.link}
                        onChange={(e) => setFieldValue("link", e.target.value)}
                        onBlur={() => setFieldTouched("link", true)}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50/80 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white ${
                          touched.link && errors.link
                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200"
                        }`}
                      />
                    </div>
                    {touched.link && errors.link && (
                      <p className="text-xs text-red-500 mt-1">{errors.link}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe what this resource covers and why it's helpful..."
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    onBlur={() => setFieldTouched("description", true)}
                    rows={3}
                    className={`w-full resize-none px-4 py-3 text-sm bg-gray-50/80 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white ${
                      touched.description && errors.description
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200"
                    }`}
                  />
                  {touched.description && errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Tags Section */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Tags
                  </label>

                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {HASHTAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setFieldValue("tags", toggleTag(values.tags, tag))
                        }
                        className={`px-3.5 cursor-pointer py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          values.tags.includes(tag)
                            ? "bg-green-600 text-white shadow-sm shadow-green-600/20 scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700 hover:scale-105"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-xs">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Tag className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const trimmed = tagInput.trim();
                            if (trimmed && !values.tags.includes(trimmed)) {
                              setFieldValue("tags", [...values.tags, trimmed]);
                              setTagInput("");
                            }
                          }
                        }}
                        placeholder="Add custom tag..."
                        className="w-full pl-9 pr-10 py-2 text-sm bg-gray-50/80 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const trimmed = tagInput.trim();
                          if (trimmed && !values.tags.includes(trimmed)) {
                            setFieldValue("tags", [...values.tags, trimmed]);
                            setTagInput("");
                          }
                        }}
                        disabled={
                          !tagInput.trim() ||
                          values.tags.includes(tagInput.trim())
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-300 transition-all duration-200 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {values.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
                      {values.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-green-50 to-teal-50 text-green-700 text-xs font-medium rounded-full border border-green-200/60 shadow-sm"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                "tags",
                                values.tags.filter((t) => t !== tag),
                              )
                            }
                            className="cursor-pointer p-0.5 hover:bg-green-200/50 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between px-5 py-4 bg-gray-50/50 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setTagInput("");
                    setIsExpanded(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !values.title.trim() ||
                    !values.link.trim() ||
                    !values.description.trim()
                  }
                  className="flex items-center cursor-pointer gap-2 px-6 py-2.5 bg-linear-to-r from-green-500 to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Share Resource
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </div>
      )}
    </Formik>
  );
}
