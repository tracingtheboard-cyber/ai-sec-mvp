"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <head>
        <title>Brisk - Corporate Services</title>
      </head>
      <body>
        {isLoginPage ? (
          children
        ) : (
          <div className="app-container">
            <aside className="sidebar">
              <div className="sidebar-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                Brisk
              </div>
              <ul className="nav-menu">
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <li className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    Dashboard / AI Drafter
                  </li>
                </Link>
                <Link href="/clients" style={{ textDecoration: 'none' }}>
                  <li className={`nav-item ${pathname === '/clients' ? 'active' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Clients CRM
                  </li>
                </Link>
                <Link href="/compliance" style={{ textDecoration: 'none' }}>
                  <li className={`nav-item ${pathname === '/compliance' ? 'active' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Compliance Radar
                  </li>
                </Link>
                <Link href="/history" style={{ textDecoration: 'none' }}>
                  <li className={`nav-item ${pathname === '/history' ? 'active' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Document History
                  </li>
                </Link>
              </ul>
              
              <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid var(--surface-border)" }}>
                <button 
                  onClick={async () => {
                    const { supabase } = await import('../utils/supabase');
                    await supabase.auth.signOut();
                    document.cookie = 'auth=; Max-Age=0; path=/'; // 清除 cookie
                    window.location.href = '/login';
                  }}
                  style={{ 
                    width: "100%", background: "transparent", border: "1px solid var(--danger)", color: "var(--danger)", padding: "10px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px", fontWeight: "500" 
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sign Out
                </button>
              </div>
            </aside>
            <main className="main-content">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}
