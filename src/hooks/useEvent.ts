"use client";

import { GetEvent, UpdateEvent } from "@/API/Event";
import { TEvent } from "@/types/event";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useEventQuery = (eventKey: keyof TEvent) => {
  return useQuery({
    queryKey: ["event", eventKey], // dynamic key
    queryFn: () => GetEvent(eventKey), // ambil data sesuai key
    refetchInterval: 2500,
    refetchOnMount: true,
  });
};

export const useEventMutation = () => {
  return useMutation({
    mutationKey: ["event-update"], // dynamic key
    mutationFn: (eventKey: TEvent) => UpdateEvent(eventKey), // ambil data sesuai key
  });
};
