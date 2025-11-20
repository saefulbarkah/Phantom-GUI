import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";

type TProcess = {
  launcherPath: string;
  setLauncherPath: (path: string) => void;
};

const useProcessState = create<TProcess>((set) => ({
  launcherPath: "",
  setLauncherPath: (path) =>
    set(() => ({
      launcherPath: path,
    })),
}));

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
      toast.success("running");
    } catch (error) {
      console.log(error);
    }
  };

  return { exec, ...processState };
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
