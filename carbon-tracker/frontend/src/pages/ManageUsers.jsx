import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error("Unable to fetch users");
    }
  };

  const promote = async (id) => {
    try {
      await makeAdmin(id);
      toast.success("User promoted to Admin");
      loadUsers();
    } catch {
      toast.error("Operation failed");
    }
  };

  const demote = async (id) => {
    try {
      await removeAdmin(id);
      toast.success("Admin removed");
      loadUsers();
    } catch {
      toast.error("Operation failed");
    }
  };

  const remove = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Manage Users
      </h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="border rounded-lg p-3 w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">{user.fullName}</td>

                <td>{user.email}</td>

                <td>{user.phoneNumber}</td>

                <td>

                  {user.role === "ADMIN" ? (

                    <span className="text-red-600 font-bold">
                      ADMIN
                    </span>

                  ) : (

                    <span className="text-green-700 font-bold">
                      USER
                    </span>

                  )}

                </td>

                <td className="space-x-2">

                  {user.role === "USER" ? (

                    <button
                      onClick={() => promote(user.id)}
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      Make Admin
                    </button>

                  ) : (

                    <button
                      onClick={() => demote(user.id)}
                      className="bg-yellow-500 text-white px-3 py-2 rounded"
                    >
                      Remove Admin
                    </button>

                  )}

                  <button
                    onClick={() => remove(user.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default ManageUsers;