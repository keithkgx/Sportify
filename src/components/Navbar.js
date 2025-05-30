export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-10 py-6 bg-gray-200 border-b-2 border-black">
      <div className="flex items-center space-x-4">
        <img src="/Sportify logo.webp" alt="Sportify Logo" className="w-20" />
        <h1 className="text-4xl font-bold">SPORTIFY</h1>
      </div>
      <nav className="flex space-x-10 text-xl font-semibold">
        <a href="/" className="hover:underline">HOME</a>
        <a href="/players" className="hover:underline">PLAYER</a>
        <a href="/teams" className="hover:underline">TEAMS</a>
        <a href="/compare" className="hover:underline">COMPARE</a>
        <a href="/account" className="hover:underline flex items-center space-x-2">
          <img src="/Account Icon.webp" alt="Account Icon" className="w-5 h-5" />
          <span>ACCOUNT</span>
        </a>
      </nav>
    </header>
  );
}

