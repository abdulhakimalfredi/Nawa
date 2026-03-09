import React, { useState, useEffect } from "react";
import "../assets/styles/App.css";
import Instructions from "../components/Instructions";
import KnowledgeBase from "../components/KnowledgeBase";
import axios from "axios";
import Sidebar from "../components/SideBar";
import Meeting from "../components/Meeting";

export default function App() {
  const [activePage, setActivePage] = useState("knowledge");
  const [topics, setTopics] = useState([]);
  useEffect(() => {
  axios.get("http://127.0.0.1:8001/api/topics")
    .then((res) => setTopics(res.data))
    .catch((err) => console.log(err));
}, []);

  const [ActivePath, setActivePath] = useState({ id: "", title: "" });
  const [showInstructions, setShowInstructions] = useState(false);
  const [completedTopics, setCompletedTopics] = useState(() => {
    const savedProgress = localStorage.getItem("my_progress");
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    localStorage.setItem("my_progress", JSON.stringify(completedTopics));
  }, [completedTopics]);

  return (
    <div className="App">
      <div>
        {/* Instructions Toggle Banner */}
        <div className="instructions-banner">
          <button
            className="instructions-toggle"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <span className="instructions-toggle-icon">
              {showInstructions ? "📖" : "📋"}
            </span>
            <span className="instructions-toggle-text">
              {showInstructions
                ? "Hide Instructions"
                : "Read Instructions Before You Start"}
            </span>
            <span
              className="instructions-toggle-arrow"
              style={{
                transform: showInstructions ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              ▼
            </span>
          </button>
          {showInstructions && (
            <div className="instructions-dropdown">
              <Instructions ActivePath={ActivePath} />
            </div>
          )}
        </div>

        {/* Main 3-Column Layout */}
        <div className="main-container">
          {/* Sidebar - Left */}
          <Sidebar
            ActivePath={ActivePath}
            setActivePath={setActivePath}
            completedTopics={completedTopics}
            totalTopics={topics}
            setActivePage={setActivePage}

          />

          {/* Knowledge Base - Center */}
          <div className="knowledge-base">
            {activePage === "Meeting" ? (
              <Meeting />
            ) : (
              <KnowledgeBase
                ActivePath={ActivePath}
                TopicList={topics}
                completedTopics={completedTopics}
                setCompletedTopics={setCompletedTopics}
              />
            )}
          </div>

          {/* Stats - Right */}
          <div className="tracker-section"></div>
        </div>
      </div>
    </div>
  );
}
