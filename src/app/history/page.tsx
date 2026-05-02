"use client";
import { jsPDF } from "jspdf";

export default function DocumentHistory() {
  const handleDownloadPDF = (title: string, company: string) => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text("DIRECTORS' RESOLUTION IN WRITING", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`COMPANY: ${company}`, 20, 40);
    doc.text(`SUBJECT: ${title}`, 20, 50);
    doc.text(`DATE: ${new Date().toLocaleDateString('en-SG')}`, 20, 60);
    
    const mockContent = `NOTED THAT the Company has proposed to execute the changes as requested by the Management.\n\nIT IS RESOLVED THAT:\n(a) The proposed changes be and are hereby approved.\n(b) Any Director or the Company Secretary be and is hereby authorised to lodge the necessary notifications with the Accounting and Corporate Regulatory Authority (ACRA).`;
    
    const splitText = doc.splitTextToSize(mockContent, 170);
    doc.text(splitText, 20, 80);
    
    doc.text("_____________________", 20, 140);
    doc.text("Director's Signature", 20, 150);

    // 如果是历史记录里已经 Completed 的文件，我们给它加上一个逼真的电子签名和审计戳印
    if (title.includes("Resignation")) {
      doc.setTextColor(0, 51, 153); // 深蓝色
      doc.setFont("times", "italic");
      doc.setFontSize(24);
      doc.text("Jane Doe", 25, 135); // 模拟手写连笔字签名
      
      doc.setTextColor(200, 0, 0); // 红色戳印
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("[ VERIFIED E-SIGNATURE ]", 120, 135);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Signed by: Jane Doe (jane.doe@globaltrade.com)", 120, 140);
      doc.text(`Timestamp: ${new Date().toISOString()}`, 120, 145);
      doc.text("IP Address: 118.200.12.34 (Singapore)", 120, 150);
      doc.text("Secured by CorpSec AI Audit Trail", 120, 155);
    }

    doc.save(`${title.replace(/ /g, "_")}.pdf`);
  };

  return (
    <>
      <div className="header">
        <h1 className="page-title">Document History</h1>
      </div>

      <div className="card">
        <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
          All AI-generated resolutions and their current signing status are securely logged here.
        </p>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <th style={{ padding: "12px" }}>Document Title</th>
              <th style={{ padding: "12px" }}>Company</th>
              <th style={{ padding: "12px" }}>Generated Date</th>
              <th style={{ padding: "12px" }}>Sign Status</th>
              <th style={{ padding: "12px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--surface-border)", background: "rgba(255,255,255,0.02)" }}>
              <td style={{ padding: "12px", fontWeight: 500 }}>Change of Address Resolution</td>
              <td style={{ padding: "12px", color: "var(--text-muted)" }}>TechNova Pte Ltd</td>
              <td style={{ padding: "12px" }}>2 mins ago</td>
              <td style={{ padding: "12px" }}><span className="badge badge-warning">Pending Signature</span></td>
              <td style={{ padding: "12px" }}>
                <button className="btn" onClick={() => handleDownloadPDF("Change of Address Resolution", "TechNova Pte Ltd")} style={{padding: "4px 8px", fontSize: "12px"}}>View PDF</button>
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <td style={{ padding: "12px", fontWeight: 500 }}>Director Resignation (Jane Doe)</td>
              <td style={{ padding: "12px", color: "var(--text-muted)" }}>Global Trade Corp</td>
              <td style={{ padding: "12px" }}>Yesterday</td>
              <td style={{ padding: "12px" }}><span className="badge" style={{background: "var(--success)", color: "white"}}>Completed</span></td>
              <td style={{ padding: "12px" }}>
                <button className="btn" onClick={() => handleDownloadPDF("Director Resignation", "Global Trade Corp")} style={{padding: "4px 8px", fontSize: "12px"}}>Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
