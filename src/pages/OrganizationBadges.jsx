import { useEffect, useState } from "react";
import OrganizationLayout from "../layouts/OrganizationLayout";
import {
  Award,
  Users,
  Star,
  Trophy,
  RefreshCw,
} from "lucide-react";

import {
  getOrganizationBadges,
} from "../services/organizationService";

function OrganizationBadges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBadges = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getOrganizationBadges();

      console.log(
        "Organization badges:",
        response.data
      );

      const data = response.data;

      if (Array.isArray(data)) {
        setBadges(data);
      } else if (Array.isArray(data.badges)) {
        setBadges(data.badges);
      } else {
        setBadges([]);
      }

    } catch (err) {
      console.error(
        "Failed to load badges:",
        err
      );

      setError("Failed to load badges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const getBadgeIcon = (index) => {
    if (index === 0) {
      return <Star size={28} />;
    }

    if (index === 1) {
      return <Award size={28} />;
    }

    return <Trophy size={28} />;
  };

  return (
    <OrganizationLayout>
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Employee Badges
              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                View sustainability achievements earned by employees.
              </p>

            </div>

            <button
              onClick={loadBadges}
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
              "
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading badges...
          </div>
        ) : badges.length === 0 ? (
          <div
            className="
              bg-white
              dark:bg-gray-800
              border
              border-gray-200
              dark:border-gray-700
              rounded-2xl
              shadow-lg
              p-10
              text-center
              text-gray-500
            "
          >
            No badges available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {badges.map((badge, index) => {

              const name =
                badge.name ||
                badge.badgeName ||
                badge.title ||
                "Badge";

              const description =
                badge.description ||
                badge.badgeDescription ||
                "Sustainability achievement.";

              const holders =
                Number(
                  badge.holders ??
                  badge.holderCount ??
                  badge.employeeCount ??
                  0
                );

              return (
                <div
                  key={badge.id || name || index}
                  className="
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-2xl
                    shadow-lg
                    p-6
                    hover:-translate-y-1
                    transition
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-yellow-100
                      dark:bg-yellow-900/40
                      text-yellow-600
                      dark:text-yellow-400
                      flex
                      items-center
                      justify-center
                      mb-5
                    "
                  >
                    {getBadgeIcon(index)}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {name}
                  </h2>

                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {description}
                  </p>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    <Users size={17} />

                    {holders} employees earned this badge
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </OrganizationLayout>
  );
}

export default OrganizationBadges;