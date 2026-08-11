import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  VenusAndMars,
} from "lucide-react";
import axios from "axios";

function AdminProfile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminProfile = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("user")
        );

        if (!storedUser?.id) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/user/profile/${storedUser.id}`
        );

        const updatedUser = response.data;

        setUser(updatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
      } catch (error) {
        console.error(
          "Failed to load admin profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAdminProfile();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500 dark:text-gray-400">
            Loading profile...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1
            className="
              text-3xl
              md:text-4xl
              font-extrabold
              text-gray-900
              dark:text-white
            "
          >
            My Profile
          </h1>

          <p
            className="
              mt-2
              text-gray-500
              dark:text-gray-400
            "
          >
            View and manage your administrator account.
          </p>

        </div>

        {/* PROFILE CARD */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            border
            border-gray-200
            dark:border-gray-700
            rounded-2xl
            shadow-lg
            overflow-hidden
          "
        >

          {/* PROFILE HEADER */}

          <div
            className="
              p-8
              border-b
              border-gray-200
              dark:border-gray-700
            "
          >

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-6
              "
            >

              {/* AVATAR */}

              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-green-100
                  dark:bg-green-900/40
                  flex
                  items-center
                  justify-center
                "
              >

                <User
                  size={42}
                  className="
                    text-green-600
                    dark:text-green-400
                  "
                />

              </div>

              {/* NAME */}

              <div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.fullName || "Administrator"}
                </h2>

                <p
                  className="
                    text-gray-500
                    dark:text-gray-400
                    mt-1
                  "
                >
                  {user?.email || "No email available"}
                </p>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-3
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-red-100
                    text-red-700
                    dark:bg-red-900/40
                    dark:text-red-400
                  "
                >
                  <Shield size={14} />
                  {user?.role || "ADMIN"}
                </span>

              </div>

            </div>

          </div>

          {/* ACCOUNT INFORMATION */}

          <div className="p-8">

            <h3
              className="
                text-xl
                font-bold
                text-gray-900
                dark:text-white
                mb-6
              "
            >
              Account Information
            </h3>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              {/* FULL NAME */}

              <div
                className="
                  p-5
                  rounded-xl
                  bg-gray-50
                  dark:bg-gray-700
                "
              >

                <div className="flex items-center gap-3 mb-2">

                  <User
                    size={20}
                    className="
                      text-green-600
                      dark:text-green-400
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Full Name
                  </p>

                </div>

                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.fullName || "Not available"}
                </p>

              </div>

              {/* EMAIL */}

              <div
                className="
                  p-5
                  rounded-xl
                  bg-gray-50
                  dark:bg-gray-700
                "
              >

                <div className="flex items-center gap-3 mb-2">

                  <Mail
                    size={20}
                    className="
                      text-green-600
                      dark:text-green-400
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Email
                  </p>

                </div>

                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                    break-all
                  "
                >
                  {user?.email || "Not available"}
                </p>

              </div>

              {/* PHONE */}

              <div
                className="
                  p-5
                  rounded-xl
                  bg-gray-50
                  dark:bg-gray-700
                "
              >

                <div className="flex items-center gap-3 mb-2">

                  <Phone
                    size={20}
                    className="
                      text-green-600
                      dark:text-green-400
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Phone Number
                  </p>

                </div>

                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.phoneNumber || "Not available"}
                </p>

              </div>

              {/* ROLE */}

              <div
                className="
                  p-5
                  rounded-xl
                  bg-gray-50
                  dark:bg-gray-700
                "
              >

                <div className="flex items-center gap-3 mb-2">

                  <Shield
                    size={20}
                    className="
                      text-green-600
                      dark:text-green-400
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Account Role
                  </p>

                </div>

                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.role || "ADMIN"}
                </p>

              </div>

              {/* AGE */}

              <div
                className="
                  p-5
                  rounded-xl
                  bg-gray-50
                  dark:bg-gray-700
                "
              >

                <div className="flex items-center gap-3 mb-2">

                  <Calendar
                    size={20}
                    className="
                      text-green-600
                      dark:text-green-400
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Age
                  </p>

                </div>

                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.age !== null &&
                  user?.age !== undefined
                    ? user.age
                    : "Not available"}
                </p>

              </div>

              {/* GENDER */}

              <div
                className="
                  p-5
                  rounded-xl
                  bg-gray-50
                  dark:bg-gray-700
                "
              >

                <div className="flex items-center gap-3 mb-2">

                  <VenusAndMars
                    size={20}
                    className="
                      text-green-600
                      dark:text-green-400
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Gender
                  </p>

                </div>

                <p
                  className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user?.gender || "Not available"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminProfile;

