import Buttons from "@/components/Buttons";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-10">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Hi kub 👋
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Welcome to our page! Click the button below to visit the sandbox.
        </p>

        <Link href="/sandbox">
          <Buttons className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300">
            Booooo 🚀
          </Buttons>
        </Link>
      </div>
    </div>
  );
}

export default Page;
