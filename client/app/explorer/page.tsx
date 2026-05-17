"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SmartDeals() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [ccRange, setCcRange] = useState("");
  const [sortBy, setSortBy] = useState("ai_score");

  useEffect(() => {
    async function fetchBikes() {
      setLoading(true);
      try {
        let url = new URL("http://localhost:8000/api/bikes");
        url.searchParams.append("limit", "100");
        
        if (brand) url.searchParams.append("brand", brand);
        if (sortBy) url.searchParams.append("sort_by", sortBy);
        
        if (ccRange === "0-150") {
          url.searchParams.append("max_cc", "150");
        } else if (ccRange === "150-250") {
          url.searchParams.append("min_cc", "150");
          url.searchParams.append("max_cc", "250");
        } else if (ccRange === "250-9999") {
          url.searchParams.append("min_cc", "250");
        }

        if (priceRange === "0-100000") {
          url.searchParams.append("max_price", "100000");
        } else if (priceRange === "100000-200000") {
          url.searchParams.append("min_price", "100000");
          url.searchParams.append("max_price", "200000");
        } else if (priceRange === "200000-9999999") {
          url.searchParams.append("min_price", "200000");
        }

        const res = await fetch(url.toString(), { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setBikes(data);
        }
      } catch (error) {
        console.error("Failed to fetch bikes", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBikes();
  }, [brand, priceRange, ccRange, sortBy]);

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4" style={{ flexWrap: "wrap", gap: "16px" }}>
        <h1 className="section-title" style={{ marginBottom: 0 }}>Smart Deals Catalog</h1>
        <div className="flex" style={{ gap: "12px", flexWrap: "wrap" }}>
          <select 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
            style={{ padding: "8px 16px", border: "1px solid var(--google-border)", borderRadius: "4px", outline: "none", fontSize: "14px" }}
          >
            <option value="">All Brands</option>
            <option value="Royal Enfield">Royal Enfield</option>
            <option value="Bajaj">Bajaj</option>
            <option value="TVS">TVS</option>
            <option value="Honda">Honda</option>
            <option value="Hero">Hero</option>
            <option value="Yamaha">Yamaha</option>
            <option value="KTM">KTM</option>
          </select>

          <select 
            value={ccRange} 
            onChange={(e) => setCcRange(e.target.value)}
            style={{ padding: "8px 16px", border: "1px solid var(--google-border)", borderRadius: "4px", outline: "none", fontSize: "14px" }}
          >
            <option value="">All Engine Capacities</option>
            <option value="0-150">Up to 150cc</option>
            <option value="150-250">150cc - 250cc</option>
            <option value="250-9999">250cc & Above</option>
          </select>

          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)}
            style={{ padding: "8px 16px", border: "1px solid var(--google-border)", borderRadius: "4px", outline: "none", fontSize: "14px" }}
          >
            <option value="">All Prices</option>
            <option value="0-100000">Under ₹1 Lakh</option>
            <option value="100000-200000">₹1 Lakh - ₹2 Lakh</option>
            <option value="200000-9999999">Above ₹2 Lakh</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "8px 16px", border: "1px solid var(--google-border)", borderRadius: "4px", outline: "none", fontSize: "14px", backgroundColor: "var(--google-surface-active)" }}
          >
            <option value="ai_score">Sort by: AI Value Score</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="mileage_desc">Mileage: High to Low</option>
          </select>
        </div>
      </div>

      <p style={{ color: "var(--google-text-secondary)", marginBottom: "32px" }}>
        Discover bikes sorted by their true algorithmic value. Our AI compares hardware specs to pricing so you never overpay for a brand name.
        {bikes.length > 0 && <span style={{display: "block", marginTop: "8px", fontWeight: 500}}>Showing {bikes.length} bikes</span>}
      </p>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--google-text-secondary)" }}>
          Loading bikes from database...
        </div>
      ) : (
        <div className="bike-grid">
          {bikes.map((bike: any) => (
            <Link href={`/bike/${bike.id}`} key={bike.id} className="bike-card">
              <div className="bike-img-placeholder">{bike.model}</div>
              <div className="bike-details">
                <div className="bike-title">{bike.brand} {bike.model}</div>
                <div className="bike-price">₹{bike.ex_showroom_inr.toLocaleString('en-IN')}</div>
                <div className="bike-meta">
                  <span>{bike.cc}cc • {bike.mileage_kmpl} kmpl</span>
                </div>
                <div className={`ai-badge ${bike.ai_badge === 'Excellent' ? 'ai-badge-good' : (bike.ai_badge === 'Good' ? 'ai-badge-neutral' : 'ai-badge-warning')}`}>
                  {bike.ai_badge === 'Excellent' || bike.ai_badge === 'Good' ? '⭐ ' : '⚠️ '}
                  AI Value: {bike.ai_badge}
                </div>
              </div>
            </Link>
          ))}
          {bikes.length === 0 && <p style={{color: "var(--google-text-secondary)", gridColumn: "1 / -1", textAlign: "center", padding: "40px"}}>No bikes found matching your filters.</p>}
        </div>
      )}
    </div>
  );
}
