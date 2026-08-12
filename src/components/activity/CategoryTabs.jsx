import {
  Car,
  Zap,
  UtensilsCrossed,
  Droplets,
  Trash2,
  Package,
} from "lucide-react";

const categories = [
  {
    name: "Transportation",
    icon: Car,
    color: "text-blue-500",
  },
  {
    name: "Energy",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    name: "Food",
    icon: UtensilsCrossed,
    color: "text-orange-500",
  },
  {
    name: "Water",
    icon: Droplets,
    color: "text-cyan-500",
  },
  {
    name: "Waste",
    icon: Trash2,
    color: "text-green-500",
  },
  {
    name: "Other",
    icon: Package,
    color: "text-purple-500",
  },
];

function CategoryTabs({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-3">
        Category
      </label>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;

          const active =
            selectedCategory === category.name;

          return (
            <button
              key={category.name}
              type="button"
              onClick={() =>
                onCategoryChange(category.name)
              }
              className={`
                flex flex-col items-center
                justify-center
                gap-2
                rounded-xl
                border
                p-4
                transition-all
                duration-200

                ${
                  active
                    ? "bg-green-600 text-white border-green-600 shadow-lg"
                    : "bg-white hover:bg-green-50 border-gray-300"
                }
              `}
            >
              <Icon size={26} />

              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryTabs;