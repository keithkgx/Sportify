import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="flex flex-col lg:flex-row items-center justify-center px-10 py-20 max-w-screen-xl mx-auto gap-10">
        <div className="flex flex-col gap-6">
          <div className="relative w-[300px] sm:w-[400px] h-[200px] sm:h-[250px]">
            <Image
              src="/East.jpg"
              alt="Team East"
              fill
              className="rounded-xl border-4 border-white shadow-xl object-cover"
            />
          </div>
          <div className="relative w-[300px] sm:w-[400px] h-[200px] sm:h-[250px]">
            <Image
              src="/West.jpg"
              alt="Team West"
              fill
              className="rounded-xl border-4 border-white shadow-xl object-cover"
            />
          </div>
        </div>
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
