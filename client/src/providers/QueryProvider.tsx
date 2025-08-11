"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

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
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
