import StatusChangeLink from "./StatusChangeLink";

export default function DashRow({
  name,
  email,
  loggedInMota,
  status,
}: {
  name: string;
  email: string;
  loggedInMota: string;
  status: string;
}) {
  const isLoggedInMota = loggedInMota === email;
  const isMotaGone = status === "mota is gone";

  return (
    <div
      className="grid grid-cols-2 gap-x-4 sm:gap-x-32 items-center"
      key={email}
    >
      <span>{name}</span>

      <StatusChangeLink isLoggedInMota={isLoggedInMota}>
        <span className={`${isMotaGone ? "" : "text-orange-400"}`}>
          {status}
        </span>
      </StatusChangeLink>
    </div>
  );
}
