import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

import Header from "../components/Header";
import Profile from "../components/Profile";
import Landing from "../components/Landing";
import Head from "next/head";

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
      <Header></Header>
      <Landing></Landing>
    </>
  );
}
