"use client";

import Link, { LinkProps } from "next/link";
import React, { HTMLAttributes } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

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
    href: "/visual",
  },
  {
    label: "teleport",
    href: "/teleport",
  },
  {
    label: "ESP",
    href: "/esp",
  },
  {
    label: "Misc",
    href: "/mics",
  },
];

const SideNav = ({ href, children }: LinkProps & HTMLAttributes<HTMLAnchorElement>) => {
  const pathName = usePathname();

  return (
    <Link href={href}>
      <Button
        className={`w-full cursor-pointer h-10 hover:bg-box hover:text-white text-md capitalize ${pathName === href ? "bg-box" : "text-white/50"}`}
        variant={"ghost"}
      >
        {children}
      </Button>
    </Link>
  );
};

function Sidebar() {
  return (
    <aside className="fixed left-0 top-[54px] w-56 border-r border-r-slate-400/15 min-h-screen">
      <div className="p-5">
        <div className="flex flex-col gap-2 mt-5">
          {Routes.map((item, i) => (
            <SideNav key={i} href={item.href}>
              {item.label}
            </SideNav>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
