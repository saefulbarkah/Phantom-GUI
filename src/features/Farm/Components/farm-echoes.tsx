"use client";

import { FilterSonata } from "@/API/farms/auto-farm-echoes";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox, TOptionValue } from "@/components/FeatureComboBox";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
import { LoadingContent } from "@/components/LoadingContent";
import { Button } from "@/components/ui/button";
import { useEventMutation } from "@/hooks/useEvent";
import { useFarms, useFarmState } from "@/hooks/useFarms";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { HighlightNumberText } from "@/lib/utils";
import { TFilterFarm } from "@/types/farm";
import { useMutation } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const byCost: TOptionValue[] = [
  { label: "All", value: "All" },
  { label: "3", value: "3" },
  { label: "1", value: "1" },
];

export const FarmEchoes = () => {
  const { filter, setFilter, monsters, setMonster, setSonata, sonata } = useFarmState();
  const { mutate } = useMutation({ mutationKey: ["filterFarm"], mutationFn: FilterSonata });
  const { mutate: UpdateEvent } = useEventMutation();

  const [SonataValue, setSonataValue] = useState("");
  const [CostValue, setCostValue] = useState("");
  const [EchoValue, setEchoValue] = useState("");
  const { refetch, data, isFetching } = useFarms();
  const { IsFeatureReady } = useFeatureManager();

  const StartFarm = async () => {
    try {
      if (!sonata?.monsters || !sonata.id || !sonata.name) return;

      UpdateEvent({
        onStartFarmEchoes: { status: true, data: { monsters: sonata.monsters, id: sonata.id, name: sonata.name } },
      });
      toast.success("Auto farm started!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update farm status");
    }
  };

  const StopFarm = async () => {
    try {
      if (!sonata?.monsters) return;
      UpdateEvent({
        onStopFarmEchoes: { status: true },
      });
      toast.success("Auto farm stopped!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update farm status");
    }
  };

  const onFilterSonata = async (a: TFilterFarm) => {
    try {
      mutate(a, {
        onSuccess: (data) => {
          setSonata({
            id: data.id,
            name: data.name,
            icon: data.icon,
            sonataEffects: data.sonataEffects,
            monsters: data.monsters,
          });
        },
        onError: (err) => console.error(err),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sonataOptions = useMemo(() => {
    return (
      data?.map((item) => ({
        label: item.name,
        value: item.name,
        real_value: item.id,
        icon: item.icon,
        sonataEffects: item.sonataEffects,
        monsters: item.monsters,
      })) ?? []
    );
  }, [data]);

  const echoOptions = useMemo(() => {
    return [{ label: "All", value: "All" }, ...monsters.map((item) => ({ label: item.name, value: item.name }))];
  }, [monsters]);

  useEffect(() => {
    if (!data?.length) return;

    let newEchoValue = EchoValue;
    let newCostValue = CostValue;
    let newSonataValue = SonataValue;

    for (const a of data) {
      let monsterName: { name: string } | undefined;

      if (filter.byEcho === "All") newEchoValue = "All";
      else monsterName = a.monsters.find((item) => item.name.includes(`${filter.byEcho}`));
      if (monsterName) newEchoValue = monsterName.name;

      let monsterCost: { cost: number } | undefined;
      if (filter.byCost === "All") newCostValue = "All";
      else monsterCost = a.monsters.find((item) => item.cost === Number(filter.byCost));
      if (monsterCost) newCostValue = `${monsterCost.cost}`;

      if (a.id === filter.bySonataId) newSonataValue = a.name;
    }

    if (newEchoValue !== EchoValue) setEchoValue(newEchoValue);
    if (newCostValue !== CostValue) setCostValue(newCostValue);
    if (newSonataValue !== SonataValue) setSonataValue(newSonataValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!IsFeatureReady) return <LoadingContent />;

  return (
    <div>
      <FeatureWrapper>
        <FeatureSection title="Auto Farm" description="Automatically farm echoes and kill monsters">
          <FeatureCardSwitch>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
              <p>By Sonata</p>
              <FeatureComboBox
                data={sonataOptions}
                value={SonataValue}
                setValue={setSonataValue}
                onSelect={(data) => {
                  setFilter({ bySonataId: data.real_value });
                  setMonster(data.monsters);
                  setEchoValue("All");
                  onFilterSonata({
                    bySonataId: data.real_value,
                    byCost: CostValue === "" ? null : Number(CostValue),
                    byEcho: "All",
                  });
                }}
              />

              <p>By Cost</p>
              <FeatureComboBox
                disabled={!sonata.id}
                data={byCost}
                value={CostValue}
                setValue={setCostValue}
                onSelect={(data) => {
                  setFilter({ byCost: data.value });
                  onFilterSonata({
                    bySonataId: sonata.id ? sonata.id : null,
                    byCost: Number(data.value) ? Number(data.value) : "All",
                    byEcho: "All",
                  });
                }}
              />

              <p>By Echo</p>
              <FeatureComboBox
                disabled={!sonata.id}
                data={echoOptions}
                value={EchoValue}
                setValue={setEchoValue}
                onSelect={(data) => {
                  setFilter({ byEcho: data.value });
                  onFilterSonata({
                    bySonataId: sonata.id ? sonata.id : null,
                    byCost: CostValue === "" ? null : Number(CostValue),
                    byEcho: data.value,
                  });
                }}
              />
            </div>

            <div className="flex gap-2 mt-5 w-full">
              <Button className="flex-1" disabled={!sonata.name} onClick={() => StartFarm()}>
                Start
              </Button>
              <Button className="flex-1" onClick={() => StopFarm()}>
                Stop
              </Button>
              <Button size="icon" className="flex-shrink-0" onClick={() => refetch()} disabled={isFetching}>
                <RefreshCcw />
              </Button>
            </div>
          </FeatureCardSwitch>
        </FeatureSection>

        <FeatureSection title="Farm Info" description="Details of target monsters and sonata">
          <FeatureCardSwitch>
            <div className="w-full md:w-fit divide-y divide-gray-700">
              <p className="py-2">Target</p>
              <div className="grid grid-cols-[1fr_auto] md:grid-cols-[150px_250px] items-center gap-4 py-2">
                <span className="text-gray-300">Sonata</span>
                <div className="flex gap-2 items-center">
                  {sonata.name ? (
                    <>
                      <Image alt="" src={`${sonata.icon}`} width={20} height={20} />
                      <span>{SonataValue}</span>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto] md:grid-cols-[150px_auto] items-center gap-4 py-2">
                <span className="text-gray-300">Cost</span>
                {CostValue !== "" ? <span>{CostValue}</span> : <span>-</span>}
              </div>

              <div className="grid grid-cols-[1fr_auto] md:grid-cols-[150px_auto] items-center gap-4 py-2">
                <span className="text-gray-300">Echo</span>
                {EchoValue !== "" ? <span>{EchoValue}</span> : <span>-</span>}
              </div>
            </div>

            <h2 className="mt-5 mb-2">Effects</h2>
            <div className="flex flex-col divide-y divide-gray-700">
              {sonata.sonataEffects?.map((item, i) => (
                <div className="flex flex-col gap-2 py-3" key={i}>
                  <p>{i === 0 ? "2" : "4"}-piece effect</p>
                  <p>{HighlightNumberText(item.desc, "text-yellow-300")}</p>
                </div>
              ))}
            </div>
          </FeatureCardSwitch>
        </FeatureSection>
      </FeatureWrapper>
    </div>
  );
};
