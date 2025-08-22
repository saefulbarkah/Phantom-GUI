"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

type KeyBindInputProps = {
  onBind?: (key: string) => void; // custom callback
};

export const KeybindInput = ({ onBind }: KeyBindInputProps) => {
  const [key, setKey] = useState<string>("None");
  const [listening, setListening] = useState<boolean>(false);

  const formatKey = (e: KeyboardEvent) => {
    if (e.code === "Space") return "Space";
    if (e.code === "Enter") return "Enter";
    if (e.code === "Tab") return "Tab";
    if (e.code === "Escape") return "Escape";
    if (e.code.startsWith("Arrow")) return e.code;
    return e.key.length === 1 ? e.key.toUpperCase() : e.key;
  };

  const formatKeyUE4 = (e: KeyboardEvent) => {
    const numberMap: Record<string, string> = {
      Digit0: "Zero",
      Digit1: "One",
      Digit2: "Two",
      Digit3: "Three",
      Digit4: "Four",
      Digit5: "Five",
      Digit6: "Six",
      Digit7: "Seven",
      Digit8: "Eight",
      Digit9: "Nine",
    };

    switch (e.code) {
      // special keys
      case "Space":
        return "SpaceBar";
      case "Enter":
        return "Enter";
      case "Tab":
        return "Tab";
      case "Escape":
        return "Escape";

      // arrows
      case "ArrowUp":
        return "Up";
      case "ArrowDown":
        return "Down";
      case "ArrowLeft":
        return "Left";
      case "ArrowRight":
        return "Right";

      // modifiers
      case "ControlLeft":
        return "LeftCtrl";
      case "ControlRight":
        return "RightCtrl";
      case "ShiftLeft":
        return "LeftShift";
      case "ShiftRight":
        return "RightShift";
      case "AltLeft":
        return "LeftAlt";
      case "AltRight":
        return "RightAlt";
      case "MetaLeft":
        return "LeftCmd"; // macOS
      case "MetaRight":
        return "RightCmd";

      // numbers
      case "Digit0":
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9":
        return numberMap[e.code];

      default:
        // huruf & simbol → uppercase
        if (e.key.length === 1) return e.key.toUpperCase();
        return e.key; // fallback
    }
  };

  const handleStartListening = () => {
    setListening(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      // Escape buat clear
      if (e.key.toLowerCase() === "escape") {
        setKey("None");
        setListening(false);
        window.removeEventListener("keydown", handleKeyDown);
        return;
      }

      const singleKey = formatKey(e);
      const formatUe4 = formatKeyUE4(e);

      setKey(singleKey);
      setListening(false);

      if (onBind) onBind(formatUe4);

      window.removeEventListener("keydown", handleKeyDown);
    };

    window.addEventListener("keydown", handleKeyDown);
  };

  return (
    <div className="flex items-center justify-between">
      <Button className="outline-none border-none h-8 text-[14px] rounded" onClick={handleStartListening}>
        {listening ? "..." : key}
      </Button>
    </div>
  );
};
