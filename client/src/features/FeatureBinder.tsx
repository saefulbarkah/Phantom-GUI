"use client";
import { CheckConnection } from "@/API/test";
import { useBuffs } from "@/hooks/useBuffs";
import { useDungeons } from "@/hooks/useDungeons";
import { useFarms } from "@/hooks/useFarms";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useKeybind } from "@/hooks/useKeybind";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const FeatureBinder = () => {
  const { setFeature, SetFeatureReady, SetNetworkStatus } = useFeatureManager();

  // Initial queries
  const connection = useQuery({ queryKey: ["connection"], queryFn: CheckConnection });
  const queryBuffs = useBuffs();
  const queryDungeon = useDungeons();
  const queryFarm = useFarms();
  const { queryFeature } = useFeatureManager();
  const { querykeybind, SyncKeybinds } = useKeybind();

  React.useEffect(() => {
    if (
      queryFeature.isSuccess &&
      queryBuffs.isSuccess &&
      queryDungeon.isSuccess &&
      queryFarm.isSuccess &&
      querykeybind.isSuccess
    ) {
      SyncKeybinds(querykeybind.data);
      setFeature(queryFeature.data?.data);
      SetFeatureReady(true);
      SetNetworkStatus("connected");
    } else if (connection.failureCount > 0 && connection.isFetching) {
      SetNetworkStatus("reconnect");
    } else {
      SetNetworkStatus("disconnected");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    queryFeature.isSuccess,
    queryBuffs.isSuccess,
    queryDungeon.isSuccess,
    queryFarm.isSuccess,
    connection.failureCount,
    connection.isFetching,
  ]);

  return null;
};
