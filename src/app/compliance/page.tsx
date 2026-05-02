export default function ComplianceRadar() {
  return (
    <>
      <div className="header">
        <h1 className="page-title">Compliance Radar</h1>
      </div>

      <div className="card">
        <h2 className="action-title" style={{marginBottom: "20px"}}>Upcoming Deadlines (Next 60 Days)</h2>
        <div className="action-list">
          <div className="action-item" style={{ borderLeft: "3px solid var(--danger)" }}>
            <div className="action-info">
              <span className="action-title">Alpha Logistics Pte Ltd - Annual Return</span>
              <span className="action-meta">Due in 2 days (15 Nov) • Overdue Fine: $300</span>
            </div>
            <button className="btn" style={{background: "var(--danger)"}}>Draft Resolution</button>
          </div>
          <div className="action-item" style={{ borderLeft: "3px solid var(--warning)" }}>
            <div className="action-info">
              <span className="action-title">Global Trade Corp - AGM</span>
              <span className="action-meta">Due in 5 days (18 Nov)</span>
            </div>
            <button className="btn">Draft Resolution</button>
          </div>
        </div>
      </div>
    </>
  );
}
