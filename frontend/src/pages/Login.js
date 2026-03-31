import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles/Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);

      // شيك على الدور
      if (res.data.data.role === "manager") {
        navigate("/manager/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-wrapper">
      {/* خلفية متحركة */}
      <div className="login-bg">
        <div className="login-orb login-orb-1"></div>
        <div className="login-orb login-orb-2"></div>
      </div>

      <div className="login-card">
        {/* الشعار */}
        <div className="login-logo">
          <img src="/logov.svg" alt="Tamkn" className="login-logo-img" />
        </div>

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">سجّل دخولك للمتابعة</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          <button type="submit" className="login-btn">
            تسجيل الدخول
          </button>
        </form>

        <p className="login-footer-text">
          ما عندك حساب؟{" "}
          <Link to="/register" className="login-link">
            سجّل الآن
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
