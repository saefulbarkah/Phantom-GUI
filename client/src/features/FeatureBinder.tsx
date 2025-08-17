"use client";
import { GetFeatureSettings } from "@/API/settings";
import { CheckConnection } from "@/API/test";
import { useCustomRoleQuery } from "@/hooks/use-inventory";
import { useBuffs } from "@/hooks/useBuffs";
import { useDungeons } from "@/hooks/useDungeons";
import { useFarms } from "@/hooks/useFarms";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const FeatureBinder = () => {
  const { setFeature, SetFeatureReady, SetNetworkStatus } = useFeatureManager();

  // Initial queries
  const connection = useQuery({ queryKey: ["connection"], queryFn: CheckConnection });
  const queryFeature = useQuery({ queryKey: ["features"], queryFn: GetFeatureSettings });
  const CustomRole = useCustomRoleQuery("CustomRole");
  const OwnRole = useCustomRoleQuery("OwnRole");
  const queryBuffs = useBuffs();
  const queryDungeon = useDungeons();
  const queryFarm = useFarms();

  const BindingFeature = () => {
    if (
      queryFeature.isSuccess &&
      queryBuffs.isSuccess &&
      queryDungeon.isSuccess &&
      queryFarm.isSuccess &&
      CustomRole.isSuccess &&
      OwnRole.isSuccess
    ) {
      setFeature(queryFeature.data?.data);
      SetFeatureReady(true);
      SetNetworkStatus("connected");
    } else if (connection.failureCount > 0 && connection.isFetching) {
      SetNetworkStatus("reconnect");
    } else {
      SetNetworkStatus("disconnected");
    }
  };

  React.useEffect(() => {
    BindingFeature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection.isSuccess, connection.failureCount]);
  return null;
};
