import UserLayout from "../layouts/UserLayout";
import DashboardCard from "../components/user/DashboardCard";
import { useEffect, useState } from "react";

import {
  getDashboardData,
  getActivities,
} from "../services/activityService";

import {
  Leaf,
  Trophy,
  Flame,
  Target,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function UserDashboard() {

  const [dashboard, setDashboard] = useState({
    totalEmission: 0,
    totalPoints: 0,
    totalActivities: 0,
    progress: 0,
  });


  const [activities, setActivities] = useState([]);

  const [chartData, setChartData] = useState([]);
const [timeFilter, setTimeFilter] = useState("daily");
const generateChartData = (activities, filter) => {

  const grouped = {};


  activities.forEach((activity)=>{

    const date = new Date(activity.createdAt);

    let key;


    if(filter === "daily"){

      key = date.toLocaleDateString();

    }


    else if(filter === "weekly"){

      const week = Math.ceil(
        date.getDate() / 7
      );

      key = `Week ${week}`;

    }


    else if(filter === "monthly"){

      key = date.toLocaleString(
        "default",
        {
          month:"short"
        }
      );

    }



    if(!grouped[key]){

      grouped[key] = 0;

    }


    grouped[key] += activity.emission;


  });



  return Object.keys(grouped).map((key)=>({

    date:key,

    emission:
      Number(grouped[key].toFixed(2))

  }));

};
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;


    // Dashboard Cards Data

    getDashboardData(user.id)
      .then((res) => {

        setDashboard(res.data);

      })
      .catch((err) => {

        console.error("Dashboard Error:", err);

      });



    // Activities Data

    getActivities(user.id)
      .then((res) => {


        const allActivities = res.data;


        const latestActivities = [...allActivities]
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 5);


        setActivities(latestActivities);



        // Data for Line Graph

       setChartData(
  generateChartData(
    allActivities,
    timeFilter
  )
);


      })
      .catch((err) => {

        console.error("Activities Error:", err);

      });


  }, [timeFilter]);



  return (

    <UserLayout>


      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        <DashboardCard
          title="Total CO₂"
          value={`${dashboard.totalEmission?.toFixed(2)} kg`}
          icon={<Leaf />}
        />


        <DashboardCard
          title="Eco Points"
          value={dashboard.totalPoints}
          icon={<Trophy />}
        />


        <DashboardCard
          title="Activities"
          value={dashboard.totalActivities}
          icon={<Flame />}
        />


        <DashboardCard
          title="Goal Progress"
          value={`${dashboard.progress?.toFixed(0)}%`}
          icon={<Target />}
        />


      </div>




      {/* Carbon Emission Line Graph */}


      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">


        <h2 className="text-2xl font-bold mb-5">
          Carbon Emission Trend
        </h2>
        <div className="flex gap-4 mb-5">

  <button
    onClick={() => setTimeFilter("daily")}
    className={`px-4 py-2 rounded ${
      timeFilter === "daily"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Daily
  </button>


  <button
    onClick={() => setTimeFilter("weekly")}
    className={`px-4 py-2 rounded ${
      timeFilter === "weekly"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Weekly
  </button>


  <button
    onClick={() => setTimeFilter("monthly")}
    className={`px-4 py-2 rounded ${
      timeFilter === "monthly"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Monthly
  </button>

</div>


        {

          chartData.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart data={chartData}>


                <CartesianGrid />


                <XAxis 
                  dataKey="date"
                />


                <YAxis />


                <Tooltip />



                <Line
                  type="monotone"
                  dataKey="emission"
                  stroke="#16a34a"
                  strokeWidth={3}
                />


              </LineChart>


            </ResponsiveContainer>


          ) : (

            <p className="text-gray-500">
              No emission data available.
            </p>

          )

        }


      </div>





      {/* Bottom Section */}


      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">



        {/* Recent Activities */}


        <div className="xl:col-span-2 bg-white rounded-xl shadow-lg p-6">


          <h2 className="text-2xl font-bold mb-5">
            Recent Activities
          </h2>



          {

            activities.length > 0 ? (


              activities.map((activity) => (


                <div
                  key={activity.id}
                  className="flex justify-between items-center border-b py-4"
                >


                  <div>


                    <h3 className="font-semibold">
                      {activity.activityType}
                    </h3>


                    <p className="text-gray-500 text-sm">

                      {
                        new Date(
                          activity.createdAt
                        ).toLocaleDateString()
                      }

                    </p>


                  </div>



                  <span className="font-bold text-green-700">

                    {
                      activity.emission?.toFixed(2)
                    } kg CO₂

                  </span>


                </div>


              ))


            ) : (


              <p className="text-gray-500">
                No activities found.
              </p>


            )

          }


        </div>






        {/* Eco Tips */}


        <div className="bg-white rounded-xl shadow-lg p-6">


          <h2 className="text-2xl font-bold mb-5">
            🌿 Eco Tips
          </h2>



          <ul className="space-y-4 text-gray-600">


            <li>
              ✅ Walk or cycle for short trips.
            </li>


            <li>
              ✅ Turn off unused lights.
            </li>


            <li>
              ✅ Reduce plastic waste.
            </li>


            <li>
              ✅ Save water whenever possible.
            </li>


            <li>
              ✅ Plant a tree this month.
            </li>


          </ul>


        </div>



      </div>



    </UserLayout>

  );

}


export default UserDashboard;