// src/pages/login.js
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    // Perform credential sign-in and redirect to /account on success
    await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/account'
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-6 bg-gray-200 border-b-2 border-black">
        <div className="flex items-center space-x-4">
          <img
            src="/Sportify logo.webp"
            alt="Sportify Logo"
            className="w-20"
          />
          <h1 className="text-4xl font-bold">SPORTIFY</h1>
        </div>
        <nav className="flex space-x-10 text-xl font-semibold">
          <Link href="/" className="hover:underline">HOME</Link>
          <Link href="/players" className="hover:underline">PLAYER</Link>
          <Link href="/compare" className="hover:underline">COMPARE</Link>
          <Link href="/teams" className="hover:underline">TEAM</Link>
          <Link
            href="/account"
            className="hover:underline flex items-center space-x-2"
          >
            <img
              src="/Account Icon.webp"
              alt="Account Icon"
              className="w-5 h-5"
            />
            <span>ACCOUNT</span>
          </Link>
        </nav>
      </header>

      {/* Split panel */}
      <main className="flex flex-1">
        {/* Left: NBA image */}
        <div
          className="w-1/2 relative bg-center bg-cover"
          style={{ backgroundImage: "url('/nba-photo.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/20" />
        </div>

        {/* Right: Sign-in form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>

            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition"
            >
              Sign In
            </button>

            <div className="mt-4 text-right">
              <Link href="/reset" className="text-sm text-orange-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <p className="mt-6 text-center text-sm">
              Don’t have an account?{' '}
              <Link href="/signup" className="text-orange-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
