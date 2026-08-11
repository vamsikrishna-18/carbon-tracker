import { useEffect, useState } from "react";
import OrganizationLayout from "../layouts/OrganizationLayout";

import {
  Search,
  RefreshCw,
} from "lucide-react";

import {
  getOrganizationEmissionFactors,
} from "../services/organizationService";


function OrganizationEmissionFactors() {

  const [search, setSearch] = useState("");
  const [factors, setFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ============================================================
  // LOAD EMISSION FACTORS
  // ============================================================

  const loadFactors = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getOrganizationEmissionFactors();

      console.log(
        "Organization emission factors:",
        response.data
      );


      const data =
        response.data;


      if (Array.isArray(data)) {

        setFactors(data);

      } else if (
        Array.isArray(data?.factors)
      ) {

        setFactors(data.factors);

      } else if (
        Array.isArray(
          data?.emissionFactors
        )
      ) {

        setFactors(
          data.emissionFactors
        );

      } else {

        setFactors([]);

      }

    } catch (err) {

      console.error(
        "Failed to load emission factors:",
        err
      );

      setError(
        "Failed to load emission factors."
      );

    } finally {

      setLoading(false);
    }
  };


  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {

    loadFactors();

  }, []);


  // ============================================================
  // SEARCH
  // ============================================================

  const filteredFactors =
    factors.filter((item) =>
      `${item?.category ?? ""}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


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
                Emission Factors
              </h1>


              <p
                className="
                  mt-2
                  text-gray-500
                  dark:text-gray-400
                "
              >
                View the emission factors used
                for carbon calculations.
              </p>

            </div>


            <button
              onClick={loadFactors}
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
            ERROR
        ====================================================== */}

        {error && (

          <div
            className="
              mb-6
              p-4
              rounded-xl
              bg-red-100
              text-red-700
              dark:bg-red-900/30
              dark:text-red-300
            "
          >
            {error}
          </div>

        )}


        {/* =====================================================
            SEARCH
        ====================================================== */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            border
            border-gray-200
            dark:border-gray-700
            p-5
            mb-6
          "
        >

          <div className="relative max-w-md">

            <Search
              size={20}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />


            <input
              type="text"
              placeholder="Search by category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-900
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />

          </div>

        </div>


        {/* =====================================================
            TABLE
        ====================================================== */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            border
            border-gray-200
            dark:border-gray-700
            overflow-hidden
          "
        >

          {loading ? (

            <div
              className="
                p-10
                text-center
                text-gray-500
              "
            >
              Loading emission factors...
            </div>

          ) : filteredFactors.length === 0 ? (

            <div
              className="
                p-10
                text-center
                text-gray-500
              "
            >
              No emission factors found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                {/* =================================================
                    HEADER
                ================================================== */}

                <thead
                  className="
                    bg-gray-50
                    dark:bg-gray-900/50
                  "
                >

                  <tr>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-sm
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Category
                    </th>


                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-sm
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Emission Factor
                    </th>


                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-sm
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Unit
                    </th>

                  </tr>

                </thead>


                {/* =================================================
                    BODY
                ================================================== */}

                <tbody>

                  {filteredFactors.map(
                    (item, index) => {

                      const factor =
                        item?.factor ??
                        item?.emissionFactor ??
                        item?.value ??
                        0;


                      const unit =
                        item?.unit ??
                        item?.factorUnit ??
                        item?.emissionUnit ??
                        "-";


                      return (

                        <tr
                          key={
                            item?.id ??
                            index
                          }
                          className="
                            border-t
                            border-gray-100
                            dark:border-gray-700
                            hover:bg-gray-50
                            dark:hover:bg-gray-700/30
                            transition
                          "
                        >

                          {/* CATEGORY */}

                          <td
                            className="
                              px-6
                              py-5
                              font-semibold
                              text-gray-900
                              dark:text-white
                            "
                          >
                            {item?.category ??
                              "-"}
                          </td>


                          {/* EMISSION FACTOR */}

                          <td
                            className="
                              px-6
                              py-5
                              font-bold
                              text-green-600
                              dark:text-green-400
                            "
                          >
                            {Number(
                              factor
                            ).toFixed(2)}
                          </td>


                          {/* UNIT */}

                          <td
                            className="
                              px-6
                              py-5
                              text-gray-600
                              dark:text-gray-300
                            "
                          >
                            {unit}
                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </OrganizationLayout>
  );
}


export default OrganizationEmissionFactors;