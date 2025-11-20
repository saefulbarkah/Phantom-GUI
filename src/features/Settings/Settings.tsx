"use client";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
import { InputFile } from "@/components/ui/InputFile";
import { useProcess } from "@/hooks/useProcess";

export const Settings = () => {
  const { launcherPath, setLauncherPath, mutate } = useProcess();

  return (
    <>
      <section>
        <FeatureWrapper className="flex">
          <FeatureSection title="Launcher Settings">
            <FeatureCardSwitch>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                <p>Launcher path</p>
                <InputFile
                  path={launcherPath}
                  onSelect={(s) => {
                    setLauncherPath(s as string);
                    mutate.mutate({ path: s as string, args: null });
                  }}
                />
              </div>
            </FeatureCardSwitch>
          </FeatureSection>
        </FeatureWrapper>
      </section>
    </>
  );
};
