"use client";
import { useState } from "react";

export default function ClientsCRM() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const mockClientDetails: Record<string, any> = {
    "TechNova Pte Ltd": {
      uen: "202312345A",
      address: "1 Marina Boulevard, #20-01, Singapore 018989",
      directors: [
        { name: "John Doe", nric: "S1234567A", email: "john.doe@technova.sg" },
        { name: "Alice Smith", nric: "F7654321B", email: "alice@technova.sg" }
      ],
      fye: "31 Dec",
      status: "Active"
    },
    "Global Trade Corp": {
      uen: "202198765B",
      address: "10 Anson Road, #15-15, International Plaza, Singapore 079903",
      directors: [
        { name: "Jane Doe", nric: "S9876543C", email: "jane.doe@globaltrade.com" }
      ],
      fye: "30 Jun",
      status: "Active"
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="page-title">Clients CRM</h1>
        <button className="btn">+ Add New Client</button>
      </div>

      <div className="card" style={{ position: "relative" }}>
        <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
          Unified corporate registry synchronized with ACRA guidelines.
        </p>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <th style={{ padding: "12px" }}>Company Name</th>
              <th style={{ padding: "12px" }}>UEN</th>
              <th style={{ padding: "12px" }}>Financial Year End</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--surface-border)", background: "rgba(255,255,255,0.02)" }}>
              <td style={{ padding: "12px", fontWeight: 500 }}>TechNova Pte Ltd</td>
              <td style={{ padding: "12px", color: "var(--text-muted)" }}>202312345A</td>
              <td style={{ padding: "12px" }}>31 Dec</td>
              <td style={{ padding: "12px" }}><span className="badge" style={{background: "var(--success)", color: "white"}}>Active</span></td>
              <td style={{ padding: "12px" }}><button className="btn" onClick={() => setSelectedClient("TechNova Pte Ltd")} style={{padding: "4px 8px", fontSize: "12px"}}>Manage</button></td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <td style={{ padding: "12px", fontWeight: 500 }}>Global Trade Corp</td>
              <td style={{ padding: "12px", color: "var(--text-muted)" }}>202198765B</td>
              <td style={{ padding: "12px" }}>30 Jun</td>
              <td style={{ padding: "12px" }}><span className="badge" style={{background: "var(--success)", color: "white"}}>Active</span></td>
              <td style={{ padding: "12px" }}><button className="btn" onClick={() => setSelectedClient("Global Trade Corp")} style={{padding: "4px 8px", fontSize: "12px"}}>Manage</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal / Sliding Panel for Client Details */}
      {selectedClient && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{
            width: "550px", background: "var(--surface)", border: "1px solid var(--surface-border)",
            borderRadius: "12px", padding: "30px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "20px" }}>Company Profile</h2>
              <button onClick={() => setSelectedClient(null)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "24px" }}>×</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "12px", display: "block" }}>Company Name</span>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>{selectedClient}</span>
              </div>
              <div style={{ display: "flex", gap: "40px" }}>
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "12px", display: "block" }}>UEN</span>
                  <span style={{ fontSize: "14px" }}>{mockClientDetails[selectedClient].uen}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "12px", display: "block" }}>Financial Year End</span>
                  <span style={{ fontSize: "14px" }}>{mockClientDetails[selectedClient].fye}</span>
                </div>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "12px", display: "block" }}>Registered Address</span>
                <span style={{ fontSize: "14px" }}>{mockClientDetails[selectedClient].address}</span>
              </div>
              
              {/* Directors Section */}
              <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "12px", display: "block", marginBottom: "12px", fontWeight: "bold" }}>OFFICIAL DIRECTORS & CONTACTS</span>
                {mockClientDetails[selectedClient].directors.map((dir: any, i: number) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "8px", fontSize: "13px", marginBottom: i === mockClientDetails[selectedClient].directors.length - 1 ? 0 : "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "28px", height: "28px", background: "var(--primary-color)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>{dir.name.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{dir.name} <span style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: "normal" }}>({dir.nric})</span></div>
                      </div>
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      {dir.email}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid var(--surface-border)", display: "flex", gap: "10px" }}>
              <button className="btn" style={{ flex: 1, background: "var(--primary-color)" }}>Draft Resolution</button>
              <button className="btn" style={{ flex: 1, background: "transparent", border: "1px solid var(--surface-border)" }}>Edit Profile</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
