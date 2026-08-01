import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { createGoal, getGoal } from "../services/goalService";

function GoalTracking() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [goal, setGoal] = useState(null);

  const [form, setForm] = useState({
    targetPercentage: "",
    durationDays: 30
  });

  useEffect(() => {

    if (!user) return;

    loadGoal();

  }, []);

  const loadGoal = () => {

    getGoal(user.id)
      .then((res) => {
        setGoal(res.data);
      })
      .catch(() => {
        setGoal(null);
      });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    createGoal({
      userId: user.id,
      targetPercentage: Number(form.targetPercentage),
      durationDays: Number(form.durationDays)
    }).then(() => {

      alert("Goal Created Successfully");

      loadGoal();

    });

  };

  return (

    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        🎯 Goal Tracking
      </h1>

      {!goal && (

        <div className="bg-white rounded-xl shadow-lg p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div>

              <label className="block mb-2 font-semibold">
                Target Reduction (%)
              </label>

              <input
                type="number"
                value={form.targetPercentage}
                onChange={(e) =>
                  setForm({
                    ...form,
                    targetPercentage: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold">
                Goal Duration (Days)
              </label>

              <input
                type="number"
                value={form.durationDays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    durationDays: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Create Goal
            </button>

          </form>

        </div>

      )}

      {goal && (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Your Goal
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <h3 className="font-semibold">
                Target Reduction
              </h3>

              <p>{goal.targetPercentage}%</p>

            </div>

            <div>

              <h3 className="font-semibold">
                Status
              </h3>

              <p>{goal.status}</p>

            </div>

            <div>

              <h3 className="font-semibold">
                Initial Emission
              </h3>

              <p>{goal.initialEmission} kg CO₂</p>

            </div>

            <div>

              <h3 className="font-semibold">
                Current Emission
              </h3>

              <p>{goal.currentEmission} kg CO₂</p>

            </div>

          </div>

          <div className="mt-8">

            <div className="flex justify-between mb-2">

              <span>Progress</span>

              <span>
                {goal.progress.toFixed(1)}%
              </span>

            </div>

            <div className="w-full h-5 bg-gray-200 rounded-full">

              <div
                className="bg-green-600 h-5 rounded-full"
                style={{
                  width: `${goal.progress}%`
                }}
              />

            </div>

          </div>

        </div>

      )}

    </UserLayout>

  );

}

export default GoalTracking;