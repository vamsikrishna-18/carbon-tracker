import { useEffect, useState } from "react";
import OrganizationLayout from "../layouts/OrganizationLayout";
import {
  ClipboardList,
  Search,
  Leaf,
  Activity,
  RefreshCw,
} from "lucide-react";

import { getOrganizationActivities } from "../services/organizationService";

function OrganizationActivities() {
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrganizationActivities();

      console.log("Organization activities:", response.data);

      const data = response.data;

      // Backend may return either an array
      // or { activities: [...] }
      if (Array.isArray(data)) {
        setActivities(data);
      } else if (Array.isArray(data.activities)) {
        setActivities(data.activities);
      } else {
        setActivities([]);
      }
    } catch (err) {
      console.error("Failed to load activities:", err);
      setError("Failed to load organization activities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const filteredActivities = activities.filter((item) => {
    const employeeName =
      item.employeeName ||
      item.userName ||
      item.fullName ||
      `User ${item.userId || ""}`;

    const category = item.category || "";
    const activity = item.activityType || item.activity || "";

    return `${employeeName} ${category} ${activity}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const totalEmission = activities.reduce(
    (sum, item) => sum + Number(item.emission || 0),
    0
  );

  const participatingEmployees = new Set(
    activities
      .map((item) => item.userId)
      .filter((id) => id !== null && id !== undefined)
  ).size;

  return (
    <OrganizationLayout>
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Activity Management
              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Monitor carbon-producing activities recorded by employees.
              </p>
            </div>

            <button
              onClick={loadActivities}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-green-600
                text-white
                font-semibold
                hover:bg-green-700
                transition
              "
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <StatCard
            title="Total Activities"
            value={activities.length}
            icon={<ClipboardList size={25} />}
          />

          <StatCard
            title="Total Emissions"
            value={`${totalEmission.toFixed(2)} kg`}
            icon={<Leaf size={25} />}
          />

          <StatCard
            title="Employees Participating"
            value={participatingEmployees}
            icon={<Activity size={25} />}
          />

        </div>

        {/* SEARCH */}
        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            border
            border-gray-200
            dark:border-gray-700
            p-5
            mb-6
          "
        >
          <div className="relative max-w-md">

            <Search
              size={20}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-900
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />

          </div>
        </div>

        {/* TABLE */}
        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            border
            border-gray-200
            dark:border-gray-700
            overflow-hidden
          "
        >
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading activities...
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No activities found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Employee
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Activity
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Emission
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredActivities.map((item) => {

                    const employeeName =
                      item.employeeName ||
                      item.userName ||
                      item.fullName ||
                      `User ${item.userId || ""}`;

                    const activityName =
                      item.activityType ||
                      item.activity ||
                      "-";

                    return (
                      <tr
                        key={item.id}
                        className="
                          border-t
                          border-gray-100
                          dark:border-gray-700
                        "
                      >

                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {employeeName}
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {item.category || "-"}
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {activityName}
                        </td>

                        <td className="px-6 py-4 font-semibold text-green-600">
                          {Number(item.emission || 0).toFixed(2)} kg
                        </td>

                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                          {item.activityDate || "-"}
                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}
        </div>

      </div>
    </OrganizationLayout>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        border
        border-gray-200
        dark:border-gray-700
        rounded-2xl
        shadow-lg
        p-6
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="text-3xl font-extrabold mt-2 text-gray-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-green-100
            dark:bg-green-900/40
            text-green-600
            flex
            items-center
            justify-center
          "
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default OrganizationActivities;