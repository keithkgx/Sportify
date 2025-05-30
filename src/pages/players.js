// pages/players.js
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  // 1️⃣ Load your local JSON from /public/players.json
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/players.json");
        if (!res.ok) throw new Error("Failed to load players.json");
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  // 2️⃣ Position filter options
  const positions = ["G", "F", "C"];

  // 3️⃣ Filter logic
  const filtered = players.filter((p) => {
    const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
    const matchesName = fullName.includes(search.toLowerCase());
    const matchesPos = position === "" || p.position === position;
    return matchesName && matchesPos;
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="px-6 py-10 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">NBA Players</h1>

        {/* Search + Position Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full sm:w-[60%]"
          />
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="">All Positions</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos === "G" ? "Guard" : pos === "F" ? "Forward" : "Center"}
              </option>
            ))}
          </select>
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={p.image}
                alt={`${p.first_name} ${p.last_name}`}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="font-bold text-lg mb-1">
                {p.first_name} {p.last_name}
              </h2>
              <p className="text-gray-600 mb-1">{p.team.full_name}</p>
              <p className="text-sm mb-2">Position: {p.position}</p>
              <div className="mt-2 text-sm space-y-1">
                <p>
                  <strong>PTS:</strong> {p.stats.pts}
                </p>
                <p>
                  <strong>REB:</strong> {p.stats.reb}
                </p>
                <p>
                  <strong>AST:</strong> {p.stats.ast}
                </p>
                <p>
                  <strong>FG%:</strong> {(p.stats.fg_pct * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
