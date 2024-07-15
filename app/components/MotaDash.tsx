"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mota } from "../lib/types";

export default function MotaDash({ motas }: { motas: Mota[] }) {
  let motaCount = 0;
  const [display, setDisplay] = useState(false);
  const [loggedInMota, setLoggedInMota] = useState("");

  useEffect(() => {
    const email = window.localStorage.getItem("email");
    if (email) {
      setLoggedInMota(email);
    }

    const handleClick = () => {
      setDisplay(false);
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  motas.forEach(({ status }) => {
    if (status === "mota is back") {
      motaCount++;
    }
  });

  async function changeStatus(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/changeStatus/${loggedInMota}`, {
        method: "PUT",
      });
      if (res.status === 200) {
        window.location.reload();
      } else {
        alert(`rip gurzu backend moment ${e}`);
      }
    } catch (e) {
      alert(`rip gurzu backend moment ${e}`);
    } finally {
      setDisplay(false);
    }
  }

  return (
    <>
      <h1 className="text-purple-800 text-4xl font-bold block mt-12 mb-20 text-center">
        Motas in Kolkata: {motaCount}
      </h1>

      {!loggedInMota && (
        <div className="my-10">
          <Link href="/login">
            <button className="bg-purple-700 text-white px-4 py-2 mr-3 rounded-xl">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-purple-700 text-white p-2 rounded-xl">
              Register
            </button>
          </Link>
        </div>
      )}

      <div className="bg-purple-700 text-white text-center flex flex-col px-5 rounded-lg pb-2">
        <div className="grid grid-cols-2 gap-x-20 md:gap-x-32 ">
          <span className="p-2 text-lg font-semibold w-full">Mota</span>
          <span className="p-2 text-lg font-semibold w-full">Status</span>
        </div>
        {motas.map(({ name, status, email }) => (
          <div className="grid grid-cols-2 gap-x-20 md:gap-x-32" key={email}>
            <span>{name}</span>
            <span
              className={loggedInMota === email ? "underline" : ""}
              role={loggedInMota === email ? "button" : ""}
              onClick={
                loggedInMota === email
                  ? (e) => {
                      e.stopPropagation();
                      setDisplay(!display);
                    }
                  : undefined
              }
            >
              {status}
              {display && loggedInMota === email && (
                <div
                  className="absolute bg-white p-2 rounded-xl text-orange-500 font-semibold"
                  onClick={(e) => changeStatus(e)}
                >
                  <span>
                    {status === "mota is gone"
                      ? "mota is back"
                      : "mota is gone"}
                  </span>
                </div>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
