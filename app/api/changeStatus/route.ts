import clientPromise from "@/app/_lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise.connect();
    const motas = client.db("test").collection("motas");

    const email = request.nextUrl.searchParams.get("email");
    const status = request.nextUrl.searchParams.get("status");

    const mota = await motas.findOne({ email });

    if (!mota) {
      return NextResponse.json({}, { status: 404 });
    }

    await motas.updateOne(
      { email: mota.email },
      {
        $set: {
          status,
        },
      }
    );

    revalidatePath("/");

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}
