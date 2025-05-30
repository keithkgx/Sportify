import { useEffect, useState } from "react";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      let allPlayers = [];
      let page = 1;
      let hasMore = true;

      try {
        while (hasMore && page <= 5) {
          const res = await fetch(
            `https://corsproxy.io/?https://www.balldontlie.io/api/v1/players?per_page=100&page=${page}`
          );
          if (!res.ok) throw new Error("API fetch failed");
          const data = await res.json();

          allPlayers = [...allPlayers, ...data.data];
          hasMore = data.meta.next_page !== null;
          page++;
        }
        setPlayers(allPlayers);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch players. Please try again later.");
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) => {
    const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesPosition =
      positionFilter === "All" || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const getPlayerImage = (player) => {
    return `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;
  };

  return (
    <main className="min-h-screen bg-white px-6 py-10 max-w-screen-xl mx-auto text-black">
      <h1 className="text-4xl font-bold mb-8">NBA Players</h1>

      {/* Search + Filter */}
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

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center font-semibold mb-6">{error}</p>
      )}

      {/* Player Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={getPlayerImage(player)}
              alt={`${player.first_name} ${player.last_name}`}
              className="w-full aspect-[4/3] object-cover rounded-md mb-4"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x225?text=No+Image")
              }
            />
            <h2 className="text-xl font-semibold">
              {player.first_name} {player.last_name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Position: {player.position || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Team: {player.team?.full_name || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}


