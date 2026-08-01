function UserNavbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold text-green-700">
          Dashboard
        </h1>
      </div>

      <div className="font-semibold text-gray-700">
        Welcome, {user?.fullName} 👋
      </div>

    </div>
  );
}

export default UserNavbar;