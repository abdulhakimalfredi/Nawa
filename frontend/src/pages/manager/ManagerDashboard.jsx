import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerSidebar from "./components/ManagerSidebar";
import StatsCard from "./components/StatsCard";
import TraineesTable from "./components/TraineesTable";
import "../../assets/styles/ManagerDashboard.css";

function ManagerDashboard() {
    const [trainees, setTrainees] = useState([]);
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTrainees = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/manager/trainees", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrainees(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTrainees();
    }, [token]);

    const filteredTrainees = trainees.filter(
        (trainee) =>
            trainee.name.toLowerCase().includes(search.toLowerCase()) ||
            trainee.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="manager-layout">
            <ManagerSidebar />
            <main className="manager-content">
                <h1>Welcome 👋</h1>
                <p>Manager Dashboard</p>

                <div className="stats-row">
                    <StatsCard title="Total Trainees" value={trainees.length} icon="👥" />
                    <StatsCard title="Paths" value="3" icon="📚" />
                </div>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search trainee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <TraineesTable trainees={filteredTrainees} />
            </main>
        </div>
    );
}

export default ManagerDashboard;