interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
}

export default function ProgressBar({ currentStep, totalSteps, percentage }: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">{percentage}%</span>
        <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
