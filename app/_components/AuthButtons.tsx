"use client";

import Link from "next/link";
import useLoggedInMota from "../_lib/useLoggedInMota";

export default function AuthButtons() {
  const loggedInMota = useLoggedInMota();

  if (loggedInMota) {
    return null;
  }

  return (
    <div className="my-10">
      <Link
        href="/login"
        className="bg-purple-700 text-white px-4 py-2 mr-3 rounded-xl hover:bg-purple-800 transition-colors"
      >
        Login
      </Link>
      <Link
        href="/register "
        className="bg-purple-700 text-white p-2 rounded-xl hover:bg-purple-800 transition-colors"
      >
        Register
      </Link>
    </div>
  );
}
