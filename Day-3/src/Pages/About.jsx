// Using an online placeholder so no local asset is required
const portraitPhoto = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80";

const VALUES = [
  { icon: "🐾", title: "Community First", desc: "We believe dogs thrive with social connections. PawMeet makes it effortless to find your local pack." },
  { icon: "🛡️", title: "Safe & Verified", desc: "All meetup hosts go through a light verification process. Every dog is welcome; bad actors aren't." },
  { icon: "🌿", title: "Outdoor-Focused", desc: "We partner with parks, open spaces, and pet-friendly venues to host meaningful outdoor experiences." },
  { icon: "🤝", title: "People Too", desc: "Dog meetups are as much about the humans. Make friends who get why you love your dog this much." },
];

const TEAM = [
  { avatar: "🧑‍💻", name: "Aryan Mehta", role: "Founder & Dog Dad" },
  { avatar: "👩‍🎨", name: "Priya Sharma", role: "Design & UX" },
  { avatar: "🧑‍🍳", name: "Rohan Das", role: "Community Lead" },
  { avatar: "👩‍💼", name: "Sneha Iyer", role: "Partnerships" },
];

export default function About() {
  return (
    <main>
      <div className="about-hero">
        <h1>We're on a mission to make dogs happier 🐕</h1>
        <p>PawMeet was born from a simple idea: every dog deserves a best friend. We connect pet owners across India for real-world meetups.</p>
        <div className="about-hero-photo">
          <img src={portraitPhoto} alt="Close-up portrait of a fluffy shih tzu" />
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <span className="eyebrow">Our Values</span>
            <h2>Why PawMeet Exists</h2>
          </div>
          <div className="about-grid">
            {VALUES.map((v) => (
              <div className="about-card" key={v.title}>
                <span className="about-card-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="section-inner">
          <div className="section-header">
            <span className="eyebrow">The Humans Behind It</span>
            <h2>Meet the Team</h2>
            <p>A small team of dog lovers who wanted something better for their pups — and yours.</p>
          </div>
          <div className="team-grid">
            {TEAM.map((t) => (
              <div className="team-card" key={t.name}>
                <span className="team-avatar">{t.avatar}</span>
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">🐾 PawMeet</div>
        <p>Bringing dogs together across India · © 2025 PawMeet</p>
      </footer>
    </main>
  );
}
