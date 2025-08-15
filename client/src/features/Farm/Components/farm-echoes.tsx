"use client";

import { UpdateEvent } from "@/API/Event";
import { FilterSonata } from "@/API/farms/auto-farm-echoes";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox, TOptionValue } from "@/components/FeatureComboBox";
import { LoadingContent } from "@/components/LoadingContent";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/hooks/useEvent";
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
  const { data: StartFarmEcho, refetch: RefetchFarmStatus } = useEvent("onStartFarmEchoes");

  const { filter, setFilter, monsters, setMonster, setSonata, sonata } = useFarmState();
  const { mutate } = useMutation({ mutationKey: ["filterFarm"], mutationFn: FilterSonata });

  const [SonataValue, setSonataValue] = useState("");

  const [CostValue, setCostValue] = useState("");
  const [EchoValue, setEchoValue] = useState("");

  const { isSuccess, refetch, data } = useFarms();
  const { IsFeatureReady } = useFeatureManager();

  const StartFarm = async () => {
    try {
      await UpdateEvent({ onStartFarmEchoes: true, onStopFarmEchoes: false });
      RefetchFarmStatus();
      toast.success("Auto farm started!");
    } catch (error) {
      console.log(error);
    }
  };

  const StopFarm = async () => {
    try {
      await UpdateEvent({ onStartFarmEchoes: false, onStopFarmEchoes: true });
      toast.success("Auto farm stopped!");
      RefetchFarmStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const Refresh = async () => {
    toast.promise(refetch, { success: "Data loaded", loading: "Refreshing..." });
  };

  const onFilterSonata = async (a: TFilterFarm) => {
    try {
      console.log(a);
      mutate(a, {
        onSuccess: (data) => {
          setSonata({
            id: data.id,
            name: data.name,
            icon: data.icon,
            sonataEffects: data.sonataEffects,
            monsters: data.monsters,
          });
          console.log(data);
        },
        onError: (err) => console.error(err),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Cache mapping untuk By Sonata
  const sonataOptions = useMemo(() => {
    return (
      data?.map((item) => ({
        label: item.name,
        value: item.name,
        real_value: item.id,
        icon: `./assets/icon/sonata/${item.icon.toLowerCase()}.webp`,
        sonataEffects: item.sonataEffects,
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start">
        <FeatureCardSwitch
          title="Auto Farm Option"
          description="Automatically farm echoes and auto kill target monster detection"
        >
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
                onFilterSonata({
                  bySonataId: data.real_value,
                  byCost: CostValue === "" ? null : Number(CostValue),
                  byEcho: "All",
                });
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
                onFilterSonata({
                  bySonataId: sonata.id ? sonata.id : null,
                  byCost: Number(data.value) ? Number(data.value) : "All",
                  byEcho: "All",
                });
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
                onFilterSonata({
                  bySonataId: sonata.id ? sonata.id : null,
                  byCost: CostValue === "" ? null : Number(CostValue),
                  byEcho: data.value,
                });
              }}
            />
          </div>

          <div className="flex gap-2 mt-5 w-full">
            <Button className="flex-1" onClick={StartFarm} disabled={StartFarmEcho?.onStartFarmEchoes}>
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

        <div className="col-span-2">
          <FeatureCardSwitch
            title="Farm Information"
            description="Auto farm information detail about monster detection and target sonata"
          >
            <div className="w-full md:w-fit divide-y divide-gray-700">
              <p className="py-2">Target detection</p>
              <div className="grid grid-cols-[1fr_auto] md:grid-cols-[150px_250px] items-center gap-4 py-2">
                <span className="text-gray-300">Sonata</span>
                <div className="flex gap-2 items-center">
                  {sonata.name ? (
                    <>
                      <Image alt="" src={`./assets/icon/sonata/${sonata.icon}.webp`} width={20} height={20} />
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

            <h2 className="mt-5 mb-2">Sonata Effects</h2>
            <div className="flex flex-col divide-y divide-gray-700">
              {sonata.sonataEffects?.map((item, i) => (
                <div className="flex flex-col gap-2 py-3" key={i}>
                  <p>{i === 0 ? "2" : "4"}-piece effect</p>
                  <p>{HighlightNumberText(item.desc, "text-yellow-300")}</p>
                </div>
              ))}
            </div>
          </FeatureCardSwitch>
        </div>
      </div>
    </div>
  );
};
