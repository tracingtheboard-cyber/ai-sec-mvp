"use client";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [showDraft, setShowDraft] = useState(false);
  const [isSendingSign, setIsSendingSign] = useState(false);

  useEffect(() => {
    const pendingDraft = localStorage.getItem("pendingDraft");
    if (pendingDraft) {
      setPrompt(pendingDraft);
      localStorage.removeItem("pendingDraft");
    }
  }, []);

  const handleSendSign = async () => {
    const targetEmail = window.prompt("Enter the Director's email to send the signature request to:", "admin@osometeam.com");
    if (!targetEmail) return;

    setIsSendingSign(true);
    try {
      const res = await fetch('/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftText: generatedDraft, email: targetEmail })
      });
      const data = await res.json();
      if (data.success) {
        alert("🚀 Success! The signature request has been securely emailed to " + targetEmail);
      } else {
        alert("Error: " + data.error);
      }
    } catch (e) {
      alert("Failed to connect to signature API.");
    }
    setIsSendingSign(false);
  };

  const handleGenerate = async (overridePrompt?: string) => {
    const finalPrompt = overridePrompt || prompt;
    if (!finalPrompt.trim()) return;
    
    setIsGenerating(true);
    setShowDraft(true);
    setGeneratedDraft("Connecting to AI Brain... Please wait.");
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt })
      });
      
      const data = await res.json();
      
      if (data.draft) {
        setGeneratedDraft("");
        const draftText = data.draft;
        let i = 0;
        const intervalId = setInterval(() => {
          setGeneratedDraft((prev) => prev + draftText.charAt(i));
          i++;
          if (i >= draftText.length) {
            clearInterval(intervalId);
            setIsGenerating(false);
          }
        }, 10);
      } else {
        setGeneratedDraft("Error: Failed to generate resolution.");
        setIsGenerating(false);
      }
    } catch (error) {
      setGeneratedDraft("Error: API Connection Failed.");
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    
    // Auto-wrap text to fit A4 width
    const splitText = doc.splitTextToSize(generatedDraft, 170);
    doc.text(splitText, 20, 20);
    
    doc.save("Board_Resolution.pdf");
  };

  return (
    <>
      <div className="header">
        <h1 className="page-title">Welcome back, Secretary</h1>
        <div className="user-profile">
          <div className="avatar">A</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Stat Cards */}
        <div className="card stat-card">
          <span className="stat-title">Managed Companies</span>
          <span className="stat-value">124</span>
          <span className="stat-trend trend-up">↑ 12 this month</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">Upcoming AGM (30 Days)</span>
          <span className="stat-value">8</span>
          <span className="stat-trend trend-down">⚠️ 2 Overdue</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">AI Resolutions Drafted</span>
          <span className="stat-value">842</span>
          <span className="stat-trend trend-up">↑ Saved 140 hours</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">Pending Signatures</span>
          <span className="stat-value">15</span>
          <span className="stat-trend" style={{color: "var(--text-muted)"}}>In Progress</span>
        </div>

        {/* AI Drafter Quick Access */}
        <div className="card main-panel" style={{ background: "linear-gradient(145deg, rgba(30,30,40,0.8) 0%, rgba(15,15,20,0.8) 100%)", display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <h2 className="action-title" style={{fontSize: "20px"}}>✨ AI Resolution Drafter</h2>
            <span className="badge badge-warning">Live API Connected</span>
          </div>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            Draft ACRA-compliant Board Resolutions instantly using natural language.
          </p>
          
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g., TechNova wants to change address to 123 Marina Bay Sands..." 
              style={{ flex: 1, padding: "16px", borderRadius: "8px", border: "1px solid var(--surface-border)", background: "rgba(0,0,0,0.3)", color: "white", outline: "none", fontFamily: "inherit", fontSize: "15px" }}
              disabled={isGenerating}
            />
            <button className="btn" onClick={handleGenerate} disabled={isGenerating} style={{ opacity: isGenerating ? 0.7 : 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              {isGenerating ? "Drafting..." : "Generate"}
            </button>
          </div>

          {showDraft ? (
             <div style={{ 
                flex: 1, 
                // 修改样式：模拟一张真实的 A4 白纸 PDF 预览效果
                background: "#ffffff", 
                border: "1px solid var(--surface-border)", 
                borderRadius: "4px", 
                padding: "40px", 
                fontFamily: "'Times New Roman', Times, serif", 
                whiteSpace: "pre-wrap",
                color: "#000000",
                lineHeight: "1.8",
                overflowY: "auto",
                position: "relative",
                maxHeight: "400px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
              }}>
                {isGenerating && <span style={{position: "absolute", top: "12px", right: "12px", fontSize: "12px", color: "var(--primary-color)", fontFamily: "Inter, sans-serif"}}>● Interfacing with LLM...</span>}
                {generatedDraft}
                {isGenerating && <span style={{ animation: "blink 1s step-end infinite" }}>|</span>}
                
                {!isGenerating && generatedDraft && !generatedDraft.includes("Error") && (
                   <div style={{marginTop: "40px", display: "flex", gap: "12px", borderTop: "1px dashed #ccc", paddingTop: "20px", fontFamily: "Inter, sans-serif"}}>
                      <button className="btn" onClick={handleDownloadPDF} style={{background: "var(--primary-color)"}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download PDF
                      </button>
                      <button className="btn" onClick={handleSendSign} disabled={isSendingSign} style={{background: "var(--success)", opacity: isSendingSign ? 0.7 : 1}}>
                        {isSendingSign ? "Sending..." : "Send to E-Sign"}
                      </button>
                   </div>
                )}
             </div>
          ) : (
            <div className="action-list">
              <div className="action-item" style={{ borderLeft: "3px solid var(--primary-color)" }}>
                <div className="action-info">
                  <span className="action-title">Director Resignation - OceanBlue Pte Ltd</span>
                  <span className="action-meta">Generated 10 mins ago • Pending Review</span>
                </div>
                <button className="btn" style={{ padding: "6px 12px", background: "transparent", border: "1px solid var(--primary-color)", color: "var(--primary-color)" }}>Review</button>
              </div>
            </div>
          )}
        </div>

        {/* Compliance Deadlines */}
        <div className="card side-panel">
          <div className="panel-header">
            <h2 className="action-title">Urgent Compliance</h2>
          </div>
          <div className="action-list">
            <div 
              className="action-item" 
              style={{ cursor: "pointer", transition: "transform 0.1s" }}
              onClick={() => {
                const autoPrompt = "Draft an Annual Return filing resolution for Alpha Logistics Pte Ltd (UEN: 201988888C). The active director signing is David Chen. They are 2 days away from deadline.";
                setPrompt(autoPrompt);
                handleGenerate(autoPrompt);
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateX(5px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}
            >
              <div className="action-info">
                <span className="action-title">Alpha Logistics Pte Ltd</span>
                <span className="action-meta">Annual Return Due</span>
              </div>
              <span className="badge badge-danger">2 Days Left</span>
            </div>
            
            <div 
              className="action-item" 
              style={{ cursor: "pointer", transition: "transform 0.1s" }}
              onClick={() => {
                const autoPrompt = "Draft the Annual General Meeting (AGM) notice and standard resolutions for Global Trade Corp (UEN: 202198765B). The sole director signing the resolution is Jane Doe.";
                setPrompt(autoPrompt);
                handleGenerate(autoPrompt);
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateX(5px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}
            >
              <div className="action-info">
                <span className="action-title">Global Trade Corp</span>
                <span className="action-meta">AGM Due</span>
              </div>
              <span className="badge badge-warning">5 Days Left</span>
            </div>
          </div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}} />
    </>
  );
}
