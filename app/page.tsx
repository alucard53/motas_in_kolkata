"use client";

import MotaDash from "@/app/components/MotaDash";
import { Mota } from "./lib/types";
import { useEffect, useState } from "react";

export default function Motas() {
  const [motas, setMotas] = useState<Mota[]>([]);

  useEffect(() => {
    try {
      const fetchMotas = async () => {
        const res = await fetch("/api/motas", { cache: "no-store" });
        const data = await res.json();
        console.log(data);
        setMotas(data.motas);
      };
      fetchMotas();
    } catch (e) {
      alert(`rip gurzu backend moment ${e}`);
    }
  }, []);

  const myMotas = motas.map((mota) => {
    return {
      name: mota.name,
      status: mota.status,
      email: mota.email,
    };
  });

  return <MotaDash motas={myMotas} />;
}
