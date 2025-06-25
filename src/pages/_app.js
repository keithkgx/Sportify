// pages/_app.js
import "../styles/globals.css";          // ← your Tailwind or global styles
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  return (
    // wrap everything in SessionProvider as before
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
