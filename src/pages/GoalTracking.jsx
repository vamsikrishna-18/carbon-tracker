import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import {
  createGoal,
  getGoal,
} from "../services/goalService";

import {
  Target,
  CalendarDays,
  TrendingDown,
  Activity,
  CheckCircle,
  AlertCircle,
} from "lucide-react";


function GoalTracking() {

  const [user, setUser] = useState(null);

  const [goal, setGoal] = useState(null);

  const [loading, setLoading] = useState(true);

  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");


  const [form, setForm] = useState({
    targetPercentage: "",
    durationDays: 30,
  });


  // =========================================================
  // LOAD USER
  // =========================================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      setLoading(false);

      return;
    }


    try {

      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);

    } catch (err) {

      console.error(
        "Invalid user data:",
        err
      );

      setError(
        "Unable to read user information."
      );

      setLoading(false);
    }

  }, []);


  // =========================================================
  // LOAD GOAL
  // =========================================================

  useEffect(() => {

    if (!user?.id) {
      return;
    }

    loadGoal();

  }, [user]);


  const loadGoal = () => {

    setLoading(true);

    setError("");


    getGoal(user.id)
      .then((res) => {

        console.log(
          "Goal API Response:",
          res.data
        );


        /*
         * Backend returns:
         *
         * [
         *   {
         *      id: 1,
         *      targetPercentage: 20,
         *      ...
         *   }
         * ]
         */


        const goals =
          Array.isArray(res.data)
            ? res.data
            : [];


        if (goals.length > 0) {

          // Display the latest goal
          setGoal(
            goals[goals.length - 1]
          );

        } else {

          setGoal(null);
        }

      })
      .catch((err) => {

        console.error(
          "Goal Loading Error:",
          err
        );


        setGoal(null);


        if (err.response) {

          setError(
            `Unable to load goals. Server returned ${err.response.status}.`
          );

        } else {

          setError(
            "Unable to connect to the server."
          );
        }

      })
      .finally(() => {

        setLoading(false);

      });
  };


  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // =========================================================
  // CREATE GOAL
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!user?.id) {

      setError(
        "User information not found. Please login again."
      );

      return;
    }


    const target =
      Number(form.targetPercentage);

    const duration =
      Number(form.durationDays);


    if (target <= 0 || target > 100) {

      setError(
        "Target reduction must be between 1% and 100%."
      );

      return;
    }


    if (duration <= 0) {

      setError(
        "Goal duration must be greater than 0 days."
      );

      return;
    }


    /*
     * Backend expects endDate.
     *
     * Calculate it from today's date.
     */

    const endDate =
      new Date();

    endDate.setDate(
      endDate.getDate() + duration
    );


    const formattedEndDate =
      endDate.toISOString().split("T")[0];


    const goalData = {

      userId: user.id,

      targetPercentage: target,

      endDate: formattedEndDate,
    };


    console.log(
      "Creating Goal:",
      goalData
    );


    setCreating(true);

    setError("");


    try {

      const response =
        await createGoal(goalData);


      console.log(
        "Created Goal:",
        response.data
      );


      alert(
        "Goal Created Successfully!"
      );


      setForm({
        targetPercentage: "",
        durationDays: 30,
      });


      await loadGoal();

    } catch (err) {

      console.error(
        "Create Goal Error:",
        err
      );


      if (err.response) {

        setError(
          err.response.data?.message ||
          `Failed to create goal (${err.response.status}).`
        );

      } else {

        setError(
          "Unable to connect to the server."
        );
      }

    } finally {

      setCreating(false);

    }
  };


  // =========================================================
  // STATUS
  // =========================================================

  const getStatusIcon = () => {

    if (!goal?.status) {
      return <Target size={22} />;
    }


    if (
      goal.status === "COMPLETED"
    ) {

      return (
        <CheckCircle size={22} />
      );
    }


    if (
      goal.status === "AT_RISK"
    ) {

      return (
        <AlertCircle size={22} />
      );
    }


    return (
      <TrendingDown size={22} />
    );
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <UserLayout>

        <div className="flex items-center justify-center min-h-[400px]">

          <div className="text-center">

            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4" />

            <p className="text-gray-500">
              Loading your goal...
            </p>

          </div>

        </div>

      </UserLayout>
    );
  }


  // =========================================================
  // NO USER
  // =========================================================

  if (!user) {

    return (
      <UserLayout>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-xl font-bold text-red-600">
            User not found
          </h2>

          <p className="text-gray-600 mt-2">
            Please login again to access Goal Tracking.
          </p>

        </div>

      </UserLayout>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <UserLayout>

      {/* ===================================================
          HEADER
      ==================================================== */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-green-100 rounded-xl">

            <Target
              className="text-green-600"
              size={30}
            />

          </div>


          <div>

            <h1 className="text-3xl font-bold">
              Goal Tracking
            </h1>

            <p className="text-gray-500 mt-1">
              Set a carbon reduction target and track your progress.
            </p>

          </div>

        </div>

      </div>


      {/* ===================================================
          ERROR
      ==================================================== */}

      {error && (

        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

          {error}

        </div>

      )}


      {/* ===================================================
          NO GOAL
      ==================================================== */}

      {!goal && (

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="text-center mb-8">

            <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">

              <Target
                className="text-green-600"
                size={40}
              />

            </div>


            <h2 className="text-2xl font-bold">
              Create Your Carbon Goal
            </h2>


            <p className="text-gray-500 mt-2">
              Set a target to reduce your carbon emissions.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-6"
          >

            {/* TARGET */}

            <div>

              <label className="block mb-2 font-semibold">

                Target Reduction (%)

              </label>


              <input
                type="number"
                name="targetPercentage"
                min="1"
                max="100"
                value={
                  form.targetPercentage
                }
                onChange={handleChange}
                placeholder="Example: 20"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />


              <p className="text-sm text-gray-500 mt-1">
                Example: 20 means you want to reduce your emissions by 20%.
              </p>

            </div>


            {/* DURATION */}

            <div>

              <label className="block mb-2 font-semibold">

                Goal Duration (Days)

              </label>


              <input
                type="number"
                name="durationDays"
                min="1"
                value={
                  form.durationDays
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              disabled={creating}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-xl transition"
            >

              {creating
                ? "Creating Goal..."
                : "Create Goal"}

            </button>

          </form>

        </div>

      )}


      {/* ===================================================
          ACTIVE GOAL
      ==================================================== */}

      {goal && (

        <div className="space-y-6">

          {/* MAIN GOAL CARD */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

              <div>

                <h2 className="text-2xl font-bold">
                  Your Carbon Reduction Goal
                </h2>

                <p className="text-gray-500 mt-1">
                  Keep reducing your emissions to reach your target.
                </p>

              </div>


              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

                {getStatusIcon()}

                {goal.status || "ON_TRACK"}

              </div>

            </div>


            {/* PROGRESS */}

            <div className="mb-8">

              <div className="flex justify-between items-center mb-3">

                <span className="font-semibold">
                  Goal Progress
                </span>


                <span className="text-2xl font-bold text-green-600">

                  {Number(
                    goal.progress || 0
                  ).toFixed(1)}
                  %

                </span>

              </div>


              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        Number(
                          goal.progress || 0
                        )
                      )
                    )}%`,
                  }}
                />

              </div>

            </div>


            {/* DETAILS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* TARGET */}

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-2 text-gray-500 mb-2">

                  <TrendingDown
                    size={20}
                  />

                  <span>
                    Target Reduction
                  </span>

                </div>


                <p className="text-2xl font-bold">

                  {Number(
                    goal.targetPercentage || 0
                  )}
                  %

                </p>

              </div>


              {/* INITIAL */}

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-2 text-gray-500 mb-2">

                  <Activity
                    size={20}
                  />

                  <span>
                    Starting Emission
                  </span>

                </div>


                <p className="text-2xl font-bold">

                  {Number(
                    goal.initialEmission || 0
                  ).toFixed(2)}

                  <span className="text-sm font-normal">
                    {" "}kg CO₂
                  </span>

                </p>

              </div>


              {/* CURRENT */}

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-2 text-gray-500 mb-2">

                  <TrendingDown
                    size={20}
                  />

                  <span>
                    Current Emission
                  </span>

                </div>


                <p className="text-2xl font-bold">

                  {Number(
                    goal.currentEmission || 0
                  ).toFixed(2)}

                  <span className="text-sm font-normal">
                    {" "}kg CO₂
                  </span>

                </p>

              </div>


              {/* END DATE */}

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-2 text-gray-500 mb-2">

                  <CalendarDays
                    size={20}
                  />

                  <span>
                    End Date
                  </span>

                </div>


                <p className="text-xl font-bold">

                  {goal.endDate
                    ? new Date(
                        goal.endDate
                      ).toLocaleDateString()
                    : "Not set"}

                </p>

              </div>

            </div>

          </div>


          {/* INFORMATION CARD */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-xl font-bold mb-3">
              🌱 Keep Going!
            </h3>


            <p className="text-gray-600">

              Continue recording your daily activities.
              Your carbon emissions will be tracked
              against your goal automatically.

            </p>

          </div>

        </div>

      )}

    </UserLayout>
  );
}


export default GoalTracking;