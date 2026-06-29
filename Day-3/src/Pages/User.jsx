import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../Context/ToastContext";

const DOG_BREEDS = ["Golden Retriever", "Labrador", "Poodle", "Beagle", "Shih Tzu", "Pomeranian"];
const CITIES    = ["Delhi", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad"];
const DOG_NAMES = ["Brownie", "Rocky", "Buddy", "Max", "Bella", "Charlie"];
const MEETUPS   = [8, 14, 3, 22, 11, 6];
const INTERESTS = [
  ["Morning Walks", "Dog Parks", "Agility"],
  ["Beach Runs", "Frisbee", "Puppy Classes"],
  ["Hiking", "Fetch", "Socialising"],
  ["Obedience Training", "Zoomies", "Playdates"],
  ["Puppy Yoga", "Trail Runs", "Dog Café"],
  ["Swimming", "Flyball", "Park Hangouts"],
];

const CITY_OPTIONS   = ["All Cities", ...CITIES];
const BREED_OPTIONS  = ["All Breeds", ...DOG_BREEDS];
const SORT_OPTIONS   = [
  { value: "default",  label: "Default" },
  { value: "name_az",  label: "Name A–Z" },
  { value: "name_za",  label: "Name Z–A" },
  { value: "meetups",  label: "Most Meetups" },
];

function SkeletonCard() {
  return (
    <div className="member-card skeleton-card">
      <div className="skeleton sk-avatar" />
      <div className="skeleton sk-line sk-name" />
      <div className="skeleton sk-line sk-email" />
      <div className="skeleton sk-tags">
        <div className="skeleton sk-tag" />
        <div className="skeleton sk-tag" />
      </div>
      <div className="skeleton sk-btn" />
    </div>
  );
}

export default function User() {
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [cityFilter,  setCityFilter]  = useState("All Cities");
  const [breedFilter, setBreedFilter] = useState("All Breeds");
  const [sort,     setSort]     = useState("default");
  const [view,     setView]     = useState("grid");   // "grid" | "list"
  const [connected, setConnected] = useState({});
  const { addToast } = useToast();

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1&per_page=12", {
      headers: { "x-api-key": "reqres_22896dc304864dd588527ba8934372b6" },
    })
      .then((r) => r.json())
      .then((data) => { setUsers(data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // enrich each user with static dog data
  const enriched = useMemo(() =>
    users.map((u) => {
      const idx = (u.id - 1) % 6;
      return {
        ...u,
        breed:    DOG_BREEDS[idx],
        city:     CITIES[idx],
        dogName:  DOG_NAMES[idx],
        meetups:  MEETUPS[idx],
        interests: INTERESTS[idx],
      };
    }), [users]);

  const filtered = useMemo(() => {
    let list = [...enriched];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.breed.toLowerCase().includes(q)
      );
    }
    if (cityFilter  !== "All Cities")  list = list.filter((u) => u.city  === cityFilter);
    if (breedFilter !== "All Breeds") list = list.filter((u) => u.breed === breedFilter);

    if (sort === "name_az")  list.sort((a, b) => a.first_name.localeCompare(b.first_name));
    if (sort === "name_za")  list.sort((a, b) => b.first_name.localeCompare(a.first_name));
    if (sort === "meetups")  list.sort((a, b) => b.meetups - a.meetups);

    return list;
  }, [enriched, search, cityFilter, breedFilter, sort]);

  const handleConnect = (u, e) => {
    e.preventDefault();
    e.stopPropagation();
    const isConnected = connected[u.id];
    setConnected((prev) => ({ ...prev, [u.id]: !isConnected }));
    if (isConnected) {
      addToast({ message: `Disconnected from ${u.first_name}`, type: "info" });
    } else {
      addToast({ message: `Connected with ${u.first_name} ${u.last_name}! 🐾`, type: "success" });
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCityFilter("All Cities");
    setBreedFilter("All Breeds");
    setSort("default");
    addToast({ message: "All filters cleared", type: "info" });
  };

  const hasFilters = search || cityFilter !== "All Cities" || breedFilter !== "All Breeds" || sort !== "default";

  return (
    <main>
      <section className="section">
        <div className="section-inner">

          {/* ── HEADER ── */}
          <div className="section-header">
            <span className="eyebrow">Our Community</span>
            <h2>Meet the Members</h2>
            <p>Browse pet parents near you and connect for your next meetup.</p>
          </div>

          {/* ── STATS BAR ── */}
          <div className="members-stats-bar">
            <div className="mstat"><span className="mstat-num">{users.length}</span><span className="mstat-label">Members</span></div>
            <div className="mstat"><span className="mstat-num">{CITIES.length}</span><span className="mstat-label">Cities</span></div>
            <div className="mstat"><span className="mstat-num">{Object.values(connected).filter(Boolean).length}</span><span className="mstat-label">Connected</span></div>
            <div className="mstat"><span className="mstat-num">{filtered.length}</span><span className="mstat-label">Showing</span></div>
          </div>

          {/* ── SEARCH + FILTERS ── */}
          <div className="members-toolbar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="member-search"
                type="text"
                placeholder="Search by name, city, breed…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")}>×</button>
              )}
            </div>

            <div className="filter-row">
              <select className="filter-select" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                {CITY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
              </select>

              <select className="filter-select" value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)}>
                {BREED_OPTIONS.map((b) => <option key={b}>{b}</option>)}
              </select>

              <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>

              {hasFilters && (
                <button className="clear-filter-btn" onClick={clearFilters}>× Clear all</button>
              )}

              {/* view toggle */}
              <div className="view-toggle">
                <button
                  className={`view-btn ${view === "grid" ? "view-btn-active" : ""}`}
                  onClick={() => setView("grid")}
                  title="Grid view"
                >⊞</button>
                <button
                  className={`view-btn ${view === "list" ? "view-btn-active" : ""}`}
                  onClick={() => setView("list")}
                  title="List view"
                >☰</button>
              </div>
            </div>
          </div>

          {/* ── RESULTS COUNT ── */}
          {!loading && (
            <div className="results-count">
              {filtered.length === 0
                ? "No members match your filters."
                : `${filtered.length} member${filtered.length !== 1 ? "s" : ""} found`}
            </div>
          )}

          {/* ── CARDS ── */}
          {loading ? (
            <div className={`members-${view}`}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-emoji">🐾</div>
              <h3>No members found</h3>
              <p>Try adjusting your search or filters.</p>
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={clearFilters}>Clear filters</button>
            </div>
          ) : (
            <div className={`members-${view}`}>
              {filtered.map((u) => (
                <Link
                  to={`/User/${u.id}`}
                  className={`member-card ${view === "list" ? "member-card-list" : ""}`}
                  key={u.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* avatar */}
                  <div className="member-avatar-wrap">
                    <img src={u.avatar} alt={u.first_name} className="member-avatar" />
                    <span className="member-verified">✓</span>
                  </div>

                  {/* info */}
                  <div className="member-info">
                    <h3 className="member-name">{u.first_name} {u.last_name}</h3>
                    <div className="member-sub">
                      <span>🐾 {u.dogName}</span>
                      <span className="dot">·</span>
                      <span>{u.breed}</span>
                    </div>
                    <div className="member-sub">
                      <span>📍 {u.city}</span>
                      <span className="dot">·</span>
                      <span>🐕 {u.meetups} meetups</span>
                    </div>
                    <div className="member-tags">
                      {u.interests.map((t) => (
                        <span className="mtag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* connect */}
                  <button
                    className={`connect-btn ${connected[u.id] ? "connect-btn-active" : ""}`}
                    onClick={(e) => handleConnect(u, e)}
                  >
                    {connected[u.id] ? "✓ Connected" : "+ Connect"}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">🐾 PawMeet</div>
        <p>Bringing dogs together across India · © 2025 PawMeet</p>
      </footer>
    </main>
  );
}
