import { Upload, FileVideo, ImageIcon, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  notes: Yup.string().required("Notes are required"),
  media: Yup.mixed().required("Video file is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
  score: Yup.number().min(0).max(100).required(),
});
export default function UploadSession() {
  const { user } = useAuth();
  const [uploadFormToggle, setUploadFormToggle] = useState<boolean>(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        "https://rafiq-d2bygkb4bkfrgkd2.germanywestcentral-01.azurewebsites.net/api/Session",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SpecialistSessions"] });
      setUploadFormToggle(false);
      setThumbnailPreview(null);
    },
  });

  const initialValues = {
    title: "",
    description: "",
    notes: "",
    media: null as File | null,
    thumbnail: null as File | null,
    score: 0,
    specialistId: user?.id || "",
  };
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("notes", values.notes);
    formData.append("media", values.media as File);
    formData.append("thumbnail", values.thumbnail as File);
    formData.append("score", values.score.toString());
    formData.append("specialistId", values.specialistId);
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      if (error) {
        formikHelpers.setStatus("Failed to upload session");
      }
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [thumbnailPreview]);

  return (
    <div className="relative">
      <section className="flex justify-between not-md:flex-col not-md:items-start items-center gap-4 bg-linear-to-b from-green-700 to-primary-dark px-5 py-10 shadow-lg rounded-xl">
        <div className="text-white max-w-9/12 space-y-5">
          <h1 className="text-2xl not-md:text-lg font-bold">
            Uploading Sessions
          </h1>
          <p className="text-lg not-md:text-sm">
            Upload high-quality video sessions to assign individualized care to
            your patients.
          </p>
        </div>
        <button
          onClick={() => setUploadFormToggle(true)}
          className="flex items-center justify-center gap-2  bg-white px-4 py-2 rounded-xl shadow-md text-primary font-bold hover:scale-105 cursor-pointer transition-transform whitespace-nowrap"
        >
          <Upload className="size-6" /> Upload Session
        </button>
      </section>

      {uploadFormToggle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative my-auto overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Upload New Session
                </h2>
                <p className="text-sm text-gray-500">
                  Fill in the details below to upload a new session.
                </p>
              </div>
            </div>

            <div className="p-8">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  setFieldValue,
                  errors,
                  touched,
                  isSubmitting,
                  resetForm,
                  status,
                }) => (
                  <Form className="space-y-6">
                    {status && (
                      <div className="text-center p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
                        {status}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-gray-700 pl-1">
                            Title <span className="text-red-500">*</span>
                          </label>
                          <Field
                            as="input"
                            type="text"
                            label="Title"
                            name="title"
                            placeholder="Enter session title"
                            error={
                              touched.title ? (errors.title as string) : ""
                            }
                            className={`w-full px-4 py-3 bg-white border ${touched.title && errors.title ? "border-red-500" : "border-gray-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all shadow-sm`}
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-red-500 text-xs mt-1 pl-1"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-gray-700 pl-1">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            placeholder="Enter session description"
                            className={`w-full px-4 py-3 bg-white border ${touched.description && errors.description ? "border-red-500" : "border-gray-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all shadow-sm min-h-[100px] resize-none`}
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500 text-xs mt-1 pl-1"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-gray-700 pl-1">
                            Notes <span className="text-red-500">*</span>
                          </label>
                          <Field
                            as="textarea"
                            name="notes"
                            placeholder="Additional notes..."
                            className={`w-full px-4 py-3 bg-white border ${touched.notes && errors.notes ? "border-red-500" : "border-gray-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all shadow-sm min-h-[100px] resize-none`}
                          />
                          <ErrorMessage
                            name="notes"
                            component="div"
                            className="text-red-500 text-xs mt-1 pl-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Video Upload */}
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700 pl-1">
                            Video <span className="text-red-500">*</span>
                          </label>
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative group flex flex-col items-center justify-center p-6 border-2  rounded-2xl cursor-pointer transition-all ${
                              values.media
                                ? "border-primary bg-primary/5"
                                : touched.media && errors.media
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="video/*"
                              onChange={(e) =>
                                setFieldValue("media", e.target.files?.[0])
                              }
                              className="hidden"
                            />
                            {values.media ? (
                              <>
                                <FileVideo className="size-10 mb-2 text-primary" />
                                <span className="text-sm font-bold text-primary truncate w-full text-center px-4">
                                  {values.media.name}
                                </span>
                                <span className="text-[10px] text-primary/60 mt-1">
                                  Click to change video
                                </span>
                              </>
                            ) : (
                              <>
                                <FileVideo className="size-10 mb-2 text-gray-400 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-medium text-gray-600">
                                  Click to upload video
                                </span>
                                <span className="text-[10px] text-gray-400 mt-1">
                                  MP4, WebM, WMV up to 50MB
                                </span>
                              </>
                            )}
                          </div>
                          <ErrorMessage
                            name="media"
                            component="div"
                            className="text-red-500 text-xs mt-1 pl-1"
                          />
                        </div>
                        {/* Thumbnail Upload */}
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700 pl-1">
                            Thumbnail <span className="text-red-500">*</span>
                          </label>
                          <div
                            onClick={() => thumbInputRef.current?.click()}
                            className={`relative group flex flex-col items-center justify-center aspect-video border-2  rounded-2xl cursor-pointer transition-all overflow-hidden ${
                              values.thumbnail
                                ? "border-primary"
                                : touched.thumbnail && errors.thumbnail
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="file"
                              ref={thumbInputRef}
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setFieldValue("thumbnail", file);
                                  const url = URL.createObjectURL(file);
                                  setThumbnailPreview(url);
                                }
                              }}
                              className="hidden"
                            />
                            {thumbnailPreview ? (
                              <div className="absolute inset-0 w-full h-full">
                                <img
                                  src={thumbnailPreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-white text-xs font-bold">
                                    Change Photo
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <ImageIcon className="size-10 mb-2 text-gray-400 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-medium text-gray-600">
                                  Click to upload photo
                                </span>
                                <span className="text-[10px] text-gray-400 mt-1">
                                  JPG, PNG, JPEG, GIF up to 5MB
                                </span>
                              </>
                            )}
                          </div>
                          <ErrorMessage
                            name="thumbnail"
                            component="div"
                            className="text-red-500 text-xs mt-1 pl-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 pl-1">
                        Score (0-100) <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="number"
                        name="score"
                        min="0"
                        max="100"
                        className={`w-full px-4 py-3 bg-white border ${touched.score && errors.score ? "border-red-500" : "border-gray-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all shadow-sm`}
                        placeholder="Enter score"
                      />
                      <ErrorMessage
                        name="score"
                        component="div"
                        className="text-red-500 text-xs mt-1 pl-1"
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setUploadFormToggle(false);
                          setThumbnailPreview(null);
                        }}
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-4 border-2 disabled:cursor-not-allowed border-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 hover:text-gray-700 transition-all cursor-pointer active:scale-[0.98]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-4 bg-primary disabled:bg-primary-dark disabled:cursor-not-allowed text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-5 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="size-5" />
                            Upload
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
