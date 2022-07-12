import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const {
    token: { accessToken, email },
  } = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return res.status(200).json(user);
};

export default handler;
