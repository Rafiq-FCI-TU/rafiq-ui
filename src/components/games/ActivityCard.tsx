import type { ActivityGame } from "../../hooks/useGames";

interface ActivityCardProps {
  game: ActivityGame;
  onPlay: (game: ActivityGame) => void;
}

function categoryLabel(category: ActivityGame["category"]): string {
  if (category === "speech") return "Speech";
  if (category === "social") return "Social";
  return "Cognitive";
}

export default function ActivityCard({ game, onPlay }: ActivityCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#dde3df] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#e8f2ed] to-[#d1e6db] text-2xl shadow-inner">
            {game.thumbEmoji}
          </div>
          <span className="rounded-full border border-[#e8f2ed] bg-[#f8faf9] px-3 py-1 text-xs font-semibold tracking-wide text-[#0f5a3a]">
            {categoryLabel(game.category)}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-bold leading-tight text-[#1f2c28]">{game.titleEn}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#60706a]">{game.descEn}</p>
      </div>

      <button
        type="button"
        onClick={() => onPlay(game)}
        className="mt-6 w-full cursor-pointer rounded-xl bg-[#0f5a3a] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#0c4b31] hover:shadow-md active:scale-[0.98]"
      >
        Play Activity
      </button>
    </article>
  );
}
