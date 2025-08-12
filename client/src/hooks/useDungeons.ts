import { GetDungeons } from "@/API/dungeons";
import { TDungeon } from "@/types/dungeon";
import { useQuery } from "@tanstack/react-query";

export const useDungeons = () => {
  const { data, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ["dungeons"],
    queryFn: GetDungeons,
    refetchOnMount: true,
  });

  return {
    dungeons: data as TDungeon[],
    isSuccess,
    isFetching,
    refetch,
  };
};
