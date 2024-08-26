import MotaDash from "@/app/_components/MotaDash";
import clientPromise from "@/app/_lib/mongodb";
import ChangeStatus from "./_components/ChangeStatus";

export default async function Motas({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  let motas: any[] = [];

  try {
    const client = await clientPromise.connect();
    motas = await client.db("test").collection("motas").find().toArray();
  } catch (e) {
    console.log(e);
  }

  const myMotas = motas.map((mota) => ({
    name: mota.name,
    email: mota.email,
    status: mota.status,
  }));

  return (
    <>
      {searchParams && searchParams.show && <ChangeStatus motas={myMotas} />}
      <MotaDash motas={myMotas} />
    </>
  );
}
