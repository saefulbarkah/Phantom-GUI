"use client";
import { GetFeatureSettings } from "@/API/settings";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const FeatureBinder = () => {
  const { setFeature, SetFeatureReady, SetNetworkStatus } = useFeatureManager();

  // Queries
  const query = useQuery({ queryKey: ["features"], queryFn: GetFeatureSettings });

  const BindingFeature = async () => {
    if (query.isSuccess) {
      setFeature(query.data?.data);
      console.log(query.data?.data);
      SetFeatureReady(true);
      SetNetworkStatus("connected");
    } else if (query.failureCount > 1 && query.isFetching) {
      SetNetworkStatus("reconnect");
    } else {
      SetNetworkStatus("disconnected");
    }
  };

  React.useEffect(() => {
    BindingFeature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.failureCount]);
  return null;
};
