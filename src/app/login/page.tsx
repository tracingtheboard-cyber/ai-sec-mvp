"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

export default function Login() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // 在本地种下一个 auth=true 的 Cookie，有效期 1 天
    document.cookie = "auth=true; path=/; max-age=86400";
    
    // 模拟登录延迟，让演示看起来更真实
    setTimeout(() => {
      router.push("/");
      router.refresh(); // 强制刷新路由以触发中间件校验
    }, 1200);
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #09090b 0%, #1a1a24 100%)",
      color: "#e2e8f0",
      fontFamily: "Inter, sans-serif",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(25, 25, 35, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%)",
            marginBottom: "20px",
            boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)"
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0", color: "white" }}>CorpSec AI</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0 }}>
            Intelligent Corporate Secretarial Platform
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#a1a1aa" }}>Work Email</label>
            <input 
              type="email" 
              required
              defaultValue="admin@osometeam.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "white",
                outline: "none",
                fontSize: "15px",
                transition: "border 0.2s"
              }}
            />
          </div>
          
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#a1a1aa" }}>Password</label>
              <span style={{ fontSize: "13px", color: "var(--primary-color)", cursor: "pointer" }}>Forgot?</span>
            </div>
            <input 
              type="password" 
              required
              defaultValue="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "white",
                outline: "none",
                fontSize: "15px",
                transition: "border 0.2s"
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoggingIn}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "14px",
              background: "var(--primary-color)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: isLoggingIn ? "not-allowed" : "pointer",
              transition: "transform 0.1s, opacity 0.2s",
              opacity: isLoggingIn ? 0.7 : 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {isLoggingIn ? (
              <>
                <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{animation: "spin 1s linear infinite"}}><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                Authenticating...
              </>
            ) : "Sign In to Workspace"}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "30px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            Secured by enterprise-grade encryption.
          </p>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
