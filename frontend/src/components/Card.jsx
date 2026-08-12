function Card({ title, value, icon }) {
  return (
    <div className="
      bg-white
      dark:bg-gray-800
      shadow-lg
      rounded-lg
      sm:rounded-xl
      p-4
      sm:p-6
      hover:shadow-xl
      transition
      border
      border-gray-100
      dark:border-gray-700
    ">

      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
        {icon}
      </div>

      <h2 className="
        text-base
        sm:text-lg
        font-semibold
        text-gray-900
        dark:text-white
      ">
        {title}
      </h2>

      <p className="
        text-2xl
        sm:text-3xl
        text-green-600
        dark:text-green-400
        font-bold
        mt-1
        sm:mt-2
      ">
        {value}
      </p>

    </div>
  );
}

export default Card;