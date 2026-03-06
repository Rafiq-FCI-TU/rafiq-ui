import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AssessmentQuestionnaireValues {
  speechClarity: string;
  speechSentences: string;
  speechResponse: string;
  practicalSkills: string;
  practicalProblemSolving: string;
  practicalIndependence: string;
  motorSkills: string;
  motorCoordination: string;
  motorBalance: string;
}

interface AssessmentQuestionnaireProps {
  onSubmit: (values: AssessmentQuestionnaireValues) => void;
  onBack: () => void;
  initialData?: AssessmentQuestionnaireValues | null;
  onQuestionChange?: (question: number) => void;
}

export default function AssessmentQuestionnaire({
  onSubmit,
  onBack,
  initialData,
  onQuestionChange
}: AssessmentQuestionnaireProps) {
  const initialValues: AssessmentQuestionnaireValues = initialData || {
    speechClarity: '',
    speechSentences: '',
    speechResponse: '',
    practicalSkills: '',
    practicalProblemSolving: '',
    practicalIndependence: '',
    motorSkills: '',
    motorCoordination: '',
    motorBalance: '',
  };

  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    if (onQuestionChange) {
      onQuestionChange(currentQuestion);
    }
  }, [currentQuestion, onQuestionChange]);

  const getCurrentCategory = () => {
    if (currentQuestion <= 3) return 'Speech';
    if (currentQuestion <= 6) return 'Practical';
    return 'Motor';
  };

  const handleSubmit = (values: AssessmentQuestionnaireValues) => {
    const currentField = getFieldName() as keyof AssessmentQuestionnaireValues;
    if (!values[currentField]) {
      alert('Please select an answer before continuing');
      return;
    }

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(values);
    }
  };

  const getQuestionText = () => {
    switch (currentQuestion) {
      case 1:
        return 'How clear is the child\'s word pronunciation?';
      case 2:
        return 'Can the child form simple sentences?';
      case 3:
        return 'Does the child respond when their name is called?';
      case 4:
        return 'How capable is the child in performing practical skills?';
      case 5:
        return 'Can the child solve simple problems?';
      case 6:
        return 'How independent is the child in daily activities?';
      case 7:
        return 'How developed are the child\'s motor skills?';
      case 8:
        return 'Can the child coordinate hand and eye movements?';
      case 9:
        return 'How well can the child balance and walk?';
      default:
        return '';
    }
  };

  // Custom overriding based on the screenshot text for fidelity
  const displayQuestionText = currentQuestion === 4 ? "Can your child walk independently without support?" : getQuestionText();

  const getFieldName = () => {
    switch (currentQuestion) {
      case 1:
        return 'speechClarity';
      case 2:
        return 'speechSentences';
      case 3:
        return 'speechResponse';
      case 4:
        return 'practicalSkills';
      case 5:
        return 'practicalProblemSolving';
      case 6:
        return 'practicalIndependence';
      case 7:
        return 'motorSkills';
      case 8:
        return 'motorCoordination';
      case 9:
        return 'motorBalance';
      default:
        return 'speechClarity';
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="w-full flex justify-center items-center font-sans h-full">
      <div className="w-full max-w-lg">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => {
            const fieldName = getFieldName() as keyof AssessmentQuestionnaireValues;
            const currentValue = values[fieldName];

            return (
              <Form className="flex flex-col h-full">

                {/* Header: Question Status & Category */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-medium text-sm">
                    Question {currentQuestion} of 9
                  </span>
                  <div className="bg-[#E8F5EE] text-[#188147] px-3 py-1 rounded-full text-xs font-semibold">
                    {getCurrentCategory()}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-[6px] mb-8">
                  <div
                    className="bg-[#188147] h-[6px] rounded-full transition-all duration-300"
                    style={{ width: `${(currentQuestion / 9) * 100}%` }}
                  ></div>
                </div>

                {/* Sub Headers */}
                <div className="mb-8">
                  <h2 className="text-[20px] font-bold text-gray-900 mb-2">Child Assessment</h2>
                  <p className="text-gray-500 text-[14px]">Help us understand your child's development</p>
                </div>

                {/* Main Question Text */}
                <h3 className="text-[18px] font-bold text-gray-900 mb-6 pr-4 leading-tight">
                  {displayQuestionText}
                </h3>

                {/* Radio Options */}
                <div className="space-y-3 mb-8">
                  {[
                    currentQuestion === 4 ? "Not yet" : "Rarely",
                    currentQuestion === 4 ? "With help" : "Sometimes",
                    currentQuestion === 4 ? "Yes, confidently" : "Most of the time",
                  ].filter(Boolean).map((optionText) => {
                    if (!optionText) return null;
                    const isSelected = currentValue === optionText;

                    return (
                      <label
                        key={optionText}
                        className={`
                          flex items-center p-4 rounded-xl cursor-pointer border transition-all duration-200
                          ${isSelected
                            ? 'border-[#188147] bg-[#F5FEF8] shadow-[0_0_0_1px_#188147]'
                            : 'border-gray-200 bg-white hover:border-gray-300'}
                        `}
                      >
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 transition-colors
                          ${isSelected ? 'border-[#188147]' : 'border-gray-300'}
                        `}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#188147] rounded-full" />}
                        </div>

                        <span className={`text-[15px] ${isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                          {optionText}
                        </span>

                        <input
                          type="radio"
                          name={fieldName}
                          value={optionText}
                          checked={isSelected}
                          onChange={(e) => setFieldValue(fieldName, e.target.value)}
                          className="hidden"
                        />
                      </label>
                    );
                  })}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex gap-4 mt-auto">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-3.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center text-[15px]"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-4 bg-[#188147] text-white rounded-xl font-medium hover:bg-[#116937] transition-colors flex items-center justify-center text-[15px] shadow-sm"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>

              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
