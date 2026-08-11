import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { getUserBadges } from "../services/badgeService";

function UserRewards() {

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
    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Rewards
      </h1>


      {badges.length === 0 ? (

        <div className="text-gray-500 text-lg">
          No badges earned yet. Keep reducing your carbon footprint 🌱
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {badges.map((badge) => (

            <div
              key={badge.id}
              className="rounded-xl shadow-lg p-6 bg-white border hover:scale-105 transition"
            >

              <div className="text-6xl mb-4 text-center">
                {badge.icon}
              </div>


              <h2 className="text-xl font-bold text-center">
                {badge.name}
              </h2>


              <p className="text-gray-600 text-center mt-2">
                {badge.description}
              </p>


              <p className="text-green-600 mt-4 text-center font-semibold">
                Earned: {badge.earnedDate}
              </p>

            </div>

          ))}

        </div>

      )}

    </UserLayout>
  );
}

export default UserRewards;