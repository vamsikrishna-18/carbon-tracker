import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getUserBadges } from "../services/badgeService";

function Rewards() {

  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      getUserBadges(user.id)
        .then((res) => {
          setBadges(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">My Rewards</h1>

      {badges.length === 0 ? (
        <p>No badges earned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="border rounded-lg shadow-md p-5 bg-white"
            >
              <div className="text-5xl mb-3">{badge.icon}</div>

              <h2 className="text-xl font-bold">{badge.name}</h2>

              <p className="text-gray-600">{badge.description}</p>

              <p className="text-green-600 mt-3">
                Earned: {badge.earnedDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default Rewards;
