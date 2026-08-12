import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/adminService";

import {
  Plus,
  Edit,
  Trash2,
  X,
  Megaphone,
  RefreshCw,
} from "lucide-react";

import toast from "react-hot-toast";


function Announcements() {

  const [announcements, setAnnouncements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");


  // =====================================================
  // LOAD ANNOUNCEMENTS
  // =====================================================

  const loadAnnouncements = async () => {

    try {

      setLoading(true);

      const response =
        await getAnnouncements();

      setAnnouncements(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Error loading announcements:",
        error
      );

      toast.error(
        "Failed to load announcements"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadAnnouncements();

  }, []);


  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {

    setTitle("");
    setMessage("");
    setEditingId(null);
    setShowForm(false);

  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!title.trim()) {

      toast.error(
        "Please enter announcement title"
      );

      return;
    }


    if (!message.trim()) {

      toast.error(
        "Please enter announcement message"
      );

      return;
    }


    try {

      const data = {
        title: title.trim(),
        message: message.trim(),
      };


      if (editingId) {

        await updateAnnouncement(
          editingId,
          data
        );

        toast.success(
          "Announcement updated successfully"
        );

      } else {

        await createAnnouncement(data);

        toast.success(
          "Announcement published successfully"
        );

      }


      resetForm();

      loadAnnouncements();

    } catch (error) {

      console.error(
        "Announcement error:",
        error
      );

      toast.error(
        "Failed to save announcement"
      );

    }
  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (announcement) => {

    setEditingId(
      announcement.id
    );

    setTitle(
      announcement.title
    );

    setMessage(
      announcement.message
    );

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this announcement?"
      );


    if (!confirmed) {
      return;
    }


    try {

      await deleteAnnouncement(id);

      toast.success(
        "Announcement deleted"
      );

      loadAnnouncements();

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      toast.error(
        "Failed to delete announcement"
      );

    }
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  return (

    <AdminLayout>

      <div className="space-y-6">


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Announcements
            </h1>

            <p className="text-gray-500 mt-1">
              Create and manage announcements
              for Carbon Tracker users.
            </p>

          </div>


          <div className="flex gap-3">

            <button
              onClick={loadAnnouncements}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            >

              <RefreshCw size={18} />

              Refresh

            </button>


            <button
              onClick={() => {

                if (showForm) {
                  resetForm();
                } else {
                  setShowForm(true);
                }

              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
            >

              {showForm ? (
                <>
                  <X size={18} />
                  Cancel
                </>
              ) : (
                <>
                  <Plus size={18} />
                  New Announcement
                </>
              )}

            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        {showForm && (

          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="p-3 bg-green-100 rounded-lg">

                <Megaphone
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  {editingId
                    ? "Edit Announcement"
                    : "Create Announcement"}
                </h2>

                <p className="text-gray-500 text-sm">
                  Share important updates
                  with your users.
                </p>

              </div>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="block font-medium mb-2">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter announcement title"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* MESSAGE */}

              <div>

                <label className="block font-medium mb-2">
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Write your announcement..."
                  rows={5}
                  className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* BUTTON */}

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  {editingId
                    ? "Update Announcement"
                    : "Publish Announcement"}
                </button>

              </div>

            </form>

          </div>

        )}


        {/* ================================================= */}
        {/* ANNOUNCEMENTS */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                Published Announcements
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {announcements.length} announcement
                {announcements.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

          </div>


          {/* LOADING */}

          {loading ? (

            <div className="py-16 text-center">

              <RefreshCw
                size={35}
                className="animate-spin mx-auto text-green-600"
              />

              <p className="mt-3 text-gray-500">
                Loading announcements...
              </p>

            </div>

          ) : announcements.length === 0 ? (

            /* EMPTY */

            <div className="py-16 text-center">

              <Megaphone
                size={50}
                className="mx-auto text-gray-300"
              />

              <h3 className="text-lg font-semibold mt-4">
                No announcements yet
              </h3>

              <p className="text-gray-500 mt-1">
                Create your first announcement
                for users.
              </p>

            </div>

          ) : (

            /* LIST */

            <div className="space-y-4">

              {announcements.map(
                (announcement) => (

                  <div
                    key={announcement.id}
                    className="border rounded-xl p-5 hover:shadow-md transition"
                  >

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                      <div className="flex gap-4">

                        <div className="p-3 bg-green-100 rounded-lg h-fit">

                          <Megaphone
                            size={22}
                            className="text-green-600"
                          />

                        </div>


                        <div>

                          <h3 className="text-xl font-semibold text-gray-800">
                            {announcement.title}
                          </h3>

                          <p className="text-gray-500 text-sm mt-1">
                            {formatDate(
                              announcement.createdAt
                            )}
                          </p>

                          <p className="text-gray-700 mt-3 whitespace-pre-line">
                            {announcement.message}
                          </p>

                        </div>

                      </div>


                      {/* ACTIONS */}

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(
                              announcement
                            )
                          }
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >

                          <Edit size={19} />

                        </button>


                        <button
                          onClick={() =>
                            handleDelete(
                              announcement.id
                            )
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >

                          <Trash2 size={19} />

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </AdminLayout>

  );
}

export default Announcements;