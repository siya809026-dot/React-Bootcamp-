import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";

export default function NavBar() {
  const { auth } = useContext(AuthContext);
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About" },
    { path: "/user", title: "Members" },
    { path: "/login", title: auth ? "My Account" : "Login" },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span className="paw-icon">🐾</span>
        PawMeet
      </Link>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        {links.map(({ path, title }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {title}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/user" className="nav-cta" onClick={() => setOpen(false)}>
            Find a Meetup 🐕
          </NavLink>
        </li>
      </ul>

      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
