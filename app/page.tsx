"use server";

import clientPromise from "@/app/lib/mongodb";
import MotaDash from "@/app/components/MotaDash";

export default async function Motas() {
  const client = await clientPromise;
  const motas = client.db("test").collection("motas");
  const allMotas = await motas.find().toArray();

  const myMotas = allMotas.map((mota) => {
    return {
      name: mota.name,
      status: mota.status,
      email: mota.email,
    };
  });

  return <MotaDash motas={myMotas} />;
}

export const dynamic = "force-dynamic";
