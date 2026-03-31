import { useState, useEffect } from "react";
import axios from "axios";
import ManagerSidebar from "./manager/components/ManagerSidebar";
import "../assets/styles/ManagerDashboard.css";

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', date: '', time: '' });
    
    const API = "http://127.0.0.1:8000/api/meetings";
    const token = localStorage.getItem("token");
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get(API, config)
            .then((res) => setMeetings(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.title || !form.date || !form.time) return;
        axios.post(API, form, config)
            .then((res) => {
                setMeetings([...meetings, res.data]);
                setForm({ title: '', date: '', time: '' });
                setShowForm(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`${API}/${id}`, config)
            .then(() => {
                setMeetings(meetings.filter((m) => m.id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="manager-layout">
            <ManagerSidebar />
            <main className="manager-content">
                <div className="meetings-header">
                    <h1>Meetings</h1>
                    <button className="view-btn" onClick={() => setShowForm(true)}>
                        Add Meeting +
                    </button>
                </div>

                {showForm && (
                    <div className="meetings-form">
                        <input
                            className="search-box input"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Meeting title"
                        />
                        <div className="meetings-form-row">
                            <input
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                            />
                            <input
                                name="time"
                                type="time"
                                value={form.time}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="meetings-form-actions">
                            <button className="view-btn" onClick={handleSubmit}>Add</button>
                            <button className="logout-btn" onClick={() => {
                                setShowForm(false);
                                setForm({ title: '', date: '', time: '' });
                            }}>Cancel</button>
                        </div>
                    </div>
                )}

                {meetings.length === 0 ? (
                    <p style={{ color: '#888' }}>No meetings available</p>
                ) : (
                    <div className="meetings-list">
                        {meetings.map((m) => (
                            <div className="stats-card" key={m.id}>
                                <div className="stats-info">
                                    <h3>{m.title}</h3>
                                    <p>{m.date} — {m.time}</p>
                                </div>
                                <button
                                    className="logout-btn"
                                    onClick={() => handleDelete(m.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}