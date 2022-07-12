import { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req, res) {
  // Get data from your database
  res.status(200).json({ test: "heyyy" });
}
