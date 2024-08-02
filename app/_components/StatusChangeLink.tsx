import Link from "next/link";
import { ReactNode } from "react";

export default function StatusChangeLink({
  isLoggedInMota,
  children,
}: {
  isLoggedInMota: boolean;
  children: ReactNode;
}) {
  if (isLoggedInMota) {
    return (
      <Link href="/?show=true" className="hover:opacity-80">
        {children}
        <span className="absolute ml-1.5">♋</span>
      </Link>
    );
  } else {
    return children;
  }
}
