// pages/login.js
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    // Call NextAuth without auto-redirect
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      // Wrong email or password
      alert("Email or password is incorrect. Please try again.");
      return;
    }

    // Success: go to account
    router.push("/account");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar />

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

            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
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
              <Link
                href="/reset"
                className="text-sm text-orange-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <p className="mt-6 text-center text-sm">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-orange-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

