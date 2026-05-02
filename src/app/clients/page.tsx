export default function ClientsCRM() {
  return (
    <>
      <div className="header">
        <h1 className="page-title">Clients CRM</h1>
        <button className="btn">+ Add New Client</button>
      </div>

      <div className="card">
        <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
          This page will sync with your Supabase `companies` and `directors` tables.
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
              <td style={{ padding: "12px" }}><button className="btn" style={{padding: "4px 8px", fontSize: "12px"}}>Manage</button></td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <td style={{ padding: "12px", fontWeight: 500 }}>Global Trade Corp</td>
              <td style={{ padding: "12px", color: "var(--text-muted)" }}>202198765B</td>
              <td style={{ padding: "12px" }}>30 Jun</td>
              <td style={{ padding: "12px" }}><span className="badge" style={{background: "var(--success)", color: "white"}}>Active</span></td>
              <td style={{ padding: "12px" }}><button className="btn" style={{padding: "4px 8px", fontSize: "12px"}}>Manage</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
