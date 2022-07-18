import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const bodyJSON = JSON.parse(req.body);
  const accessToken = bodyJSON["token"];
  const reqEmail = bodyJSON["email"];
  const slug = bodyJSON["slug"];

  console.log("🟠 GOT SLUG", slug);

  const user = await prisma.user.findUnique({
    where: {
      slug: slug,
    },
  });

  if (user.slug) {
    return res.status(200).json(user);
  } else {
    let userPrisma = await prisma.user.update({
      where: {
        slug: slug,
      },
      data: {
        slug: user.id,
      },
    });
    // return user
    return res.status(200).json(userPrisma);
  }
};

export default handler;
