import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* خلفية متحركة */}
      <div className="landing-bg">
        <div className="landing-orb landing-orb-1"></div>
        <div className="landing-orb landing-orb-2"></div>
        <div className="landing-orb landing-orb-3"></div>
      </div>

      <div className="landing-content">
        {/* الشعار */}
        <div className="landing-logo">
          <img src="/logov.svg" alt="Tamkn" className="landing-logo-img" />
        </div>

        <h1 className="landing-title">Nawa | نواة</h1>

        <p className="landing-desc">
         A platform to train developers and track their progress.
        </p>

        <button
          className="landing-btn"
          onClick={() => navigate("/login")}
        >
         Start now →
        </button>

        {/* زخرفة سفلية */}
        <div className="landing-footer">
          <span className="landing-dot"></span>
          <span className="landing-dot"></span>
          <span className="landing-dot"></span>
        </div>
      </div>
    </div>
  );
}