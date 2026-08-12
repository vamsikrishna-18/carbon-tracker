import { useEffect, useMemo, useState } from "react";

import OrganizationLayout from "../layouts/OrganizationLayout";
import { getOrganizationDashboard } from "../services/organizationService";

import {
  Building2,
  Users,
  UserCheck,
  ClipboardList,
  Leaf,
  BarChart3,
  Trophy,
  Layers3,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function OrganizationDashboard() {
  // =====================================================
  // STATE
  // =====================================================

  const [dashboard, setDashboard] = useState({
    totalMembers: 0,
    activeMembers: 0,
    todaysActivities: 0,
    todaysEmission: 0,
    totalEmission: 0,
    categorySummary: {},
    emissionTrend: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [trendFilter, setTrendFilter] = useState("Daily");

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getOrganizationDashboard();

      console.log("Organization Dashboard:", res.data);

      setDashboard({
        totalMembers: res.data?.totalMembers ?? 0,

        activeMembers: res.data?.activeMembers ?? 0,

        todaysActivities:
          res.data?.todaysActivities ?? 0,

        todaysEmission:
          res.data?.todaysEmission ?? 0,

        totalEmission:
          res.data?.totalEmission ?? 0,

        categorySummary:
          res.data?.categorySummary ?? {},

        emissionTrend:
          res.data?.emissionTrend ?? {},
      });
    } catch (err) {
      console.error(
        "Organization Dashboard Error:",
        err
      );

      setError(
        "Unable to load organization dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadDashboard();
  }, []);

  // =====================================================
  // CATEGORY DATA
  // =====================================================

  const categoryData = useMemo(() => {
    return Object.entries(
      dashboard.categorySummary || {}
    )
      .map(([name, value]) => ({
        name,
        value: Number(value) || 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [dashboard.categorySummary]);

  // =====================================================
  // TREND DATA
  // =====================================================

  const trendData = useMemo(() => {
    return Object.entries(
      dashboard.emissionTrend || {}
    )
      .map(([date, emission]) => ({
        date,
        emission: Number(emission) || 0,
      }))
      .sort((a, b) =>
        a.date.localeCompare(b.date)
      );
  }, [dashboard.emissionTrend]);

  // =====================================================
  // COLORS
  // =====================================================

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f97316",
    "#a855f7",
    "#eab308",
    "#06b6d4",
    "#ef4444",
    "#14b8a6",
  ];

  // =====================================================
  // TOP CATEGORY
  // =====================================================

  const topCategory =
    categoryData.length > 0
      ? categoryData[0].name
      : "N/A";

  // =====================================================
  // ACTIVITY RATE
  // =====================================================

  const activityRate =
    dashboard.totalMembers > 0
      ? (
          (dashboard.activeMembers /
            dashboard.totalMembers) *
          100
        ).toFixed(1)
      : "0.0";

  // =====================================================
  // DARK MODE
  // =====================================================

  const isDarkMode =
    document.documentElement.classList.contains(
      "dark"
    );

  // =====================================================
  // TOOLTIP
  // =====================================================

  const tooltipStyle = {
    backgroundColor: isDarkMode
      ? "#1f2937"
      : "#ffffff",

    border: isDarkMode
      ? "1px solid #374151"
      : "1px solid #e5e7eb",

    borderRadius: "10px",

    color: isDarkMode
      ? "#ffffff"
      : "#111827",
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <OrganizationLayout>
        <div
          className="
            min-h-[70vh]
            flex
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <div
              className="
                animate-spin
                rounded-full
                h-12
                w-12
                border-4
                border-green-200
                border-t-green-600
                mx-auto
              "
            />

            <p
              className="
                mt-4
                text-gray-600
                dark:text-gray-400
              "
            >
              Loading organization dashboard...
            </p>
          </div>
        </div>
      </OrganizationLayout>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <OrganizationLayout>
      <div className="w-full max-w-[1600px] mx-auto">

        {/* ================================================= */}
        {/* HERO / ORGANIZATION OVERVIEW */}
        {/* ================================================= */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[28px]
            p-8
            md:p-10
            mb-8
            shadow-xl
            bg-gradient-to-r
            from-green-600
            via-emerald-600
            to-teal-500
          "
        >
          {/* Decorative circles */}

          <div
            className="
              absolute
              -top-20
              -right-20
              w-64
              h-64
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-24
              right-40
              w-48
              h-48
              rounded-full
              bg-white/10
            "
          />

          <div className="relative z-10">

            {/* Organization badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/15
                border
                border-white/20
                text-white
                text-sm
                font-medium
                backdrop-blur-sm
              "
            >
              <Building2 size={17} />

              <span>
                Organization
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                mt-5
                text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
                text-white
              "
            >
              Organization Overview{" "}
              <span className="inline-block">
                👋
              </span>
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-base
                md:text-lg
                text-green-50
              "
            >
              Monitor your organization's
              members, activities and carbon
              footprint.
            </p>

            {/* Refresh */}

            <button
              onClick={loadDashboard}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-white
                text-green-700
                font-semibold
                shadow-md
                hover:bg-green-50
                transition
              "
            >
              <RefreshCw size={17} />

              Refresh Data
            </button>

          </div>
        </section>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div
            className="
              mb-6
              p-4
              rounded-xl
              bg-red-50
              dark:bg-red-950/40
              border
              border-red-200
              dark:border-red-900
              text-red-700
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-8
          "
        >

          {/* TOTAL MEMBERS */}

          <DashboardCard
            title="Total Members"
            value={dashboard.totalMembers}
            icon={<Users size={30} />}
            iconContainer="
              bg-blue-100
              text-blue-600
              dark:bg-blue-900/40
              dark:text-blue-400
            "
          />

          {/* ACTIVE MEMBERS */}

          <DashboardCard
            title="Active Members"
            value={dashboard.activeMembers}
            icon={<UserCheck size={30} />}
            iconContainer="
              bg-purple-100
              text-purple-600
              dark:bg-purple-900/40
              dark:text-purple-400
            "
          />

          {/* TODAY ACTIVITIES */}

          <DashboardCard
            title="Today's Activities"
            value={dashboard.todaysActivities}
            icon={
              <ClipboardList size={30} />
            }
            iconContainer="
              bg-orange-100
              text-orange-600
              dark:bg-orange-900/40
              dark:text-orange-400
            "
          />

          {/* TODAY CO2 */}

          <DashboardCard
            title="Today's CO₂"
            value={`${Number(
              dashboard.todaysEmission || 0
            ).toFixed(2)} kg`}
            icon={<Leaf size={30} />}
            iconContainer="
              bg-green-100
              text-green-600
              dark:bg-green-900/40
              dark:text-green-400
            "
          />

        </section>

        {/* ================================================= */}
        {/* MAIN ANALYTICS */}
        {/* ================================================= */}

        <section
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >

          {/* ================================================= */}
          {/* ORGANIZATION CARBON EMISSIONS */}
          {/* ================================================= */}

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
                mb-6
              "
            >
              <div
                className="
                  p-2.5
                  rounded-xl
                  bg-green-100
                  dark:bg-green-900/40
                  text-green-600
                  dark:text-green-400
                "
              >
                <BarChart3 size={23} />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    md:text-2xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Organization Carbon
                  Emissions
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                    mt-1
                  "
                >
                  Emissions by activity category
                </p>
              </div>
            </div>

            {categoryData.length > 0 ? (
              <div
                className="
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-4
                  items-center
                "
              >

                {/* DONUT */}

                <div className="h-[330px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>

                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={75}
                        outerRadius={115}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {categoryData.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                COLORS[
                                  index %
                                    COLORS.length
                                ]
                              }
                            />
                          )
                        )}
                      </Pie>

                      <Tooltip
                        contentStyle={
                          tooltipStyle
                        }
                        formatter={(value) => [
                          `${Number(value).toFixed(
                            2
                          )} kg`,
                          "CO₂",
                        ]}
                      />

                    </PieChart>
                  </ResponsiveContainer>

                </div>

                {/* LEGEND */}

                <div className="space-y-3">

                  {categoryData.map(
                    (item, index) => (
                      <div
                        key={item.name}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          px-4
                          py-3
                          rounded-xl
                          bg-gray-50
                          dark:bg-gray-900/50
                          border
                          border-gray-100
                          dark:border-gray-700
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            min-w-0
                          "
                        >
                          <span
                            className="
                              w-3
                              h-3
                              rounded-full
                              flex-shrink-0
                            "
                            style={{
                              backgroundColor:
                                COLORS[
                                  index %
                                    COLORS.length
                                ],
                            }}
                          />

                          <span
                            className="
                              font-semibold
                              text-gray-700
                              dark:text-gray-200
                              truncate
                              uppercase
                            "
                          >
                            {item.name}
                          </span>
                        </div>

                        <span
                          className="
                            font-bold
                            text-gray-900
                            dark:text-white
                            whitespace-nowrap
                          "
                        >
                          {item.value.toFixed(2)}
                          <span
                            className="
                              ml-1
                              text-xs
                              font-medium
                              text-gray-500
                              dark:text-gray-400
                            "
                          >
                            kg
                          </span>
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>
            ) : (
              <EmptyState
                text="No emission category data available."
              />
            )}

          </div>

          {/* ================================================= */}
          {/* EMISSION TREND */}
          {/* ================================================= */}

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
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                mb-6
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      p-2.5
                      rounded-xl
                      bg-blue-100
                      dark:bg-blue-900/40
                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    <TrendingUp
                      size={23}
                    />
                  </div>

                  <h2
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Emission Trend
                  </h2>
                </div>

                <p
                  className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                    mt-2
                  "
                >
                  Daily organization carbon
                  emissions
                </p>

              </div>

              {/* FILTER */}

              <select
                value={trendFilter}
                onChange={(e) =>
                  setTrendFilter(
                    e.target.value
                  )
                }
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-600
                  bg-white
                  dark:bg-gray-800
                  text-gray-800
                  dark:text-gray-200
                  outline-none
                  focus:ring-2
                  focus:ring-green-500
                  cursor-pointer
                "
              >
                <option value="Daily">
                  Daily
                </option>

                <option value="Weekly">
                  Weekly
                </option>

                <option value="Monthly">
                  Monthly
                </option>
              </select>

            </div>

            {trendData.length > 0 ? (
              <div className="h-[330px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={trendData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -10,
                      bottom: 5,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="4 4"
                      stroke={
                        isDarkMode
                          ? "#374151"
                          : "#e5e7eb"
                      }
                    />

                    <XAxis
                      dataKey="date"
                      tick={{
                        fill: isDarkMode
                          ? "#9ca3af"
                          : "#6b7280",
                        fontSize: 12,
                      }}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      tick={{
                        fill: isDarkMode
                          ? "#9ca3af"
                          : "#6b7280",
                        fontSize: 12,
                      }}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      contentStyle={
                        tooltipStyle
                      }
                      formatter={(value) => [
                        `${Number(value).toFixed(
                          2
                        )} kg`,
                        "CO₂",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="emission"
                      stroke="#16a34a"
                      strokeWidth={4}
                      dot={{
                        r: 4,
                        fill: "#16a34a",
                      }}
                      activeDot={{
                        r: 7,
                      }}
                    />

                  </LineChart>
                </ResponsiveContainer>

              </div>
            ) : (
              <EmptyState
                text="No emission trend data available."
              />
            )}

          </div>

        </section>

        {/* ================================================= */}
        {/* ORGANIZATION INSIGHTS */}
        {/* ================================================= */}

        <section
          className="
            mt-6
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
                p-2.5
                rounded-xl
                bg-purple-100
                dark:bg-purple-900/40
                text-purple-600
                dark:text-purple-400
              "
            >
              <Layers3 size={23} />
            </div>

            <div>

              <h2
                className="
                  text-xl
                  md:text-2xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Organization Insights
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                  mt-1
                "
              >
                Key metrics from your
                organization
              </p>

            </div>

          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-5
            "
          >

            {/* ACTIVITY RATE */}

            <InsightCard
              title="Member Activity Rate"
              value={`${activityRate}%`}
              description="Members with logged activities"
              icon={<UserCheck size={22} />}
              className="
                bg-green-50
                dark:bg-green-950/30
                border-green-100
                dark:border-green-900
                text-green-700
                dark:text-green-400
              "
            />

            {/* TOP CATEGORY */}

            <InsightCard
              title="Highest Emission Category"
              value={topCategory}
              description="Category contributing most CO₂"
              icon={<BarChart3 size={22} />}
              className="
                bg-blue-50
                dark:bg-blue-950/30
                border-blue-100
                dark:border-blue-900
                text-blue-700
                dark:text-blue-400
              "
            />

            {/* TOTAL CO2 */}

            <InsightCard
              title="Total Carbon Footprint"
              value={`${Number(
                dashboard.totalEmission || 0
              ).toFixed(2)} kg`}
              description="Total recorded organization emissions"
              icon={<Leaf size={22} />}
              className="
                bg-red-50
                dark:bg-red-950/30
                border-red-100
                dark:border-red-900
                text-red-700
                dark:text-red-400
              "
            />

          </div>

        </section>

        {/* ================================================= */}
        {/* ADDITIONAL QUICK INFORMATION */}
        {/* ================================================= */}

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TOTAL EMISSION */}

          <div
            className="
              rounded-2xl
              p-6
              bg-gradient-to-r
              from-emerald-500
              to-green-600
              text-white
              shadow-lg
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
                    text-green-100
                    text-sm
                    font-medium
                  "
                >
                  Organization Total
                </p>

                <h3
                  className="
                    text-3xl
                    font-bold
                    mt-2
                  "
                >
                  {Number(
                    dashboard.totalEmission || 0
                  ).toFixed(2)} kg
                </h3>

                <p
                  className="
                    mt-2
                    text-green-100
                    text-sm
                  "
                >
                  Total CO₂ emissions recorded
                </p>

              </div>

              <Leaf
                size={48}
                className="opacity-80"
              />

            </div>

          </div>

          {/* ACTIVE MEMBERS */}

          <div
            className="
              rounded-2xl
              p-6
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              text-white
              shadow-lg
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
                    text-blue-100
                    text-sm
                    font-medium
                  "
                >
                  Organization Engagement
                </p>

                <h3
                  className="
                    text-3xl
                    font-bold
                    mt-2
                  "
                >
                  {dashboard.activeMembers}
                  {" "}
                  /{" "}
                  {dashboard.totalMembers}
                </h3>

                <p
                  className="
                    mt-2
                    text-blue-100
                    text-sm
                  "
                >
                  Active members participating
                </p>

              </div>

              <Trophy
                size={48}
                className="opacity-80"
              />

            </div>

          </div>

        </section>

      </div>
    </OrganizationLayout>
  );
}

// =====================================================
// DASHBOARD CARD
// =====================================================

function DashboardCard({
  title,
  value,
  icon,
  iconContainer,
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
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-sm
              font-medium
              text-gray-500
              dark:text-gray-400
            "
          >
            {title}
          </p>

          <h2
            className="
              text-3xl
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
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            flex-shrink-0
            ${iconContainer}
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

// =====================================================
// INSIGHT CARD
// =====================================================

function InsightCard({
  title,
  value,
  description,
  icon,
  className,
}) {
  return (
    <div
      className={`
        p-5
        rounded-2xl
        border
        ${className}
      `}
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-sm
              font-medium
              opacity-70
            "
          >
            {title}
          </p>

          <p
            className="
              text-2xl
              font-extrabold
              mt-2
            "
          >
            {value}
          </p>

          <p
            className="
              text-xs
              mt-2
              opacity-70
            "
          >
            {description}
          </p>

        </div>

        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-white/70
            dark:bg-black/20
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

// =====================================================
// EMPTY STATE
// =====================================================

function EmptyState({ text }) {
  return (
    <div
      className="
        h-[330px]
        flex
        flex-col
        items-center
        justify-center
        text-center
        text-gray-500
        dark:text-gray-400
      "
    >
      <BarChart3
        size={42}
        className="mb-3 opacity-40"
      />

      <p>{text}</p>
    </div>
  );
}

export default OrganizationDashboard;