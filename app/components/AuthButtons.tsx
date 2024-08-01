"use client";

import Link from "next/link";
import useLoggedInMota from "../lib/useLoggedInMota";

export default function AuthButtons() {
  const loggedInMota = useLoggedInMota();

  if (loggedInMota) {
    return null;
  }

  return (
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
  );
}
