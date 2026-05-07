import { useState } from 'react';
import { Bell, LoaderCircle } from 'lucide-react';
import type { ActivityGame, Category, Difficulty } from '../hooks/useGames.ts';
import ActivityCard from '../components/games/ActivityCard.tsx';
import DifficultySelector from '../components/games/DifficultySelector.tsx';
import ApiLevelQuestionGame from '../components/games/ApiLevelQuestionGame.tsx';
import { useGames } from '../hooks/useGames.ts';
import { useAuth } from '../contexts/AuthContext';

type Screen = 'list' | 'difficulty' | 'playing';
type FilterTab = Category;

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'speech', label: 'Speech' },
  { key: 'social', label: 'Social' },
  { key: 'cognitive', label: 'Cognitive' },
];

const CATEGORY_ID_MAP: Record<FilterTab, number> = {
  speech: 1,
  social: 2,
  cognitive: 3,
};

function getStoredStars(): number {
  return parseInt(localStorage.getItem('ag_totalStars') ?? '0', 10);
}

export default function Games() {
  const [screen, setScreen] = useState<Screen>('list');
  const [activeGame, setActiveGame] = useState<ActivityGame | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('speech');
  const [stars, setStars] = useState<number>(getStoredStars);
  const { user, token } = useAuth();
  const {
    games: filtered,
    loading: isLoadingGames,
    error: gamesError,
  } = useGames(CATEGORY_ID_MAP[activeFilter]);


  const handlePlay = (game: ActivityGame) => {
    setActiveGame(game);
    setScreen('difficulty');
  };

  const handleSelectDifficulty = (d: Difficulty, levelId?: number) => {
    setDifficulty(d);
    setSelectedLevelId(levelId ?? null);
    setScreen('playing');
  };

  const handleBack = () => {
    if (screen === 'playing') { setScreen('difficulty'); return; }
    if (screen === 'difficulty') { setScreen('list'); return; }
  };

  const handleComplete = (earned: number) => {
    const next = stars + earned;
    setStars(next);
    localStorage.setItem('ag_totalStars', String(next));

    if (user?.patientId && selectedLevelId) {
      fetch('https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api/patient-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          patientId: user.patientId,
          gameLevelId: selectedLevelId,
          earnedPoints: earned
        })
      }).catch(err => {
        console.error('Failed to submit progress:', err);
      });
    }

    setScreen('list');
    setActiveGame(null);
    setDifficulty(null);
    setSelectedLevelId(null);
  };

  if (screen === 'difficulty' && activeGame) {
    return (
      <DifficultySelector
        game={activeGame}
        playerScore={stars}
        onBack={handleBack}
        onSelect={handleSelectDifficulty}
      />
    );
  }

  // Playing screen 
  if (screen === 'playing' && activeGame && difficulty) {
    if (selectedLevelId) {
      return (
        <ApiLevelQuestionGame
          levelId={selectedLevelId}
          title={activeGame.titleEn}
          onBack={handleBack}
          onComplete={handleComplete}
        />
      );
    }

    switch (activeGame.id) {
      default:
        return null;
    }
  }

  return (
    <section className="space-y-6 p-4 md:p-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2c28]">Activities &amp; Games</h1>
          <p className="mt-1 text-sm text-[#60706a]">
            Therapy-aligned activities for cognitive, speech, and social development
          </p>
        </div>

        {/* Stars earned */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#dde3df] bg-white px-3 py-2 text-sm font-semibold text-amber-500 shadow-sm">
          <span className="text-base">⭐</span>
          <span>{stars} Stars Earned</span>
        </div>
      </div>

      {/*Filter tabs*/}
      <div className="flex gap-2">
        {TABS.map(tab => (
          <button
            key={tab.key}
            id={`filter-${tab.key}`}
            onClick={() => setActiveFilter(tab.key)}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors
              ${activeFilter === tab.key
                ? 'border-[#1f2c28] bg-[#1f2c28] text-white'
                : 'border-[#dde3df] bg-white text-[#60706a] hover:border-[#1f2c28] hover:text-[#1f2c28]'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      {isLoadingGames ? (
        <div className="flex items-center justify-center py-20 text-[#60706a]">
          <LoaderCircle className="size-10 animate-spin text-primary-light" />
        </div>
      ) : gamesError ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-[#60706a]">
          <Bell className="mb-3 h-10 w-10 opacity-30" />
          <p className="font-medium">Failed to load games.</p>
          <p className="mt-1 text-sm">{gamesError}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-[#60706a]">
          <Bell className="mb-3 h-10 w-10 opacity-30" />
          <p className="font-medium">No activities found for this category.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(game => (
            <ActivityCard key={game.id} game={game} onPlay={handlePlay} />
          ))}
        </div>
      )}
    </section>
  );
}
