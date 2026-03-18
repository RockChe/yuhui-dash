export function pD(s) {
  if (!s) return null;
  const p = s.split(" ");
  const [y, m, d] = p[0].split("/").map(Number);
  if (p[1]) {
    const [hh, mm] = (p[1]).split(":").map(Number);
    return new Date(y, m - 1, d, hh || 0, mm || 0);
  }
  return new Date(y, m - 1, d);
}

export function fD(s) { return s ? s.replace(/\//g, ".") : "\u2014"; }
export function toISO(s) { if (!s) return ""; const p = s.split(" "); return p[0].replace(/\//g, "-"); }
export function fromISO(s) { if (!s) return ""; const p = s.split(" "); return p[0].replace(/-/g, "/"); }

export function computeProgress(tid, subs) {
  const s = subs.filter(x => x.task_id === tid);
  if (!s.length) return { total: 0, done: 0, pct: 0 };
  const d = s.filter(x => x.done).length;
  return { total: s.length, done: d, pct: Math.round(d / s.length * 100) };
}

export function toggleSubMem(subs, id) {
  return subs.map(s => s.id === id ? { ...s, done: !s.done, done_date: !s.done ? new Date().toLocaleDateString("zh-TW") : null } : s);
}

export function tasksToCSV(tasks) {
  const h = ["id", "project", "task", "status", "category", "start", "duration", "end", "owner", "priority", "notes"];
  const rows = [h.join(","), ...tasks.map(t => h.map(k => `"${(t[k] ?? "").toString().replace(/"/g, '""')}"`).join(","))];
  return rows.join("\n");
}

export function parseCSV(text) {
  const lines = text.split("\n").filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim());
  return lines.slice(1).map(line => {
    const vals = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; }
      else if (c === "," && !inQ) { vals.push(cur.trim().replace(/^"|"$/g, "")); cur = ""; }
      else { cur += c; }
    }
    vals.push(cur.trim().replace(/^"|"$/g, ""));
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ""; });
    obj.duration = obj.duration ? parseInt(obj.duration) : null;
    obj.sort_order = 0;
    if (!obj.start || obj.start === "") obj.start = null;
    if (!obj.end || obj.end === "") obj.end = null;
    return obj;
  });
}

export function downloadCSV(content, filename) {
  const bom = "\uFEFF";
  const blob = new Blob([bom + content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function getTemplate() {
  return "id,project,task,status,category,start,duration,end,owner,priority,notes\nT99,專案名稱,任務名稱,待辦,活動,2026/01/01,30,2026/01/31,負責人,中,備註";
}

const SHEET_FIELD_MAP = {
  "專案名稱": "project",
  "任務名稱": "task",
  "負責人": "owner",
  "狀態": "status",
  "層級": "category",
  "開始日期": "start",
  "持續時間": "duration",
  "結束日期": "end",
  "更新事項/備註": "notes",
};

export function parseGoogleSheetCSV(text) {
  const lines = text.split("\n").filter(l => l.trim());
  if (lines.length < 2) return [];
  const rawHeaders = [];
  let cur = "", inQ = false;
  for (let i = 0; i < lines[0].length; i++) {
    const c = lines[0][i];
    if (c === '"') { inQ = !inQ; }
    else if (c === "," && !inQ) { rawHeaders.push(cur.trim().replace(/^"|"$/g, "")); cur = ""; }
    else { cur += c; }
  }
  rawHeaders.push(cur.trim().replace(/^"|"$/g, ""));

  const tasks = [];
  let idx = 0;
  for (let r = 1; r < lines.length; r++) {
    const line = lines[r];
    const vals = [];
    let v = "", q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { q = !q; }
      else if (c === "," && !q) { vals.push(v.trim().replace(/^"|"$/g, "")); v = ""; }
      else { v += c; }
    }
    vals.push(v.trim().replace(/^"|"$/g, ""));

    const raw = {};
    rawHeaders.forEach((h, i) => { raw[h] = vals[i] || ""; });

    const obj = {};
    for (const [sheetCol, appField] of Object.entries(SHEET_FIELD_MAP)) {
      obj[appField] = raw[sheetCol] || "";
    }

    // Skip empty rows (no project and no task)
    if (!obj.project && !obj.task) continue;

    idx++;
    obj.id = `T${String(idx).padStart(2, "0")}`;
    obj.sort_order = idx;
    obj.priority = "中";
    obj.owner = obj.owner || "—";
    obj.duration = obj.duration ? parseInt(obj.duration) : null;
    if (!obj.start) obj.start = null;
    if (!obj.end) obj.end = null;

    tasks.push(obj);
  }
  return tasks;
}

const FILE_CATS = {
  image: { emoji: "🖼️", label: "Images", exts: ["png","jpg","jpeg","gif","svg","webp","bmp","ico","tiff"] },
  document: { emoji: "📄", label: "Documents", exts: ["pdf","doc","docx","txt","rtf","odt","pages"] },
  spreadsheet: { emoji: "📊", label: "Spreadsheets", exts: ["xls","xlsx","csv","numbers","ods"] },
  presentation: { emoji: "📽️", label: "Presentations", exts: ["ppt","pptx","key","odp"] },
  video: { emoji: "🎬", label: "Videos", exts: ["mp4","mov","avi","mkv","webm","wmv"] },
  audio: { emoji: "🎵", label: "Audio", exts: ["mp3","wav","ogg","flac","aac","m4a"] },
  archive: { emoji: "📦", label: "Archives", exts: ["zip","rar","7z","tar","gz","bz2"] },
};

export function getFileCategory(filename) {
  const ext = (filename || "").split(".").pop().toLowerCase();
  for (const [key, cat] of Object.entries(FILE_CATS)) {
    if (cat.exts.includes(ext)) return { key, emoji: cat.emoji, label: cat.label };
  }
  return { key: "other", emoji: "📎", label: "Other" };
}

export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
  return (bytes / 1073741824).toFixed(1) + " GB";
}

export function extractDomain(url) {
  try {
    const h = new URL(url).hostname;
    return h.replace(/^www\./, "");
  } catch { return url; }
}
