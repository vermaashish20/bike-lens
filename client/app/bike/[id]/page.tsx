import Link from "next/link";
import { notFound } from "next/navigation";

async function getBike(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/bikes/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch bike details", error);
    return null;
  }
}

async function getSimilarBikes(segment: string, excludeId: number) {
  try {
    const res = await fetch(`http://localhost:8000/api/bikes?segment=${segment}`, { cache: "no-store" });
    if (!res.ok) return [];
    const all = await res.json();
    return all.filter((b: any) => b.id !== excludeId).slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch similar bikes", error);
    return [];
  }
}

export default async function BikeDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const bike = await getBike(resolvedParams.id);

  if (!bike || bike.error) {
    notFound();
  }

  const similarBikes = await getSimilarBikes(bike.segment, bike.id);

  return (
    <div className="container">
      <div style={{ marginBottom: "24px", fontSize: "14px" }}>
        <Link href="/" style={{ color: "var(--google-text-secondary)", textDecoration: "none" }}>Home</Link>
        <span style={{ margin: "0 8px", color: "var(--google-border)" }}>/</span>
        <Link href="/explorer" style={{ color: "var(--google-text-secondary)", textDecoration: "none" }}>Smart Deals</Link>
        <span style={{ margin: "0 8px", color: "var(--google-border)" }}>/</span>
        <span style={{ color: "var(--google-text-primary)" }}>{bike.brand} {bike.model}</span>
      </div>

      <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
        <div style={{ flex: "1" }}>
          <div style={{ width: "100%", height: "400px", backgroundColor: "var(--google-surface-active)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--google-text-secondary)", fontSize: "24px" }}>
            [ {bike.model} High-Res Image ]
          </div>
        </div>

        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>{bike.brand} {bike.model}</h1>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--primary-color)", marginBottom: "24px" }}>
            ₹{bike.ex_showroom_inr.toLocaleString('en-IN')} <span style={{ fontSize: "14px", color: "var(--google-text-secondary)", fontWeight: 400 }}>Ex-showroom</span>
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
            <div style={{ flex: 1, padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid var(--google-border)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "var(--google-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Engine</div>
              <div style={{ fontSize: "18px", fontWeight: 500 }}>{bike.cc} cc</div>
            </div>
            <div style={{ flex: 1, padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid var(--google-border)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "var(--google-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Mileage</div>
              <div style={{ fontSize: "18px", fontWeight: 500 }}>{bike.mileage_kmpl} kmpl</div>
            </div>
            <div style={{ flex: 1, padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid var(--google-border)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "var(--google-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Top Speed</div>
              <div style={{ fontSize: "18px", fontWeight: 500 }}>{bike.top_speed_kmh} km/h</div>
            </div>
          </div>

          <div style={{ border: "1px solid var(--google-border)", borderRadius: "12px", padding: "24px", backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>🧠</span> AI Value Score
              </h3>
              <span className={`ai-badge ${bike.ai_badge === 'Excellent' ? 'ai-badge-good' : (bike.ai_badge === 'Good' ? 'ai-badge-neutral' : 'ai-badge-warning')}`} style={{ fontSize: "14px", padding: "6px 12px" }}>
                {bike.ai_value_score} / 100
              </span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--google-text-secondary)", marginBottom: "16px" }}>
              Our AI determines this bike is priced based on its hardware specs, receiving a <strong>{bike.ai_badge}</strong> value rating. This takes into account its {bike.cc}cc engine and {bike.mileage_kmpl} kmpl mileage.
            </p>
            <button style={{ width: "100%", padding: "12px", backgroundColor: "var(--primary-color)", color: "white", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: 500, cursor: "pointer" }}>
              Get On-Road Price Details (₹{bike.on_road_price_inr.toLocaleString('en-IN')})
            </button>
          </div>
        </div>
      </div>

      <h2 className="section-title">Similar Bikes (AI Grouping: {bike.segment})</h2>
      <div className="bike-grid" style={{ marginBottom: "60px" }}>
        {similarBikes.map((simBike: any) => (
          <Link href={`/bike/${simBike.id}`} key={simBike.id} className="bike-card">
            <div className="bike-img-placeholder" style={{ height: "120px" }}>{simBike.model}</div>
            <div className="bike-details">
              <div className="bike-title">{simBike.brand} {simBike.model}</div>
              <div className="bike-price">₹{simBike.ex_showroom_inr.toLocaleString('en-IN')}</div>
            </div>
          </Link>
        ))}
        {similarBikes.length === 0 && <p style={{color: "var(--google-text-secondary)"}}>No similar bikes found in this segment.</p>}
      </div>
    </div>
  );
}
