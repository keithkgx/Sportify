// pages/reset.js
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ResetPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const newPassword = form.newPassword.value;
    const confirm = form.confirmPassword.value;

    // 1) Client-side match check
    if (newPassword !== confirm) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // 2) Send reset request
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Something went wrong.");
      return;
    }

    // 3) Success!
    alert(data.message);
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar />

      {/* Split panel */}
      <main className="flex flex-1">
        {/* Left image */}
        <div
          className="w-1/2 relative bg-center bg-cover"
          style={{ backgroundImage: "url('/nba-photo.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/20" />
        </div>

        {/* Right: reset form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

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
              htmlFor="newPassword"
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full p-2 border border-gray-300 rounded mb-6"
            />

            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition"
            >
              Reset Password
            </button>

            <p className="mt-6 text-center text-sm">
              Remembered?{" "}
              <Link
                href="/login"
                className="text-orange-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
