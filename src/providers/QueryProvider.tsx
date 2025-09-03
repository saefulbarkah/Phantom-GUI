"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Command } from "@tauri-apps/plugin-shell";
import { listen, TauriEvent } from "@tauri-apps/api/event";
import toast from "react-hot-toast";

export const QueryProvider = ({ children }: React.ComponentProps<"div">) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 50,
        retryDelay: () => 2000, // delay antar retry = 2 detik
      },
    },
  });

  const RunServer = async () => {
    const t = toast.loading("Starting server...");
    const command = Command.sidecar("binaries/phantom");

    command.spawn().then((child) => {
      /**
       * Killing server process when window is closed. Probably won't
       * work for multi window application
       */
      listen(TauriEvent.WINDOW_DESTROYED, function () {
        child.kill();
      });

      toast.success("Server started", { id: t });
    });
  };

  useEffect(() => {
    RunServer();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
