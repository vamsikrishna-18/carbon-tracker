import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import { getAllActivities } from "../services/adminService";

function AdminActivityMonitor() {

  const [activities, setActivities] =
    useState([]);
    const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

  useEffect(() => {

    getAllActivities()
      .then((res) => {

        setActivities(res.data);

      })
      .catch(console.error);

  }, []);
 const filteredActivities = activities.filter((activity) => {

  const activityDate = new Date(activity.createdAt);

  const from = fromDate
    ? new Date(fromDate)
    : null;

  const to = toDate
    ? new Date(toDate + "T23:59:59")
    : null;

  const matchesSearch =
    activity.activityType
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" ||
    activity.category === category;

  const matchesDate =
    (!from || activityDate >= from) &&
    (!to || activityDate <= to);

  return (
    matchesSearch &&
    matchesCategory &&
    matchesDate
  );

});
  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Activity Monitoring
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="bg-white rounded-xl shadow-lg p-5 mb-6">

  <div className="flex flex-col lg:flex-row gap-4">

    <div className="flex items-center border rounded-lg px-3 flex-1">

      <Search size={18} />

      <input
        type="text"
        placeholder="Search Activity..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-2 outline-none"
      />

    </div>

    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
      className="border rounded-lg p-2"
    >

      <option>All</option>
      <option>Transportation</option>
      <option>Energy</option>
      <option>Food</option>
      <option>Water</option>
      <option>Waste</option>

    </select>

    <input
      type="date"
      value={fromDate}
      onChange={(e) =>
        setFromDate(e.target.value)
      }
      className="border rounded-lg p-2"
    />

    <input
      type="date"
      value={toDate}
      onChange={(e) =>
        setToDate(e.target.value)
      }
      className="border rounded-lg p-2"
    />

    <button
      onClick={() => {
        setSearch("");
        setCategory("All");
        setFromDate("");
        setToDate("");
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Clear
    </button>

  </div>

</div>
        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                User
              </th>

              <th className="text-left p-3">
                Activity
              </th>

              <th className="text-left p-3">
                Category
              </th>

              <th className="text-left p-3">
                Emission
              </th>

              <th className="text-left p-3">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

  {filteredActivities.map((activity) => (

    <tr
      key={activity.id}
      className="border-b"
    >

                <td className="p-3 font-medium">

User #{activity.userId}

</td>

                <td className="p-3">
                  {
                    activity.activityType
                  }
                </td>

                <td className="p-3">

{activity.category || "Other"}

</td>

                <td className="p-3 text-red-600">
                  {
                    activity.emission
                  } kg
                </td>

                <td className="p-3">
                  {
                    new Date(
                      activity.createdAt
                    ).toLocaleDateString()
                  }
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}

export default AdminActivityMonitor;