import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface PostMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PostMenu({ onEdit, onDelete }: PostMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!onEdit && !onDelete) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 cursor-pointer rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all text-gray-400 hover:text-gray-600"
        aria-label="Post options"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 min-w-[140px] z-20 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="cursor-pointer w-full px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2.5"
            >
              <Pencil className="w-4 h-4 text-gray-400" />
              <span>Edit post</span>
            </button>
          )}
          {onEdit && onDelete && (
            <div className="mx-3 my-1 border-t border-gray-100" />
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="cursor-pointer w-full px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Delete</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
