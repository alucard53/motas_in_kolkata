"use client";

import { Dispatch, SetStateAction } from "react";

export default function DashRow({
  name,
  email,
  loggedInMota,
  display,
  status,
  setDisplay,
}: {
  name: string;
  email: string;
  loggedInMota: string;
  status: string;
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
}) {
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

  const isLoggedInMota = loggedInMota === email;
  const isMotaGone = status === "mota is gone";

  return (
    <div className="grid grid-cols-2 gap-x-20 md:gap-x-32" key={email}>
      <span>{name}</span>
      <span
        className={`${isLoggedInMota ? "underline hover:opacity-80 " : ""}${
          isMotaGone ? "" : "text-orange-300"
        }`}
        role={isLoggedInMota ? "button" : ""}
        onClick={
          isLoggedInMota
            ? (e) => {
                e.stopPropagation();
                setDisplay(!display);
              }
            : undefined
        }
      >
        {status}
        {display && isLoggedInMota && (
          <div
            className="absolute bg-white p-2 rounded-xl text-orange-500 font-semibold"
            onClick={(e) => changeStatus(e)}
          >
            <span>{isMotaGone ? "mota is back" : "mota is gone"}</span>
          </div>
        )}
      </span>
    </div>
  );
}
