import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    capacity: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      await API.post("/events", data);
      setMessage("🎉 Event created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const now = new Date().toISOString().slice(0, 16);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create New Event
        </h2>

        {message && (
          <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-3">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Event Title"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            rows="3"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            type="datetime-local"
            name="dateTime"
            min={now}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            min="1"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Event Image (optional)
            </label>

            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                id="eventImage"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <label
                htmlFor="eventImage"
                className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg
                 bg-blue-100 text-blue-700 font-medium
                 hover:bg-blue-200 transition"
              >
                Choose Image
              </label>

              {image && (
                <span className="text-sm text-gray-500 truncate max-w-xs">
                  {image.name}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition
    ${
      loading
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Creating Event...</span>
              </div>
            ) : (
              "Create Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
