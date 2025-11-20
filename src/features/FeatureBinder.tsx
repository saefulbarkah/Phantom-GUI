"use client";
import { GetConnection } from "@/API/test";
import { useBuffs } from "@/hooks/useBuffs";
import { useSendConnection } from "@/hooks/useConnection";
import { useDungeons } from "@/hooks/useDungeons";
import { useFarms } from "@/hooks/useFarms";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useKeybind } from "@/hooks/useKeybind";
import { useProcess } from "@/hooks/useProcess";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const FeatureBinder = () => {
  const { setFeature, SetFeatureReady, SetNetworkStatus } = useFeatureManager();

  // Initial queries
  const connection = useQuery({
    queryKey: ["connection"],
    queryFn: GetConnection,
    refetchInterval: (d) => {
      if (!d.state.data?.data.IsConnected) return 3000;
      return false;
    },
  });

  const queryBuffs = useBuffs();
  const queryDungeon = useDungeons();
  const queryFarm = useFarms();
  const { queryFeature } = useFeatureManager();
  const { querykeybind, SyncKeybinds } = useKeybind();
  const { mutate } = useSendConnection();
  const { query: queryLauncher, setLauncherPath } = useProcess();

  React.useEffect(() => {
    if (
      queryFeature.isSuccess &&
      queryBuffs.isSuccess &&
      queryDungeon.isSuccess &&
      queryFarm.isSuccess &&
      querykeybind.isSuccess &&
      connection.data?.data?.IsConnected &&
      queryLauncher.isSuccess
    ) {
      SyncKeybinds(querykeybind.data);
      setFeature(queryFeature.data?.data);
      setLauncherPath(queryLauncher.data.path);
      SetFeatureReady(true);
      SetNetworkStatus("connected");
    } else if (connection.isSuccess && !connection.data?.data?.IsConnected) {
      mutate(true);
      SetNetworkStatus("reconnect");
    } else {
      mutate(true);
      SetNetworkStatus("disconnected");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    queryFeature.isSuccess,
    queryBuffs.isSuccess,
    queryDungeon.isSuccess,
    queryFarm.isSuccess,
    connection.isFetching,
    connection.isError,
    queryLauncher.isError,
  ]);

  return null;
};
