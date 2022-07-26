import { getUserTopArtists, getUserTopSongs } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function onlyLettersAndNumbers(str) {
  return /^[A-Za-z0-9]*$/.test(str);
}

const handler = async (req, res) => {
  const bodyJSON = JSON.parse(req.body);
  const reqEmail = bodyJSON["email"];
  const newSlug = bodyJSON["slug"];

  if (!onlyLettersAndNumbers(newSlug)) {
    return res
      .status(403)
      .json({ failure: "Username can only be letters and numbers." });
  }

  // update user slug
  let userPrisma = await prisma.user
    .update({
      where: {
        email: reqEmail,
      },
      data: {
        slug: newSlug,
      },
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({ failure: "Username taken." });
    });

  // return user
  res.status(200).json(userPrisma);
};

export default handler;
