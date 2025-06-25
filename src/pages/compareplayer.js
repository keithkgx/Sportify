// pages/compareplayer.js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function ComparePlayerPage() {
  const [players, setPlayers] = useState([]);
  const [slot1, setSlot1]     = useState(null);
  const [slot2, setSlot2]     = useState(null);
  const router                = useRouter();

  // Load all players
  useEffect(() => {
    fetch("/players.json")
      .then((r) => r.json())
      .then(setPlayers)
      .catch(console.error);
  }, []);

  function handleSelect(p) {
    if ((slot1?.id === p.id) || (slot2?.id === p.id)) return;
    if (!slot1) setSlot1(p);
    else if (!slot2) setSlot2(p);
  }

  function handleRemove(n) {
    if (n === 1) setSlot1(null);
    else setSlot2(null);
  }

  function handleCompare() {
    if (slot1 && slot2) {
      router.push(`/compare/results?player1=${slot1.id}&player2=${slot2.id}`);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto p-8 space-y-8">
        <h2 className="text-3xl font-bold">Player Comparison</h2>

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
              {/* Placeholder when empty */}
              {!sel && (
                <span className="text-gray-400 uppercase tracking-wide">
                  Player {idx + 1}
                </span>
              )}

              {/* Selected player */}
              {sel && (
                <>
                  {/* × appears on any hover over the box */}
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

                  {/* Image stays within the box */}
                  <img
                    src={sel.image}
                    alt={`${sel.first_name} ${sel.last_name}`}
                    className="max-w-full max-h-40 object-contain rounded mb-2"
                  />

                  {/* Name & team */}
                  <div className="text-center px-2">
                    <h3 className="font-semibold">{sel.first_name} {sel.last_name}</h3>
                    <p className="text-gray-600 text-sm">{sel.team.full_name}</p>
                  </div>
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

        {/* ─── All Players Grid ───────────────────────────────────────────── */}
        <h4 className="text-xl font-bold">All Players</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {players.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              className="
                cursor-pointer 
                w-64
                p-4 
                border 
                rounded-xl 
                shadow hover:shadow-lg 
                transition 
                flex flex-col
              "
            >
              <img
                src={p.image}
                alt={`${p.first_name} ${p.last_name}`}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="font-bold text-lg mb-1">
                {p.first_name} {p.last_name}
              </h2>
              <p className="text-gray-600 mb-2">{p.team.full_name}</p>
              <div className="mt-auto space-y-1 text-sm">
                <p><strong>PTS:</strong> {p.stats.pts}</p>
                <p><strong>REB:</strong> {p.stats.reb}</p>
                <p><strong>AST:</strong> {p.stats.ast}</p>
                <p><strong>FG%:</strong> {(p.stats.fg_pct * 100).toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
