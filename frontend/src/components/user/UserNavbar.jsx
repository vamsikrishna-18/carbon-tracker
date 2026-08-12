import { useEffect, useState } from "react";

import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  Check,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import LanguageDropdown from "../common/LanguageDropdown";
import GoogleTranslate from "../common/GoogleTranslate";

import {
  getNotifications,
  markNotificationAsRead,
} from "../../services/notificationService";

function UserNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ============================================================
  // LOAD USER
  // ============================================================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        setUser(null);
      }
    }
  }, []);

  // ============================================================
  // LOAD NOTIFICATIONS
  // ============================================================

  const loadNotifications = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await getNotifications(user.id);

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setNotifications(data);
    } catch (error) {
      console.error(
        "Failed to load user notifications:",
        error
      );
    }
  };

  // ============================================================
  // INITIAL LOAD + REAL-TIME POLLING
  // ============================================================

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    loadNotifications();

    // Check for new notifications every 3 seconds
    const interval = setInterval(() => {
      loadNotifications();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [user?.id]);

  // ============================================================
  // UNREAD NOTIFICATIONS
  // ============================================================

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );

  const unreadCount = unreadNotifications.length;

  // ============================================================
  // MARK NOTIFICATION AS READ
  // ============================================================

  const handleNotificationClick = async (notification) => {
    try {
      await markNotificationAsRead(notification.id);

      // Remove from navbar immediately
      setNotifications((prev) =>
        prev.filter(
          (item) => item.id !== notification.id
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  // ============================================================
  // THEME
  // ============================================================

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div
      className="
        bg-white
        dark:bg-gray-900
        text-gray-900
        dark:text-white
        shadow-md
        pl-16
        pr-3
        sm:pl-4
        sm:pr-4
        md:px-6
        lg:px-8
        py-2.5
        sm:py-3
        md:py-4
        flex
        justify-between
        items-center
        gap-2
        sm:gap-3
        md:gap-4
        lg:gap-6
        min-h-16
        sm:min-h-20
        min-w-0
      "
    >
      {/* ======================================================
          SEARCH - DESKTOP (aligned to same lg: breakpoint as
          the hamburger button in UserLayout, so they never
          fight for the same space)
      ====================================================== */}

      <div className="relative hidden lg:block flex-1 max-w-md min-w-0">
        <Search
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-500
            w-5
            h-5
          "
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            pl-10
            pr-4
            py-2
            text-sm
            border-2
            rounded-lg
            bg-white
            dark:bg-gray-800
            border-gray-200
            dark:border-gray-700
            text-gray-900
            dark:text-white
            outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      {/* ======================================================
          MOBILE SEARCH TOGGLE (search bar was previously
          completely inaccessible below lg — this restores it)
      ====================================================== */}

      <button
        onClick={() => setMobileSearchOpen((prev) => !prev)}
        className="
          lg:hidden
          flex-shrink-0
          hover:text-green-600
          transition
        "
        aria-label="Toggle search"
      >
        {mobileSearchOpen ? <X size={22} /> : <Search size={22} />}
      </button>

      {mobileSearchOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            lg:hidden
            px-3
            sm:px-4
            py-2.5
            bg-white
            dark:bg-gray-900
            border-t
            border-gray-200
            dark:border-gray-700
            shadow-md
            z-40
          "
        >
          <div className="relative">
            <Search
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
              size={18}
            />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10
                pr-4
                py-2.5
                text-sm
                border-2
                rounded-lg
                bg-white
                dark:bg-gray-800
                border-gray-200
                dark:border-gray-700
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>
        </div>
      )}

      {/* ======================================================
          RIGHT SIDE - RESPONSIVE GAP
      ====================================================== */}

      <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-6 min-w-0 flex-shrink-0">

        {/* LANGUAGE — hide on very small phones to save space,
            still reachable via profile menu / larger screens */}

        <div className="hidden sm:block">
          <LanguageDropdown />
        </div>

        <div className="hidden sm:block">
          <GoogleTranslate />
        </div>

        {/* ====================================================
            NOTIFICATIONS
        ==================================================== */}

        <div className="relative shrink-0">

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="
              relative
              hover:text-green-600
              transition
            "
          >
            <Bell size={22} />

            {/* UNREAD COUNT */}

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-red-600
                  text-white
                  rounded-full
                  min-w-5
                  h-5
                  px-1
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-bold
                "
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* ==================================================
              NOTIFICATION DROPDOWN
          ================================================== */}

          {showNotifications && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-3
                w-[380px]
                min-w-0
                max-w-[calc(100vw-1.5rem)]
                bg-white
                dark:bg-gray-800
                border
                border-gray-200
                dark:border-gray-700
                rounded-xl
                shadow-2xl
                z-[9999]
                overflow-hidden
              "
            >

              {/* HEADER */}

              <div
                className="
                  px-4
                  py-3
                  border-b
                  border-gray-200
                  dark:border-gray-700
                  flex
                  justify-between
                  items-center
                  gap-2
                "
              >
                <div className="min-w-0">
                  <h3
                    className="
                      font-bold
                      text-gray-900
                      dark:text-white
                      truncate
                    "
                  >
                    Notifications
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {unreadCount} unread
                  </p>
                </div>

                {/* VIEW ALL */}

                <Link
                  to="/notifications"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="
                    text-xs
                    text-green-600
                    hover:text-green-700
                    font-semibold
                    flex-shrink-0
                  "
                >
                  View All
                </Link>
              </div>

              {/* NOTIFICATIONS */}

              <div
                className="
                  max-h-96
                  overflow-y-auto
                "
              >
                {unreadNotifications.length === 0 ? (
                  <div
                    className="
                      px-5
                      py-10
                      text-center
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    <Bell
                      size={32}
                      className="
                        mx-auto
                        mb-3
                        opacity-40
                      "
                    />

                    <p>
                      No new notifications
                    </p>
                  </div>
                ) : (
                  unreadNotifications.map(
                    (notification) => (
                      <button
                        key={notification.id}
                        onClick={() =>
                          handleNotificationClick(
                            notification
                          )
                        }
                        className="
                          w-full
                          text-left
                          px-4
                          py-4
                          border-b
                          border-gray-100
                          dark:border-gray-700
                          hover:bg-gray-50
                          dark:hover:bg-gray-700
                          transition
                        "
                      >
                        <div className="flex gap-3">

                          {/* ICON */}

                          <div
                            className="
                              flex-shrink-0
                              w-9
                              h-9
                              rounded-full
                              bg-green-100
                              dark:bg-green-900/40
                              text-green-600
                              dark:text-green-400
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <Bell size={16} />
                          </div>

                          {/* CONTENT */}

                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >
                            <div
                              className="
                                flex
                                justify-between
                                gap-2
                              "
                            >
                              <h4
                                className="
                                  font-semibold
                                  text-sm
                                  text-gray-900
                                  dark:text-white
                                  truncate
                                "
                              >
                                {notification.title}
                              </h4>

                              <Check
                                size={16}
                                className="
                                  text-green-600
                                  flex-shrink-0
                                "
                              />
                            </div>

                            <p
                              className="
                                mt-1
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                                break-words
                              "
                            >
                              {notification.message}
                            </p>

                            <p
                              className="
                                mt-2
                                text-xs
                                text-gray-400
                              "
                            >
                              Click to mark as read
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* ====================================================
            THEME
        ==================================================== */}

        <button
          onClick={toggleTheme}
          className="hover:text-green-600 transition flex-shrink-0"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}
        </button>

        {/* ====================================================
            USER PROFILE
        ==================================================== */}

        <div className="relative min-w-0">

          <button
            onClick={() =>
              setShowProfile(!showProfile)
            }
            className="
              flex
              items-center
              gap-1.5
              sm:gap-2
              min-w-0
            "
          >

            {/* AVATAR */}

            <div
              className="
                w-9
                h-9
                sm:w-10
                sm:h-10
                rounded-full
                bg-green-600
                text-white
                flex
                justify-center
                items-center
                flex-shrink-0
              "
            >
              <User size={17} />
            </div>

            {/* NAME — hidden below sm: to prevent overflow on
                narrow phones; avatar remains the tap target */}

            <span
              className="
                hidden
                sm:inline
                font-semibold
                dark:text-white
                truncate
                max-w-[7rem]
                md:max-w-[10rem]
              "
            >
              {user?.fullName || "User"}
            </span>

            <ChevronDown size={18} className="hidden sm:block flex-shrink-0" />
          </button>

          {/* PROFILE MENU */}

          {showProfile && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-56
                sm:w-60
                max-w-[calc(100vw-1.5rem)]
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-xl
                overflow-hidden
                z-50
              "
            >

              {/* Language + translate shown here on mobile since
                  they're hidden from the main bar below sm: */}

              <div className="sm:hidden flex items-center gap-2 px-5 py-3 border-b border-gray-100 dark:border-gray-700">
                <LanguageDropdown />
                <GoogleTranslate />
              </div>

              {/* MY PROFILE */}

              <Link
                to="/profile"
                onClick={() =>
                  setShowProfile(false)
                }
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                "
              >
                <User size={18} />

                My Profile
              </Link>

              {/* SETTINGS */}

              <Link
                to="/settings"
                onClick={() =>
                  setShowProfile(false)
                }
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                "
              >
                <Settings size={18} />

                Settings
              </Link>

              {/* LOGOUT */}

              <button
                onClick={logout}
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  hover:bg-red-100
                  dark:hover:bg-red-900/30
                  w-full
                  text-left
                  text-red-600
                "
              >
                <LogOut size={18} />

                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;