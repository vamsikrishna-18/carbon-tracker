import { useEffect, useState } from "react";

import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Users,
  ChevronDown,
  Moon,
  Sun,
  Check,
  Menu,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import LanguageDropdown from "../common/LanguageDropdown";
import GoogleTranslate from "../common/GoogleTranslate";

import {
  getNotifications,
  markNotificationAsRead,
} from "../../services/notificationService";


function AdminNavbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [showMobileMenu, setShowMobileMenu] =
    useState(false);

  const [showMobileSearch, setShowMobileSearch] =
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

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    try {

      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);

    } catch (error) {

      console.error(
        "Invalid user data:",
        error
      );

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

      const response =
        await getNotifications(user.id);

      console.log(
        "Admin Notifications Response:",
        response.data
      );


      /*
       * Backend may return:
       *
       * 1. [...]
       *
       * OR
       *
       * 2. { notifications: [...] }
       *
       * OR
       *
       * 3. { data: [...] }
       *
       * Always convert it into an array.
       */

      let notificationData = [];


      if (Array.isArray(response.data)) {

        notificationData =
          response.data;

      } else if (
        Array.isArray(
          response.data?.notifications
        )
      ) {

        notificationData =
          response.data.notifications;

      } else if (
        Array.isArray(
          response.data?.data
        )
      ) {

        notificationData =
          response.data.data;

      } else {

        notificationData = [];

      }


      setNotifications(
        notificationData
      );


    } catch (error) {

      console.error(
        "Failed to load admin notifications:",
        error
      );

      setNotifications([]);

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


    /*
     * Poll every 3 seconds.
     *
     * This gives near-real-time notifications
     * without demo/static notifications.
     */

    const interval =
      setInterval(() => {

        loadNotifications();

      }, 3000);


    return () => {

      clearInterval(interval);

    };

  }, [user?.id]);


  // ============================================================
  // SAFE NOTIFICATION ARRAY
  // ============================================================

  const safeNotifications =
    Array.isArray(notifications)
      ? notifications
      : [];


  // ============================================================
  // UNREAD NOTIFICATIONS
  // ============================================================

  const unreadNotifications =
    safeNotifications.filter(
      (notification) =>
        notification &&
        notification.isRead !== true
    );


  const unreadCount =
    unreadNotifications.length;


  // ============================================================
  // MARK NOTIFICATION AS READ
  // ============================================================

  const handleNotificationClick =
    async (notification) => {

      if (!notification?.id) {
        return;
      }


      try {

        await markNotificationAsRead(
          notification.id
        );


        /*
         * Remove immediately from UI.
         */

        setNotifications((previous) => {

          if (!Array.isArray(previous)) {
            return [];
          }

          return previous.filter(
            (item) =>
              item.id !== notification.id
          );

        });


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

    const newTheme =
      !darkMode;


    setDarkMode(
      newTheme
    );


    if (newTheme) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  };


  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };


  // ============================================================
  // UI
  // ============================================================

  return (

    <div
      className="
        relative
        bg-white
        dark:bg-gray-900
        text-gray-900
        dark:text-white
        shadow
        z-40
      "
    >

      <div
        className="
          px-3
          sm:px-4
          md:px-6
          lg:px-8
          py-3
          sm:py-4
          flex
          items-center
          justify-between
          gap-2
          sm:gap-4
        "
      >

        {/* =====================================================
            MOBILE MENU TOGGLE (search / language / translate)
        ===================================================== */}

        <button
          type="button"
          onClick={() =>
            setShowMobileMenu((previous) => !previous)
          }
          aria-label="Toggle menu"
          aria-expanded={showMobileMenu}
          className="
            lg:hidden
            flex-shrink-0
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-800
            active:scale-95
            transition
          "
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>


        {/* =====================================================
            SEARCH — inline on lg+, icon-triggered on smaller screens
        ===================================================== */}

        <div className="hidden lg:block relative w-full max-w-xs xl:max-w-sm">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search admin pages..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              pl-10
              pr-4
              py-2
              border
              rounded-lg
              bg-white
              dark:bg-gray-800
              border-gray-300
              dark:border-gray-700
              text-gray-900
              dark:text-white
              outline-none
              focus:ring-2
              focus:ring-green-500
              focus:border-transparent
              transition
            "
          />

        </div>

        {/* Spacer so right-side controls stay pinned right on mobile/tablet */}
        <div className="flex-1 lg:hidden" />


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 lg:gap-6 flex-shrink-0">


          {/* LANGUAGE / TRANSLATE — desktop only, moved to mobile menu below */}

          <div className="hidden lg:flex items-center gap-3">
            <LanguageDropdown />
            <GoogleTranslate />
          </div>


          {/* MOBILE SEARCH TOGGLE */}

          <button
            type="button"
            onClick={() =>
              setShowMobileSearch((previous) => !previous)
            }
            aria-label="Search"
            className="
              lg:hidden
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-lg
              hover:bg-gray-100
              dark:hover:bg-gray-800
              hover:text-green-600
              transition
            "
          >
            <Search size={20} />
          </button>


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowNotifications((previous) => !previous)
              }
              aria-label="Notifications"
              className="
                relative
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-lg
                hover:bg-gray-100
                dark:hover:bg-gray-800
                hover:text-green-600
                transition
              "
            >

              <Bell size={20} className="sm:w-[22px] sm:h-[22px]" />


              {/* UNREAD BADGE */}

              {unreadCount > 0 && (

                <span
                  className="
                    absolute
                    top-0
                    right-0
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
                    font-semibold
                  "
                >

                  {unreadCount}

                </span>

              )}

            </button>


            {/* =================================================
                NOTIFICATION DROPDOWN
            ================================================= */}

            {showNotifications && (

              <div
                className="
                  fixed
                  sm:absolute
                  left-3
                  right-3
                  sm:left-auto
                  sm:right-0
                  top-16
                  sm:top-full
                  mt-0
                  sm:mt-3
                  bg-white
                  dark:bg-gray-800
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-xl
                  shadow-2xl
                  z-[99999]
                  overflow-hidden
                "
                style={{
                  width: "auto",
                  maxWidth: "360px",
                }}
              >


                {/* HEADER */}

                <div
                  className="
                    px-4
                    py-3
                    border-b
                    border-gray-200
                    dark:border-gray-700
                  "
                >

                  <h3
                    className="
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Notifications
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                      mt-1
                    "
                  >
                    {unreadCount} unread
                  </p>

                </div>


                {/* NOTIFICATION LIST */}

                <div
                  className="
                    max-h-[60vh]
                    sm:max-h-96
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
                          type="button"
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

                          <div
                            className="
                              flex
                              gap-3
                            "
                          >

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


          {/* =================================================
              THEME
          ================================================= */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-lg
              hover:bg-gray-100
              dark:hover:bg-gray-800
              hover:text-green-600
              transition
            "
          >

            {darkMode ? (
              <Sun size={20} className="sm:w-[22px] sm:h-[22px]" />
            ) : (
              <Moon size={20} className="sm:w-[22px] sm:h-[22px]" />
            )}

          </button>


          {/* =================================================
              PROFILE
          ================================================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowProfile(
                  (previous) =>
                    !previous
                )
              }
              className="
                flex
                items-center
                gap-1.5
                sm:gap-2
                rounded-lg
                hover:bg-gray-100
                dark:hover:bg-gray-800
                py-1
                pl-1
                pr-1.5
                sm:pr-2
                transition
              "
            >

              <div
                className="
                  w-8
                  h-8
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

                <User size={16} className="sm:w-[18px] sm:h-[18px]" />

              </div>


              <span
                className="
                  hidden
                  md:block
                  font-semibold
                  dark:text-white
                  max-w-[10rem]
                  truncate
                "
              >

                {user?.fullName || "Admin"}

              </span>


              <ChevronDown size={18} className="hidden sm:block flex-shrink-0" />

            </button>


            {/* PROFILE DROPDOWN */}

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
                  z-[9999]
                "
              >

                {/* Name shown here on mobile since it's hidden in the trigger */}
                <div className="md:hidden px-5 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {user?.fullName || "Admin"}
                  </p>
                </div>

                <Link
                  to="/admin-profile"
                  onClick={() => setShowProfile(false)}
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


                <Link
                  to="/manage-users"
                  onClick={() => setShowProfile(false)}
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

                  <Users size={18} />

                  Manage Users

                </Link>


                <Link
                  to="/admin-settings"
                  onClick={() => setShowProfile(false)}
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


                <button
                  type="button"
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


      {/* =====================================================
          MOBILE SEARCH BAR (toggled by the search icon, <lg only)
      ===================================================== */}

      {showMobileSearch && (

        <div
          className="
            lg:hidden
            px-3
            sm:px-4
            pb-3
            sm:pb-4
          "
        >

          <div className="relative">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              type="text"
              autoFocus
              placeholder="Search admin pages..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                pl-10
                pr-4
                py-2.5
                border
                rounded-lg
                bg-white
                dark:bg-gray-800
                border-gray-300
                dark:border-gray-700
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-transparent
                transition
              "
            />

          </div>

        </div>

      )}


      {/* =====================================================
          MOBILE MENU PANEL — language + translate (<lg only)
      ===================================================== */}

      {showMobileMenu && (

        <div
          className="
            lg:hidden
            border-t
            border-gray-200
            dark:border-gray-700
            px-3
            sm:px-4
            py-4
            space-y-3
          "
        >

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-400
              px-1
            "
          >
            Language
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <LanguageDropdown />
            <GoogleTranslate />
          </div>

        </div>

      )}

    </div>

  );
}


export default AdminNavbar;