import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET() {
  try {
    const client = await clientPromise;
    const motas = client.db("test").collection("motas");

    return NextResponse.json({ motas: await motas.find().toArray() });
  } catch (e) {
    return NextResponse.json({ motas: [] }, { status: 500 });
  }
}
