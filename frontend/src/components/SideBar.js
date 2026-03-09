import React from "react";
import { useNavigate } from "react-router-dom";
export default function Sidebar({
  ActivePath,
  setActivePath,
  completedTopics,
  totalTopics,
  setActivePage,
}) {
  const paths = [
    { id: "General", label: "General" },
    { id: "FrontEnd", label: "Front-End" },
    { id: "BackEnd", label: "Back-End" },
  ];

  const totalAll = totalTopics ? totalTopics.length : 0;
  const doneAll = completedTopics ? completedTopics.length : 0;
  const pct = totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0;
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      {/* الشعار */}
      <div className="sidebar-logo">
        <img src="/logov.svg" alt="Tamkn" className="sidebar-logo-img" />
        <span className="sidebar-logo-text">Nawa</span>
      </div>
      {/* المسارات */}
      <div className="sidebar-label">LEARNING PATH</div>
      {paths.map((path) => (
        <button
          key={path.id}
          className={`sidebar-item ${ActivePath.id === path.id ? "active" : ""}`}
          onClick={() => {
            setActivePath({ id: path.id, title: path.label });
            setActivePage("knowledge");
          }}
        >
          <span className="sidebar-item-text">{path.label}</span>
        </button>
      ))}
      {/* الاجتماعات */}
      <div className="sidebar-label">OTHER</div>
       <button
        className={`sidebar-meeting-btn ${ActivePath === "meetings" ? "active" : ""}`}
        onClick={() => {
          setActivePage("Meeting");
          setActivePath({ id: "", title: "" });
        }}
      >
        <span>📅</span>
        <span className="sidebar-item-text">Meeting</span>
      </button>
      {/* مساحة فاضية تدفع التقدم للأسفل */}
      <div className="sidebar-spacer" />
      {/* التقدم الكلي */}
      <div className="sidebar-progress">
        <div className="sidebar-progress-header">
          <span>Overall</span>
          <span className="sidebar-progress-pct">{pct}%</span>
        </div>
        <div className="sidebar-progress-bar">
          <div className="sidebar-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="sidebar-progress-count">
          {doneAll} of {totalAll}
        </div>
      </div>
      {/* زر الخروج */}
      <button className="sidebar-logout" onClick={() => navigate("/login")}>
        ↩ خروج
      </button>{" "}
    </div>
  );
}
