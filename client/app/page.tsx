import Link from "next/link";

export default function Home() {
  const smartDeals = [
    { id: "1", name: "Bajaj Pulsar NS200", price: "₹1,49,000", imageText: "Pulsar NS200", badge: "AI Value: Excellent", badgeClass: "ai-badge-good", specs: "199cc | 36 kmpl" },
    { id: "2", name: "Royal Enfield Classic", price: "₹1,93,000", imageText: "Classic 350", badge: "AI Value: Good", badgeClass: "ai-badge-good", specs: "349cc | 35 kmpl" },
    { id: "4", name: "TVS Apache RTR 160", price: "₹1,20,000", imageText: "Apache 160", badge: "AI Value: Fair", badgeClass: "ai-badge-neutral", specs: "159cc | 45 kmpl" },
  ];

  const overpricedAlerts = [
    { id: "3", name: "KTM Duke 390", price: "₹3,10,000", imageText: "Duke 390", badge: "AI Value: Low (Premium Pricing)", badgeClass: "ai-badge-warning", specs: "373cc | 28 kmpl" },
    { id: "5", name: "Yamaha MT-15", price: "₹1,68,000", imageText: "MT-15", badge: "AI Value: Low (Brand Premium)", badgeClass: "ai-badge-warning", specs: "155cc | 48 kmpl" },
  ];

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
          {smartDeals.map(bike => (
            <Link href={`/bike/${bike.id}`} key={bike.id} className="bike-card">
              <div className="bike-img-placeholder">{bike.imageText}</div>
              <div className="bike-details">
                <div className="bike-title">{bike.name}</div>
                <div className="bike-price">{bike.price} <span style={{fontSize: "12px", color: "var(--google-text-secondary)", fontWeight: 400}}>Onwards</span></div>
                <div className="bike-meta">
                  <span>{bike.specs}</span>
                </div>
                <div className={`ai-badge ${bike.badgeClass}`}>
                  ⭐ {bike.badge}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="section-title mt-8">Brand Premium Alerts (Overpriced)</h2>
        <p style={{marginBottom: "24px", color: "var(--google-text-secondary)"}}>Our AI models indicate these models charge a premium relative to their core specifications.</p>
        
        <div className="bike-grid">
          {overpricedAlerts.map(bike => (
            <Link href={`/bike/${bike.id}`} key={bike.id} className="bike-card">
              <div className="bike-img-placeholder">{bike.imageText}</div>
              <div className="bike-details">
                <div className="bike-title">{bike.name}</div>
                <div className="bike-price">{bike.price} <span style={{fontSize: "12px", color: "var(--google-text-secondary)", fontWeight: 400}}>Onwards</span></div>
                <div className="bike-meta">
                  <span>{bike.specs}</span>
                </div>
                <div className={`ai-badge ${bike.badgeClass}`}>
                  ⚠️ {bike.badge}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
