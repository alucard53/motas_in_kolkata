"use server";

import { Mota } from "../lib/types";
import AuthButtons from "./AuthButtons";
import MotaList from "./MotaList";

export default async function MotaDash({ motas }: { motas: Mota[] }) {
  let motaCount = 0;

  motas.forEach(({ status }) => {
    if (status === "mota is back") {
      motaCount++;
    }
  });

  return (
    <>
      <h1 className="text-purple-800 text-4xl font-bold block mt-12 mb-20 text-center">
        Motas in Kolkata: {motaCount}
      </h1>

      <AuthButtons />

      <MotaList motas={motas} />
    </>
  );
}
