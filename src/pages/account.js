// src/pages/account.js
import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'

/**
 * This runs on the server on every request.
 * If there’s no valid session, redirect to /login.
 * Otherwise make session.user available as the `user` prop.
 */
export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: { destination: '/login', permanent: false }
    }
  }
  return {
    props: { user: session.user }
  }
}

export default function AccountPage({ user }) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-6 bg-gray-200 border-b-2 border-black">
        <div className="flex items-center space-x-4">
          <img src="/Sportify logo.webp" alt="Sportify Logo" className="w-20" />
          <h1 className="text-4xl font-bold">SPORTIFY</h1>
        </div>
        <nav className="flex space-x-10 text-xl font-semibold">
          <Link href="/" className="hover:underline">HOME</Link>
          <Link href="/players" className="hover:underline">PLAYER</Link>
          <Link href="/compare" className="hover:underline">COMPARE</Link>
          <Link href="/teams" className="hover:underline">TEAM</Link>
          <Link href="/account" className="hover:underline flex items-center space-x-2">
            <img src="/Account Icon.webp" alt="Account Icon" className="w-5 h-5" />
            <span>ACCOUNT</span>
          </Link>
        </nav>
      </header>

      {/* Account Content */}
      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Account</h2>
          {/* This will immediately clear the session and send you to /login */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Sign Out
          </button>
        </div>

        <section className="flex items-center space-x-6 mb-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-600">
            👤
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Date of Birth</h4>
            <p>{user.dob ?? 'N/A'}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Language</h4>
            <p>{user.language ?? 'N/A'}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Country</h4>
            <p>{user.country ?? 'N/A'}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Favorite Player</h4>
            <p>{user.favoritePlayer ?? 'N/A'}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-bold mb-2">Favorite Team</h4>
            <p>{user.favoriteTeam ?? 'N/A'}</p>
          </div>
        </section>
      </main>
    </div>
  )
}
