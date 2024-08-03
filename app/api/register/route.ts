import clientPromise from "@/app/_lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const client = await clientPromise.connect();
    const motas = client.db("test").collection("motas");
    const body = await request.json();

    const mota = await motas.findOne({ email: body.email });

    if (mota) {
      return NextResponse.json(
        {
          error: "user already exists",
          success: false,
        },
        {
          status: 400,
        }
      );
    } else {
      await motas.insertOne({
        ...body,
        status: "mota is gone",
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (e) {
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
}
