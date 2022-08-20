import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import User from "../components/User";
import Landing from "../components/Landing";
import Footer from "../components/Footer";

export default function UserPage() {
  const router = useRouter();
  const { user } = router.query;

  console.log("💭ROUTE", user);

  return (
    <>
      <Header></Header>
      <User slug={user}></User>
    </>
  );
}
