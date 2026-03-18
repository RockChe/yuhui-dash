"use client";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { fetchData, fetchGoogleSheet, SEED_TASKS } from "@/lib/data";
import { computeProgress, toggleSubMem } from "@/lib/utils";
import { arrayMove } from "@dnd-kit/sortable";

export default function useTaskManager() {
  const { tasks: iT, subtasks: iS } = fetchData();
  const [allT, setAllT] = useState(iT);
  const [allS, setAllS] = useState(iS);
  const [allL, setAllL] = useState([]);
  const [allF, setAllF] = useState([]);
  const [toast, setToast] = useState(null);
  const [sheetLoading, setSheetLoading] = useState(true);
  const [sheetError, setSheetError] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetchGoogleSheet()
      .then(tasks => {
        if (cancelled) return;
        setAllT(tasks);
        setAllS([]);
        setSheetLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        console.warn("Google Sheet fetch failed, using seed data:", err);
        setSheetError(err.message);
        setAllS([]);
        setSheetLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const showToast = useCallback((msg, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type, fading: false });
    toastTimer.current = setTimeout(() => {
      setToast(prev => prev ? { ...prev, fading: true } : null);
      setTimeout(() => setToast(null), 300);
    }, 2200);
  }, []);

  const toggleSub = id => setAllS(p => toggleSubMem(p, id));
  const updateTask = useCallback((id, f, v) => setAllT(p => p.map(t => t.id === id ? { ...t, [f]: v } : t)), []);
  const updateSub = useCallback((id, f, v) => setAllS(p => p.map(s => s.id === id ? { ...s, [f]: v } : s)), []);

  const addTask = useCallback((proj, data) => {
    const mx = allT.reduce((m, t) => { const n = parseInt(t.id.replace("T", "")); return n > m ? n : m; }, 0);
    const ms = allT.reduce((m, t) => t.sort_order > m ? t.sort_order : m, 0);
    setAllT(p => [...p, { id: `T${String(mx + 1).padStart(2, "0")}`, project: proj, status: "待辦", category: "活動", priority: "中", owner: "—", notes: "", sort_order: ms + 1, ...data }]);
    showToast("Task created", "success");
  }, [allT, showToast]);

  const deleteTask = useCallback(id => {
    setAllT(p => p.filter(t => t.id !== id));
    setAllS(p => p.filter(s => s.task_id !== id));
    setAllL(p => p.filter(l => l.task_id !== id));
    setAllF(p => p.filter(f => f.task_id !== id));
    showToast("Task deleted", "error");
  }, [showToast]);

  const addSub = useCallback((taskId, data) => {
    const mx = allS.reduce((m, s) => { const n = parseInt(s.id.replace("S", "")); return n > m ? n : m; }, 0);
    const maxOrder = allS.filter(s => s.task_id === taskId).reduce((m, s) => (s.sort_order || 0) > m ? (s.sort_order || 0) : m, 0);
    setAllS(p => [...p, { id: `S${String(mx + 1).padStart(2, "0")}`, task_id: taskId, done: false, done_date: null, notes: "", sort_order: maxOrder + 1, ...data }]);
    showToast("Subtask added", "success");
  }, [allS, showToast]);

  const deleteSub = useCallback(id => {
    setAllS(p => p.filter(s => s.id !== id));
    showToast("Subtask deleted", "error");
  }, [showToast]);

  const renameProject = useCallback((oldName, newName) => {
    if (!newName.trim() || oldName === newName) return;
    setAllT(p => p.map(t => t.project === oldName ? { ...t, project: newName } : t));
    showToast("Project renamed", "success");
  }, [showToast]);

  const addLink = useCallback((taskId, data) => {
    const mx = allL.reduce((m, l) => { const n = parseInt(l.id.replace("L", "")); return n > m ? n : m; }, 0);
    setAllL(p => [...p, { id: `L${String(mx + 1).padStart(2, "0")}`, task_id: taskId, created: new Date().toLocaleDateString("zh-TW").replace(/\//g, "/"), ...data }]);
    showToast("Link added", "success");
  }, [allL, showToast]);

  const deleteLink = useCallback(id => {
    setAllL(p => p.filter(l => l.id !== id));
    showToast("Link deleted", "error");
  }, [showToast]);

  const addFile = useCallback((taskId, data) => {
    const mx = allF.reduce((m, f) => { const n = parseInt(f.id.replace("F", "")); return n > m ? n : m; }, 0);
    setAllF(p => [...p, { id: `F${String(mx + 1).padStart(2, "0")}`, task_id: taskId, created: new Date().toLocaleDateString("zh-TW").replace(/\//g, "/"), ...data }]);
    showToast("File uploaded", "success");
  }, [allF, showToast]);

  const deleteFile = useCallback(id => {
    setAllF(p => p.filter(f => f.id !== id));
    showToast("File deleted", "error");
  }, [showToast]);

  const reorderSubs = useCallback((taskId, activeId, overId) => {
    setAllS(prev => {
      const taskSubs = prev.filter(s => s.task_id === taskId).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      const rest = prev.filter(s => s.task_id !== taskId);
      const oldIdx = taskSubs.findIndex(s => s.id === activeId);
      const newIdx = taskSubs.findIndex(s => s.id === overId);
      if (oldIdx === -1 || newIdx === -1) return prev;
      const reordered = arrayMove(taskSubs, oldIdx, newIdx).map((s, i) => ({ ...s, sort_order: i + 1 }));
      return [...rest, ...reordered];
    });
  }, []);

  const twp = useMemo(() => allT.map(t => {
    const p = computeProgress(t.id, allS);
    return { ...t, progress: t.status === "已完成" ? 100 : p.pct, sDone: p.done, sTotal: p.total };
  }), [allT, allS]);

  const [configCats, setConfigCats] = useState(["商務合作", "活動", "播出/開始", "行銷", "發行", "市場展"]);
  const [configOwners, setConfigOwners] = useState([]);

  const reloadSheet = useCallback(() => {
    setSheetLoading(true);
    setSheetError(null);
    fetchGoogleSheet()
      .then(tasks => {
        setAllT(tasks);
        setAllS([]);
        setSheetLoading(false);
        showToast("Sheet reloaded", "success");
      })
      .catch(err => {
        setSheetError(err.message);
        setSheetLoading(false);
        showToast("Reload failed", "error");
      });
  }, [showToast]);

  return {
    allT, setAllT, allS, setAllS,
    allL, setAllL, allF, setAllF,
    twp,
    toast, showToast,
    toggleSub, updateTask, updateSub,
    addTask, deleteTask, addSub, deleteSub,
    addLink, deleteLink, addFile, deleteFile,
    renameProject, reorderSubs,
    configCats, setConfigCats, configOwners, setConfigOwners,
    sheetLoading, sheetError, reloadSheet,
  };
}
