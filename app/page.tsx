import MotaDash from "@/app/components/MotaDash";
import { Mota } from "./lib/types";
import clientPromise from "@/app/lib/mongodb";
import { WithId } from "mongodb";

export default async function Motas() {
  let motas: any[] = [];

  try {
    const client = await clientPromise;
    motas = await client.db("test").collection("motas").find().toArray();
  } catch (e) {
    console.log(e);
  }

  const myMotas = motas.map((mota) => ({
    name: mota.name,
    email: mota.email,
    status: mota.status,
  }));

  return <MotaDash motas={myMotas} />;
}
