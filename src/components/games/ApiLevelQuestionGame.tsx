import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  black: '#000000',
  white: '#ffffff',
  brown: '#8b4513',
  gray: '#6b7280',
  grey: '#6b7280',
};

function getLabelColor(label?: string): string | null {
  if (!label) return null;
  const key = label.toLowerCase().trim();
  return COLOR_MAP[key] || null;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api";

interface ApiOption {
  id: number;
  label: string;
  emoji: string;
  colorHex: string | null;
  isCorrect: boolean;
}

interface ApiQuestion {
  id: number;
  prompt: string;
  targetLabel: string;
  targetEmoji: string;
  options: ApiOption[];
}

interface ApiLevelQuestionsResponse {
  value?: {
    id: number;
    difficulty: string;
    levelPoints: number;
    pointsPerQuestion: number;
    questionCount: number;
    questions?: ApiQuestion[];
  };
  isSuccess?: boolean;
  message?: string;
}

interface ApiLevelQuestionGameProps {
  levelId: number;
  title: string;
  onBack: () => void;
  onComplete: (starsEarned: number) => void;
}

function calcStars(score: number, total: number): number {
  const pct = total > 0 ? score / total : 0;
  if (pct >= 0.9) return 3;
  if (pct >= 0.6) return 2;
  if (pct > 0) return 1;
  return 0;
}

export default function ApiLevelQuestionGame({
  levelId,
  title,
  onBack,
  onComplete,
}: ApiLevelQuestionGameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [difficultyLabel, setDifficultyLabel] = useState("Easy");
  const [pointsPerQuestion, setPointsPerQuestion] = useState(1);
  const [questions, setQuestions] = useState<ApiQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);
    setIsComplete(false);
    setQuestionIndex(0);
    setScore(0);
    setSelectedOptionId(null);

    const minDelay = new Promise((resolve) => setTimeout(resolve, 200));

    const fetchData = fetch(`${API_BASE}/game-levels/${levelId}/questions`, {
      signal: abortController.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load level questions");
        return res.json() as Promise<ApiLevelQuestionsResponse>;
      })
      .then((data) => {
        if (!data?.isSuccess || !data.value) {
          throw new Error(data?.message || "Failed to load level questions");
        }
        const loadedQuestions = data.value.questions ?? [];
        if (loadedQuestions.length === 0) {
          throw new Error("No questions found for this level");
        }
        
        const shuffledQuestions = loadedQuestions.map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }));

        return {
          difficulty: data.value.difficulty || "Easy",
          pointsPerQuestion: Math.max(1, data.value.pointsPerQuestion || 1),
          questions: shuffledQuestions,
        };
      });

    Promise.all([fetchData, minDelay])
      .then(([data]) => {
        if (abortController.signal.aborted) return;
        setDifficultyLabel(data.difficulty);
        setPointsPerQuestion(data.pointsPerQuestion);
        setQuestions(data.questions);
      })
      .catch((err: Error & { name?: string }) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to load level questions");
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => abortController.abort();
  }, [levelId]);

  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;
  const totalScore = totalQuestions * pointsPerQuestion;
  const stars = useMemo(() => calcStars(score, totalScore), [score, totalScore]);

  const handleOptionClick = (option: ApiOption) => {
    if (selectedOptionId !== null || isComplete) return;
    setSelectedOptionId(option.id);
    if (option.isCorrect) {
      setScore((s) => s + pointsPerQuestion);
    }

    window.setTimeout(() => {
      const next = questionIndex + 1;
      if (next >= totalQuestions) {
        setIsComplete(true);
      } else {
        setQuestionIndex(next);
        setSelectedOptionId(null);
      }
    }, 700);
  };

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-6 text-center animate-in fade-in duration-500">
        <div className="relative mb-6">
          {/* Background ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#eef3f1]"></div>
          {/* Animated spinner ring */}
          <div className="size-16 animate-spin rounded-full border-4 border-[#0f5a3a] border-t-transparent shadow-sm"></div>
        </div>
        <h2 className="text-2xl font-bold text-[#1f2c28]">Getting ready...</h2>
        <p className="mt-2 text-base text-[#60706a]">
          Loading the questions for your challenge.
        </p>
      </div>
    );
  }

  if (error || !currentQuestion) {
    return (
      <div className="mx-auto max-w-xl px-4 py-6">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[#60706a] transition-colors hover:text-[#0f5a3a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </button>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error || "No questions available for this level."}
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="mx-auto max-w-xl px-4 py-6">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[#60706a] transition-colors hover:text-[#0f5a3a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </button>

        <div className="rounded-2xl border border-[#dde3df] bg-white p-8 text-center shadow-sm">
          <div className="text-6xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold text-[#1f2c28]">Great work!</h2>
          <p className="mt-2 text-sm text-[#60706a]">
            Score: <span className="font-semibold text-[#0f5a3a]">{score}</span> /{" "}
            {totalScore}
          </p>
          <div className="mt-4 text-3xl">
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= stars ? "opacity-100" : "opacity-25"}>
                ⭐
              </span>
            ))}
          </div>
          <button
            onClick={() => onComplete(stars)}
            className="mt-6 rounded-xl bg-[#0f5a3a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c4b31]"
          >
            Back to Activities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <button
        onClick={onBack}
        className="cursor-pointer mb-6 flex items-center gap-1.5 text-sm font-medium text-[#60706a] transition-colors hover:text-[#0f5a3a]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Activities
      </button>

      <div className="rounded-2xl border border-[#dde3df] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#1f2c28]">{title}</h2>
            <p className="text-sm text-[#60706a]">{currentQuestion.prompt}</p>
          </div>
          <span className="rounded-full border border-[#dde3df] bg-[#f8faf9] px-3 py-1 text-xs font-semibold text-[#0f5a3a]">
            {difficultyLabel}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2 text-[#60706a]">
          <span>
            Question {questionIndex + 1}/{totalQuestions}
          </span>
          <span>Score: {score}</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef3f1] mb-7">
          <div
            className="h-full rounded-full bg-[#0f5a3a] transition-all duration-500"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <div className="mb-10 flex justify-center">
          <div className="flex flex-col items-center gap-3">
            <div
              className={`flex h-32 w-32 items-center justify-center rounded-3xl border-4 shadow-sm transition-transform duration-500 ${selectedOptionId !== null ? 'scale-[0.97] opacity-90' : ''
                }`}
              style={{
                borderColor: currentQuestion.targetEmoji ? '#dde3df' : 'transparent',
                backgroundColor: currentQuestion.targetEmoji ? '#f8faf9' : 'transparent',
              }}
            >
              {currentQuestion.targetEmoji ? (
                <span className="text-7xl">{currentQuestion.targetEmoji}</span>
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center rounded-3xl border-4 border-[#dde3df] shadow-inner"
                  style={{
                    backgroundColor: getLabelColor(currentQuestion.targetLabel) ?? '#f8faf9',
                  }}
                >
                  <span
                    className="px-2 text-center text-2xl font-extrabold leading-tight drop-shadow-sm"
                    style={{ color: getLabelColor(currentQuestion.targetLabel) === '#ffffff' ? '#1f2c28' : '#ffffff' }}
                  >
                    {currentQuestion.targetLabel}
                  </span>
                </div>
              )}
            </div>
            {currentQuestion.targetEmoji && (
              <p className="text-base font-bold text-[#1f2c28]">{currentQuestion.targetLabel}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const showCorrect = selectedOptionId !== null && option.isCorrect;
            const showWrong = isSelected && selectedOptionId !== null && !option.isCorrect;
            const extractedColor = option.colorHex || getLabelColor(option.label);

            let borderClass = 'border-[#dde3df]';
            let bgStyle = extractedColor ?? '#f8faf9';
            let opacityClass = 'opacity-100';
            let scaleClass = '';

            if (selectedOptionId !== null) {
              if (showCorrect) {
                borderClass = 'border-[#16a34a] ring-4 ring-[#16a34a]/30';
                if (!extractedColor) bgStyle = '#f0fdf4';
                scaleClass = 'scale-[1.03] z-10';
              } else if (showWrong) {
                borderClass = 'border-[#dc2626]';
                if (!extractedColor) bgStyle = '#fff1f2';
                opacityClass = 'opacity-90';
                scaleClass = 'scale-[0.98]';
              } else {
                opacityClass = 'opacity-40 grayscale-[0.6]';
                scaleClass = 'scale-[0.98]';
              }
            }

            // Decide text color based on if there's a background color
            const textColor = (extractedColor && extractedColor !== '#ffffff') ? '#ffffff' : '#1f2c28';

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOptionId !== null}
                className={`cursor-pointer relative flex h-24 items-center justify-center rounded-2xl border-4 text-5xl transition-all duration-300 enabled:hover:-translate-y-1 enabled:hover:shadow-md enabled:active:scale-95 ${borderClass} ${opacityClass} ${scaleClass}`}
                style={{ backgroundColor: bgStyle }}
                aria-label={option.label}
              >
                {option.emoji ? (
                  <span>{option.emoji}</span>
                ) : (
                  <span
                    className="px-2 text-xl font-bold drop-shadow-sm"
                    style={{ color: textColor }}
                  >
                    {option.label}
                  </span>
                )}

                {/* Correct Overlay Icon */}
                {showCorrect && (
                  <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-md animate-in zoom-in duration-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Wrong Overlay Icon */}
                {showWrong && (
                  <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-md animate-in zoom-in duration-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
