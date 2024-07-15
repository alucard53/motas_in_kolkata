"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Input from "@/app/components/Input";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 200) {
        window.location.replace("/login");
      } else {
        alert(`gand me nahi hein guda toh humpe kahe kuda ${res.status}`);
      }
    } catch (e) {
      alert(`rip gurzu backend moment ${e}`);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <form
      className="flex flex-col items-center px-7 pt-12 bg-purple-700 m-auto text-white rounded-xl"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mb-12">Ek Molester Ek Register</h1>

      <Input id="name" name="nem" type="text" value={name} setValue={setName} />
      <Input
        id="email"
        name="mail"
        type="email"
        value={email}
        setValue={setEmail}
      />
      <Input
        id="password"
        name="puzz"
        type="password"
        value={password}
        setValue={setPassword}
      />

      <button
        type="submit"
        className="bg-white text-purple-900 p-2 my-2 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
        disabled={disabled}
      >
        Tepo Amaye uWu
      </button>

      <Link
        href="/login"
        className="my-4 text-orange-300 underline self-end hover:text-orange-400"
      >
        Login ta kothayee
      </Link>
    </form>
  );
}
