"use client";
import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minimize } from "lucide-react";

export const WindowBar = () => {
  return <div className="fixed inset-0 z-50 pointer-events-none" onMouseDown={(e) => {}} />;
};
