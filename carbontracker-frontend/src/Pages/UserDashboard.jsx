import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

function UserDashboard() {

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        User Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Card
          title="Carbon Emission"
          value="120 kg"
          icon="🌍"
        />

        <Card
          title="Eco Points"
          value="450"
          icon="🏆"
        />

        <Card
          title="Activities"
          value="25"
          icon="🚴"
        />

      </div>

    </MainLayout>

  );

}

export default UserDashboard;