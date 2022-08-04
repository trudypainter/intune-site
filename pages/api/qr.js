import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const bodyJSON = JSON.parse(req.body);
  const code = bodyJSON["code"];

  const user = await prisma.user.findUnique({
    where: {
      id: code,
    },
  });

  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ failure: "User not found." });
};

export default handler;
