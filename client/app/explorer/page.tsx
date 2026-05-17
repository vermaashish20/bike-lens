import Link from "next/link";

export default function SmartDeals() {
  const bikes = [
    { id: "1", name: "Royal Enfield Classic 350", specs: "349cc • 35 kmpl", price: "₹1,93,000", badge: "AI Value: Good", badgeClass: "ai-badge-good", imgText: "Classic 350" },
    { id: "2", name: "Bajaj Pulsar NS200", specs: "199cc • 36 kmpl", price: "₹1,49,000", badge: "AI Value: Excellent", badgeClass: "ai-badge-good", imgText: "Pulsar NS200" },
    { id: "4", name: "TVS Apache RTR 160", specs: "159cc • 45 kmpl", price: "₹1,20,000", badge: "AI Value: Fair", badgeClass: "ai-badge-neutral", imgText: "Apache 160" },
    { id: "3", name: "KTM Duke 390", specs: "373cc • 28 kmpl", price: "₹3,10,000", badge: "AI Value: Low (Premium)", badgeClass: "ai-badge-warning", imgText: "Duke 390" },
    { id: "5", name: "Yamaha MT-15", specs: "155cc • 48 kmpl", price: "₹1,68,000", badge: "AI Value: Low (Premium)", badgeClass: "ai-badge-warning", imgText: "MT-15" },
  ];

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1 className="section-title" style={{ marginBottom: 0 }}>Smart Deals Catalog</h1>
        <div className="flex" style={{ gap: "12px" }}>
          <select style={{ padding: "8px 16px", border: "1px solid var(--google-border)", borderRadius: "4px", outline: "none", fontSize: "14px" }}>
            <option>All Engine Capacities</option>
            <option>Up to 150cc</option>
            <option>150cc - 250cc</option>
            <option>250cc & Above</option>
          </select>
          <select style={{ padding: "8px 16px", border: "1px solid var(--google-border)", borderRadius: "4px", outline: "none", fontSize: "14px" }}>
            <option>Sort by: AI Value Score</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Mileage: High to Low</option>
          </select>
        </div>
      </div>

      <p style={{ color: "var(--google-text-secondary)", marginBottom: "32px" }}>
        Discover bikes sorted by their true algorithmic value. Our AI compares hardware specs to pricing so you never overpay for a brand name.
      </p>

      <div className="bike-grid">
        {bikes.map(bike => (
          <Link href={`/bike/${bike.id}`} key={bike.id} className="bike-card">
            <div className="bike-img-placeholder">{bike.imgText}</div>
            <div className="bike-details">
              <div className="bike-title">{bike.name}</div>
              <div className="bike-price">{bike.price}</div>
              <div className="bike-meta">
                <span>{bike.specs}</span>
              </div>
              <div className={`ai-badge ${bike.badgeClass}`}>
                {bike.badge.includes('Good') || bike.badge.includes('Excellent') ? '⭐ ' : (bike.badge.includes('Fair') ? '✅ ' : '⚠️ ')}
                {bike.badge}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
