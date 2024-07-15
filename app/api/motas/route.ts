import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const motas = client.db("test").collection("motas");

    return NextResponse.json({ motas: await motas.find().toArray() });
  } catch (e) {
    return NextResponse.json({ motas: [] }, { status: 500 });
  }
}

export const fetchCache = "force-no-store";
