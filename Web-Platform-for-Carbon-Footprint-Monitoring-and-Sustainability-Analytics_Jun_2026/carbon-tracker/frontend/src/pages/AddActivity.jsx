import { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function AddActivity() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const activityOptions = {
    Transportation: [
      "Car",
      "Bike",
      "Bus",
      "Train",
      "Flight",
      "Walking"
    ],

    Energy: [
      "Electricity",
      "LPG",
      "Generator"
    ],

    Food: [
      "Vegetarian",
      "Non Vegetarian",
      "Dairy"
    ],

    Water: [
      "Water Usage"
    ],

    Waste: [
      "Plastic",
      "Paper",
      "Organic"
    ],

    Other: [
      "Custom"
    ]
  };

  const units = {
    Car: "km",
    Bike: "km",
    Bus: "km",
    Train: "km",
    Flight: "km",

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

    Custom: ""
  };

  const factors = {
    Car: 0.21,
    Bike: 0.05,
    Bus: 0.10,
    Train: 0.06,
    Flight: 0.40,

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

    Custom: 0.10
  };

  const [form, setForm] = useState({
    category: "",
    activityType: "",
    quantity: "",
    notes: "",
    date: new Date().toISOString().split("T")[0]
  });

  const emission =
    form.quantity && form.activityType
      ? (
          Number(form.quantity) *
          (factors[form.activityType] || 0)
        ).toFixed(2)
      : 0;

  const ecoPoints = Math.max(
    0,
    Math.floor(100 - emission)
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
  "http://localhost:8080/api/activity/add",
  {
    userId: user.id,
    category: form.category,
    activityType: form.activityType,
    quantity: Number(form.quantity),
    unit: units[form.activityType],
    notes: form.notes,
    activityDate: form.date
  }
);

      toast.success(
        `Activity Saved! +${ecoPoints} Eco Points`
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      toast.error("Failed to save activity");

    }
  };

  return (
    <UserLayout>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Form */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-green-700 mb-6">
            Add Activity
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Category */}

            <div>

              <label className="font-semibold">
                Category
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                    activityType: ""
                  })
                }
              >

                <option value="">
                  Select Category
                </option>

                {Object.keys(activityOptions).map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* Activity */}

            <div>

              <label className="font-semibold">
                Activity
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={form.activityType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    activityType: e.target.value
                  })
                }
              >

                <option value="">
                  Select Activity
                </option>

                {form.category &&
                  activityOptions[
                    form.category
                  ].map((activity) => (
                    <option
                      key={activity}
                      value={activity}
                    >
                      {activity}
                    </option>
                  ))}

              </select>

            </div>

            {/* Quantity */}

            <div>

              <label className="font-semibold">
                Quantity
              </label>

              <div className="flex gap-3 mt-2">

                <input
                  type="number"
                  className="w-full border rounded-lg p-3"
                  placeholder="Enter quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantity: e.target.value
                    })
                  }
                />

                <div className="bg-green-100 px-4 flex items-center rounded-lg">

                  {units[
                    form.activityType
                  ] || "-"}

                </div>

              </div>

            </div>

            {/* Date */}

            <div>

              <label className="font-semibold">
                Date
              </label>

              <input
                type="date"
                className="w-full border rounded-lg p-3 mt-2"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value
                  })
                }
              />

            </div>

            {/* Notes */}

            <div>

              <label className="font-semibold">
                Notes
              </label>

              <textarea
                rows="4"
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Optional notes..."
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value
                  })
                }
              />

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              Save Activity
            </button>

          </form>

        </div>

        {/* Preview Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Emission Preview
          </h2>

          <div className="space-y-6">

            <div>

              <p className="text-gray-500">
                Estimated Emission
              </p>

              <h3 className="text-4xl font-bold text-red-500">
                {emission} kg CO₂
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Eco Points
              </p>

              <h3 className="text-4xl font-bold text-green-600">
                +{ecoPoints}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Carbon Impact
              </p>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{
                    width: `${Math.min(
                      emission * 5,
                      100
                    )}%`
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </UserLayout>
  );
}

export default AddActivity;