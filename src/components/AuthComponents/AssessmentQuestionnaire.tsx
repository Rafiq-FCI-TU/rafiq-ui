import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";

const API_BASE =
  "https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AssessmentQuestionnaireProps {
  onSubmit: (values: any) => void;
  onBack: () => void;
  initialData?: any;
  onQuestionChange?: (question: number) => void;
  patientId?: number | null;
  initialAssessmentId?: number | null;
}

export default function AssessmentQuestionnaire({
  onSubmit,
  onBack,
  onQuestionChange,
  patientId,
  initialAssessmentId,
}: AssessmentQuestionnaireProps) {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);
  const [questionData, setQuestionData] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onQuestionChange?.(currentQuestionNumber);
  }, [currentQuestionNumber, onQuestionChange]);

  const fetchQuestion = async (id: number) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/Assessment/assessment`, {
        params: { assessmentId: id },
      });

      if (res.data.success && res.data.data) {
        const state = res.data.data;
        if (!state.currentCategory?.question) {
          onSubmit({ completed: true });
        } else {
          setQuestionData(state);
          setSelectedAnswer(null);
        }
      } else {
        setError("Failed to load question.");
      }
    } catch (err: any) {
      setError(formatError("Fetch Error", err));
    } finally {
      setLoading(false);
    }
  };

  const initializeAssessment = useCallback(async () => {
    const pid = Number(patientId);
    if (!pid || isNaN(pid)) {
      setError("Patient ID is missing or invalid. Cannot start assessment.");
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      console.log("[Assessment] Initializing with patientId:", pid);

      const response = await apiClient.get(`/Assessment`, {
        params: { patientId: pid },
      });

      console.log("[Assessment] Init response:", response.data);

      const data = response.data?.data;
      if (data?.id) {
        setAssessmentId(data.id);
        await fetchQuestion(data.id);
      } else {
        setError(
          "Could not initialize assessment. Invalid response structure.",
        );
        setLoading(false);
      }
    } catch (err: any) {
      setError(formatError("Connection Error", err));
      setLoading(false);
    }
  }, [patientId]);

  const hasInitialized = React.useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    if (initialAssessmentId) {
      hasInitialized.current = true;
      setAssessmentId(initialAssessmentId);
      fetchQuestion(initialAssessmentId);
    } else if (patientId) {
      hasInitialized.current = true;
      initializeAssessment();
    }
  }, [initializeAssessment, patientId, initialAssessmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      selectedAnswer === null ||
      !assessmentId ||
      !questionData?.currentCategory?.question
    )
      return;

    try {
      setSubmitting(true);
      setError(null);

      const res = await apiClient.post("/Assessment/answer", {
        assessmentId,
        questionId: questionData.currentCategory.question.questionId,
        answerValue: selectedAnswer,
      });

      setCurrentQuestionNumber((prev) => prev + 1);

      if (res.data?.success && res.data?.data) {
        const state = res.data.data;
        if (!state.currentCategory?.question) {
          onSubmit({ completed: true });
        } else {
          setQuestionData(state);
          setSelectedAnswer(null);
        }
      } else {
        await fetchQuestion(assessmentId);
      }
    } catch (err: any) {
      setError(formatError("Submit Error", err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionNumber === 1) onBack();
  };

  return (
    <div className="w-full flex justify-center items-center font-sans h-full">
      <div className="w-full max-w-lg">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-[#188147] animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading assessment...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-4 text-center">
              {error}
            </div>
            <div className="flex gap-4">
              <button
                onClick={initializeAssessment}
                className="flex-1 text-[#188147] font-medium border border-[#188147] px-4 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onBack}
                className="flex-1 text-[#188147] font-medium border border-[#188147] px-4 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
              >
                Return to Login
              </button>
            </div>
          </div>
        ) : questionData?.currentCategory ? (
          <form className="flex flex-col h-full" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium text-sm">
                Question{" "}
                {questionData.currentCategory.assessmentCurrentQuestion} of{" "}
                {questionData.currentCategory.assessmentTotalQuestions}
              </span>
              <div className="bg-[#E8F5EE] text-[#188147] px-3 py-1 rounded-full text-xs font-semibold">
                {questionData.currentCategory.assessmentCategoryName}
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
              <div
                className="bg-[#188147] h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((questionData.currentCategory.assessmentCurrentQuestion -
                      1) /
                      (questionData.currentCategory.assessmentTotalQuestions ||
                        1)) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-[20px] font-bold text-gray-900 mb-2">
                Child Assessment
              </h2>
              <p className="text-gray-500 text-[14px]">
                {questionData.currentCategory.assessmentCategoryDescription ||
                  "Help us understand your child's development"}
              </p>
            </div>

            <h3 className="text-[18px] font-bold text-gray-900 mb-6 pr-4 leading-tight">
              {questionData.currentCategory.question.text}
            </h3>

            <div className="space-y-3 mb-8">
              {questionData.currentCategory.question.options?.map(
                (opt: any) => {
                  const isSelected = selectedAnswer === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-center p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                        isSelected
                          ? "border-[#188147] bg-[#F5FEF8] shadow-[0_0_0_1px_#188147]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                          isSelected ? "border-[#188147]" : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-[#188147] rounded-full" />
                        )}
                      </div>
                      <span
                        className={`text-[15px] ${isSelected ? "font-medium text-gray-900" : "text-gray-700"}`}
                      >
                        {opt.label}
                      </span>
                      <input
                        type="radio"
                        name="answerValue"
                        value={opt.value}
                        checked={isSelected}
                        onChange={() => setSelectedAnswer(opt.value)}
                        className="hidden"
                      />
                    </label>
                  );
                },
              )}
            </div>

            <div className="flex gap-4 mt-auto">
              {currentQuestionNumber === 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={submitting}
                  className="flex-1 py-3.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center text-[15px] disabled:opacity-50"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Previous
                </button>
              )}
              <button
                type="submit"
                disabled={submitting || selectedAnswer === null}
                className={`flex-1 py-3.5 px-4 bg-[#188147] text-white rounded-xl font-medium hover:bg-[#116937] transition-colors flex items-center justify-center text-[15px] shadow-sm ${
                  selectedAnswer === null || submitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}

function formatError(label: string, err: any): string {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    let detail = "";

    if (typeof err.response?.data === "string") {
      detail = err.response.data;
    } else {
      detail = JSON.stringify(err.response?.data) || err.message;
    }

    return `${label}: ${status} — ${detail}`;
  }
  return `${label}: ${err?.message || String(err)}`;
}
