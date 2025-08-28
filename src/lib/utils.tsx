import { clsx, type ClassValue } from "clsx";
import { JSX } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function HighlightNumberText(text: string, colorClass: string = "text-yellow-400"): JSX.Element[] {
  const highlightRegex = /\d+(?:\.\d+)?\s?(?:%|s)?/g;
  const elements: JSX.Element[] = [];

  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of text.matchAll(highlightRegex)) {
    const matchText = match[0];
    const start = match.index ?? 0;

    // Tambah teks normal sebelum angka
    if (start > lastIndex) {
      elements.push(<span key={`text-${matchIndex}`}>{text.slice(lastIndex, start)}</span>);
    }

    // Tambah highlight untuk angka
    elements.push(
      <span key={`highlight-${matchIndex}`} className={`${colorClass} font-medium`}>
        {matchText}
      </span>
    );

    lastIndex = start + matchText.length;
    matchIndex++;
  }

  // Tambah sisa teks setelah angka terakhir
  if (lastIndex < text.length) {
    elements.push(<span key={`text-end`}>{text.slice(lastIndex)}</span>);
  }

  return elements;
}

export function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// utils/keybind.ts
export const formatKeyUI = (key: string | null) => {
  if (!key) return "None";

  // tampilannya user-friendly
  const map: Record<string, string> = {
    SpaceBar: "Space",
    LeftCtrl: "Ctrl",
    RightCtrl: "Ctrl",
    LeftShift: "Shift",
    RightShift: "Shift",
    LeftAlt: "Alt",
    RightAlt: "Alt",
    LeftCmd: "Cmd",
    RightCmd: "Cmd",
    Zero: "0",
    One: "1",
    Two: "2",
    Three: "3",
    Four: "4",
    Five: "5",
    Six: "6",
    Seven: "7",
    Eight: "8",
    Nine: "9",
  };

  return map[key] ?? key;
};
