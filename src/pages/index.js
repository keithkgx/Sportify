export default function Home() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-6 bg-gray-200 border-b-2 border-black">
        <div className="flex items-center space-x-4">
          <img src="/Sportify logo.webp" alt="Sportify Logo" className="w-20" />
          <h1 className="text-4xl font-bold">SPORTIFY</h1>
        </div>
        <nav className="flex space-x-10 text-xl font-semibold">
          <a href="/" className="hover:underline">HOME</a>
          <a href="/players" className="hover:underline">PLAYER</a>
          <a href="/compare" className="hover:underline">COMPARE</a>
          <a href="/teams" className="hover:underline">TEAM</a>
          <a href="/account" className="hover:underline flex items-center space-x-2">
            <img src="/Account Icon.webp" alt="Account Icon" className="w-5 h-5" />
            <span>ACCOUNT</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-center px-10 py-20 max-w-screen-xl mx-auto gap-10">
        {/* Left Column: Two stacked images */}
        <div className="flex flex-col gap-6">
          <img
            src="/East.jpg"
            alt="Team East"
            className="w-[300px] sm:w-[400px] rounded-xl border-4 border-white shadow-xl"
          />
          <img
            src="/West.jpg"
            alt="Team West"
            className="w-[300px] sm:w-[400px] rounded-xl border-4 border-white shadow-xl"
          />
        </div>

        {/* Right Column: Tagline */}
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-4xl lg:text-5xl italic font-extrabold leading-tight tracking-tight">
            Your One-Stop <br /> Platform for All Things<br />
            NBA Stats & Insights
          </h2>
        </div>
      </main>
    </div>
  );
}

