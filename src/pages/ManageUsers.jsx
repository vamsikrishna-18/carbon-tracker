import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  getUsers,
  makeAdmin,
  removeAdmin,
  deleteUser,
} from "../services/adminService";

function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD USERS
  // =====================================================

  const loadUsers = () => {

    setLoading(true);

    getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Users Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });

  };


  useEffect(() => {
    loadUsers();
  }, []);


  // =====================================================
  // MAKE ADMIN
  // =====================================================

  const handleMakeAdmin = (id) => {

    makeAdmin(id)
      .then(() => {
        loadUsers();
      })
      .catch((err) => {
        console.error("Make Admin Error:", err);
      });

  };


  // =====================================================
  // REMOVE ADMIN
  // =====================================================

  const handleRemoveAdmin = (id) => {

    removeAdmin(id)
      .then(() => {
        loadUsers();
      })
      .catch((err) => {
        console.error("Remove Admin Error:", err);
      });

  };


  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = (id) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    deleteUser(id)
      .then(() => {
        loadUsers();
      })
      .catch((err) => {
        console.error("Delete User Error:", err);
      });

  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredUsers = users.filter((user) => {

    const value = search.toLowerCase();

    return (
      user.fullName?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value)
    );

  });


  // =====================================================
  // UI
  // =====================================================

  return (

    <AdminLayout>

      {/* ================= TITLE ================= */}

      <h1
        className="
          text-3xl
          font-bold
          mb-8
          text-gray-900
          dark:text-white
        "
      >
        Manage Users
      </h1>


      {/* ================= SEARCH ================= */}

      <div className="mb-7">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full

            px-4
            py-3

            rounded-lg

            border
            border-gray-300
            dark:border-gray-600

            bg-white
            dark:bg-gray-800

            text-gray-900
            dark:text-white

            placeholder-gray-400
            dark:placeholder-gray-500

            focus:outline-none
            focus:ring-2
            focus:ring-green-500

            transition
          "
        />

      </div>


      {/* ================= TABLE ================= */}

      <div
        className="
          w-full
          overflow-x-auto

          rounded-xl
          shadow-lg

          border
          border-gray-200
          dark:border-gray-700
        "
      >

        <table
          className="
            w-full
            table-fixed
            border-collapse
          "
        >

          {/* ================= TABLE HEADER ================= */}

          <thead>

            <tr className="bg-green-700 text-white">

              <th
                className="
                  w-[22%]
                  px-5
                  py-5
                  text-left
                  font-semibold
                "
              >
                Name
              </th>


              <th
                className="
                  w-[27%]
                  px-5
                  py-5
                  text-left
                  font-semibold
                "
              >
                Email
              </th>


              <th
                className="
                  w-[16%]
                  px-5
                  py-5
                  text-center
                  font-semibold
                "
              >
                Phone
              </th>


              <th
                className="
                  w-[12%]
                  px-5
                  py-5
                  text-center
                  font-semibold
                "
              >
                Role
              </th>


              <th
                className="
                  w-[23%]
                  px-5
                  py-5
                  text-center
                  font-semibold
                "
              >
                Action
              </th>

            </tr>

          </thead>


          {/* ================= TABLE BODY ================= */}

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="
                    px-5
                    py-10
                    text-center

                    bg-white
                    dark:bg-gray-800

                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Loading users...
                </td>

              </tr>

            ) : filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="
                    px-5
                    py-10
                    text-center

                    bg-white
                    dark:bg-gray-800

                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  No users found.
                </td>

              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="
                    bg-white
                    dark:bg-gray-800

                    border-t
                    border-gray-200
                    dark:border-gray-700

                    hover:bg-gray-50
                    dark:hover:bg-gray-700

                    transition-colors
                  "
                >

                  {/* ================= NAME ================= */}

                  <td
                    className="
                      px-5
                      py-4

                      text-left

                      text-gray-800
                      dark:text-gray-200

                      font-medium

                      truncate
                    "
                  >
                    {user.fullName}
                  </td>


                  {/* ================= EMAIL ================= */}

                  <td
                    className="
                      px-5
                      py-4

                      text-left

                      text-gray-600
                      dark:text-gray-300

                      truncate
                    "
                  >
                    {user.email}
                  </td>


                  {/* ================= PHONE ================= */}

                  <td
                    className="
                      px-5
                      py-4

                      text-center

                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    {user.phone || "—"}
                  </td>


                  {/* ================= ROLE ================= */}

                  <td
                    className="
                      px-5
                      py-4

                      text-center
                    "
                  >

                    <span
                      className={`
                        inline-flex
                        items-center
                        justify-center

                        min-w-[75px]

                        px-3
                        py-1

                        rounded-full

                        text-xs
                        font-bold

                        ${
                          user.role === "ADMIN"
                            ? `
                              bg-yellow-100
                              dark:bg-yellow-900/40

                              text-yellow-700
                              dark:text-yellow-400
                            `
                            : `
                              bg-gray-100
                              dark:bg-gray-700

                              text-gray-700
                              dark:text-gray-300
                            `
                        }
                      `}
                    >
                      {user.role}
                    </span>

                  </td>


                  {/* ================= ACTION ================= */}

                  <td
                    className="
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        whitespace-nowrap
                      "
                    >

                      {/* MAKE / REMOVE ADMIN */}

                      {user.role === "ADMIN" ? (

                        <button
                          onClick={() =>
                            handleRemoveAdmin(user.id)
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center

                            min-w-[120px]

                            px-4
                            py-2

                            rounded-lg

                            bg-yellow-500
                            hover:bg-yellow-600

                            text-white

                            font-medium

                            transition
                          "
                        >
                          Remove Admin
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            handleMakeAdmin(user.id)
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center

                            min-w-[120px]

                            px-4
                            py-2

                            rounded-lg

                            bg-green-600
                            hover:bg-green-700

                            text-white

                            font-medium

                            transition
                          "
                        >
                          Make Admin
                        </button>

                      )}


                      {/* DELETE */}

                      <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center

                          min-w-[82px]

                          px-4
                          py-2

                          rounded-lg

                          bg-red-600
                          hover:bg-red-700

                          text-white

                          font-medium

                          transition
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default ManageUsers;