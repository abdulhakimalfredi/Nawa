import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerSidebar from "./manager/components/ManagerSidebar";
import "../assets/styles/ManagerDashboard.css";

import TraineesTable from "./manager/components/TraineesTable";
function TraineesPage() {
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
    }, []);

    const filteredTrainees = trainees.filter(
        (trainee) =>
            trainee.name.toLowerCase().includes(search.toLowerCase()) ||
            trainee.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="manager-layout">
            <ManagerSidebar />
            <main className="manager-content">
                <h1>Trainees</h1>

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

export default TraineesPage;