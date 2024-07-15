"use client";

import { FormEvent, useEffect, useState } from "react";
import Input from "@/app/components/Input";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      window.location.replace("/");
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("name", data.name);
        window.location.replace("/");
      } else {
        alert(`parenaaa parenaa type korteee`);
      }
    } catch (e) {
      alert(`rip gurzu backend moment ${e}`);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <form
      className="flex flex-col  items-center px-9 pt-12 bg-purple-700 m-auto text-white rounded-xl"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mb-12">Abbe Login</h1>

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
        className="bg-white text-purple-900 p-2 mt-8 mb-2 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
        disabled={disabled}
      >
        Yameteeee
      </button>

      <Link
        href="/register"
        className="my-4 text-orange-300 underline self-end hover:text-orange-400 active:text-orange-400"
      >
        Register ta kothayee
      </Link>
    </form>
  );
}
