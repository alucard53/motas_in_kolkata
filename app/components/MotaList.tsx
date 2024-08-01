"use client";

import { useEffect, useState } from "react";

import { Mota } from "../lib/types";
import useLoggedInMota from "../lib/useLoggedInMota";
import DashRow from "./DashRow";

export default function MotaList({ motas }: { motas: Mota[] }) {
  const [display, setDisplay] = useState(false);
  const loggedInMota = useLoggedInMota();

  useEffect(() => {
    const handleClick = () => {
      setDisplay(false);
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className="bg-purple-700 text-white text-center flex flex-col px-5 rounded-lg pb-2">
      <div className="grid grid-cols-2 gap-x-20 md:gap-x-32 ">
        <span className="p-2 text-lg font-semibold w-full">Mota</span>
        <span className="p-2 text-lg font-semibold w-full">Status</span>
      </div>
      {motas.map(({ name, status, email }) => (
        <DashRow
          name={name}
          status={status}
          email={email}
          loggedInMota={loggedInMota}
          setDisplay={setDisplay}
          display={display}
          key={email}
        />
      ))}
    </div>
  );
}
