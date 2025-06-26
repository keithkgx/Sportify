import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-10 py-6 bg-gray-200 border-b-2 border-black">
      {/* Left side logo + title */}
      <div className="flex items-center space-x-4">
        <Image
          src="/SportifyLogo.webp"
          alt="Sportify Logo"
          width={80}
          height={80}
          className="w-20 h-auto"
        />
        <h1 className="text-4xl font-bold">SPORTIFY</h1>
      </div>

      {/* Navigation links */}
      <nav className="flex space-x-10 text-xl font-semibold">
        <Link href="/" legacyBehavior>
          <a className="hover:underline">HOME</a>
        </Link>
        <Link href="/players" legacyBehavior>
          <a className="hover:underline">PLAYER</a>
        </Link>
        <Link href="/teams" legacyBehavior>
          <a className="hover:underline">TEAMS</a>
        </Link>
        <Link href="/compare" legacyBehavior>
          <a className="hover:underline">COMPARE</a>
        </Link>
        <Link href="/account" legacyBehavior>
          <a className="hover:underline flex items-center space-x-2">
            <Image
              src="/Account Icon.webp"
              alt="Account Icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>ACCOUNT</span>
          </a>
        </Link>
      </nav>
    </header>
  );
}


