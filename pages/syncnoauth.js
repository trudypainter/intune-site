import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Loading from "../components/ProfileParts/Loading";

const server =
  process.env.NODE_ENV === "production"
    ? "https://intune.site/"
    : "http://localhost:3000/";

export default function UserPage() {
  const { data: session } = useSession();
  const { query: email } = useRouter();

  const makeNewSync = async () => {
    if (session.session.user.email == email.email) {
      window.open("/", "_self");
    }

    const res = await fetch(`${server}api/sync`, {
      method: "POST",
      body: JSON.stringify({
        requester: session,
        receiver: email.email,
      }),
    });
    const data = await res.json();
    console.log("🟡 sync response", data);
    // redirect to new sync page
    window.open("/sync/" + data.id, "_self");
  };

  useEffect(() => {
    if (session && email) {
      makeNewSync();
    }
  }, [session, email]);

  return (
    <>
      <Header></Header>
      <Loading />
    </>
  );
}
