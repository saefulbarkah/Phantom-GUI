import { GetBuffs, UpdateBuffSelected } from "@/API/buffs";
import { UpdateEvent } from "@/API/Event";
import { TSelectedBuff } from "@/types/buff";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useBuffs = () => {
  const query = useQuery({ queryKey: ["buffs"], queryFn: GetBuffs, refetchOnMount: true });

  const ApplyBuff = async (data: Partial<TSelectedBuff>) => {
    try {
      await UpdateBuffSelected(data);
      await UpdateEvent({ onApplyBuff: { status: true, data: { id: data.id as number, name: data.name as string } } });
      toast.success("Applied buff " + data.id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to apply buff");
    }
  };

  return { ...query, ApplyBuff };
};
