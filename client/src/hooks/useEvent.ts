"use client";

import { GetEvent } from "@/API/Event";
import { TEvent } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

export const useEvent = (eventKey: keyof TEvent) => {
  return useQuery({
    queryKey: ["event", eventKey], // dynamic key
    queryFn: () => GetEvent(eventKey), // ambil data sesuai key
    refetchInterval: 2500,
    refetchOnMount: true,
  });
};
