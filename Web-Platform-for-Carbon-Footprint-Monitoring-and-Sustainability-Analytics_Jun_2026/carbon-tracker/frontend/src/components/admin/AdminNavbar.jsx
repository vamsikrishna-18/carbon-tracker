function AdminNavbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="bg-white shadow-sm h-20 px-10 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-green-700">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500">
          Carbon Tracker Administration
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <h3 className="font-bold">
            {user?.fullName}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.role}
          </p>

        </div>

        <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-xl">
          {user?.fullName?.charAt(0)}
        </div>

      </div>

    </div>

  );

}

export default AdminNavbar;