import {
  Car,
  Zap,
  UtensilsCrossed,
  Droplets,
  Trash2,
} from "lucide-react";

const quickLogs = [
  {
    title: "Daily Commute",
    category: "Transportation",
    activity: "Car",
    quantity: 20,
    icon: Car,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Electricity",
    category: "Energy",
    activity: "Electricity",
    quantity: 5,
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Veg Meal",
    category: "Food",
    activity: "Vegetarian",
    quantity: 1,
    icon: UtensilsCrossed,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Water Usage",
    category: "Water",
    activity: "Water Usage",
    quantity: 100,
    icon: Droplets,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Plastic Waste",
    category: "Waste",
    activity: "Plastic",
    quantity: 2,
    icon: Trash2,
    color: "bg-green-100 text-green-600",
  },
];

function QuickLogCarousel({ onSelect }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        ⚡ Quick Log
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {quickLogs.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => onSelect(item)}
              className="min-w-[180px] bg-white rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 text-left"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="font-bold mt-4">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {item.quantity}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickLogCarousel;