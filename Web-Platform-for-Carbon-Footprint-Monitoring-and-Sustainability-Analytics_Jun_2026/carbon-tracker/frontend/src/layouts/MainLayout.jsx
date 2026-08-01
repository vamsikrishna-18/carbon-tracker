import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 text-gray-900 dark:text-white transition-colors duration-300">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default MainLayout;