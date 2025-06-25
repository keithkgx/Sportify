import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions }       from "../auth/[...nextauth]";  // ← exact same export

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;
  const { dob, language, country, favoritePlayer, favoriteTeam } = req.body;

  let parsedDob = null;
  if (dob) {
    parsedDob = new Date(dob);
    if (isNaN(parsedDob)) {
      return res.status(400).json({ error: "Invalid date format" });
    }
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        dob: parsedDob,
        language: language || null,
        country: country || null,
        favoritePlayer: favoritePlayer || null,
        favoriteTeam: favoriteTeam || null,
      },
    });

    const { hashedPassword, ...safeUser } = updated;
    return res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
