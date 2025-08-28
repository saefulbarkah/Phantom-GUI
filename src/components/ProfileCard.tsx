"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

export type ProfileCardTypes = {
  name: string;
  tag: string[];
  discord: string;
  image: string;
};

export const ProfileCard = ({ discord, image, name, tag }: ProfileCardTypes) => {
  return (
    <Card className="py-3 divide-y divide-gray-900">
      <CardContent className="pb-5">
        <div className="flex items-center justify-center">
          <Image alt={name} src={image} height={120} width={120} className="rounded-full" />
        </div>

        <div className="flex flex-col items-center justify-center mt-5">
          <h2 className="text-lg">{name}</h2>
          <p className="text-sm text-slate-300">{discord}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center flex-wrap gap-2">
          {tag.map((item, i) => (
            <Badge
              className={`${item.toLowerCase().includes("dev") ? "bg-violet-700" : ""}
                     ${item.toLowerCase().includes("gui") ? "bg-blue-700" : ""}
                      ${item.toLowerCase().includes("contributor") ? "bg-slate-700" : ""}
                      ${item.toLowerCase().includes("supporter") ? "bg-emerald-700" : ""}
                      `}
              key={i}
            >
              {item}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
