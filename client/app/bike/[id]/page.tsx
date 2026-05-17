import Link from "next/link";

export default function BikeDetail({ params }: { params: { id: string } }) {
  return (
    <div className="container">
      <div style={{ marginBottom: "24px", fontSize: "14px" }}>
        <Link href="/" style={{ color: "var(--google-text-secondary)", textDecoration: "none" }}>Home</Link>
        <span style={{ margin: "0 8px", color: "var(--google-border)" }}>/</span>
        <Link href="/explorer" style={{ color: "var(--google-text-secondary)", textDecoration: "none" }}>Smart Deals</Link>
        <span style={{ margin: "0 8px", color: "var(--google-border)" }}>/</span>
        <span style={{ color: "var(--google-text-primary)" }}>Royal Enfield Classic 350</span>
      </div>

      <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
        <div style={{ flex: "1" }}>
          <div style={{ width: "100%", height: "400px", backgroundColor: "var(--google-surface-active)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--google-text-secondary)", fontSize: "24px" }}>
            [ Classic 350 High-Res Image ]
          </div>
        </div>

        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Royal Enfield Classic 350</h1>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--primary-color)", marginBottom: "24px" }}>
            ₹1,93,000 <span style={{ fontSize: "14px", color: "var(--google-text-secondary)", fontWeight: 400 }}>Ex-showroom</span>
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
            <div style={{ flex: 1, padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid var(--google-border)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "var(--google-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Engine</div>
              <div style={{ fontSize: "18px", fontWeight: 500 }}>349 cc</div>
            </div>
            <div style={{ flex: 1, padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid var(--google-border)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "var(--google-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Mileage</div>
              <div style={{ fontSize: "18px", fontWeight: 500 }}>35 kmpl</div>
            </div>
            <div style={{ flex: 1, padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid var(--google-border)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "var(--google-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Power</div>
              <div style={{ fontSize: "18px", fontWeight: 500 }}>20.2 bhp</div>
            </div>
          </div>

          <div style={{ border: "1px solid var(--google-border)", borderRadius: "12px", padding: "24px", backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>🧠</span> AI Value Score
              </h3>
              <span className="ai-badge ai-badge-good" style={{ fontSize: "14px", padding: "6px 12px" }}>85 / 100</span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--google-text-secondary)", marginBottom: "16px" }}>
              Our AI determines this bike is priced <strong>10% below</strong> the market average for its hardware specs. You are getting excellent value for the engine capacity.
            </p>
            <button style={{ width: "100%", padding: "12px", backgroundColor: "var(--primary-color)", color: "white", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: 500, cursor: "pointer" }}>
              Get On-Road Price Details
            </button>
          </div>
        </div>
      </div>

      <h2 className="section-title">Similar Bikes (AI Grouping)</h2>
      <div className="bike-grid" style={{ marginBottom: "60px" }}>
        {/* Dummy competitors */}
        <div className="bike-card">
          <div className="bike-img-placeholder" style={{ height: "120px" }}>Honda Hness CB350</div>
          <div className="bike-details">
            <div className="bike-title">Honda Hness CB350</div>
            <div className="bike-price">₹2,09,000</div>
          </div>
        </div>
        <div className="bike-card">
          <div className="bike-img-placeholder" style={{ height: "120px" }}>Jawa 42</div>
          <div className="bike-details">
            <div className="bike-title">Jawa 42</div>
            <div className="bike-price">₹1,98,000</div>
          </div>
        </div>
        <div className="bike-card">
          <div className="bike-img-placeholder" style={{ height: "120px" }}>Yezdi Roadster</div>
          <div className="bike-details">
            <div className="bike-title">Yezdi Roadster</div>
            <div className="bike-price">₹2,06,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
