import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

type Params = {
  email: string;
};

export async function PUT(request: Request, context: { params: Params }) {
  const client = await clientPromise;
  const motas = client.db("test").collection("motas");

  const mota = await motas.findOne({ email: context.params.email });

  if (!mota) {
    return NextResponse.json({}, { status: 404 });
  }

  let newStatus = "mota is gone";
  if (mota.status === "mota is gone") {
    newStatus = "mota is back";
  }
  motas.updateOne(
    { email: mota.email },
    {
      $set: {
        status: newStatus,
      },
    }
  );

  return NextResponse.json({});
}
