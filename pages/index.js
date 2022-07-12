import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

import Header from "../components/Header";
import Profile from "../components/Profile";
import Landing from "../components/Landing";

export default function Home() {
  const { data: session } = useSession();

  console.log("🟢", session?.token);

  if (session) {
    return (
      <>
        <Header></Header>
        <Profile></Profile>
      </>
    );
  }
  return (
    <>
      <div>
        <Header></Header>
        <Landing></Landing>
      </div>
    </>
  );
}
