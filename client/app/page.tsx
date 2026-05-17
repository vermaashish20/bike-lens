import Link from "next/link";

async function getFeaturedBikes() {
  try {
    const res = await fetch("http://localhost:8000/api/bikes/featured", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch featured bikes", error);
    return [];
  }
}

export default async function Home() {
  const bikes = await getFeaturedBikes();
  
  // Split into smart deals and overpriced for UI demonstration
  const smartDeals = bikes.filter((b: any) => b.ai_value_score >= 70).slice(0, 3);
  const overpricedAlerts = bikes.filter((b: any) => b.ai_value_score < 70).slice(0, 2);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>FIND THE RIGHT BIKE</h1>
          <p>Get AI-powered insights, fair valuations, and unbiased reviews.</p>
          <div className="hero-search-container">
            <input type="text" className="hero-search-input" placeholder="Search your bike here, e.g. Royal Enfield Classic" />
            <button className="hero-search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container">
        
        <h2 className="section-title">AI Smart Deals (Value for Money)</h2>
        <div className="tabs">
          <div className="tab active">Top Deals</div>
          <div className="tab">Commuter</div>
          <div className="tab">Sports</div>
          <div className="tab">Cruiser</div>
        </div>

        <div className="bike-grid">
          {smartDeals.map((bike: any) => (
            <Link href={`/bike/${bike.id}`} key={bike.id} className="bike-card">
              <div className="bike-img-placeholder">{bike.model}</div>
              <div className="bike-details">
                <div className="bike-title">{bike.brand} {bike.model}</div>
                <div className="bike-price">₹{bike.ex_showroom_inr.toLocaleString('en-IN')} <span style={{fontSize: "12px", color: "var(--google-text-secondary)", fontWeight: 400}}>Onwards</span></div>
                <div className="bike-meta">
                  <span>{bike.cc}cc | {bike.mileage_kmpl} kmpl</span>
                </div>
                <div className={`ai-badge ${bike.ai_badge === 'Excellent' ? 'ai-badge-good' : 'ai-badge-neutral'}`}>
                  ⭐ AI Value: {bike.ai_badge}
                </div>
              </div>
            </Link>
          ))}
          {smartDeals.length === 0 && <p style={{color: "var(--google-text-secondary)"}}>Make sure FastAPI backend is running.</p>}
        </div>

        <h2 className="section-title mt-8">Brand Premium Alerts (Overpriced)</h2>
        <p style={{marginBottom: "24px", color: "var(--google-text-secondary)"}}>Our AI models indicate these models charge a premium relative to their core specifications.</p>
        
        <div className="bike-grid">
          {overpricedAlerts.map((bike: any) => (
            <Link href={`/bike/${bike.id}`} key={bike.id} className="bike-card">
              <div className="bike-img-placeholder">{bike.model}</div>
              <div className="bike-details">
                <div className="bike-title">{bike.brand} {bike.model}</div>
                <div className="bike-price">₹{bike.ex_showroom_inr.toLocaleString('en-IN')} <span style={{fontSize: "12px", color: "var(--google-text-secondary)", fontWeight: 400}}>Onwards</span></div>
                <div className="bike-meta">
                  <span>{bike.cc}cc | {bike.mileage_kmpl} kmpl</span>
                </div>
                <div className="ai-badge ai-badge-warning">
                  ⚠️ AI Value: {bike.ai_badge}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
