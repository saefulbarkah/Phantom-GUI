import { GetBuffs } from "@/API/buffs";
import { useQuery } from "@tanstack/react-query";

export const useBuffs = () => {
  return useQuery({ queryKey: ["buffs"], queryFn: GetBuffs, refetchOnMount: true });
};
