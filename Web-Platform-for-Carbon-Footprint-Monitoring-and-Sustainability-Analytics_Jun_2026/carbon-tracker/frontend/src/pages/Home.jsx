import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 bg-gradient-to-br from-green-50 to-white">

        {/* Left Content */}
        <div className="max-w-xl">

          <h1 className="text-5xl md:text-6xl font-bold text-green-800 dark:text-green-400 leading-tight">
            Track Your Carbon.
            <br />
            <span className="text-green-600 dark:text-green-300">
              Protect The Planet 🌍
            </span>
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Carbon Tracker helps you understand your daily environmental
            impact, reduce emissions, and build sustainable habits for a
            greener tomorrow.
          </p>


          <div className="mt-10 grid md:grid-cols-2 gap-6">

  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
    <div className="text-5xl mb-3">👤</div>

    <h3 className="text-xl font-bold text-green-700 dark:text-green-400">
      User Login
    </h3>

    <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">
      Track activities, emissions and rewards.
    </p>

    <Link to="/login">
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
        Login as User
      </button>
    </Link>

  </div>

  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
    <div className="text-5xl mb-3">🛡️</div>

    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">
      Admin Login
    </h3>

    <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">
      Manage users, reports, rewards and settings.
    </p>

    <Link to="/admin-login">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
        Login as Admin
      </button>
    </Link>

  </div>

</div>

          <div className="mt-10 flex gap-8 text-center">

            <div>
              <h3 className="text-2xl font-bold text-green-700">
                🌱
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Reduce Emissions
              </p>
            </div>


            <div>
              <h3 className="text-2xl font-bold text-green-700">
                🏆
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Earn Rewards
              </p>
            </div>


            <div>
              <h3 className="text-2xl font-bold text-green-700">
                📊
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Track Progress
              </p>
            </div>

          </div>

        </div>


        {/* Right Illustration */}
        <div className="mt-10 md:mt-0">

          <div className="bg-green-100 rounded-full w-72 h-72 md:w-96 md:h-96 flex items-center justify-center shadow-xl">

            <div className="text-8xl">
              🌍
            </div>

          </div>

        </div>


      </section>



      {/* Features Section */}
      <section className="py-20 px-8 md:px-16">

        <h2 className="text-4xl font-bold text-center text-green-800">
          Why Choose Carbon Tracker?
        </h2>


        <div className="grid md:grid-cols-3 gap-8 mt-12">


          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white">

            <h3 className="text-xl font-bold text-green-700">
              🌱 Carbon Monitoring
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Track your daily activities and understand your carbon footprint.
            </p>

          </div>



          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white">

            <h3 className="text-xl font-bold text-green-700">
              📈 Smart Analytics
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Visualize your emission trends and discover ways to improve.
            </p>

          </div>



          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white">

            <h3 className="text-xl font-bold text-green-700">
              🏆 Eco Rewards
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Reduce emissions, earn points, and get rewarded for sustainable choices.
            </p>

          </div>


        </div>

      </section>




      {/* How it Works */}
      <section className="bg-green-50 py-20 px-8 md:px-16">

        <h2 className="text-4xl font-bold text-center text-green-800">
          How It Works
        </h2>


        <div className="grid md:grid-cols-3 gap-10 mt-12 text-center">


          <div>
            <div className="text-5xl">
              📝
            </div>

            <h3 className="text-xl font-bold mt-4">
              1. Track
            </h3>

            <p className="ttext-gray-600 dark:text-gray-300 mt-2">
              Add your daily activities like travel and energy usage.
            </p>

          </div>



          <div>
            <div className="text-5xl">
              🤖
            </div>

            <h3 className="text-xl font-bold mt-4">
              2. Analyze
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Calculate your carbon emissions automatically.
            </p>

          </div>



          <div>
            <div className="text-5xl">
              🏆
            </div>

            <h3 className="text-xl font-bold mt-4">
              3. Improve
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Reduce your footprint and earn eco points.
            </p>

          </div>


        </div>

      </section>




      {/* Final CTA */}
      <section className="py-20 text-center px-8">

        <h2 className="text-4xl font-bold text-green-800">
          Start Your Green Journey Today 🌿
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Every small action contributes to a healthier planet.
        </p>


        <Link to="/register">

          <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl shadow-lg">
            Create Account
          </button>

        </Link>


      </section>


    </MainLayout>
  );
}

export default Home;