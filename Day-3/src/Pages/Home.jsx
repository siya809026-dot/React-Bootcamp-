import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
// Online images — no local assets needed
const heroPhoto    = "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80";
const gardenPhoto  = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80";
const beachPhoto   = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80";
const coffeePhoto  = "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80";
const runPhoto     = "https://images.unsplash.com/photo-1537204696486-967f1b7198c8?w=600&q=80";
const birthdayPhoto= "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80";
const trailPhoto   = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80";

const EVENTS = [
  { id: 1, emoji: "🌳", bg: "#e8f4ea", photo: gardenPhoto, title: "Morning Romp in Lodi Garden", date: "Sat, 28 Jun", time: "7:00 AM", location: "Lodi Garden, Delhi", badge: "Today", attendees: ["🐩", "🦮", "🐕"], count: 14 },
  { id: 2, emoji: "🏖️", bg: "#fef3d8", photo: beachPhoto, title: "Beach Paws at Juhu", date: "Sun, 29 Jun", time: "6:30 AM", location: "Juhu Beach, Mumbai", badge: "Trending", attendees: ["🐶", "🐕‍🦺", "🐩"], count: 31 },
  { id: 3, emoji: "☕", bg: "#f9ede4", photo: coffeePhoto, title: "Dogs & Coffee Social", date: "Fri, 4 Jul", time: "10:00 AM", location: "Indiranagar, Bangalore", badge: "New", attendees: ["🦴", "🐾", "🐕"], count: 9 },
  { id: 4, emoji: "🏃", bg: "#e8f4ea", photo: runPhoto, title: "Sunday Zoomies Run", date: "Sun, 6 Jul", time: "6:00 AM", location: "Cubbon Park, Bangalore", badge: null, attendees: ["🐶", "🐩"], count: 22 },
  { id: 5, emoji: "🎈", bg: "#fef3d8", photo: birthdayPhoto, title: "Pup Birthday Bash", date: "Sat, 12 Jul", time: "4:00 PM", location: "Sector 17, Chandigarh", badge: "Free", attendees: ["🐕‍🦺", "🐾", "🐶"], count: 18 },
  { id: 6, emoji: "🌿", bg: "#f0f9e8", photo: trailPhoto, title: "Nature Trail Sniff-a-Thon", date: "Sun, 13 Jul", time: "7:30 AM", location: "Sanjay Van, Delhi", badge: null, attendees: ["🦮", "🐕"], count: 11 },
];

const BREEDS = [
  { emoji: "🐩", name: "Poodle" },
  { emoji: "🦮", name: "Labrador" },
  { emoji: "🐕", name: "German Shepherd" },
  { emoji: "🐶", name: "Golden Retriever" },
  { emoji: "🐕‍🦺", name: "Beagle" },
  { emoji: "🦴", name: "Dachshund" },
  { emoji: "🐾", name: "Shih Tzu" },
  { emoji: "🐩", name: "Pomeranian" },
];

export default function Home() {
  const { addToast } = useToast();
  const [joined, setJoined] = useState({});
  const [activeBreed, setActiveBreed] = useState(null);

  const handleJoin = (event) => {
    if (joined[event.id]) {
      setJoined((prev) => ({ ...prev, [event.id]: false }));
      addToast({ message: `Left "${event.title}" 👋`, type: "info" });
    } else {
      setJoined((prev) => ({ ...prev, [event.id]: true }));
      addToast({ message: `You joined "${event.title}" 🐾`, type: "success" });
    }
  };

  const handleBreed = (name) => {
    if (activeBreed === name) {
      setActiveBreed(null);
      addToast({ message: "Filter cleared", type: "info" });
    } else {
      setActiveBreed(name);
      addToast({ message: `Filtered by ${name} 🐕`, type: "info" });
    }
  };

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">🐾 India's #1 Dog Meetup Community</div>
        <h1>Where Dogs Meet, <em>Tails Wag</em></h1>
        <p className="hero-sub">
          Find dog meetups near you, connect with fellow pet parents, and give your pup the social life they deserve.
        </p>
        <div className="hero-actions">
          <Link to="/user" className="btn-primary">
            Browse Members <span>→</span>
          </Link>
          <Link to="/about" className="btn-outline">
            How it Works
          </Link>
        </div>
        <div className="hero-photo">
          <img src={heroPhoto} alt="Happy golden retriever relaxing in the grass" />
        </div>
        <div className="hero-stats">
          <div className="stat-item"><span className="stat-num">2,400+</span><span className="stat-label">Happy Dogs</span></div>
          <div className="stat-item"><span className="stat-num">180</span><span className="stat-label">Meetups / Month</span></div>
          <div className="stat-item"><span className="stat-num">32</span><span className="stat-label">Cities</span></div>
          <div className="stat-item"><span className="stat-num">4.9★</span><span className="stat-label">Avg Rating</span></div>
        </div>
      </section>

      {/* BREEDS FILTER */}
      <section className="section" style={{ background: "var(--warm-white)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-inner">
          <div className="section-header" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Filter by Breed</span>
            <h2>Find Your Dog's Crowd</h2>
          </div>
          <div className="breeds-row">
            {BREEDS.map((b) => (
              <div
                className={`breed-chip ${activeBreed === b.name ? "breed-chip-active" : ""}`}
                key={b.name}
                onClick={() => handleBreed(b.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleBreed(b.name)}
              >
                <span className="emoji">{b.emoji}</span>
                <span className="name">{b.name}</span>
              </div>
            ))}
          </div>
          {activeBreed && (
            <div className="filter-clear">
              Showing: <strong>{activeBreed}</strong>
              <button className="clear-filter-btn" onClick={() => { setActiveBreed(null); addToast({ message: "Filter cleared", type: "info" }); }}>
                × Clear
              </button>
            </div>
          )}
        </div>
      </section>

      {/* EVENTS */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <span className="eyebrow">Upcoming Events</span>
            <h2>Meetups Near You</h2>
            <p>Join a local meetup, or create one for your neighbourhood.</p>
          </div>
          <div className="events-grid">
            {EVENTS.map((e) => (
              <div className="event-card" key={e.id}>
                <div className="event-img-photo">
                  <img src={e.photo} alt={e.title} />
                  <span className="event-emoji-tag">{e.emoji}</span>
                  {e.badge && <span className="event-badge">{e.badge}</span>}
                </div>
                <div className="event-body">
                  <h3>{e.title}</h3>
                  <div className="event-meta">
                    <span>📅 {e.date} · {e.time}</span>
                    <span>📍 {e.location}</span>
                  </div>
                  <div className="event-footer">
                    <div className="attendees">
                      <div className="avatar-stack">
                        {e.attendees.map((a, i) => <span key={i}>{a}</span>)}
                      </div>
                      <span style={{ marginLeft: 4 }}>{e.count + (joined[e.id] ? 1 : 0)} going</span>
                    </div>
                    <button
                      className={`join-btn ${joined[e.id] ? "join-btn-joined" : ""}`}
                      onClick={() => handleJoin(e)}
                    >
                      {joined[e.id] ? "✓ Joined" : "Join"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="section" style={{ background: "var(--bark)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(24px,4vw,38px)", marginBottom: 12 }}>
            Ready to meet your pup's new best friends?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 28, fontSize: 16 }}>
            Join thousands of dog parents building a happier, healthier social life for their pets.
          </p>
          <Link to="/login" className="btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
            Create Free Account 🐾
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">🐾 PawMeet</div>
        <p>Bringing dogs together across India · © 2025 PawMeet</p>
      </footer>
    </main>
  );
}

