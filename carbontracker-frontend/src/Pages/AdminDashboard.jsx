import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

function AdminDashboard() {

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Card
          title="Total Users"
          value="245"
          icon="👨‍💼"
        />

        <Card
          title="Total Activities"
          value="1280"
          icon="📈"
        />

        <Card
          title="Carbon Saved"
          value="5400 kg"
          icon="🌱"
        />

      </div>

    </MainLayout>

  );

}

export default AdminDashboard;