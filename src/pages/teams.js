import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [conference, setConference] = useState("");
  const [division, setDivision] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/teams.json");
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        console.error("Failed to fetch teams.json:", err);
      }
    };
    fetchTeams();
  }, []);

  const getDivisionsByConference = (conf) => {
    if (conf === "East") return ["Atlantic", "Central", "Southeast"];
    if (conf === "West") return ["Northwest", "Pacific", "Southwest"];
    return ["Atlantic", "Central", "Southeast", "Northwest", "Pacific", "Southwest"];
  };

  const availableDivisions = getDivisionsByConference(conference);

  const filteredTeams = teams.filter((team) =>
    team.full_name.toLowerCase().includes(search.toLowerCase()) &&
    (conference === "" || team.conference === conference) &&
    (division === "" || team.division === division)
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="px-6 py-10 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">NBA Teams</h1>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams..."
            className="border px-4 py-2 rounded w-full lg:w-1/3"
          />

          <select
            value={conference}
            onChange={(e) => {
              setConference(e.target.value);
              setDivision("");
            }}
            className="border px-4 py-2 rounded w-full lg:w-1/4"
          >
            <option value="">All Conferences</option>
            <option value="East">Eastern Conference</option>
            <option value="West">Western Conference</option>
          </select>

          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="border px-4 py-2 rounded w-full lg:w-1/4"
          >
            <option value="">All Divisions</option>
            {availableDivisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl shadow hover:shadow-lg transition"
            >
              {team.logo && (
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={team.logo}
                    alt={team.full_name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <p className="text-center font-semibold">{team.full_name}</p>
              <p className="text-sm text-gray-600">{team.division}</p>
              <p className="text-sm text-gray-400 mb-2">{team.conference} Conf.</p>
              <p className="text-sm text-orange-600 font-medium">
                {team.wins}-{team.losses}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
