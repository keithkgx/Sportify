import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function CompareLanding() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-4xl mx-auto p-8 space-y-8">
        <h2 className="text-3xl font-bold">Compare</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/compareplayer" legacyBehavior>
            <a className="flex-1 p-6 border rounded-lg hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Image
                  src="/Player Icon.jpg"
                  alt="Player Comparison"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Player Comparison</h3>
              <p className="text-gray-600">
                Select two NBA players to compare head-to-head on their statistics.
              </p>
            </a>
          </Link>

          <Link href="/compareteam" legacyBehavior>
            <a className="flex-1 p-6 border rounded-lg hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Image
                  src="/Team Icon.jpg"
                  alt="Team Comparison"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Comparison</h3>
              <p className="text-gray-600">
                Compare two NBA teams across key metrics like offense, defense, and form.
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
