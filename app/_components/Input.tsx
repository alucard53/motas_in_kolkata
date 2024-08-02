import { Dispatch, SetStateAction } from "react";

export default function Input({
  id,
  name,
  type,
  value,
  setValue,
}: {
  id: string;
  name: string;
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="transition-colors text-purple-900 w-11/12 px-2 text-center mb-5 h-11 rounded-3xl text-md focus:outline-none border-2 border-purple-700 focus:border-orange-400"
      required
    ></input>
  );
}
