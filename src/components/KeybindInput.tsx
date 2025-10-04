"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { formatKeyUI } from "@/lib/utils";

type KeyBindInputProps = {
  keybind: string | null;
  onBind: (key: string | null) => void; // custom callback
};

export const KeybindInput = ({ onBind, keybind }: KeyBindInputProps) => {
  const [listening, setListening] = useState<boolean>(false);

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

  const formatMouseUE4 = (button: number) => {
    switch (button) {
      case 0:
        return "LeftMouseButton";
      case 1:
        return "MiddleMouseButton";
      case 2:
        return "RightMouseButton";
      case 3:
        return "ThumbMouseButton";
      case 4:
        return "ThumbMouseButton2";
      default:
        return null;
    }
  };

  const handleStartListening = () => {
    setListening(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      // Escape buat clear
      if (e.key.toLowerCase() === "escape") {
        setListening(false);
        window.removeEventListener("keydown", handleKeyDown);
        if (onBind) onBind(null);
        return;
      }

      const formatUe4 = formatKeyUE4(e);

      setListening(false);

      if (onBind) onBind(formatUe4);

      window.removeEventListener("keydown", handleKeyDown);
    };

    const handleMouse = (e: MouseEvent) => {
      e.preventDefault();
      const format = formatMouseUE4(e.button);
      setListening(false);
      if (onBind) onBind(format);
      window.removeEventListener("auxclick", handleMouse);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("auxclick", handleMouse);
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        className="outline-none border-none h-8 text-[14px] rounded disabled:opacity-100"
        disabled={listening}
        onClick={handleStartListening}
      >
        {listening ? "..." : keybind ? formatKeyUI(keybind) : "None"}
      </Button>
    </div>
  );
};
