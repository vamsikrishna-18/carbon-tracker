function DashboardCard({ title, value, icon }) {
  return (
    <div
      className="
        flex justify-between items-center
        p-6
        rounded-xl
        shadow-lg
        border
        bg-white
        dark:bg-gray-800
        border-gray-200
        dark:border-gray-700
        text-gray-900
        dark:text-white
        transition-colors
        duration-300
      "
    >

      {/* Text */}

      <div>

        <h3
          className="
            text-gray-500
            dark:text-gray-400
            font-medium
          "
        >
          {title}
        </h3>


        <h2
          className="
            text-3xl
            font-bold
            mt-2
            text-gray-900
            dark:text-white
          "
        >
          {value}
        </h2>

      </div>


      {/* Icon */}

      <div
        className="
          text-green-600
          dark:text-green-400
          text-4xl
        "
      >
        {icon}
      </div>

    </div>
  );
}

export default DashboardCard;