import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";

// Dynamic import for Recharts to avoid SSR issues
const RechartsDynamicComponent = dynamic(() => import('../../components/RechartsWrapper'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-96">
      <div className="text-lg text-gray-600">Loading chart...</div>
    </div>
  )
});

export default function ComparisonResults() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comparisonType, setComparisonType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { player1, player2, team1, team2 } = router.query;

    if (player1 && player2) {
      setComparisonType('player');
      loadPlayerComparison(player1, player2);
    } else if (team1 && team2) {
      setComparisonType('team');
      loadTeamComparison(team1, team2);
    }
  }, [router.query]);

  const loadPlayerComparison = async (id1, id2) => {
    try {
      const response = await fetch("/players.json");
      const players = await response.json();
      
      const player1 = players.find(p => p.id === parseInt(id1));
      const player2 = players.find(p => p.id === parseInt(id2));
      
      if (player1 && player2) {
        setData({ entity1: player1, entity2: player2 });
      }
    } catch (error) {
      console.error("Error loading players:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeamComparison = async (id1, id2) => {
    try {
      const response = await fetch("/teams.json");
      const teams = await response.json();
      
      const team1 = teams.find(t => t.id === parseInt(id1));
      const team2 = teams.find(t => t.id === parseInt(id2));
      
      if (team1 && team2) {
        setData({ entity1: team1, entity2: team2 });
      }
    } catch (error) {
      console.error("Error loading teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!data) return [];

    const { entity1, entity2 } = data;

    if (comparisonType === 'player') {
      const stats1 = entity1.stats;
      const stats2 = entity2.stats;
      
      return [
        {
          stat: 'Points',
          [entity1.first_name + ' ' + entity1.last_name]: stats1.pts,
          [entity2.first_name + ' ' + entity2.last_name]: stats2.pts,
        },
        {
          stat: 'Rebounds',
          [entity1.first_name + ' ' + entity1.last_name]: stats1.reb,
          [entity2.first_name + ' ' + entity2.last_name]: stats2.reb,
        },
        {
          stat: 'Assists',
          [entity1.first_name + ' ' + entity1.last_name]: stats1.ast,
          [entity2.first_name + ' ' + entity2.last_name]: stats2.ast,
        },
        {
          stat: 'FG%',
          [entity1.first_name + ' ' + entity1.last_name]: (stats1.fg_pct * 100).toFixed(1),
          [entity2.first_name + ' ' + entity2.last_name]: (stats2.fg_pct * 100).toFixed(1),
        },
      ];
    } else {
      return [
        {
          stat: 'Wins',
          [entity1.full_name]: entity1.wins,
          [entity2.full_name]: entity2.wins,
        },
        {
          stat: 'Losses',
          [entity1.full_name]: entity1.losses,
          [entity2.full_name]: entity2.losses,
        },
      ];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <main className="max-w-6xl mx-auto p-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading comparison...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <main className="max-w-6xl mx-auto p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Comparison Not Found</h2>
            <p>Unable to load the comparison data.</p>
          </div>
        </main>
      </div>
    );
  }

  const { entity1, entity2 } = data;
  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center">
          {comparisonType === 'player' ? 'Player' : 'Team'} Comparison
        </h2>

        {/* Entity Images/Logos */}
        <div className="flex justify-center items-center space-x-12">
          <div className="text-center">
            {comparisonType === 'player' ? (
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={entity1.image}
                  alt={`${entity1.first_name} ${entity1.last_name}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={entity1.logo}
                  alt={entity1.full_name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            <h3 className="text-xl font-bold">
              {comparisonType === 'player' 
                ? `${entity1.first_name} ${entity1.last_name}` 
                : entity1.full_name
              }
            </h3>
            <p className="text-gray-600">
              {comparisonType === 'player' 
                ? entity1.team.full_name 
                : `${entity1.wins}-${entity1.losses}`
              }
            </p>
          </div>

          <div className="text-4xl font-bold text-orange-500">VS</div>

          <div className="text-center">
            {comparisonType === 'player' ? (
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={entity2.image}
                  alt={`${entity2.first_name} ${entity2.last_name}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={entity2.logo}
                  alt={entity2.full_name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            <h3 className="text-xl font-bold">
              {comparisonType === 'player' 
                ? `${entity2.first_name} ${entity2.last_name}` 
                : entity2.full_name
              }
            </h3>
            <p className="text-gray-600">
              {comparisonType === 'player' 
                ? entity2.team.full_name 
                : `${entity2.wins}-${entity2.losses}`
              }
            </p>
          </div>
        </div>

        {/* Statistics Comparison Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-center">Statistics Comparison</h3>
          <RechartsDynamicComponent 
            data={chartData}
            entity1={entity1}
            entity2={entity2}
            comparisonType={comparisonType}
          />
        </div>
      </main>
    </div>
  );
}