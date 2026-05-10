import { useState, useEffect } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/meetings`;

function authConfig() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", time: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(API, authConfig())
      .then((res) => setMeetings(res.data))
      .catch(() => setError("Failed to load meetings."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.date || !form.time) return;
    axios
      .post(API, form, authConfig())
      .then((res) => {
        setMeetings([...meetings, res.data]);
        setForm({ title: "", date: "", time: "" });
        setShowForm(false);
      })
      .catch(() => setError("Failed to add meeting."));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/${id}`, authConfig())
      .then(() => setMeetings(meetings.filter((m) => m.id !== id)))
      .catch(() => setError("Failed to delete meeting."));
  };

  if (loading) return <p className="meetings-empty">Loading...</p>;

  return (
    <div className="meetings-page">
      <div className="meetings-header">
        <h1 className="meetings-title">Meetings</h1>
        <button className="meetings-add-btn" onClick={() => setShowForm(true)}>
          Add A Meeting +
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showForm && (
        <div className="meetings-form">
          <input
            className="meetings-input"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="عنوان الاجتماع"
          />
          <div className="meetings-form-row">
            <input
              className="meetings-input"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
            <input
              className="meetings-input"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
            />
          </div>
          <div className="meetings-form-actions">
            <button className="meetings-submit-btn" onClick={handleSubmit}>
              Add
            </button>
            <button
              className="meetings-cancel-btn"
              onClick={() => {
                setShowForm(false);
                setForm({ title: "", date: "", time: "" });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {meetings.length === 0 ? (
        <p className="meetings-empty">No Meetings available</p>
      ) : (
        meetings.map((m) => (
          <div className="meetings-item" key={m.id}>
            <div className="meetings-item-info">
              <div className="meetings-item-title">{m.title}</div>
              <div className="meetings-item-date">
                {m.date} — {m.time}
              </div>
            </div>
            <button
              className="meetings-delete-btn"
              onClick={() => handleDelete(m.id)}
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}
