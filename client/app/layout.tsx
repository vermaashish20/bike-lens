import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bikelens | Find the right bike with AI",
  description: "Consumer platform for bike data with ML insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="top-nav">
          <div className="flex align-center">
            <Link href="/" className="logo">
              <span className="logo-icon">🏍️</span>
              Bikelens
            </Link>
            <nav className="nav-links" style={{ marginLeft: "40px" }}>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/explorer" className="nav-link">Smart Deals</Link>
              <Link href="/analyst" className="nav-link">AI Advisor</Link>
            </nav>
          </div>
          
          <div className="nav-actions">
            <input type="text" className="nav-search" placeholder="Search for bikes..." />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--google-surface-active)", color: "var(--google-text-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                U
              </div>
              <span style={{ fontSize: "14px", fontWeight: 500 }}>Log In</span>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
