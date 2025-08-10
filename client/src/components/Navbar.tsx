import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 bg-background border-b h-18 border-b-slate-400/15 z-50">
      <div className="flex items-center h-full mx-[25px]">
        <div className="flex gap-2 items-center w-full">
          <Image src={"./assets/icon/k-logo.png"} alt="" width={45} height={45} />
          <h2 className="text-lg font-bold">Phantom Waves</h2>
          <div className="ml-auto">
            <p className="text-slate-500 text-sm">v1.2</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
