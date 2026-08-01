import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { getAnalytics } from "../services/activityService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";


function Analytics() {

  const [timeFilter, setTimeFilter] = useState("daily");

  const [trendData, setTrendData] = useState([]);

  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    if (!user) {
      return;
    }


    setLoading(true);


    getAnalytics(user.id, timeFilter)

      .then((res) => {

        console.log(
          "Analytics Response:",
          res.data
        );


        // Line chart data
        setTrendData(
          res.data.trendData || []
        );


        // Pie + Bar chart data
        const categoryArray =
          Object.keys(
            res.data.categoryData || {}
          ).map((key) => ({

            name: key,

            value:
              res.data.categoryData[key]

          }));


        setChartData(categoryArray);


      })


      .catch((error) => {

        console.error(
          "Analytics Error:",
          error
        );

        setTrendData([]);

        setChartData([]);

      })


      .finally(() => {

        setLoading(false);

      });


  }, [timeFilter]);





  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#dc2626",
    "#ca8a04",
    "#9333ea"
  ];





  return (

    <UserLayout>


      <div className="p-6">


        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">


          <h1 className="text-3xl font-bold">

            Analytics Dashboard

          </h1>



          <div className="flex gap-2">


            {
              ["daily","weekly","monthly"]
              .map((item)=>(

                <button

                  key={item}

                  onClick={() =>
                    setTimeFilter(item)
                  }

                  className={

                    `px-4 py-2 rounded-lg capitalize
                    ${
                      timeFilter === item
                      ?
                      "bg-green-600 text-white"
                      :
                      "bg-gray-200"
                    }`

                  }

                >

                  {item}

                </button>


              ))
            }


          </div>


        </div>





        {
          loading ?


          (

            <p className="text-center text-xl">

              Loading Analytics...

            </p>

          )


          :


          (


          <>


          {/* Line Chart */}


          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">


            <h2 className="text-2xl font-bold mb-5">

              Emission Trend

            </h2>




            <div className="h-80">


              <ResponsiveContainer
                width="100%"
                height="100%"
              >


                <LineChart
                  data={trendData}
                >


                  <CartesianGrid
                    strokeDasharray="3 3"
                  />


                  {/* IMPORTANT: backend field is date */}

                  <XAxis
                    dataKey="date"
                  />


                  <YAxis />


                  <Tooltip />


                  <Legend />


                  <Line

                    type="monotone"

                    dataKey="emission"

                    stroke="#16a34a"

                    strokeWidth={3}

                  />


                </LineChart>


              </ResponsiveContainer>


            </div>


          </div>







          {/* Pie and Bar */}


          <div className="grid lg:grid-cols-2 gap-6">





            {/* Pie Chart */}


            <div className="bg-white rounded-xl shadow-lg p-6">


              <h2 className="text-2xl font-bold mb-5">

                Emission Distribution

              </h2>



              <div className="h-80">


                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >


                  <PieChart>


                    <Pie

                      data={chartData}

                      dataKey="value"

                      nameKey="name"

                      outerRadius={110}

                      label

                    >


                      {
                        chartData.map(
                          (entry,index)=>(

                            <Cell

                              key={index}

                              fill={
                                COLORS[
                                  index % COLORS.length
                                ]
                              }

                            />

                          )
                        )
                      }


                    </Pie>



                    <Tooltip />

                    <Legend />


                  </PieChart>


                </ResponsiveContainer>


              </div>


            </div>








            {/* Bar Chart */}



            <div className="bg-white rounded-xl shadow-lg p-6">


              <h2 className="text-2xl font-bold mb-5">

                Emission By Category

              </h2>



              <div className="h-80">


                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >


                  <BarChart
                    data={chartData}
                  >


                    <CartesianGrid
                      strokeDasharray="3 3"
                    />


                    <XAxis
                      dataKey="name"
                    />


                    <YAxis />


                    <Tooltip />


                    <Legend />



                    <Bar

                      dataKey="value"

                      fill="#16a34a"

                    />


                  </BarChart>


                </ResponsiveContainer>


              </div>


            </div>



          </div>


          </>


          )

        }



      </div>


    </UserLayout>

  );

}


export default Analytics;