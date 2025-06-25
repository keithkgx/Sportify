// pages/account.js

import Navbar from "../components/Navbar";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function AccountPage({ user }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Account</h2>
          <div className="space-x-4">
            <a
              href="/account/edit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Edit Profile
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        <section className="flex items-center space-x-6 mb-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-600">
            👤
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{user.name || user.email}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Date of Birth</h4>
            <p>{user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Language</h4>
            <p>{user.language ?? "N/A"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Country</h4>
            <p>{user.country ?? "N/A"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Favorite Player</h4>
            <p>{user.favoritePlayer ?? "N/A"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Favorite Team</h4>
            <p>{user.favoriteTeam ?? "N/A"}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // 1️⃣ Grab the session with server API so you get user.id
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session?.user?.id) {
    // Not signed in, redirect to login
    return { redirect: { destination: "/login", permanent: false } };
  }

  // 2️⃣ Pull the fresh user record from your database
  const record = await prisma.user.findUnique({
    where: { id: session.user.id },
    // optionally select only the fields you need:
    // select: { id: true, email: true, name: true, dob: true, language: true, country: true, favoritePlayer: true, favoriteTeam: true }
  });

  if (!record) {
    // If somehow the user row doesn't exist, sign them out
    return { redirect: { destination: "/login", permanent: false } };
  }

  // 3️⃣ Destructure / convert dates into JSON-safe strings
  const { hashedPassword, createdAt, ...rest } = record;
  const user = {
    ...rest,
    dob: rest.dob ? rest.dob.toISOString() : null,
  };

  // 4️⃣ Return as props
  return { props: { user } };
}
