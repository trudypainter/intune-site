import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

import Loading from "../../components/ProfileParts/Loading";
import Header from "../../components/Header";
import Sync from "../../components/Sync";

const server =
  process.env.NODE_ENV === "production"
    ? "https://intune.site/"
    : "http://localhost:3000/";

export default function SyncPage() {
  const router = useRouter();
  const { code } = router.query;

  console.log("💭ROUTE", code);

  const getQrItem = async (code) => {
    const res = await fetch(`${server}api/qr`, {
      method: "POST",
      body: JSON.stringify({
        code: code,
      }),
    });
    const userData = await res.json();
    console.log("😀 USER DATA", userData);
    Router.push("/" + userData.slug);
  };

  useEffect(() => {
    // console.log("🍇 use effect");
    if (code) {
      console.log("calling user code");
      getQrItem(code);
    }
  }, [code]);

  return (
    <>
      <Header></Header>
      <Loading />;
    </>
  );
}
