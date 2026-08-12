import UserLayout from "../layouts/UserLayout";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  VenusAndMars,
  Leaf,
  Trophy,
  Activity,
  Pencil,
  Save,
  X
} from "lucide-react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    age: user?.age || "",
    gender: user?.gender || ""
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(profile)
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const updatedUser = await response.json();

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setEdit(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Header */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold">
              {profile.fullName
                ? profile.fullName.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="text-center md:text-left">

              <h1 className="text-3xl font-bold text-gray-800">
                {profile.fullName || "User"}
              </h1>

              <p className="text-gray-500 mt-1">
                Eco Enthusiast 🌱
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Manage your personal information and sustainability journey.
              </p>

            </div>

          </div>

        </div>

        {/* Stats Section */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <Leaf className="text-green-600" />
              <h3 className="font-semibold">
                Total CO₂ Saved
              </h3>
            </div>

            <p className="text-3xl font-bold mt-4 text-green-600">
              128.5 kg
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-500" />
              <h3 className="font-semibold">
                Eco Points
              </h3>
            </div>

            <p className="text-3xl font-bold mt-4 text-yellow-500">
              2450
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-600" />
              <h3 className="font-semibold">
                Activities
              </h3>
            </div>

            <p className="text-3xl font-bold mt-4 text-blue-600">
              52
            </p>
          </div>

        </div>

        {/* Profile Details */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex justify-between items-center mb-6">

  <h2 className="text-2xl font-bold">
    Personal Information
  </h2>

  {!edit ? (
    <button
      onClick={() => setEdit(true)}
      className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition"
    >
      <Pencil size={20} className="text-blue-600" />
    </button>
  ) : (
    <div className="flex gap-3">

      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        <Save size={18} />
        Save
      </button>

      <button
        onClick={() => setEdit(false)}
        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        <X size={18} />
        Cancel
      </button>

    </div>
  )}

</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <User size={18} />
                Full Name
              </label>

              {edit ? (
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg"
                />
              ) : (
                <p>{profile.fullName}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <Mail size={18} />
                Email
              </label>

              {edit ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg"
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <Phone size={18} />
                Phone Number
              </label>

              {edit ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg"
                />
              ) : (
                <p>{profile.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <Calendar size={18} />
                Age
              </label>

              {edit ? (
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg"
                />
              ) : (
                <p>{profile.age}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <VenusAndMars size={18} />
                Gender
              </label>

              {edit ? (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{profile.gender}</p>
              )}
            </div>

          </div>

          

        </div>

      </div>
    </UserLayout>
  );
}

export default Profile;