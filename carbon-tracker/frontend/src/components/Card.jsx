function Card({ title, value, icon }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

      <div className="text-4xl mb-3">
        {icon}
      </div>

      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="text-3xl text-green-600 font-bold mt-2">
        {value}
      </p>

    </div>
  );
}

export default Card;