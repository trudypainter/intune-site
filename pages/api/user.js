import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const emailPassed = async (res, email) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//     include: {
//       syncReceived: true,
//       syncRequested: true,
//     },
//   });

//   console.log("found ", user, " for email ", email);
//   if (user.slug) {
//     return res.status(200).json(user);
//   } else {
//     let userPrisma = await prisma.user.update({
//       where: {
//         email: email,
//       },
//       data: {
//         slug: user.id,
//       },
//     });
//     // return user
//     return res.status(200).json(userPrisma);
//   }
// };

const slugPassed = async (res, slug) => {
  const user = await prisma.user.findUnique({
    where: {
      slug: slug,
    },
    include: {
      syncReceived: {
        include: {
          receiver: true,
          requester: true,
        },
      },
      syncRequested: {
        include: {
          receiver: true,
          requester: true,
        },
      },
      accounts: {
        include: {
          user: true,
        },
      },
    },
  });

  if (user) {
    user.accounts = user.accounts[0]["providerAccountId"];
    return res.status(200).json(user);
  }
  return res.status(404).json({ failure: "User not found." });
};

const handler = async (req, res) => {
  const bodyJSON = JSON.parse(req.body);
  const reqEmail = bodyJSON["email"];
  const slug = bodyJSON["slug"];

  if (slug) {
    slugPassed(res, slug);
  } else {
    emailPassed(res, reqEmail);
  }
};

export default handler;
