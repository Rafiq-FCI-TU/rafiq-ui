import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Activity, Brain, Footprints, ArrowRight } from 'lucide-react';

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
}

export default function AssessmentQuestionnaire({
  onSubmit,
  onBack,
  initialData
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

  const getCurrentCategory = () => {
    if (currentQuestion <= 3) return 'speech';
    if (currentQuestion <= 6) return 'practical';
    return 'motor';
  };

  const getQuestionNumber = () => {
    return currentQuestion;
  };

  const getCategoryQuestionNumber = () => {
    if (currentQuestion <= 3) return currentQuestion;
    if (currentQuestion <= 6) return currentQuestion - 3;
    return currentQuestion - 6;
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

  const getProgressText = () => {
    const category = getCurrentCategory();
    const categoryQuestion = getCategoryQuestionNumber();
    const ordinal = categoryQuestion === 1 ? 'First' : categoryQuestion === 2 ? 'Second' : 'Third';

    if (category === 'speech') {
      return `${ordinal} question regarding speech and language skills`;
    } else if (category === 'practical') {
      return `${ordinal} question regarding practical skills`;
    } else {
      return `${ordinal} question regarding motor skills`;
    }
  };

  const getCategoryIcon = () => {
    const category = getCurrentCategory();
    if (category === 'speech') return Activity;
    if (category === 'practical') return Brain;
    return Footprints;
  };

  const getCategoryColor = () => {
    const category = getCurrentCategory();
    if (category === 'speech') return 'bg-green-500';
    if (category === 'practical') return 'bg-yellow-500';
    return 'bg-purple-500';
  };

  const getCategoryName = () => {
    const category = getCurrentCategory();
    if (category === 'speech') return 'Speech & Writing';
    if (category === 'practical') return 'Mental Abilities';
    return 'Motor Skills';
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className="space-y-3">
          <div className="bg-white border-2 border-green-200 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-center mb-4">
              <div className={`w-14 h-14 ${getCategoryColor()} rounded-full flex items-center justify-center`}>
                {(() => {
                  const IconComponent = getCategoryIcon();
                  return <IconComponent className="w-7 h-7 text-white" strokeWidth={2.5} />;
                })()}
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className={`${getCategoryColor()} text-white px-4 py-1.5 rounded-full text-xs font-medium`}>
                {getCategoryName()}
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${currentQuestion <= 3
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                  }`}
                disabled
              >
                Speech & Writing
              </button>
              <button
                type="button"
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${currentQuestion >= 4 && currentQuestion <= 6
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                  }`}
                disabled
              >
                Mental Abilities
              </button>
              <button
                type="button"
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${currentQuestion >= 7
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                  }`}
                disabled
              >
                Motor Skills
              </button>
            </div>

            <div className="mb-3">
              <div className="w-full bg-gray-300 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentQuestion <= 3 ? 'bg-green-500' :
                      currentQuestion <= 6 ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}
                  style={{ width: `${(currentQuestion / 9) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center mb-3">
              <p className="text-base font-semibold text-gray-800 mb-1">Question {getQuestionNumber()} of 9</p>
              <p className="text-xs text-gray-600">{getProgressText()}</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-medium text-gray-800 text-center">
                {getQuestionText()}
              </h3>
            </div>

            <div className="mb-4 space-y-2">
              <label className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                <span className="text-gray-800 font-medium text-sm">Rarely</span>
                <input
                  type="radio"
                  name={getFieldName()}
                  value="Rarely"
                  checked={values[getFieldName() as keyof AssessmentQuestionnaireValues] === 'Rarely'}
                  onChange={(e) => setFieldValue(getFieldName(), e.target.value)}
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                <span className="text-gray-800 font-medium text-sm">Sometimes</span>
                <input
                  type="radio"
                  name={getFieldName()}
                  value="Sometimes"
                  checked={values[getFieldName() as keyof AssessmentQuestionnaireValues] === 'Sometimes'}
                  onChange={(e) => setFieldValue(getFieldName(), e.target.value)}
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                <span className="text-gray-800 font-medium text-sm">Most of the time</span>
                <input
                  type="radio"
                  name={getFieldName()}
                  value="Most of the time"
                  checked={values[getFieldName() as keyof AssessmentQuestionnaireValues] === 'Most of the time'}
                  onChange={(e) => setFieldValue(getFieldName(), e.target.value)}
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                <span className="text-gray-800 font-medium text-sm">Always</span>
                <input
                  type="radio"
                  name={getFieldName()}
                  value="Always"
                  checked={values[getFieldName() as keyof AssessmentQuestionnaireValues] === 'Always'}
                  onChange={(e) => setFieldValue(getFieldName(), e.target.value)}
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
              </label>
            </div>

            <button
              type="submit"
              className={`w-full ${getCategoryColor()} hover:opacity-90 text-white py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center text-sm`}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-green-100 text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center justify-center text-sm"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            {currentQuestion > 1 ? 'Previous Question' : 'Back'}
          </button>


        </Form>
      )}
    </Formik>
  );
}
