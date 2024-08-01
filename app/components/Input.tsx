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
      className="transition-colors text-purple-900 text-center mb-5 h-10 rounded-2xl text-lg focus:outline-none border-2 border-purple-700 focus:border-orange-400"
      required
    ></input>
  );
}
