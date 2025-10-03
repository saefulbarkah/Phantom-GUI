"use client";

import { ProfileCard, ProfileCardTypes } from "@/components/ProfileCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Profiles: ProfileCardTypes[] = [
  {
    name: "XopH",
    discord: "@eful229",
    tag: ["Main dev", "GUI"],
    image: "https://avatars.githubusercontent.com/u/130897180?v=4",
  },
  {
    name: "Zephyr",
    discord: "@zephyr69696969",
    tag: ["Contributor"],
    image: "https://avatar.iran.liara.run/public/22",
  },
  {
    name: "! [L]",
    discord: "@_yuyan__",
    tag: ["Contributor"],
    image: "https://avatar.iran.liara.run/public/22",
  },
  {
    name: "HoyHeúM",
    discord: "@k0ctu4ek",
    tag: ["Contributor"],
    image: "https://avatar.iran.liara.run/public/22",
  },
  {
    name: "Mickey",
    discord: "@lovelymickey_",
    tag: ["Supporter"],
    image: "https://avatar.iran.liara.run/public/22",
  },
  {
    name: "Tinasha",
    discord: "@shinheinnn",
    tag: ["Supporter"],
    image: "https://avatar.iran.liara.run/public/22",
  },
  {
    name: "Ryanphimen335",
    discord: "@ryanphimen335",
    tag: ["Supporter"],
    image: "https://avatar.iran.liara.run/public/22",
  },
  {
    name: "Scott~",
    discord: "@scottayato",
    tag: ["Supporter"],
    image: "https://avatar.iran.liara.run/public/22",
  },
];

function About() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">About</h2>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-3xl">Phantom Waves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-300 prose sm:prose-lg max-w-full">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus adipisci illo repellat odit qui
                tenetur, quia maiores labore consequatur. Ad possimus eveniet iure neque ipsam impedit rem voluptatum
                tempora eius?. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem dignissimos fuga,
                impedit nemo perspiciatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus adipisci
                illo repellat odit qui tenetur, quia maiores labore consequatur. Ad possimus eveniet iure neque ipsam
                impedit rem voluptatum tempora eius?. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
                dignissimos fuga, impedit nemo perspiciatis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-[1px] bg-gray-800"></div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 mt-5">
          {Profiles.map((item, i) => (
            <ProfileCard discord={item.discord} name={item.name} tag={item.tag} image={item.image} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
