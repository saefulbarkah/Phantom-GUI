"use client";

import Link, { LinkProps } from "next/link";
import React, { HTMLAttributes } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import { useFeatureManager } from "@/hooks/useFeatureManager";

type TRoute = {
  label: string;
  href: string;
};

const Routes: TRoute[] = [
  {
    label: "Player",
    href: "/",
  },
  {
    label: "World",
    href: "/world",
  },
  {
    label: "Buff",
    href: "/buff",
  },
  {
    label: "Dungeon",
    href: "/dungeon",
  },
  {
    label: "farm",
    href: "/farm",
  },
  {
    label: "Visual",
    href: "/visual",
  },
  {
    label: "Inventory",
    href: "/inventory",
  },
  {
    label: "Camera",
    href: "/camera",
  },
  {
    label: "ESP",
    href: "/esp",
  },
  {
    label: "Misc",
    href: "/misc",
  },
];

const SideNav = ({ href, children }: LinkProps & HTMLAttributes<HTMLAnchorElement>) => {
  const pathName = usePathname();

  return (
    <Link href={href}>
      <Button
        className={`w-full cursor-pointer h-10 hover:bg-[#0e1c29] hover:text-white text-md capitalize ${
          pathName === href ? "bg-[#0e1c29]" : "text-white/50"
        }`}
        variant={"ghost"}
      >
        {children}
      </Button>
    </Link>
  );
};

function Sidebar() {
  const { NetworkStatus } = useFeatureManager();
  return (
    <aside className="fixed left-0 top-[72px] h-[calc(100vh-72px)] w-56 border-r border-r-slate-400/15 overflow-hidden select-none">
      <div className="h-full">
        <ScrollArea className="w-full h-[calc(100vh-120px)] relative">
          <div className="flex flex-col gap-2 mt-5 px-5">
            {Routes.map((item, i) => (
              <SideNav key={i} href={item.href}>
                {item.label}
              </SideNav>
            ))}
          </div>
        </ScrollArea>
        <div className="px-5 shadow-xl shadow-slate-200">
          <div className="flex items-center justify-center gap-2 h-12 shrink-0 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              {NetworkStatus === "connected" ? (
                <>
                  <p className="capitalize">Connected</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                </>
              ) : NetworkStatus === "reconnect" ? (
                <>
                  <p className="capitalize">Reconnecting</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                </>
              ) : NetworkStatus === "disconnected" ? (
                <>
                  <p className="capitalize">Disconnected</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
