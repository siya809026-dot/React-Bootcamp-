import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-inner">
        <span className="notfound-emoji">🐕</span>
        <h2>Page Not Found</h2>
        <p>Looks like this page ran off to the dog park. Let's get you back on the trail.</p>
        <Link to="/" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
