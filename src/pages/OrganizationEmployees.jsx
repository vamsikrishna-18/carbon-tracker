import { useEffect, useState } from "react";

import OrganizationLayout from "../layouts/OrganizationLayout";

import {
  Users,
  UserCheck,
  Search,
  RefreshCw,
  Activity,
  Plus,
  X,
  Mail,
  User,
} from "lucide-react";

import {
  getOrganizationEmployees,
  createOrganizationEmployee,
} from "../services/organizationService";

function OrganizationEmployees() {
  // =====================================================
  // STATE
  // =====================================================

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ADD EMPLOYEE
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [addingEmployee, setAddingEmployee] = useState(false);

  const [employeeForm, setEmployeeForm] = useState({
    fullName: "",
    email: "",
  });

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // LOAD EMPLOYEES
  // =====================================================

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrganizationEmployees();

      console.log(
        "Organization Employees:",
        response.data
      );

      setEmployees(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(
        "Organization Employees Error:",
        err
      );

      setError(
        "Unable to load organization employees."
      );

      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadEmployees();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };

  // =====================================================
  // OPEN ADD EMPLOYEE
  // =====================================================

  const openAddEmployee = () => {
    setEmployeeForm({
      fullName: "",
      email: "",
    });

    setFormError("");
    setSuccessMessage("");
    setShowAddEmployee(true);
  };

  // =====================================================
  // CLOSE ADD EMPLOYEE
  // =====================================================

  const closeAddEmployee = () => {
    if (addingEmployee) return;

    setShowAddEmployee(false);

    setEmployeeForm({
      fullName: "",
      email: "",
    });

    setFormError("");
  };

  // =====================================================
  // CREATE EMPLOYEE
  // =====================================================

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    setFormError("");
    setSuccessMessage("");

    const fullName = employeeForm.fullName.trim();
    const email = employeeForm.email.trim();

    // VALIDATION
    if (!fullName) {
      setFormError("Please enter employee name.");
      return;
    }

    if (!email) {
      setFormError("Please enter employee email.");
      return;
    }

    // SIMPLE EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFormError(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setAddingEmployee(true);

      const response =
        await createOrganizationEmployee({
          fullName,
          email,
        });

      console.log(
        "Employee Created:",
        response.data
      );

      setSuccessMessage(
        "Employee created successfully. Login credentials have been sent to their email."
      );

      setEmployeeForm({
        fullName: "",
        email: "",
      });

      // REFRESH EMPLOYEES
      await loadEmployees();

      // CLOSE MODAL AFTER SUCCESS
      setTimeout(() => {
        setShowAddEmployee(false);
        setSuccessMessage("");
      }, 1800);
    } catch (err) {
      console.error(
        "Create Employee Error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        "Unable to create employee.";

      setFormError(message);
    } finally {
      setAddingEmployee(false);
    }
  };

  // =====================================================
  // FILTER EMPLOYEES
  // =====================================================

  const filteredEmployees = employees.filter(
    (employee) => {
      const searchText = `
        ${employee.fullName || ""}
        ${employee.email || ""}
        ${employee.role || ""}
      `.toLowerCase();

      return searchText.includes(
        search.toLowerCase()
      );
    }
  );

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalEmployees =
    employees.length;

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status === "Active" ||
        employee.active === true
    ).length;

  const totalActivities =
    employees.reduce(
      (sum, employee) =>
        sum +
        Number(
          employee.activityCount || 0
        ),
      0
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <OrganizationLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
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
              Loading employees...
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
        {/* HEADER */}
        {/* ================================================= */}

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
                Employees
              </h1>

              <p
                className="
                  mt-2
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Manage and monitor your
                organization's employees.
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* REFRESH */}

              <button
                type="button"
                onClick={loadEmployees}
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-700
                  bg-white
                  dark:bg-gray-800
                  text-gray-700
                  dark:text-gray-200
                  font-semibold
                  hover:bg-gray-50
                  dark:hover:bg-gray-700
                  transition
                  disabled:opacity-50
                "
              >
                <RefreshCw
                  size={18}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>

              {/* ADD EMPLOYEE */}

              <button
                type="button"
                onClick={openAddEmployee}
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
                <Plus size={18} />

                Add Employee
              </button>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================================= */}

        {successMessage && (
          <div
            className="
              mb-6
              p-4
              rounded-xl
              bg-green-50
              dark:bg-green-950/40
              border
              border-green-200
              dark:border-green-900
              text-green-700
              dark:text-green-400
            "
          >
            {successMessage}
          </div>
        )}

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

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
            mb-8
          "
        >
          <SummaryCard
            title="Total Employees"
            value={totalEmployees}
            icon={<Users size={25} />}
          />

          <SummaryCard
            title="Active Employees"
            value={activeEmployees}
            icon={<UserCheck size={25} />}
          />

          <SummaryCard
            title="Total Activities"
            value={totalActivities}
            icon={<Activity size={25} />}
          />
        </div>

        {/* ================================================= */}
        {/* SEARCH */}
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
              placeholder="Search employees..."
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

        {/* ================================================= */}
        {/* EMPLOYEE TABLE */}
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
            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full">

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
                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    Employee
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    Role
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    Activities
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map(
                  (employee) => {
                    const activityCount =
                      Number(
                        employee.activityCount || 0
                      );

                    const isActive =
                      employee.status ===
                        "Active" ||
                      employee.active === true ||
                      activityCount > 0;

                    return (
                      <tr
                        key={employee.id}
                        className="
                          border-t
                          border-gray-100
                          dark:border-gray-700
                          hover:bg-gray-50
                          dark:hover:bg-gray-900/30
                        "
                      >
                        {/* EMPLOYEE */}

                        <td className="px-6 py-4">
                          <div
                            className="
                              font-semibold
                              text-gray-900
                              dark:text-white
                            "
                          >
                            {employee.fullName ||
                              "Unknown User"}
                          </div>

                          <div
                            className="
                              text-sm
                              text-gray-500
                              dark:text-gray-400
                            "
                          >
                            {employee.email ||
                              "No email"}
                          </div>
                        </td>

                        {/* ROLE */}

                        <td
                          className="
                            px-6
                            py-4
                            text-gray-600
                            dark:text-gray-300
                          "
                        >
                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              bg-blue-100
                              text-blue-700
                              dark:bg-blue-900/40
                              dark:text-blue-400
                            "
                          >
                            {employee.role ||
                              "USER"}
                          </span>
                        </td>

                        {/* ACTIVITIES */}

                        <td
                          className="
                            px-6
                            py-4
                            font-semibold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {activityCount}
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">
                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold

                              ${
                                isActive
                                  ? `
                                    bg-green-100
                                    text-green-700
                                    dark:bg-green-900/40
                                    dark:text-green-400
                                  `
                                  : `
                                    bg-gray-100
                                    text-gray-600
                                    dark:bg-gray-700
                                    dark:text-gray-300
                                  `
                              }
                            `}
                          >
                            {isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}

          {filteredEmployees.length === 0 && (
            <div
              className="
                p-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
            >
              <Users
                size={42}
                className="mx-auto mb-3 opacity-40"
              />

              <p>
                {employees.length === 0
                  ? "No employees found in the organization."
                  : "No employees match your search."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* ADD EMPLOYEE MODAL */}
      {/* ================================================= */}

      {showAddEmployee && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            p-4
            bg-black/50
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget &&
              !addingEmployee
            ) {
              closeAddEmployee();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-lg
              bg-white
              dark:bg-gray-800
              rounded-2xl
              shadow-2xl
              border
              border-gray-200
              dark:border-gray-700
              overflow-hidden
            "
          >
            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                px-6
                py-5
                border-b
                border-gray-200
                dark:border-gray-700
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Add Employee
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Create an employee account and
                  send login credentials by email.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddEmployee}
                disabled={addingEmployee}
                className="
                  p-2
                  rounded-lg
                  text-gray-400
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                  hover:text-gray-700
                  dark:hover:text-gray-200
                  transition
                  disabled:opacity-50
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleAddEmployee}
              className="p-6"
            >

              {/* ERROR */}

              {formError && (
                <div
                  className="
                    mb-5
                    p-3
                    rounded-xl
                    bg-red-50
                    dark:bg-red-950/40
                    border
                    border-red-200
                    dark:border-red-900
                    text-sm
                    text-red-700
                    dark:text-red-400
                  "
                >
                  {formError}
                </div>
              )}

              {/* SUCCESS */}

              {successMessage && (
                <div
                  className="
                    mb-5
                    p-3
                    rounded-xl
                    bg-green-50
                    dark:bg-green-950/40
                    border
                    border-green-200
                    dark:border-green-900
                    text-sm
                    text-green-700
                    dark:text-green-400
                  "
                >
                  {successMessage}
                </div>
              )}

              {/* FULL NAME */}

              <div className="mb-5">
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Employee Name
                </label>

                <div className="relative">
                  <User
                    size={19}
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
                    name="fullName"
                    value={employeeForm.fullName}
                    onChange={handleFormChange}
                    placeholder="Enter employee name"
                    disabled={addingEmployee}
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
                      placeholder-gray-400
                      outline-none
                      focus:ring-2
                      focus:ring-green-500
                      disabled:opacity-50
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="mb-6">
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Registered Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={employeeForm.email}
                    onChange={handleFormChange}
                    placeholder="employee@example.com"
                    disabled={addingEmployee}
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
                      placeholder-gray-400
                      outline-none
                      focus:ring-2
                      focus:ring-green-500
                      disabled:opacity-50
                    "
                  />
                </div>
              </div>

              {/* INFO */}

              <div
                className="
                  mb-6
                  p-4
                  rounded-xl
                  bg-green-50
                  dark:bg-green-950/30
                  border
                  border-green-200
                  dark:border-green-900
                "
              >
                <p
                  className="
                    text-sm
                    text-green-700
                    dark:text-green-400
                  "
                >
                  A default password will be
                  generated for this employee and
                  their login credentials will be
                  sent to the registered email.
                </p>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeAddEmployee}
                  disabled={addingEmployee}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    text-gray-700
                    dark:text-gray-200
                    font-semibold
                    hover:bg-gray-50
                    dark:hover:bg-gray-700
                    transition
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addingEmployee}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-green-600
                    text-white
                    font-semibold
                    hover:bg-green-700
                    transition
                    disabled:opacity-50
                  "
                >
                  {addingEmployee ? (
                    <>
                      <RefreshCw
                        size={18}
                        className="animate-spin"
                      />

                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />

                      Create Employee
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </OrganizationLayout>
  );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
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
      <div className="flex items-center justify-between">
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

export default OrganizationEmployees;

