import React from "react";
import { Skeleton } from "./ui/skeleton";

export const LoadingContent = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        {/* Title */}
        <Skeleton className="bg-slate-900 h-[25px] w-[120px] rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {/* Title */}
        <Skeleton className="bg-slate-900 h-[25px] w-[120px] rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
          <Skeleton className="bg-slate-900 h-[120px] w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};
