import { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import CategoryTabs from "../components/activity/CategoryTabs";
import ActivityDropdown from "../components/activity/ActivityDropdown";
import QuantityInput from "../components/activity/QuantityInput";
import QuickLogCarousel from "../components/activity/QuickLogCarousel";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddActivity() {
  const navigate = useNavigate();

  // ============================================================
  // GET LOGGED-IN USER SAFELY
  // ============================================================

  const getLoggedInUser = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser || !parsedUser.id) {
        return null;
      }

      return parsedUser;
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null;
    }
  };

  const user = getLoggedInUser();

  // ============================================================
  // ACTIVITY OPTIONS
  // ============================================================

  const activityOptions = {
    Transportation: [
      "Car",
      "Bike",
      "Bus",
      "Train",
      "Flight",
      "Walking",
    ],

    Energy: [
      "Electricity",
      "LPG",
      "Generator",
    ],

    Food: [
      "Vegetarian",
      "Non Vegetarian",
      "Dairy",
    ],

    Water: [
      "Water Usage",
    ],

    Waste: [
      "Plastic",
      "Paper",
      "Organic",
    ],

    Other: [
      "Gardening",
      "Tree Plantation",
      "Shopping",
      "Office Work",
      "Home Cleaning",
      "Pet Care",
      "Miscellaneous",
    ],
  };

  // ============================================================
  // UNITS
  // ============================================================

  const units = {
    Car: "km",
    Bike: "km",
    Bus: "km",
    Train: "km",
    Flight: "km",
    Walking: "km",

    Electricity: "kWh",
    LPG: "kg",
    Generator: "hours",

    Vegetarian: "meals",
    "Non Vegetarian": "meals",
    Dairy: "servings",

    "Water Usage": "liters",

    Plastic: "kg",
    Paper: "kg",
    Organic: "kg",

    Gardening: "hours",
    "Tree Plantation": "trees",
    Shopping: "items",
    "Office Work": "hours",
    "Home Cleaning": "hours",
    "Pet Care": "hours",
    Miscellaneous: "units",
  };

  // ============================================================
  // EMISSION FACTORS
  // ============================================================

  const factors = {
    Car: 0.21,
    Bike: 0.05,
    Bus: 0.10,
    Train: 0.06,
    Flight: 0.40,
    Walking: 0,

    Electricity: 0.82,
    LPG: 2.98,
    Generator: 1.50,

    Vegetarian: 0.15,
    "Non Vegetarian": 0.50,
    Dairy: 0.30,

    "Water Usage": 0.001,

    Plastic: 0.50,
    Paper: 0.20,
    Organic: 0.05,

    Gardening: 0.03,
    "Tree Plantation": -0.50,
    Shopping: 0.25,
    "Office Work": 0.08,
    "Home Cleaning": 0.05,
    "Pet Care": 0.04,
    Miscellaneous: 0.10,
  };

  // ============================================================
  // FORM STATE
  // ============================================================

  const [form, setForm] = useState({
    category: "",
    activityType: "",
    quantity: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [saving, setSaving] = useState(false);

  // ============================================================
  // CALCULATE EMISSION
  // ============================================================

  const quantityNumber = Number(form.quantity);

  const emission =
    form.quantity &&
    form.activityType &&
    !Number.isNaN(quantityNumber)
      ? (
          quantityNumber *
          (factors[form.activityType] ?? 0.1)
        ).toFixed(2)
      : "0.00";

  // ============================================================
  // ECO POINTS
  // ============================================================

  const ecoPoints = Math.max(
    0,
    Math.floor(100 - Number(emission))
  );

  // ============================================================
  // QUICK LOG
  // ============================================================

  const handleQuickLog = (item) => {
    if (!item) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      category: item.category || "",
      activityType: item.activity || "",
      quantity:
        item.quantity !== undefined
          ? String(item.quantity)
          : "",
    }));
  };

  // ============================================================
  // CATEGORY CHANGE
  // ============================================================

  const handleCategoryChange = (category) => {
    setForm((previous) => ({
      ...previous,
      category,
      activityType: "",
      quantity: "",
    }));
  };

  // ============================================================
  // ACTIVITY CHANGE
  // ============================================================

  const handleActivityChange = (activity) => {
    setForm((previous) => ({
      ...previous,
      activityType: activity,
      quantity: "",
    }));
  };

  // ============================================================
  // QUANTITY CHANGE
  // ============================================================

  const handleQuantityChange = (quantity) => {
    setForm((previous) => ({
      ...previous,
      quantity,
    }));
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ----------------------------------------------------------
    // USER VALIDATION
    // ----------------------------------------------------------

    const currentUser = getLoggedInUser();

    if (!currentUser) {
      toast.error("Your session has expired. Please login again.");

      localStorage.removeItem("user");
      localStorage.removeItem("admin");

      navigate("/login", {
        replace: true,
      });

      return;
    }

    // ----------------------------------------------------------
    // CATEGORY VALIDATION
    // ----------------------------------------------------------

    if (!form.category) {
      toast.error("Please select a category.");
      return;
    }

    // ----------------------------------------------------------
    // ACTIVITY VALIDATION
    // ----------------------------------------------------------

    if (!form.activityType) {
      toast.error("Please select an activity.");
      return;
    }

    // ----------------------------------------------------------
    // QUANTITY VALIDATION
    // ----------------------------------------------------------

    if (
      form.quantity === "" ||
      form.quantity === null ||
      form.quantity === undefined
    ) {
      toast.error("Please enter a quantity.");
      return;
    }

    const quantity = Number(form.quantity);

    if (Number.isNaN(quantity)) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    if (quantity < 0) {
      toast.error("Quantity cannot be negative.");
      return;
    }

    // ----------------------------------------------------------
    // DATE VALIDATION
    // ----------------------------------------------------------

    if (!form.date) {
      toast.error("Please select an activity date.");
      return;
    }

    // ----------------------------------------------------------
    // START SAVING
    // ----------------------------------------------------------

    setSaving(true);

    try {
      const payload = {
        userId: currentUser.id,
        category: form.category,
        activityType: form.activityType,
        quantity: quantity,
        unit: units[form.activityType] || "-",
        notes: form.notes.trim(),
        activityDate: form.date,
      };

      console.log("=================================");
      console.log("ADDING ACTIVITY");
      console.log("=================================");
      console.log("User ID:", currentUser.id);
      console.log("Payload:", payload);

      const response = await axios.post(
        `${API_BASE_URL}/api/activity/add`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Activity response:", response.data);

      toast.success(
        `Activity Saved! +${ecoPoints} Eco Points`
      );

      // --------------------------------------------------------
      // RESET FORM
      // --------------------------------------------------------

      setForm({
        category: "",
        activityType: "",
        quantity: "",
        notes: "",
        date: new Date().toISOString().split("T")[0],
      });

      // --------------------------------------------------------
      // GO TO DASHBOARD
      // --------------------------------------------------------

      navigate("/dashboard");

    } catch (error) {
      console.error("=================================");
      console.error("ADD ACTIVITY ERROR");
      console.error("=================================");
      console.error(error);

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      let message = "Failed to save activity.";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (
        typeof error.response?.data === "string"
      ) {
        message = error.response.data;
      } else if (
        error.code === "ERR_NETWORK"
      ) {
        message =
          "Unable to connect to the server. Please make sure the backend is running.";
      } else if (
        error.response?.status === 400
      ) {
        message =
          "Invalid activity information. Please check your inputs.";
      } else if (
        error.response?.status === 401
      ) {
        message =
          "Your session has expired. Please login again.";
      } else if (
        error.response?.status === 404
      ) {
        message =
          "Activity service was not found.";
      } else if (
        error.response?.status >= 500
      ) {
        message =
          "Server error while saving activity.";
      }

      toast.error(message);

    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <UserLayout>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 shadow-xl">

        <h1 className="text-4xl font-bold">
          🌿 Add Sustainability Activity
        </h1>

        <p className="mt-2 text-green-100">
          Track your daily activities and understand your
          carbon footprint.
        </p>

      </div>

      {/* ======================================================
          MAIN GRID
      ====================================================== */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ====================================================
            LEFT SECTION
        ==================================================== */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

          {/* QUICK LOG */}

          <QuickLogCarousel
            onSelect={handleQuickLog}
          />

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ==================================================
                CATEGORY
            ================================================== */}

            <CategoryTabs
              selectedCategory={form.category}
              onCategoryChange={handleCategoryChange}
            />

            {/* ==================================================
                ACTIVITY
            ================================================== */}

            <ActivityDropdown
              category={form.category}
              activityType={form.activityType}
              activityOptions={activityOptions}
              onActivityChange={handleActivityChange}
            />

            {/* ==================================================
                QUANTITY
            ================================================== */}

            <QuantityInput
              quantity={form.quantity}
              unit={
                units[form.activityType] || "-"
              }
              onQuantityChange={handleQuantityChange}
            />

            {/* ==================================================
                DATE
            ================================================== */}

            <div>

              <label
                htmlFor="activity-date"
                className="font-semibold text-gray-700"
              >
                Activity Date
              </label>

              <input
                id="activity-date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((previous) => ({
                    ...previous,
                    date: e.target.value,
                  }))
                }
                disabled={saving}
                className="
                  w-full
                  mt-2
                  border
                  rounded-xl
                  p-3
                  shadow-sm
                  focus:ring-2
                  focus:ring-green-500
                  focus:border-green-500
                  disabled:opacity-60
                "
              />

            </div>

            {/* ==================================================
                NOTES
            ================================================== */}

            <div>

              <label
                htmlFor="activity-notes"
                className="font-semibold text-gray-700"
              >
                Notes
              </label>

              <textarea
                id="activity-notes"
                rows="4"
                value={form.notes}
                placeholder="Optional notes..."
                disabled={saving}
                onChange={(e) =>
                  setForm((previous) => ({
                    ...previous,
                    notes: e.target.value,
                  }))
                }
                className="
                  w-full
                  mt-2
                  border
                  rounded-xl
                  p-3
                  shadow-sm
                  focus:ring-2
                  focus:ring-green-500
                  focus:border-green-500
                  disabled:opacity-60
                "
              />

            </div>

            {/* ==================================================
                SAVE BUTTON
            ================================================== */}

            <button
              type="submit"
              disabled={saving}
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                transition-all
                duration-300
                text-white
                font-semibold
                py-4
                rounded-xl
                shadow-lg
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >

              {saving ? (
                <span className="flex items-center justify-center gap-3">

                  <span
                    className="
                      w-5
                      h-5
                      border-2
                      border-white
                      border-t-transparent
                      rounded-full
                      animate-spin
                    "
                  />

                  Saving Activity...

                </span>
              ) : (
                "Save Activity"
              )}

            </button>

          </form>

        </div>

        {/* ====================================================
            RIGHT SECTION
        ==================================================== */}

        <div className="space-y-6">

          {/* ==================================================
              EMISSION CARD
          ================================================== */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold text-green-700 mb-6">
              🌍 Emission Preview
            </h2>

            <div className="space-y-6">

              {/* EMISSION */}

              <div className="bg-red-50 rounded-2xl p-5">

                <p className="text-gray-500">
                  Estimated CO₂ Emission
                </p>

                <h2 className="text-4xl font-bold text-red-500 mt-2">
                  {emission} kg
                </h2>

              </div>

              {/* ECO POINTS */}

              <div className="bg-green-50 rounded-2xl p-5">

                <p className="text-gray-500">
                  Eco Points Earned
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-2">
                  +{ecoPoints}
                </h2>

              </div>

              {/* CARBON IMPACT */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    Carbon Impact
                  </span>

                  <span>
                    {Math.min(
                      Number(emission) * 5,
                      100
                    ).toFixed(0)}
                    %
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">

                  <div
                    className="
                      bg-gradient-to-r
                      from-green-500
                      to-red-500
                      h-4
                      rounded-full
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${Math.min(
                        Number(emission) * 5,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              SUSTAINABILITY TIP
          ================================================== */}

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl shadow-xl p-6">

            <h3 className="text-xl font-bold mb-3">
              💡 Sustainability Tip
            </h3>

            <p className="leading-7 text-green-50">

              {form.category === "Transportation" &&
                "Walking, cycling or using public transport can significantly reduce your carbon footprint."}

              {form.category === "Energy" &&
                "Turn off unused appliances and switch to LED lighting to save electricity."}

              {form.category === "Food" &&
                "Choosing more plant-based meals can lower your food-related emissions."}

              {form.category === "Water" &&
                "Conserving water helps reduce the energy required for treatment and distribution."}

              {form.category === "Waste" &&
                "Reduce, reuse and recycle to minimize waste sent to landfills."}

              {form.category === "Other" &&
                "Every small sustainable action contributes to a greener future."}

              {!form.category &&
                "Select a category to receive personalized sustainability tips."}

            </p>

          </div>

        </div>

      </div>

    </UserLayout>
  );
}

export default AddActivity;