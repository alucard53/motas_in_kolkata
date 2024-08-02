"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mota } from "../lib/types";
import useLoggedInMota from "../lib/useLoggedInMota";

export default function ChangeStatus({ motas }: { motas: Mota[] }) {
  const router = useRouter();
  const [animation, setAnimation] = useState("enter");
  const [disabled, setDisabled] = useState(false);

  const loggedInMota = useLoggedInMota();
  const mota = motas.find(({ email }) => {
    return email === loggedInMota;
  });

  function close() {
    setAnimation("close");
    setTimeout(() => {
      router.back();
    }, 350);
  }

  async function changeStatus(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setDisabled(true);
    e.stopPropagation();
    await fetch(
      `/api/changeStatus?email=${loggedInMota}&status=${
        mota?.status === "mota is gone" ? "mota is back" : "mota is gone"
      }`,
      {
        method: "PUT",
      }
    );
    router.replace("/");
    router.refresh();
  }

  return (
    <div
      className="w-screen h-screen flex justify-center items-center absolute z-20 backdrop-blur"
      onClick={close}
    >
      <div
        className={`${animation}  bg-white h-2/6 w-5/6 sm:w-80 sm:h-96 text-center flex flex-col gap-4 justify-center items-center text-orange-400 text-2xl font-semibold z-50 rounded-xl`}
        onClick={(e) => {
          e.stopPropagation();
          console.log("inner div clicked");
        }}
      >
        <span>
          mota is {mota?.status === "mota is gone" ? "back😎" : "gone😢"}?
        </span>

        <div className="flex gap-5 justify-between items-center text-white text-base">
          <button
            className="bg-orange-400 px-3.5 py-1 rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50"
            disabled={disabled}
            onClick={changeStatus}
          >
            Ye
          </button>
          <button
            className="bg-orange-400 px-3 py-1 rounded-lg hover:bg-orange-500 transition-colors"
            onClick={close}
          >
            Kal
          </button>
        </div>
      </div>
    </div>
  );
}
