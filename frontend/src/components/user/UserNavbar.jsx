import { useContext, useEffect, useRef, useState } from "react";

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
  Menu,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import LanguageDropdown from "../common/LanguageDropdown";
import GoogleTranslate from "../common/GoogleTranslate";
import { ThemeContext } from "../../context/ThemeContext";

import {
  getNotifications,
  markNotificationAsRead,
} from "../../services/notificationService";

function UserNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [notifications, setNotifications] = useState([]);

  // Refs used to detect outside clicks / taps so dropdowns close
  // properly on both mobile (touch) and desktop (mouse)
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const mobileSearchRef = useRef(null);

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

      const data = Array.isArray(response.data) ? response.data : [];

      setNotifications(data);
    } catch (error) {
      console.error("Failed to load user notifications:", error);
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
  // CLOSE DROPDOWNS ON OUTSIDE CLICK / TAP / ESCAPE
  // (fixes menus staying open forever on mobile where there's
  // no natural "blur" the way there is with a mouse on desktop)
  // ============================================================

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        showNotifications &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        showProfile &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }

      if (
        mobileSearchOpen &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setMobileSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowProfile(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showNotifications, showProfile, mobileSearchOpen]);

  // ============================================================
  // UNREAD NOTIFICATIONS
  // ============================================================

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );

  const unreadCount = unreadNotifications.length;
  const unreadCountLabel = unreadCount > 9 ? "9+" : unreadCount;

  // ============================================================
  // MARK NOTIFICATION AS READ
  // ============================================================

  const handleNotificationClick = async (notification) => {
    try {
      await markNotificationAsRead(notification.id);

      // Remove from navbar immediately
      setNotifications((prev) =>
        prev.filter((item) => item.id !== notification.id)
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // ============================================================
  // THEME
  // ============================================================

  const toggleTheme = () => {
    setDarkMode((currentTheme) => !currentTheme);
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
  // DROPDOWN TOGGLES — each one closes the others so only a
  // single panel is ever open at once (prevents overlapping
  // dropdowns colliding on small screens)
  // ============================================================

  const toggleNotifications = () => {
    setShowProfile(false);
    setMobileSearchOpen(false);
    setShowNotifications((prev) => !prev);
  };

  const toggleProfile = () => {
    setShowNotifications(false);
    setMobileSearchOpen(false);
    setShowProfile((prev) => !prev);
  };

  const toggleMobileSearch = () => {
    setShowNotifications(false);
    setShowProfile(false);
    setMobileSearchOpen((prev) => !prev);
  };

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div
      className="
        relative
        w-full
        bg-white
        dark:bg-gray-900
        text-gray-900
        dark:text-white
        shadow-md
        flex
        items-center
        justify-between
        gap-2
        sm:gap-3
        md:gap-4
        lg:gap-6
        min-w-0
        h-14
        sm:h-16
        px-3
        pr-3
        sm:pl-4
        sm:pr-4
        md:px-6
        lg:px-8
      "
    >
      {/* ======================================================
          MOBILE MENU BUTTON — only rendered if a handler was
          passed in. If your layout already renders its own
          hamburger over the pl-16 gutter, leave onMenuClick
          unset and this button simply won't render.
      ====================================================== */}

      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            flex-shrink-0
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-800
            hover:text-green-600
            transition
          "
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      )}

      {/* ======================================================
          SEARCH - DESKTOP (aligned to same lg: breakpoint as
          the hamburger button in UserLayout, so they never
          fight for the same space)
      ====================================================== */}

      <div className="relative hidden lg:flex flex-1 max-w-md min-w-0 items-center">
        <Search
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-500
            pointer-events-none
          "
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* Spacer so the right-side icon cluster still gets pushed to
          the far right on mobile/tablet, where the search box above
          is hidden and wouldn't otherwise fill this space */}

      <div className="flex-1 lg:hidden min-w-0" />

      {/* ======================================================
          MOBILE SEARCH TOGGLE
      ====================================================== */}

      <button
        onClick={toggleMobileSearch}
        className="
          lg:hidden
          flex-shrink-0
          flex
          items-center
          justify-center
          hover:text-green-600
          transition
        "
        aria-label="Toggle search"
        aria-expanded={mobileSearchOpen}
      >
        {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
      </button>

      {mobileSearchOpen && (
        <div
          ref={mobileSearchRef}
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
          <div className="relative flex items-center">
            <Search
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
                pointer-events-none
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
                pr-10
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
            {search && (
              <button
                onClick={() => setSearch("")}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-gray-600
                  dark:hover:text-gray-200
                "
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================
          RIGHT SIDE - RESPONSIVE GAP
      ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-1.5
          xs:gap-2
          sm:gap-3
          md:gap-4
          lg:gap-6
          min-w-0
          flex-shrink-0
        "
      >

        {/* LANGUAGE — hide on very small phones to save space,
            still reachable via profile menu / larger screens */}

        <div className="hidden sm:flex items-center">
          <LanguageDropdown />
        </div>

        <div className="hidden sm:flex items-center">
          <GoogleTranslate />
        </div>

        {/* ====================================================
            NOTIFICATIONS
        ==================================================== */}

        <div className="relative flex items-center shrink-0" ref={notificationRef}>

          <button
            onClick={toggleNotifications}
            className="
              relative
              flex
              items-center
              justify-center
              hover:text-green-600
              transition
            "
            aria-label="Notifications"
            aria-haspopup="true"
            aria-expanded={showNotifications}
          >
            <Bell size={20} />

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
                  text-[10px]
                  sm:text-xs
                  font-bold
                  leading-none
                "
              >
                {unreadCountLabel}
              </span>
            )}
          </button>

          {/* ==================================================
              NOTIFICATION DROPDOWN — fixed on small phones so it
              can never overflow the viewport, absolute (anchored
              to the bell) from sm: up
          ================================================== */}

          {showNotifications && (
            <div
              className="
                fixed
                sm:absolute
                left-2
                right-2
                sm:left-auto
                sm:right-0
                top-16
                sm:top-full
                sm:mt-3
                sm:w-[380px]
                min-w-0
                sm:max-w-[calc(100vw-1.5rem)]
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
                  onClick={() => setShowNotifications(false)}
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
                    <Bell size={32} className="mx-auto mb-3 opacity-40" />

                    <p>No new notifications</p>
                  </div>
                ) : (
                  unreadNotifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() =>
                        handleNotificationClick(notification)
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

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-2">
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
                              className="text-green-600 flex-shrink-0"
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

                          <p className="mt-2 text-xs text-gray-400">
                            Click to mark as read
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
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
          className="
            flex
            items-center
            justify-center
            hover:text-green-600
            transition
            flex-shrink-0
          "
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* ====================================================
            USER PROFILE
        ==================================================== */}

        <div className="relative flex items-center min-w-0" ref={profileRef}>

          <button
            onClick={toggleProfile}
            className="
              flex
              items-center
              gap-1.5
              sm:gap-2
              min-w-0
            "
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={showProfile}
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
                items-center
                justify-center
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
                sm:inline-block
                font-semibold
                dark:text-white
                truncate
                max-w-[7rem]
                md:max-w-[10rem]
                leading-none
              "
            >
              {user?.fullName || "User"}
            </span>

            <ChevronDown
              size={18}
              className="hidden sm:block flex-shrink-0"
            />
          </button>

          {/* PROFILE MENU */}

          {showProfile && (
            <div
              className="
                fixed
                sm:absolute
                left-2
                right-2
                sm:left-auto
                sm:right-0
                top-16
                sm:top-auto
                sm:mt-3
                sm:w-60
                min-w-0
                sm:max-w-[calc(100vw-1.5rem)]
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-xl
                overflow-hidden
                z-[9999]
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

              {/* SETTINGS */}

              <Link
                to="/settings"
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
