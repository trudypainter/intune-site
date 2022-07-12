import { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req, res) {
  console.log("🟣 does this even work to console log");
  // Get data from your database
  res.status(200).json({ test: "heyyy" });
}
