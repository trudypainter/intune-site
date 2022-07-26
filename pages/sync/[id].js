import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

import Header from "../../components/Header";
import Sync from "../../components/Sync";

export default function SyncPage() {
  const router = useRouter();
  const { id } = router.query;

  console.log("💭ROUTE", id);

  return (
    <>
      <Header></Header>
      <Sync id={id}></Sync>
    </>
  );
}
