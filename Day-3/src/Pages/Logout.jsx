import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    setTimeout(() => navigate("/"), 1500);
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-icon">👋</span>
        <h2>See you next time!</h2>
        <p style={{ color: "var(--text-muted)" }}>You've been logged out. Redirecting you home...</p>
      </div>
    </div>
  );
}
