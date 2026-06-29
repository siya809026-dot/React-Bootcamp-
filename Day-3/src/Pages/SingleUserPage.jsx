import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";

const DOG_BREEDS = ["Golden Retriever", "Labrador", "Poodle", "Beagle", "Shih Tzu", "Pomeranian"];
const CITIES = ["Delhi", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad"];
const DOG_NAMES = ["Brownie", "Rocky", "Buddy", "Max", "Bella", "Charlie"];
const INTERESTS = [
  ["Morning Walks", "Dog Parks", "Agility Training"],
  ["Beach Runs", "Frisbee", "Puppy Classes"],
  ["Hiking", "Fetch", "Socialising"],
];

export default function SingleUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${userId}`, {
      headers: { "x-api-key": "reqres_22896dc304864dd588527ba8934372b6" },
    })
      .then((r) => r.json())
      .then((data) => { setUser(data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userId]);

  const handleRequest = () => {
    if (requested) {
      setRequested(false);
      addToast({ message: "Meetup request cancelled.", type: "info" });
    } else {
      setRequested(true);
      addToast({ message: `Meetup request sent to ${user?.first_name}! 🐾`, type: "success" });
    }
  };

  if (loading) {
    return (
      <div className="loading-wrap">
        <span className="loading-emoji">🐾</span>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="loading-wrap">
        <p>Member not found.</p>
      </div>
    );
  }

  const idx = (user.id - 1) % 6;
  const breed = DOG_BREEDS[idx];
  const city = CITIES[idx];
  const dogName = DOG_NAMES[idx];
  const tags = INTERESTS[idx % 3];

  return (
    <main>
      <div className="profile-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Members
        </button>

        <div className="profile-card">
          <div className="profile-avatar-wrap">
            <img src={user.avatar} alt={user.first_name} className="profile-avatar" />
            <div className="profile-badge">✓</div>
          </div>

          <h2 className="profile-name">{user.first_name} {user.last_name}</h2>
          <span className="profile-email">{user.email}</span>

          <div className="profile-tags">
            {tags.map((t) => (
              <span className="tag tag-amber" key={t}>{t}</span>
            ))}
            <span className="tag tag-sage">📍 {city}</span>
          </div>

          <div className="profile-info-grid">
            <div className="info-box">
              <div className="info-label">Dog's Name</div>
              <div className="info-value">🐾 {dogName}</div>
            </div>
            <div className="info-box">
              <div className="info-label">Breed</div>
              <div className="info-value">{breed}</div>
            </div>
            <div className="info-box">
              <div className="info-label">Member Since</div>
              <div className="info-value">Jan 2024</div>
            </div>
            <div className="info-box">
              <div className="info-label">Meetups Attended</div>
              <div className="info-value">{(user.id * 3) % 20 + 2} 🐕</div>
            </div>
          </div>

          <button
            className={`btn-primary ${requested ? "btn-requested" : ""}`}
            style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px" }}
            onClick={handleRequest}
          >
            {requested ? "✓ Request Sent 🐾" : "Request Meetup 🐾"}
          </button>
        </div>
      </div>

      <footer className="footer" style={{ marginTop: "auto" }}>
        <div className="footer-brand">🐾 PawMeet</div>
        <p>Bringing dogs together across India · © 2025 PawMeet</p>
      </footer>
    </main>
  );
}
