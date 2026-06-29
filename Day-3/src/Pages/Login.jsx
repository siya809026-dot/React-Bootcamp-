import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useToast } from "../Context/ToastContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { auth, login, logout } = useContext(AuthContext);
  const { addToast } = useToast();

  const handleLogin = () => {
    login();
    addToast({ message: "Welcome back! 🐾 You're now logged in.", type: "success" });
  };

  const handleLogout = () => {
    logout();
    addToast({ message: "Logged out. See you soon! 👋", type: "info" });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-icon">🐾</span>
        <h2>{auth ? "You're In!" : "Welcome Back"}</h2>
        <p>
          {auth
            ? "You have full access to member profiles and meetups."
            : "Log in to see member profiles, join meetups, and connect with pet parents near you."}
        </p>

        <div className={`auth-status ${auth ? "logged-in" : "logged-out"}`}>
          {auth ? "✅ Logged in" : "🔒 Not logged in"}
        </div>

        <div className="auth-buttons">
          <button className="auth-btn-login" onClick={handleLogin} disabled={auth}>
            🐕 Log In with PawMeet
          </button>
          {auth && (
            <Link
              to="/user"
              style={{
                display: "block",
                background: "var(--bark)",
                color: "#fff",
                padding: "14px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 15,
                textAlign: "center",
                marginTop: 0,
              }}
            >
              View Members →
            </Link>
          )}
          <button className="auth-btn-logout" onClick={handleLogout} disabled={!auth}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
