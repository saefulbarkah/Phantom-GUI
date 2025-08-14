"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox, TOptionValue } from "@/components/FeatureComboBox";
import { LoadingContent } from "@/components/LoadingContent";
import { Button } from "@/components/ui/button";
import { useFarms, useFarmState } from "@/hooks/useFarms";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { RefreshCcw } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const byCost: TOptionValue[] = [
  { label: "All", value: "All" },
  { label: "3", value: "3" },
  { label: "1", value: "1" },
];

export const FarmEchoes = () => {
  const { filter, setFilter, monsters, setMonster } = useFarmState();
  const [SonataValue, setSonataValue] = useState("");
  const [CostValue, setCostValue] = useState("");
  const [EchoValue, setEchoValue] = useState("");

  const { isSuccess, refetch, data } = useFarms();
  const { IsFeatureReady } = useFeatureManager();

  const StartFarm = async () => {
    toast("Farming on start");
  };

  const StopFarm = async () => {
    toast("Farming on stop");
  };

  const Refresh = async () => {
    toast.promise(refetch, { success: "Data loaded", loading: "Refreshing..." });
  };

  // Cache mapping untuk By Sonata
  const sonataOptions = useMemo(() => {
    return (
      data?.map((item) => ({
        label: item.name,
        value: item.name,
        real_value: item.id,
        icon: `./assets/icon/sonata/${item.icon.toLowerCase()}.webp`,
        monsters: item.monsters,
      })) ?? []
    );
  }, [data]);

  // Cache mapping untuk By Echo
  const echoOptions = useMemo(() => {
    return [
      { label: "All", value: "All" }, // ⬅ ini akan selalu muncul di urutan pertama
      ...monsters.map((item) => ({
        label: item.name,
        value: item.name,
      })),
    ];
  }, [monsters]);

  // Update nilai dropdown hanya jika data/filter berubah
  useEffect(() => {
    if (!data?.length) return;

    let newEchoValue = EchoValue;
    let newCostValue = CostValue;
    let newSonataValue = SonataValue;

    for (const a of data) {
      let monsterName: { name: string } | undefined;

      if (filter.byEcho === "All") {
        newEchoValue = "All";
      } else {
        monsterName = a.monsters.find((item) => item.name.includes(`${filter.byEcho}`));
      }

      if (monsterName) newEchoValue = monsterName.name;

      let monsterCost: { cost: number } | undefined;
      if (filter.byCost === "All") {
        newCostValue = "All";
      } else {
        monsterCost = a.monsters.find((item) => item.cost === Number(filter.byCost));
      }

      if (monsterCost) newCostValue = `${monsterCost.cost}`;
      if (a.id === filter.bySonataId) newSonataValue = a.name;
    }

    if (newEchoValue !== EchoValue) setEchoValue(newEchoValue);
    if (newCostValue !== CostValue) setCostValue(newCostValue);
    if (newSonataValue !== SonataValue) setSonataValue(newSonataValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!IsFeatureReady || !isSuccess) return <LoadingContent />;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Auto Farm Echoes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        <FeatureCardSwitch title="Filter" description="">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
            {/* filter by sonata */}
            <p>By Sonata</p>
            <FeatureComboBox
              data={sonataOptions}
              value={SonataValue}
              setValue={setSonataValue}
              onSelect={(data) => {
                setFilter({ bySonataId: data.real_value });
                setMonster(data.monsters);
                setEchoValue("All");
              }}
            />

            {/* filter by cost */}
            <p>By Cost</p>
            <FeatureComboBox
              data={byCost}
              value={CostValue}
              setValue={setCostValue}
              onSelect={(data) => {
                setFilter({ byCost: data.value });
              }}
            />

            {/* filter by echo */}
            <p>By Echo</p>
            <FeatureComboBox
              data={echoOptions}
              value={EchoValue}
              setValue={setEchoValue}
              onSelect={(data) => {
                setFilter({ byEcho: data.value });
              }}
            />
          </div>

          <div className="flex gap-2 mt-5 w-full">
            <Button className="flex-1" onClick={StartFarm}>
              Start Farm
            </Button>
            <Button className="flex-1" onClick={StopFarm}>
              Stop Farm
            </Button>
            <Button size="icon" className="flex-shrink-0" onClick={Refresh}>
              <RefreshCcw />
            </Button>
          </div>
        </FeatureCardSwitch>
      </div>
    </div>
  );
};
