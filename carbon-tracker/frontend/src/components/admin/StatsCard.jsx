function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <p className="text-gray-500 font-semibold">
        {title}
      </p>

      <h1 className="text-5xl font-bold text-green-700 mt-4">
        {value}
      </h1>

    </div>
  );
}

export default StatsCard;