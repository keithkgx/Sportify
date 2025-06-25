// pages/compareteam.js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function CompareTeamPage() {
  const [teams, setTeams] = useState([]);
  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const router = useRouter();

  // Load all teams from /public/teams.json
  useEffect(() => {
    fetch("/teams.json")
      .then((res) => res.json())
      .then(setTeams)
      .catch(console.error);
  }, []);

  // Handle selecting a team into the first empty slot
  const handleSelect = (team) => {
    if ((slot1?.id === team.id) || (slot2?.id === team.id)) return;
    if (!slot1) setSlot1(team);
    else if (!slot2) setSlot2(team);
  };

  // Remove a team from a slot
  const handleRemove = (n) => {
    if (n === 1) setSlot1(null);
    else setSlot2(null);
  };

  // Compare button: navigate with query params
  const handleCompare = () => {
    if (slot1 && slot2) {
      router.push(
        `/compare/results?team1=${slot1.id}&team2=${slot2.id}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto p-8 space-y-8">
        <h2 className="text-3xl font-bold">Team Comparison</h2>

        {/* ─── Selection Slots ────────────────────────────────────────────── */}
        <div className="flex items-center space-x-6">
          {[slot1, slot2].map((sel, idx) => (
            <div
              key={idx}
              className="
                group 
                relative 
                w-64 h-80 
                border-2 border-dashed border-gray-400 
                rounded-lg 
                flex flex-col items-center justify-center
                hover:border-black
                transition
              "
            >
              {/* Placeholder */}
              {!sel && (
                <span className="text-gray-400 uppercase tracking-wide">
                  Team {idx + 1}
                </span>
              )}

              {/* Selected team */}
              {sel && (
                <>
                  {/* × appears on any hover */}
                  <button
                    onClick={() => handleRemove(idx + 1)}
                    className="
                      absolute top-2 right-2 
                      text-red-600 font-bold text-xl 
                      opacity-0 group-hover:opacity-100 
                      transition-opacity
                    "
                  >
                    ×
                  </button>

                  {/* Team logo */}
                  {sel.logo && (
                    <img
                      src={sel.logo}
                      alt={sel.full_name}
                      className="max-w-full max-h-40 object-contain rounded mb-2"
                    />
                  )}

                  {/* Team name, division & conference */}
                  <div className="text-center px-2">
                    <h3 className="font-semibold">{sel.full_name}</h3>
                    <p className="text-gray-600 text-sm">{sel.division}</p>
                    <p className="text-gray-600 text-sm">{sel.conference} Conf.</p>
                  </div>

                  {/* Record */}
                  <p className="text-orange-600 font-medium mt-2">
                    {sel.wins}-{sel.losses}
                  </p>

                </>
              )}
            </div>
          ))}

          {/* Compare button */}
          <button
            onClick={handleCompare}
            disabled={!(slot1 && slot2)}
            className={`
              ml-auto px-6 py-3 rounded text-white font-semibold transition
              ${slot1 && slot2
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            Compare
          </button>
        </div>

        {/* ─── All Teams Grid ─────────────────────────────────────────────── */}
        <h4 className="text-xl font-bold">All Teams</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => handleSelect(team)}
              className="
                cursor-pointer
                flex flex-col items-center justify-center
                p-4 bg-gray-100 rounded-xl shadow hover:shadow-lg transition
              "
            >
              {team.logo && (
                <img
                  src={team.logo}
                  alt={team.full_name}
                  className="w-20 h-20 object-contain mb-4"
                />
              )}
              <p className="text-center font-semibold">
                {team.full_name}
              </p>
              <p className="text-sm text-gray-600">{team.division}</p>
              <p className="text-sm text-gray-400 mb-2">
                {team.conference} Conf.
              </p>
              {/* Record line matches your Teams page */}
              <p className="text-sm text-orange-600 font-medium">
                {team.wins}-{team.losses}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
