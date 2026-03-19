"use client";
import { useState, useEffect, useMemo } from "react";
import { X } from "@/lib/theme";

export default function ImportModal({ pendingTasks, existingTasks, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onCancel]);

  const { duplicateCount, projectSummary } = useMemo(() => {
    const existingKeys = new Set(
      existingTasks.map(t => `${(t.project || "").toLowerCase().trim()}::${(t.task || "").toLowerCase().trim()}`)
    );
    let dupes = 0;
    const projMap = {};
    pendingTasks.forEach(t => {
      const key = `${(t.project || "").toLowerCase().trim()}::${(t.task || "").toLowerCase().trim()}`;
      if (existingKeys.has(key)) dupes++;
      const proj = t.project || "(no project)";
      projMap[proj] = (projMap[proj] || 0) + 1;
    });
    return { duplicateCount: dupes, projectSummary: Object.entries(projMap).sort((a, b) => b[1] - a[1]) };
  }, [pendingTasks, existingTasks]);

  const handleConfirm = async (mode) => {
    setLoading(true);
    try {
      await onConfirm(mode);
    } finally {
      setLoading(false);
    }
  };

  if (!pendingTasks.length) {
    return (
      <div onClick={onCancel} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div onClick={e => e.stopPropagation()} style={{ background: X.surface, borderRadius: 16, width: "100%", maxWidth: 420, boxShadow: `0 16px 48px ${X.shadowHeavy}`, border: `1px solid ${X.border}` }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${X.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Import</span>
            <button onClick={onCancel} style={{ background: "transparent", border: "none", fontSize: 20, color: X.textDim, cursor: "pointer", padding: "2px 6px", lineHeight: 1 }}>×</button>
          </div>
          <div style={{ padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: X.textSec, marginBottom: 16 }}>No importable data found.</div>
            <button onClick={onCancel} style={{ background: X.accent, color: "#fff", border: "none", borderRadius: 20, padding: "8px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>OK</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onCancel} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: X.surface, borderRadius: 16, width: "100%", maxWidth: 480, maxHeight: "80vh", overflowY: "auto", boxShadow: `0 16px 48px ${X.shadowHeavy}`, border: `1px solid ${X.border}` }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${X.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Import {pendingTasks.length} Tasks</span>
          <button onClick={onCancel} style={{ background: "transparent", border: "none", fontSize: 20, color: X.textDim, cursor: "pointer", padding: "2px 6px", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 20 }}>
          {duplicateCount > 0 && (
            <div style={{ background: `${X.amber}18`, border: `1px solid ${X.amber}40`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: X.textSec }}>
              {duplicateCount} of {pendingTasks.length} tasks match existing tasks (same project + task name).
            </div>
          )}

          <div style={{ fontSize: 13, fontWeight: 600, color: X.textDim, marginBottom: 8 }}>By Project</div>
          <div style={{ background: X.surfaceLight, borderRadius: 8, border: `1px solid ${X.border}`, marginBottom: 20, maxHeight: 200, overflowY: "auto" }}>
            {projectSummary.map(([proj, count]) => (
              <div key={proj} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", borderBottom: `1px solid ${X.border}`, fontSize: 13 }}>
                <span style={{ color: X.text }}>{proj}</span>
                <span style={{ color: X.textDim }}>{count} tasks</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
            <button onClick={onCancel} disabled={loading} style={{ background: X.surface, color: X.textSec, border: `1px solid ${X.border}`, borderRadius: 20, padding: "8px 20px", fontSize: 14, cursor: "pointer" }}>Cancel</button>
            {duplicateCount > 0 ? (
              <>
                <button onClick={() => handleConfirm("addNew")} disabled={loading} style={{ background: X.surfaceLight, color: X.accent, border: `1px solid ${X.accent}`, borderRadius: 20, padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Importing..." : "Add All as New"}
                </button>
                <button onClick={() => handleConfirm("overwrite")} disabled={loading} style={{ background: X.accent, color: "#fff", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Importing..." : "Overwrite Duplicates"}
                </button>
              </>
            ) : (
              <button onClick={() => handleConfirm("addNew")} disabled={loading} style={{ background: X.accent, color: "#fff", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
                {loading ? "Importing..." : "Import"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
