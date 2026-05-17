"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../globals.css";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
  components?: any[];
};

const SUGGESTIONS = [
  "Bikes under 2 Lakhs with high mileage",
  "Compare KTM Duke 390 and Apache RTR 310",
  "Most comfortable cruisers for long tours",
  "Best value-for-money 150cc commuters",
];

const PINTEREST_BIKES = [
  { id: "1", name: "Royal Enfield Classic", tag: "Cruiser", imgHeight: 250, img: "🏍️", price: "₹1.93L" },
  { id: "2", name: "Bajaj Pulsar NS200", tag: "Street", imgHeight: 180, img: "🏍️", price: "₹1.49L" },
  { id: "3", name: "KTM Duke 390", tag: "Sports", imgHeight: 300, img: "🏍️", price: "₹3.10L" },
  { id: "4", name: "TVS Apache 160", tag: "Commuter", imgHeight: 220, img: "🏍️", price: "₹1.20L" },
  { id: "5", name: "Yamaha MT-15", tag: "Street", imgHeight: 150, img: "🏍️", price: "₹1.68L" },
  { id: "6", name: "Honda Hness", tag: "Cruiser", imgHeight: 280, img: "🏍️", price: "₹2.09L" },
  { id: "m1", name: "Hero Splendor Plus", tag: "Best Mileage", imgHeight: 160, img: "🛵", price: "₹0.75L" },
  { id: "m2", name: "Bajaj Platina 110", tag: "Best Mileage", imgHeight: 200, img: "🛵", price: "₹0.70L" },
  { id: "m3", name: "TVS Radeon", tag: "Best Mileage", imgHeight: 190, img: "🛵", price: "₹0.73L" },
  { id: "v1", name: "Bajaj Pulsar N160", tag: "AI Value", imgHeight: 240, img: "🏍️", price: "₹1.30L" },
  { id: "v2", name: "TVS Apache RTR 160 4V", tag: "AI Value", imgHeight: 210, img: "🏍️", price: "₹1.24L" },
  { id: "v3", name: "Honda SP 125", tag: "AI Value", imgHeight: 170, img: "🏍️", price: "₹0.86L" },
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), role: "user", text }
    ];
    setMessages(newMessages);
    setInputValue("");

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: `Here is what I found for "${text}". Based on our AI valuation models, here are the top recommendations that match your criteria:`,
        components: [
          { id: "b1", name: "Bajaj Pulsar N160", specs: "164cc • 45 kmpl", price: "₹1.30 Lakh", badge: "AI Value: Excellent" },
          { id: "b2", name: "TVS Apache RTR 160 4V", specs: "159cc • 45 kmpl", price: "₹1.24 Lakh", badge: "AI Value: Good" }
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(inputValue);
    }
  };

  const handleBikeClick = (bikeName: string) => {
    handleSend(`Tell me more about the ${bikeName}`);
  };

  return (
    <div className="advisor-container">
      {messages.length === 0 ? (
        // --- INITIAL STATE (PINTEREST MASONRY) ---
        <div className="advisor-initial-pinterest">
          
          {/* Animated Pinterest Background */}
          <div className="pinterest-bg-wrapper">
            <div className="pinterest-bg-track">
              {/* Duplicate blocks for seamless vertical scrolling */}
              <div className="pinterest-columns">
                {PINTEREST_BIKES.map((bike, i) => (
                  <div key={`a-${i}`} className="pinterest-card" onClick={() => handleBikeClick(bike.name)}>
                    <div className="pinterest-img" style={{ height: `${bike.imgHeight}px` }}>{bike.img}</div>
                    <div className="pinterest-details">
                      <span className="masonry-tag">{bike.tag}</span>
                      <div className="masonry-name">{bike.name}</div>
                      <div className="masonry-price">{bike.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pinterest-columns">
                {PINTEREST_BIKES.map((bike, i) => (
                  <div key={`b-${i}`} className="pinterest-card" onClick={() => handleBikeClick(bike.name)}>
                    <div className="pinterest-img" style={{ height: `${bike.imgHeight}px` }}>{bike.img}</div>
                    <div className="pinterest-details">
                      <span className="masonry-tag">{bike.tag}</span>
                      <div className="masonry-name">{bike.name}</div>
                      <div className="masonry-price">{bike.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Glass Overlay */}
          <div className="advisor-hero-overlay">
            <h1 style={{ fontSize: "42px", fontWeight: 700, marginBottom: "16px", color: "var(--google-text-primary)" }}>
              What are you looking for?
            </h1>
            <p style={{ fontSize: "16px", color: "var(--google-text-secondary)", marginBottom: "32px" }}>
              Our AI Bike Advisor analyzes millions of data points to find you the perfect ride.
            </p>

            {/* Big Search Bar */}
            <div className="advisor-big-search">
              <span style={{ fontSize: "24px", color: "var(--google-text-secondary)", padding: "0 16px" }}>✨</span>
              <input 
                type="text" 
                placeholder="Ask about budget, mileage, styles..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button onClick={() => handleSend(inputValue)}>Ask AI</button>
            </div>

            {/* Suggestion Chips */}
            <div className="advisor-chips">
              {SUGGESTIONS.map((sug, i) => (
                <div key={i} className="advisor-chip" onClick={() => handleSend(sug)}>
                  {sug}
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        // --- CHAT STATE ---
        <div className="advisor-chat-layout">
          <div className="advisor-chat-history">
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-row ${msg.role}`}>
                  {msg.role === "ai" && (
                    <div className="chat-avatar ai-avatar">✨</div>
                  )}
                  
                  <div className="chat-content-wrapper">
                    {msg.role === "user" ? (
                      <div className="chat-bubble-user">{msg.text}</div>
                    ) : (
                      <div className="chat-block-ai">
                        <div className="ai-text-response">{msg.text}</div>
                        {msg.components && (
                          <div className="ai-components-grid">
                            {msg.components.map(comp => (
                              <div key={comp.id} className="ai-bike-card" onClick={() => handleBikeClick(comp.name)}>
                                <div className="ai-bike-img">🏍️</div>
                                <div className="ai-bike-info">
                                  <h4>{comp.name}</h4>
                                  <div className="ai-bike-price">{comp.price}</div>
                                  <div className="ai-bike-specs">{comp.specs}</div>
                                  <div className="ai-badge ai-badge-good mt-4">⭐ {comp.badge}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {msg.role === "user" && (
                    <div className="chat-avatar user-avatar">U</div>
                  )}
                </div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>
          </div>

          {/* Sticky Bottom Search Bar */}
          <div className="advisor-sticky-input-wrapper">
            <div className="advisor-sticky-input-container">
              <input 
                type="text" 
                placeholder="Follow up or ask something else..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button onClick={() => handleSend(inputValue)}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
