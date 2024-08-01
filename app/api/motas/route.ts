import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const motas = client.db("test").collection("motas");
    const myMotas = await await motas.find().toArray();

    return NextResponse.json({
      motas: myMotas.map((mota) => ({
        name: mota.name,
        email: mota.email,
        status: mota.status,
      })),
    });
  } catch (e) {
    return NextResponse.json({ motas: [] }, { status: 500 });
  }
}
