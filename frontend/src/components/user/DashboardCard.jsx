function DashboardCard({ title, value, icon }) {
  return (
    <div
      className="
        flex
        justify-between
        items-center
        gap-3
        sm:gap-4
        p-3
        sm:p-4
        md:p-5
        lg:p-6
        rounded-lg
        sm:rounded-xl
        shadow-md
        hover:shadow-lg
        border
        bg-white
        dark:bg-gray-800
        border-gray-200
        dark:border-gray-700
        text-gray-900
        dark:text-white
        transition-all
        duration-300
        hover:border-green-400
        dark:hover:border-green-500
      "
    >

      {/* Text */}

      <div className="flex-1 min-w-0">

        <h3
          className="
            text-xs
            sm:text-sm
            md:text-base
            text-gray-500
            dark:text-gray-400
            font-medium
            truncate
          "
        >
          {title}
        </h3>


        <h2
          className="
            text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
            font-bold
            mt-1
            sm:mt-2
            text-gray-900
            dark:text-white
            truncate
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
          text-2xl
          sm:text-3xl
          md:text-4xl
          flex-shrink-0
        "
      >
        {icon}
      </div>

    </div>
  );
}

export default DashboardCard;