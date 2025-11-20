import { GetConfigLauncher, StoreConfigLauncher } from "@/API/config";
import { Launcher } from "@/types/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";

type TProcess = {
  launcherPath: string | null;
  setLauncherPath: (path: string | null) => void;
};

const useProcessState = create<TProcess>((set) => ({
  launcherPath: null,
  setLauncherPath: (path) =>
    set(() => ({
      launcherPath: path,
    })),
}));

const useMutationLauncher = () => {
  return useMutation({
    mutationKey: ["store-launcher"],
    mutationFn: (data: Launcher) => StoreConfigLauncher(data), // ambil data sesuai key
  });
};

const useQueryLauncher = () => {
  return useQuery({
    queryKey: ["launcherConfig"],
    queryFn: GetConfigLauncher,
  });
};

export const useProcess = () => {
  const processState = useProcessState();

  const exec = async () => {
    if (!processState.launcherPath) {
      return toast.error("Launcher path is empty. Set the path in Settings.");
    }

    try {
      await invoke("run_detached", {
        program: processState.launcherPath,
        args: ["-external"],
      });

      //   processState.setProcessRunning(true);
      toast.success("Running");
    } catch (error) {
      console.log(error);
    }
  };

  return { exec, ...processState, query: useQueryLauncher(), mutate: useMutationLauncher() };
};

export const useProcessStatus = (processName: string, intervalMs = 5000) => {
  const [IsProcessRunning, setProcessRunning] = useState<boolean>();

  const refresh = async () => {
    const state = await invoke<boolean>("is_process_running", { processName });
    setProcessRunning(state);
  };

  useEffect(() => {
    // refresh pertama
    refresh();

    // interval
    const id = setInterval(() => {
      refresh();
    }, intervalMs);

    // cleanup
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processName, intervalMs]);

  return { IsProcessRunning, refresh };
};
