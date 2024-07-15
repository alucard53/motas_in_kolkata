"use client";

import MotaDash from "@/app/components/MotaDash";
import { Mota } from "./lib/types";
import { useEffect, useState } from "react";

export default function Motas() {
  const [motas, setMotas] = useState<Mota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchMotas = async () => {
        const res = await fetch("/api/motas", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-store",
          },
        });
        const data = await res.json();
        setMotas(data.motas);
        setLoading(false);
      };
      fetchMotas();
    } catch (e) {
      setLoading(false);
      alert(`rip gurzu backend moment ${e}`);
    }
  }, []);

  if (loading) {
    return (
      <h1 className="text-purple-800 text-4xl font-bold mt-12 text-center">
        Rukja bhai load hone de...
      </h1>
    );
  }

  const myMotas = motas.map((mota) => {
    return {
      name: mota.name,
      status: mota.status,
      email: mota.email,
    };
  });

  return <MotaDash motas={myMotas} />;
}
