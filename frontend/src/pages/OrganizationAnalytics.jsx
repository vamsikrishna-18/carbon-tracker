import { useEffect, useState } from "react";
import OrganizationLayout from "../layouts/OrganizationLayout";

import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Leaf,
  RefreshCw,
} from "lucide-react";

import {
  getOrganizationAnalytics,
} from "../services/organizationService";


function OrganizationAnalytics() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ============================================================
  // LOAD ANALYTICS
  // ============================================================

  const loadAnalytics = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getOrganizationAnalytics();

      console.log(
        "Organization analytics:",
        response.data
      );

      setAnalytics(response.data);

    } catch (err) {

      console.error(
        "Failed to load analytics:",
        err
      );

      setError(
        "Failed to load analytics."
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    loadAnalytics();

  }, []);


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <OrganizationLayout>

        <div className="p-10 text-center text-gray-500">

          Loading analytics...

        </div>

      </OrganizationLayout>
    );
  }


  // ============================================================
  // ERROR
  // ============================================================

  if (error) {

    return (
      <OrganizationLayout>

        <div className="p-10 text-center text-red-500">

          {error}

        </div>

      </OrganizationLayout>
    );
  }


  // ============================================================
  // SUMMARY
  // ============================================================

  const totalEmission =
    Number(
      analytics?.totalEmission ?? 0
    );


  const activeMembers =
    Number(
      analytics?.activeMembers ?? 0
    );


  const totalMembers =
    Number(
      analytics?.totalMembers ?? 0
    );


  const carbonScore =
    Number(
      analytics?.carbonScore ?? 0
    );


  const monthlyReduction =
    Number(
      analytics?.monthlyReduction ?? 0
    );


  // ============================================================
  // MONTHLY DATA
  // ============================================================

  const monthlyData =
    Array.isArray(
      analytics?.monthlyData
    )
      ? analytics.monthlyData
      : [];


  // ============================================================
  // MAXIMUM EMISSION
  // ============================================================

  const maxEmission =
    monthlyData.length > 0
      ? Math.max(
          ...monthlyData.map(
            item =>
              Number(
                item?.emission ?? 0
              )
          ),
          1
        )
      : 1;


  return (
    <OrganizationLayout>

      <div className="w-full max-w-[1600px] mx-auto">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >

            <div>

              <h1
                className="
                  text-3xl
                  md:text-4xl
                  font-extrabold
                  text-gray-900
                  dark:text-white
                "
              >
                Analytics & Reports
              </h1>


              <p
                className="
                  mt-2
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Analyze your organization's carbon
                footprint and sustainability performance.
              </p>

            </div>


            <button
              onClick={loadAnalytics}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-green-600
                text-white
                font-semibold
                hover:bg-green-700
                transition
              "
            >

              <RefreshCw size={18} />

              Refresh

            </button>

          </div>

        </div>


        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-8
          "
        >

          <Metric
            title="Total Emission"
            value={`${totalEmission.toFixed(2)} kg`}
            icon={<Leaf size={25} />}
          />


          <Metric
            title="Monthly Reduction"
            value={`${monthlyReduction.toFixed(1)}%`}
            icon={<TrendingDown size={25} />}
          />


          <Metric
            title="Active Members"
            value={
              totalMembers > 0
                ? `${(
                    (activeMembers /
                      totalMembers) *
                    100
                  ).toFixed(1)}%`
                : "0%"
            }
            icon={<TrendingUp size={25} />}
          />


          <Metric
            title="Carbon Score"
            value={`${carbonScore.toFixed(1)} / 100`}
            icon={<BarChart3 size={25} />}
          />

        </div>


        {/* =====================================================
            EMISSION OVERVIEW
        ====================================================== */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            border
            border-gray-200
            dark:border-gray-700
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-8
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-green-100
                dark:bg-green-900/40
                text-green-600
                dark:text-green-400
                flex
                items-center
                justify-center
              "
            >

              <BarChart3 size={23} />

            </div>


            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Emission Overview
              </h2>


              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Monthly organization carbon emissions
              </p>

            </div>

          </div>


          {/* ===================================================
              NO DATA
          ==================================================== */}

          {monthlyData.length === 0 ? (

            <div
              className="
                p-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
            >

              <BarChart3
                size={42}
                className="
                  mx-auto
                  mb-3
                  opacity-40
                "
              />

              <p className="font-medium">
                No emission trend data available.
              </p>

              <p className="text-sm mt-1">
                Add employee activities to generate
                the emission overview.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {monthlyData.map(
                (item, index) => {

                  const emission =
                    Number(
                      item?.emission ?? 0
                    );


                  const percentage =
                    maxEmission > 0
                      ? (
                          emission /
                          maxEmission
                        ) * 100
                      : 0;


                  return (
                    <div
                      key={
                        item?.month ??
                        index
                      }
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          mb-2
                        "
                      >

                        <span
                          className="
                            font-semibold
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          {item?.month ??
                            "Unknown"}
                        </span>


                        <span
                          className="
                            font-bold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {emission.toFixed(2)} kg
                        </span>

                      </div>


                      <div
                        className="
                          h-4
                          bg-gray-100
                          dark:bg-gray-700
                          rounded-full
                          overflow-hidden
                        "
                      >

                        <div
                          className="
                            h-full
                            bg-green-600
                            rounded-full
                            transition-all
                            duration-500
                          "
                          style={{
                            width:
                              `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>


        {/* =====================================================
            CATEGORY EMISSION
        ====================================================== */}

        {analytics?.categoryEmission &&
          Object.keys(
            analytics.categoryEmission
          ).length > 0 && (

            <div
              className="
                mt-8
                bg-white
                dark:bg-gray-800
                border
                border-gray-200
                dark:border-gray-700
                rounded-2xl
                shadow-lg
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-6
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-green-100
                    dark:bg-green-900/40
                    text-green-600
                    dark:text-green-400
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Leaf size={23} />

                </div>


                <div>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Emissions by Category
                  </h2>


                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Organization emission breakdown
                  </p>

                </div>

              </div>


              <div className="space-y-5">

                {Object.entries(
                  analytics.categoryEmission
                ).map(
                  ([category, emission]) => {

                    const value =
                      Number(
                        emission ?? 0
                      );


                    const percentage =
                      totalEmission > 0
                        ? (
                            value /
                            totalEmission
                          ) * 100
                        : 0;


                    return (
                      <div
                        key={category}
                      >

                        <div
                          className="
                            flex
                            justify-between
                            mb-2
                          "
                        >

                          <span
                            className="
                              font-medium
                              text-gray-700
                              dark:text-gray-300
                            "
                          >
                            {category}
                          </span>


                          <span
                            className="
                              font-semibold
                              text-gray-900
                              dark:text-white
                            "
                          >
                            {value.toFixed(2)} kg
                          </span>

                        </div>


                        <div
                          className="
                            h-3
                            bg-gray-100
                            dark:bg-gray-700
                            rounded-full
                            overflow-hidden
                          "
                        >

                          <div
                            className="
                              h-full
                              bg-green-500
                              rounded-full
                            "
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          )}

      </div>

    </OrganizationLayout>
  );
}


// ============================================================
// METRIC CARD
// ============================================================

function Metric({
  title,
  value,
  icon,
}) {

  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        border
        border-gray-200
        dark:border-gray-700
        rounded-2xl
        shadow-lg
        p-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            {title}
          </p>


          <h2
            className="
              text-2xl
              font-extrabold
              mt-2
              text-gray-900
              dark:text-white
            "
          >
            {value}
          </h2>

        </div>


        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-green-100
            dark:bg-green-900/40
            text-green-600
            dark:text-green-400
            flex
            items-center
            justify-center
          "
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


export default OrganizationAnalytics;