// useGames.ts
import { useState, useEffect } from 'react';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'speech' | 'social' | 'cognitive';

export interface ActivityGame {
  id: string;
  apiId?: number;
  titleEn: string;
  descEn: string;
  category: Category;
  thumbEmoji: string;
}

const GAME_EMOJI: Record<string, string> = {
  'object-matching':      '🔵',
  'functional-use':       '🛒',
  'emotional-recognition':'😊',
  'behavioral-awareness': '⚖️',
  'color-discrimination': '🎨',
  'logical-relationships':'🧩',
};

const CATEGORY_BY_ID: Record<number, Category> = {
  1: 'speech',
  2: 'social',
  3: 'cognitive',
};

interface ApiGame {
  id: number;
  code: string;
  title: string;
  description: string;
  categoryId: number;
}

export function useGames(categoryId: number) {
  const [games, setGames] = useState<ActivityGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api/games?categoryId=${categoryId}`,
      { signal: abortController.signal },
    )
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch games');
        return res.json();
      })
      .then(data => {
        if (!data.isSuccess) throw new Error(data.message || 'Failed to fetch games');

        const mappedGames: ActivityGame[] = (data.value as ApiGame[]).map(apiGame => ({
          id: apiGame.code,
          apiId: apiGame.id,
          titleEn: apiGame.title,
          descEn: apiGame.description,
          category: CATEGORY_BY_ID[apiGame.categoryId] ?? 'cognitive',
          thumbEmoji: GAME_EMOJI[apiGame.code] ?? '🎮',
        }));

        setGames(mappedGames);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError(err.message);
        setLoading(false);
      });

    return () => abortController.abort();
  }, [categoryId]);

  return { games, loading, error };
}