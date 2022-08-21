import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Footer from "../components/Footer";

import Header from "../components/Header";
import Landing from "../components/Landing";

export default function About() {
  return (
    <>
      <Header></Header>
      <Landing></Landing>
    </>
  );
}
