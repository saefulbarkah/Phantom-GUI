"use client";
import { GetFeatureSettings } from "@/API/settings";
import useFeatureManager from "@/stores/feature-manager";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const FeatureBinder = () => {
  const { setFeature } = useFeatureManager();

  // Queries
  const query = useQuery({ queryKey: ["features"], queryFn: GetFeatureSettings });

  const BindingFeature = async () => {
    if (query.isSuccess) {
      setFeature(query.data?.data);
      console.log(query.data?.data);
    }
  };

  React.useEffect(() => {
    BindingFeature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);
  return null;
};
