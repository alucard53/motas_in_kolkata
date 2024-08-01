import { useEffect, useState } from "react";

export default function useLoggedInMota() {
  const [loggedInMota, setLoggedInMota] = useState("");
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setLoggedInMota(email);
    }
  }, []);

  return loggedInMota;
}
