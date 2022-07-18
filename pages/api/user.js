import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const emailPassed = async (res, email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log("found ", user, " for email ", email);
  if (user.slug) {
    return res.status(200).json(user);
  } else {
    let userPrisma = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        slug: user.id,
      },
    });
    // return user
    return res.status(200).json(userPrisma);
  }
};

const slugPassed = async (res, slug) => {
  const user = await prisma.user.findUnique({
    where: {
      slug: slug,
    },
  });

  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ failure: "User not found." });
};

const handler = async (req, res) => {
  const bodyJSON = JSON.parse(req.body);
  const accessToken = bodyJSON["token"];
  const reqEmail = bodyJSON["email"];
  const slug = bodyJSON["slug"];

  console.log("🟠 GOT SLUG", slug);
  console.log("🟠 GOT reqEmail", reqEmail);

  if (slug) {
    slugPassed(res, slug);
  } else {
    emailPassed(res, reqEmail);
  }
};

export default handler;
