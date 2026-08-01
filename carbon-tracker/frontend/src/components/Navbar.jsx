import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
function Navbar() {
  return (
    <nav className="bg-green-700 dark:bg-gray-500 text-white shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <ThemeToggle />

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          🌿 CarbonTracker
        </Link>

        <div className="space-x-5">

          <Link
            to="/"
            className="hover:text-green-200"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="hover:text-green-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-green-200"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;