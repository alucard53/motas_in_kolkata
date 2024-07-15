import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const motas = client.db("test").collection("motas");
    const body = await request.json();

    const mota = await motas.findOne({ email: body.email });

    if (mota) {
      if (mota.password === body.password) {
        return NextResponse.json({
          success: true,
          name: mota.name,
        });
      } else {
        return NextResponse.json(
          {
            sucess: false,
            error: "parenaaa type korteee",
          },
          {
            status: 401,
          }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: "mota was never here" },
        { status: 404 }
      );
    }
  } catch (e) {
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
}
