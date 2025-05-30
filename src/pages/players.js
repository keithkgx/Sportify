import { useEffect, useState } from "react";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("/players.json");
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error("Failed to fetch local players.json:", err);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) => {
    const fullName = `${player.first_name?.toLowerCase()} ${player.last_name?.toLowerCase()}`;
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesPosition =
      positionFilter === "All" || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  return (
    <main className="min-h-screen bg-white px-6 py-10 max-w-screen-xl mx-auto text-black">
      <h1 className="text-4xl font-bold mb-8">NBA Players</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search players..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
        >
          <option value="All">All Positions</option>
          <option value="G">Guard</option>
          <option value="F">Forward</option>
          <option value="C">Center</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={player.image}
              alt={`${player.first_name} ${player.last_name}`}
              className="w-full aspect-[4/3] object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">
              {player.first_name} {player.last_name}
            </h2>
            <p className="text-gray-600 text-sm">{player.team.full_name}</p>
            <p className="text-gray-600 text-sm mb-2">
              Position: {player.position || "N/A"}
            </p>

            {/* Stats */}
            <div className="text-sm mt-2 space-y-1">
              <p>PTS: {player.stats.pts}</p>
              <p>REB: {player.stats.reb}</p>
              <p>AST: {player.stats.ast}</p>
              <p>FG%: {player.stats.fg_pct}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}


