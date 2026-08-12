function DashboardCard({ title, value, icon }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
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
        min-w-0
        w-full
      "
    >

      {/* Text */}

      <div className="flex-1 min-w-0">

        <h3
          title={typeof title === "string" ? title : undefined}
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
          title={
            typeof value === "string" || typeof value === "number"
              ? String(value)
              : undefined
          }
          className="
            text-lg
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
            font-bold
            mt-1
            sm:mt-2
            text-gray-900
            dark:text-white
            truncate
            leading-tight
          "
        >
          {value}
        </h2>

      </div>


      {/* Icon */}

      <div
        className="
          flex-shrink-0

          flex
          items-center
          justify-center

          w-9
          h-9
          sm:w-10
          sm:h-10
          md:w-12
          md:h-12
          lg:w-14
          lg:h-14

          rounded-full
          sm:rounded-xl

          bg-green-50
          dark:bg-green-900/30

          text-green-600
          dark:text-green-400

          transition-colors
          duration-300

          [&>svg]:w-[55%]
          [&>svg]:h-[55%]
          [&>svg]:stroke-[2.25]
        "
      >
        {icon}
      </div>

    </div>
  );
}

export default DashboardCard;