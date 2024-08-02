"use client";

import { Mota } from "../lib/types";
import useLoggedInMota from "../lib/useLoggedInMota";
import DashRow from "./DashRow";

export default function MotaList({ motas }: { motas: Mota[] }) {
  const loggedInMota = useLoggedInMota();

  return (
    <div className="bg-purple-700 text-white text-center flex flex-col px-8 rounded-lg pt-3 pb-4 gap-3 text-lg mx-4">
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-32 ">
        <span className="py-2 text-xl font-semibold w-full">Mota</span>
        <span className="py-2 text-xl font-semibold w-full">Status</span>
      </div>

      {motas.map(({ name, status, email }) => (
        <DashRow
          name={name}
          status={status}
          email={email}
          loggedInMota={loggedInMota}
          key={email}
        />
      ))}
    </div>
  );
}
