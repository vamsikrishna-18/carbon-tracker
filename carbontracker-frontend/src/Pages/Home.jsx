import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center text-center min-h-[80vh]">

        <h1 className="text-5xl font-bold text-green-700">
          🌿 Carbon Footprint Tracker
        </h1>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl">
          Track your daily carbon emissions, earn eco points,
          reduce your carbon footprint and help build a greener future.
        </p>

        <div className="mt-10 flex gap-5">

          <Link to="/register">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="border border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg">
              Login
            </button>
          </Link>

        </div>

      </section>
    </MainLayout>
  );
}

export default Home;