import { List } from "lucide-react";

function ActivityDropdown({
  category,
  activityType,
  activityOptions,
  onActivityChange,
}) {
  return (
    <div className="mb-6">
      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
        <List size={18} className="text-green-600" />
        Activity Type
      </label>

      <select
        value={activityType}
        disabled={!category}
        onChange={(e) => onActivityChange(e.target.value)}
        className={`
          w-full
          rounded-xl
          border
          p-4
          text-gray-700
          shadow-sm
          transition-all
          duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          focus:border-green-500

          ${
            !category
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:border-green-400"
          }
        `}
      >
        <option value="">
          {category
            ? "Select Activity"
            : "Select Category First"}
        </option>

        {category &&
          activityOptions[category].map((activity) => (
            <option
              key={activity}
              value={activity}
            >
              {activity}
            </option>
          ))}
      </select>
    </div>
  );
}

export default ActivityDropdown;