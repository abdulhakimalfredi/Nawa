import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function ManagerSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <aside className="manager-sidebar">
            <div className="sidebar-logo">
                <img src="/logov.svg" alt="Nawa" />
                <span>Nawa</span>
            </div>

            <nav className="sidebar-nav">
                <p className="nav-label">MENU</p>
                <NavLink to="/manager/dashboard" className="nav-item">
                    Dashboard
                </NavLink>
                <NavLink to="/manager/trainees" className="nav-item">
                    Trainees
                </NavLink>
                <NavLink to="/manager/meetings" className="nav-item">
                    Meetings
                </NavLink>
            </nav>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </aside>
    );
}

export default ManagerSidebar;