import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Events = () => {
  const [events, setEvents] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Join event
  const joinEvent = async (id) => {
    try {
      await API.post(`/events/${id}/join`);
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to join");
    }
  };

  // Leave event
  const leaveEvent = async (id) => {
    try {
      await API.post(`/events/${id}/leave`);
      fetchEvents();
    } catch (error) {
      alert("Unable to leave");
    }
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      alert("You are not authorized to delete this event");
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Event Platform</h1>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Hi, <strong>{user.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        )}
      </header>

      {/* Create Event Button */}
      {user && (
        <div className="flex justify-center mt-6">
          <Link to="/create">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              + Create Event
            </button>
          </Link>
        </div>
      )}

      {/* Events Grid */}
      <main className="max-w-6xl mx-auto p-6">
        {events.length === 0 && (
          <p className="text-center text-gray-500">No events available</p>
        )}

        <p className="text-center mb-4 text-lg">Upcoming Events</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const isJoined = user && event.attendees.includes(user.id);
            const isFull = event.attendees.length >= event.capacity;
            const isOwner =
              user && event.createdBy && event.createdBy._id === user.id;

            return (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                {/* Image */}
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-40 w-full object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-4 flex flex-col grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1 grow">
                    {event.description}
                  </p>

                  <div className="mt-3 text-sm text-gray-500 space-y-1">
                    <p>📍 {event.location}</p>
                    <p>
                      👥 {event.attendees.length} / {event.capacity}
                    </p>
                  </div>

                  {/* Actions */}
                  {user && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {!isJoined && !isFull && (
                        <button
                          onClick={() => joinEvent(event._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Join
                        </button>
                      )}

                      {isJoined && (
                        <button
                          onClick={() => leaveEvent(event._id)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                          Leave
                        </button>
                      )}

                      {isFull && !isJoined && (
                        <span className="text-red-500 font-medium">
                          Event Full
                        </span>
                      )}

                      {isOwner && (
                        <button
                          onClick={() => deleteEvent(event._id)}
                          className="ml-auto bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Events;
