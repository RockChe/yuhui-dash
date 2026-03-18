"use client";
import { useState, useEffect, useRef } from "react";
import { X, getIS2 } from "@/lib/theme";
import { pD, fD, extractDomain, getFileCategory, formatFileSize } from "@/lib/utils";
import CalendarPicker from "./CalendarPicker";
import TagInput from "./TagInput";
import EditableCell from "./EditableCell";
import InlineNote from "./InlineNote";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableSubItem({ sub, toggleSub, updateSub, deleteSub, configOwners }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sub.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span {...attributes} {...listeners} style={{ cursor: "grab", fontSize: 14, color: X.textDim, flexShrink: 0, userSelect: "none" }}>⠿</span>
        <span onClick={() => toggleSub(sub.id)} style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, background: sub.done ? X.green : "transparent", border: sub.done ? "none" : `1.5px solid ${X.border}`, color: "#fff", cursor: "pointer" }}>{sub.done ? "✓" : ""}</span>
        <span style={{ flexShrink: 0, maxWidth: "40%" }}><EditableCell value={sub.name} onSave={v => updateSub(sub.id, "name", v)} style={{ fontSize: 14, color: X.textSec, textDecoration: sub.done ? "line-through" : "none", opacity: sub.done ? 0.5 : 1 }} /></span>
        <InlineNote value={sub.notes} onSave={v => updateSub(sub.id, "notes", v)} />
        <span><EditableCell value={sub.owner} onSave={v => updateSub(sub.id, "owner", v)} options={configOwners} style={{ fontSize: 13, color: X.textDim }} /></span>
        <button onClick={() => deleteSub(sub.id)} style={{ background: "transparent", border: "none", color: X.red, fontSize: 14, cursor: "pointer", padding: "2px 6px", opacity: 0.6 }}>×</button>
      </div>
    </div>
  );
}

export default function TaskModal({ task, project, onClose, addTask, updateTask, allS, addSub, deleteSub, toggleSub, updateSub, configCats, configOwners, reorderSubs, allL, allF, addLink, addFile, deleteLink, deleteFile }) {
  const isNew = task === "new";
  const [form, setForm] = useState(() => isNew ? { task: "", start: "", end: "", category: "活動", priority: "中", owner: "—", status: "待辦", notes: "" } : { task: task.task || "", start: task.start || "", end: task.end || "", category: task.category || "活動", priority: task.priority || "中", owner: task.owner || "—", status: task.status || "待辦", notes: task.notes || "" });
  const [subDraft, setSubDraft] = useState({ name: "", owner: "" });
  const [showSubInput, setShowSubInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkDraft, setLinkDraft] = useState({ url: "", title: "" });
  const fileInputRef = useRef(null);
  const tSubs = isNew ? [] : allS.filter(s => s.task_id === task.id).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const tLinks = isNew ? [] : (allL || []).filter(l => l.task_id === task.id);
  const tFiles = isNew ? [] : (allF || []).filter(f => f.task_id === task.id);
  const iS2 = getIS2();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  useEffect(() => { const h = e => { if (e.key === "Escape") onClose(); }; document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h); }, [onClose]);
  const handleConfirm = () => {
    if (!form.task.trim()) return;
    if (isNew) {
      const dur = (form.start && form.end) ? Math.max(1, Math.ceil((pD(form.end) - pD(form.start)) / 864e5)) : null;
      addTask(project, { task: form.task, start: form.start || null, end: form.end || null, duration: dur, owner: form.owner, category: form.category, priority: form.priority, notes: form.notes });
    } else {
      ["task", "start", "end", "category", "priority", "owner", "status", "notes"].forEach(f => {
        const orig = task[f] || ""; const cur = form[f] || "";
        if (orig !== cur) updateTask(task.id, f, (f === "start" || f === "end") ? (cur || null) : cur);
      });
      if (form.start && form.end) { const dur = Math.max(1, Math.ceil((pD(form.end) - pD(form.start)) / 864e5)); updateTask(task.id, "duration", dur); }
    }
    onClose();
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id && reorderSubs) {
      reorderSubs(task.id, active.id, over.id);
    }
  };
  const handleAddLink = () => {
    if (!linkDraft.url.trim()) return;
    addLink(task.id, { url: linkDraft.url.trim(), title: linkDraft.title.trim() || extractDomain(linkDraft.url.trim()) });
    setLinkDraft({ url: "", title: "" });
    setShowLinkInput(false);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      addFile(task.id, { name: file.name, size: file.size, type: file.type, dataUrl: ev.target.result });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const downloadFile = (f) => {
    const a = document.createElement("a");
    a.href = f.dataUrl;
    a.download = f.name;
    a.click();
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: X.surface, borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", boxShadow: `0 16px 48px ${X.shadowHeavy}`, border: `1px solid ${X.border}` }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${X.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{isNew ? "Create Task" : "Edit Task"}</span>
          <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 20, color: X.textDim, cursor: "pointer", padding: "2px 6px", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>Task Name *</div>
            <input value={form.task} onChange={e => setForm(p => ({ ...p, task: e.target.value }))} placeholder="Enter task name" autoFocus style={{ ...iS2, fontSize: 15, padding: "8px 12px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>Start Date</div><CalendarPicker value={form.start} onChange={v => setForm(p => ({ ...p, start: v }))} showTime /></div>
            <div><div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>End Date</div><CalendarPicker value={form.end} onChange={v => setForm(p => ({ ...p, end: v }))} showTime /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>Category</div><select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ ...iS2, cursor: "pointer" }}>{configCats.map(o => <option key={o}>{o}</option>)}</select></div>
            <div><div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>Priority</div><select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} style={{ ...iS2, cursor: "pointer" }}><option>高</option><option>中</option><option>低</option></select></div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>Owner</div>
            <TagInput value={form.owner} onChange={v => setForm(p => ({ ...p, owner: v }))} suggestions={configOwners} placeholder="Add owner..." />
          </div>
          {!isNew && <div>
            <div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>Status</div>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={{ ...iS2, cursor: "pointer" }}>
              {["已完成", "進行中", "待辦", "提案中", "待確認"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>}
          <div>
            <div style={{ fontSize: 12, color: X.textDim, marginBottom: 4 }}>Notes</div>
            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3} style={{ ...iS2, resize: "vertical", minHeight: 60 }} />
          </div>
          {!isNew && <div>
            <div style={{ fontSize: 12, color: X.textDim, marginBottom: 8, paddingTop: 8, borderTop: `1px solid ${X.border}` }}>Subtasks</div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={tSubs.map(s => s.id)} strategy={verticalListSortingStrategy}>
                {tSubs.map(sub => (
                  <SortableSubItem key={sub.id} sub={sub} toggleSub={toggleSub} updateSub={updateSub} deleteSub={deleteSub} configOwners={configOwners} />
                ))}
              </SortableContext>
            </DndContext>
            {showSubInput
              ? <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
                <input value={subDraft.name} onChange={e => setSubDraft(p => ({ ...p, name: e.target.value }))} placeholder="Subtask name" autoFocus onKeyDown={e => { if (e.key === "Enter" && subDraft.name.trim()) { addSub(task.id, { name: subDraft.name, owner: subDraft.owner }); setSubDraft({ name: "", owner: "" }); setShowSubInput(false); } if (e.key === "Escape") setShowSubInput(false); }} style={{ ...iS2, flex: 1, fontSize: 13, padding: "5px 10px", minWidth: 120 }} />
                <select value={subDraft.owner} onChange={e => setSubDraft(p => ({ ...p, owner: e.target.value }))} style={{ ...iS2, width: 100, fontSize: 13, padding: "5px 10px", cursor: "pointer" }}><option value="">Owner</option>{configOwners.map(o => <option key={o} value={o}>{o}</option>)}</select>
                <button onClick={() => { if (subDraft.name.trim()) { addSub(task.id, { name: subDraft.name, owner: subDraft.owner }); setSubDraft({ name: "", owner: "" }); setShowSubInput(false); } }} style={{ background: X.accent, color: "#fff", border: "none", borderRadius: 16, padding: "4px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Add</button>
                <button onClick={() => setShowSubInput(false)} style={{ background: "transparent", border: `1px solid ${X.border}`, borderRadius: 16, padding: "4px 10px", fontSize: 13, color: X.textSec, cursor: "pointer" }}>Cancel</button>
              </div>
              : <button onClick={() => { setShowSubInput(true); setSubDraft({ name: "", owner: "" }); }} style={{ background: "transparent", border: "none", color: X.accent, fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "4px 0" }}>+ Add subtask</button>
            }
          </div>}

          {/* Links Section */}
          {!isNew && <div>
            <div style={{ fontSize: 12, color: X.textDim, marginBottom: 8, paddingTop: 8, borderTop: `1px solid ${X.border}` }}>Links</div>
            {tLinks.map(l => (
              <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "4px 8px", borderRadius: 6, background: X.surfaceLight }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>🔗</span>
                <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, fontSize: 13, color: X.accent, textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={l.url}>
                  <span style={{ color: X.textDim, marginRight: 4 }}>{extractDomain(l.url)}</span>— {l.title}
                </a>
                <button onClick={() => deleteLink(l.id)} style={{ background: "transparent", border: "none", color: X.red, fontSize: 14, cursor: "pointer", padding: "2px 6px", opacity: 0.6 }}>×</button>
              </div>
            ))}
            {showLinkInput
              ? <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
                <input value={linkDraft.url} onChange={e => setLinkDraft(p => ({ ...p, url: e.target.value }))} placeholder="URL *" autoFocus onKeyDown={e => { if (e.key === "Enter") handleAddLink(); if (e.key === "Escape") setShowLinkInput(false); }} style={{ ...iS2, flex: 2, fontSize: 13, padding: "5px 10px", minWidth: 160 }} />
                <input value={linkDraft.title} onChange={e => setLinkDraft(p => ({ ...p, title: e.target.value }))} placeholder="Title" onKeyDown={e => { if (e.key === "Enter") handleAddLink(); }} style={{ ...iS2, flex: 1, fontSize: 13, padding: "5px 10px", minWidth: 80 }} />
                <button onClick={handleAddLink} style={{ background: X.accent, color: "#fff", border: "none", borderRadius: 16, padding: "4px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Add</button>
                <button onClick={() => { setShowLinkInput(false); setLinkDraft({ url: "", title: "" }); }} style={{ background: "transparent", border: `1px solid ${X.border}`, borderRadius: 16, padding: "4px 10px", fontSize: 13, color: X.textSec, cursor: "pointer" }}>Cancel</button>
              </div>
              : <button onClick={() => setShowLinkInput(true)} style={{ background: "transparent", border: "none", color: X.accent, fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "4px 0" }}>+ Add link</button>
            }
          </div>}

          {/* Files Section */}
          {!isNew && <div>
            <div style={{ fontSize: 12, color: X.textDim, marginBottom: 8, paddingTop: 8, borderTop: `1px solid ${X.border}` }}>Files</div>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
            {tFiles.map(f => {
              const cat = getFileCategory(f.name);
              return (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "4px 8px", borderRadius: 6, background: X.surfaceLight }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{cat.emoji}</span>
                  <span onClick={() => downloadFile(f)} style={{ flex: 1, fontSize: 13, color: X.textSec, cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title="Click to download">{f.name}</span>
                  <span style={{ fontSize: 12, color: X.textDim, flexShrink: 0 }}>{formatFileSize(f.size)}</span>
                  <button onClick={() => deleteFile(f.id)} style={{ background: "transparent", border: "none", color: X.red, fontSize: 14, cursor: "pointer", padding: "2px 6px", opacity: 0.6 }}>×</button>
                </div>
              );
            })}
            <button onClick={() => fileInputRef.current?.click()} style={{ background: "transparent", border: "none", color: X.accent, fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "4px 0" }}>📎 Upload File</button>
          </div>}
        </div>
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${X.border}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} style={{ background: X.surface, color: X.textSec, border: `1px solid ${X.border}`, borderRadius: 20, padding: "8px 20px", fontSize: 14, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleConfirm} disabled={!form.task.trim()} style={{ background: form.task.trim() ? X.accent : X.border, color: "#fff", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 14, fontWeight: 700, cursor: form.task.trim() ? "pointer" : "not-allowed" }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
