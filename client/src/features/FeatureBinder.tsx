"use client";
import { GetBuffs } from "@/API/buffs";
import { GetFeatureSettings } from "@/API/settings";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const FeatureBinder = () => {
  const { setFeature, SetFeatureReady, SetNetworkStatus, SetBuffs } = useFeatureManager();

  // Queries
  const queryFeature = useQuery({ queryKey: ["features"], queryFn: GetFeatureSettings });
  const queryBuffs = useQuery({ queryKey: ["buffs"], queryFn: GetBuffs });

  const BindingFeature = () => {
    if (queryFeature.isSuccess && queryBuffs.isSuccess) {
      setFeature(queryFeature.data?.data);
      SetBuffs(queryBuffs.data);
      SetFeatureReady(true);
      SetNetworkStatus("connected");
    } else if (queryFeature.failureCount > 1 && queryFeature.isFetching && queryBuffs.isFetching) {
      SetNetworkStatus("reconnect");
    } else {
      SetNetworkStatus("disconnected");
    }
  };

  React.useEffect(() => {
    BindingFeature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFeature.failureCount, queryFeature.data, queryFeature.isSuccess]);
  return null;
};
