// pages/account/edit.js

import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Navbar from "../../components/Navbar";

export default function EditProfilePage({ user, allPlayers, allTeams }) {
  const router = useRouter();

  // 1️⃣ Initialize form state from the user prop
  const [dob, setDob] = useState(user.dob ? user.dob.split("T")[0] : "");
  const [language, setLanguage] = useState(user.language || "");
  const [country, setCountry] = useState(user.country || "");
  const [favoritePlayer, setFavoritePlayer] = useState(user.favoritePlayer || "");
  const [favoriteTeam, setFavoriteTeam] = useState(user.favoriteTeam || "");

  // 2️⃣ When the user clicks “Save Changes”
  const handleSave = async (e) => {
    e.preventDefault();

    const body = {
      dob: dob || null,
      language: language.trim() || null,
      country: country.trim() || null,
      favoritePlayer: favoritePlayer || null,
      favoriteTeam: favoriteTeam || null,
    };

    const res = await fetch("/api/user/updateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (res.ok) {
      // 3️⃣ On success, go back to /account
      router.push("/account");
    } else {
      const err = await res.json();
      alert("Failed to save: " + (err.error || res.status));
    }
  };

  // 4️⃣ If the user clicks “Cancel”
  const handleCancel = (e) => {
    e.preventDefault();
    router.push("/account");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Edit Profile</h2>
        </div>

        {/* User info header */}
        <section className="flex items-center space-x-6 mb-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-600">
            👤
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{user.name || user.email}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </section>

        {/* Form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date of Birth */}
          <div className="bg-gray-100 p-4 rounded">
            <label htmlFor="dob" className="block font-medium mb-1">Date of Birth</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Language */}
          <div className="bg-gray-100 p-4 rounded">
            <label htmlFor="language" className="block font-medium mb-1">Language</label>
            <input
              id="language"
              type="text"
              placeholder="e.g. English"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Country */}
          <div className="bg-gray-100 p-4 rounded">
            <label htmlFor="country" className="block font-medium mb-1">Country</label>
            <input
              id="country"
              type="text"
              placeholder="e.g. USA"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Favorite Player */}
          <div className="bg-gray-100 p-4 rounded">
            <label htmlFor="favoritePlayer" className="block font-medium mb-1">Favorite Player</label>
            <select
              id="favoritePlayer"
              value={favoritePlayer}
              onChange={(e) => setFavoritePlayer(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select...</option>
              {allPlayers.map((p) => {
                const name = `${p.first_name} ${p.last_name}`;
                return (
                  <option key={p.id} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Favorite Team */}
          <div className="bg-gray-100 p-4 rounded">
            <label htmlFor="favoriteTeam" className="block font-medium mb-1">Favorite Team</label>
            <select
              id="favoriteTeam"
              value={favoriteTeam}
              onChange={(e) => setFavoriteTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select...</option>
              {allTeams.map((t) => (
                <option key={t.id} value={t.full_name}>
                  {t.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// This runs *only* on the server:
export async function getServerSideProps(context) {
  // 1) Verify session
  const session = await getSession(context);
  if (!session || !session.user) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  // 2) Load Node-only modules here
  const fs = require("fs");
  const path = require("path");

  // 3) Read dropdown data
  const playersPath = path.join(process.cwd(), "public", "players.json");
  const teamsPath   = path.join(process.cwd(), "public", "teams.json");
  const allPlayers  = JSON.parse(fs.readFileSync(playersPath, "utf8"));
  const allTeams    = JSON.parse(fs.readFileSync(teamsPath,   "utf8"));

  // 4) Pass props into your component
  return {
    props: {
      session,               // for SessionProvider
      user: session.user,    // initial form data
      allPlayers,            // dropdown options
      allTeams,              // dropdown options
    },
  };
}
