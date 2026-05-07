import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Flame, Crown, LoaderCircle, Zap, Lock } from "lucide-react";
import type { ActivityGame, Difficulty } from "../../hooks/useGames";

export const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; labelAr: string; icon: string; color: string; bg: string; border: string; desc: string; rounds: number; timeSec: number }
> = {
  easy: {
    label: 'Easy',
    labelAr: 'سهل',
    icon: '⚡',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    desc: 'Fewer rounds, more time',
    rounds: 5,
    timeSec: 30,
  },
  medium: {
    label: 'Medium',
    labelAr: 'متوسط',
    icon: '🔥',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    desc: 'Balanced challenge',
    rounds: 8,
    timeSec: 20,
  },
  hard: {
    label: 'Hard',
    labelAr: 'صعب',
    icon: '👑',
    color: '#dc2626',
    bg: '#fff1f2',
    border: '#fecdd3',
    desc: 'More rounds, less time',
    rounds: 12,
    timeSec: 12,
  },
};

interface DifficultySelectorProps {
  game: ActivityGame;
  playerScore: number;
  onBack: () => void;
  onSelect: (difficulty: Difficulty, levelId?: number) => void;
}

const ORDERED_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api";

interface ApiGameLevel {
  id: number;
  difficulty: string;
  levelPoints: number;
  pointsPerQuestion: number;
  unlockThreshold: number;
  questionCount: number;
}

interface ApiGameDetailsResponse {
  value: {
    id: number;
    levels?: ApiGameLevel[];
  };
  isSuccess: boolean;
  message?: string;
}

const DIFFICULTY_STYLES: Record<
  Difficulty,
  { icon: typeof Zap; text: string; bg: string; border: string }
> = {
  easy: {
    icon: Zap,
    text: "text-[#22c55e]",
    bg: "bg-[#effcf4]",
    border: "border-[#b7efcc]",
  },
  medium: {
    icon: Flame,
    text: "text-[#eab308]",
    bg: "bg-[#fff9ec]",
    border: "border-[#f6df9b]",
  },
  hard: {
    icon: Crown,
    text: "text-[#ef4444]",
    bg: "bg-[#fff2f2]",
    border: "border-[#f7c3c3]",
  },
};

export default function DifficultySelector({
  game,
  playerScore,
  onBack,
  onSelect,
}: DifficultySelectorProps) {
  const [levelsFromApi, setLevelsFromApi] = useState<Partial<Record<Difficulty, ApiGameLevel>>>(
    {},
  );
  const [isLoadingLevels, setIsLoadingLevels] = useState(false);
  const [levelsError, setLevelsError] = useState<string | null>(null);

  useEffect(() => {
    if (!game.apiId) {
      setLevelsFromApi({});
      setLevelsError(null);
      return;
    }

    const abortController = new AbortController();
    setIsLoadingLevels(true);
    setLevelsError(null);

    fetch(`${API_BASE}/games/${game.apiId}`, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load game levels");
        return res.json() as Promise<ApiGameDetailsResponse>;
      })
      .then((data) => {
        if (!data?.isSuccess || !data?.value) {
          throw new Error(data?.message || "Failed to load game levels");
        }

        const mapped: Partial<Record<Difficulty, ApiGameLevel>> = {};
        for (const level of data.value.levels ?? []) {
          const key = level.difficulty.toLowerCase() as Difficulty;
          if (key === "easy" || key === "medium" || key === "hard") {
            mapped[key] = level;
          }
        }
        setLevelsFromApi(mapped);
      })
      .catch((err: Error & { name?: string }) => {
        if (err.name === "AbortError") return;
        setLevelsError(err.message || "Failed to load game levels");
      })
      .finally(() => {
        setIsLoadingLevels(false);
      });

    return () => abortController.abort();
  }, [game.apiId]);

  const difficultyItems = useMemo(
    () =>
      ORDERED_DIFFICULTIES.map((difficulty) => {
        const localMeta = DIFFICULTY_META[difficulty];
        const apiLevel = levelsFromApi[difficulty];

        return {
          difficulty,
          label: localMeta.label,
          desc: localMeta.desc,
          levelId: apiLevel?.id,
          unlockThreshold: apiLevel?.unlockThreshold ?? 0,
        };
      }),
    [levelsFromApi],
  );

  return (
    <section className="mx-auto max-w-3xl px-4 py-6">
      <button
        type="button"
        onClick={onBack}
        className="cursor-pointer mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#60706a] transition-colors hover:text-[#0f5a3a]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Activities
      </button>

      <div className="rounded-2xl border border-[#dde3df] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#1f2c28]">{game.titleEn}</h2>
            <p className="mt-1 text-sm text-[#60706a]">{game.descEn}</p>
          </div>
          <span className="rounded-full bg-[#f4f7f6] px-4 py-1.5 text-sm font-semibold text-[#60706a]">
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </span>
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold text-[#1f2c28] md:text-4xl">
            Choose Difficulty
          </h3>
          <p className="mt-3 text-lg text-[#60706a]">
            Select a level that matches the child's ability
          </p>
          {isLoadingLevels ? (
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#60706a]">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Loading levels...
            </p>
          ) : null}
          {levelsError ? (
            <p className="mt-2 text-sm text-red-500">
              {levelsError}. Showing default level values.
            </p>
          ) : null}
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
          {difficultyItems.map((item) => {
            const { difficulty, label, desc, levelId, unlockThreshold } = item;
            const style = DIFFICULTY_STYLES[difficulty];
            const Icon = style.icon;
            const isUnlocked = playerScore >= unlockThreshold;

            return (
              <button
                key={difficulty}
                type="button"
                onClick={() => isUnlocked && onSelect(difficulty, levelId)}
                disabled={!isUnlocked}
                className={`relative cursor-pointer rounded-3xl border-2 p-6 text-left transition-all ${
                  isUnlocked 
                    ? `hover:scale-[1.01] hover:shadow-sm ${style.bg} ${style.border}` 
                    : 'opacity-70 bg-gray-50 border-gray-200 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`rounded-2xl ${isUnlocked ? style.text : 'text-gray-400'}`}>
                    <Icon className="h-10 w-10" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-2xl font-extrabold md:text-3xl ${isUnlocked ? style.text : 'text-gray-500'}`}>
                      {label}
                    </p>
                    <p className={`mt-1 text-lg md:text-xl ${isUnlocked ? 'text-[#60706a]' : 'text-gray-400'}`}>
                      {desc}
                    </p>
                  </div>
                  {!isUnlocked && (
                    <div className="flex flex-col items-end justify-center">
                      <div className="flex items-center gap-1.5 text-gray-500 bg-gray-200/60 border border-gray-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                        <Lock className="w-4 h-4" />
                        <span>{unlockThreshold} Stars</span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
