import type { Dispatch, SetStateAction } from "react";
import type { Tab } from "../../../types/Session";

export default function TapButton({
  tab,
  setTabs,
}: {
  tab: Tab;
  setTabs: Dispatch<SetStateAction<Tab[]>>;
}) {
  return (
    <button
      disabled={tab.active}
      onClick={() =>
        setTabs((prev: Tab[]) => {
          return prev.map((t: Tab) => {
            if (t.name === tab.name) return { ...t, active: true };
            return { ...t, active: false };
          });
        })
      }
      className={`flex items-center not-sm:py-2 not-sm:px-3 not-sm:text-xs not-sm:text-nowrap gap-2 py-4 px-8 rounded-full font-medium text-sm transition-all duration-300 ${
        tab.active
          ? "bg-primary text-white"
          : "cursor-pointer  text-gray-500 bg-gray-100 hover:text-gray-700"
      }`}
    >
      {tab.icon}
      {tab.name}
    </button>
  );
}
