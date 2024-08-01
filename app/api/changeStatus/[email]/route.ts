import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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

  let newStatus = mota.status === "mota is gone"
		? "mota is back"
		: "mota is gone";

  await motas.updateOne(
    { email: mota.email },
    {
      $set: {
        status: newStatus,
      },
    }
  );

	revalidatePath("/");

  return NextResponse.json({});
}
