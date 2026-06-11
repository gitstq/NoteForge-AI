import { useState } from "react";
import {
  FileText,
  Search,
  Sparkles,
  FolderOpen,
  Plus,
  ChevronRight,
  ChevronDown,
  Settings,
} from "lucide-react";
import { useNoteStore } from "../hooks/useNoteStore";
import { Note, Folder } from "../hooks/useNoteStore";

interface SidebarProps {
  activePanel: "editor" | "search" | "ai";
  onPanelChange: (panel: "editor" | "search" | "ai") => void;
}

export default function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  const { notes, folders, currentNote, setCurrentNote, addNote } = useNoteStore();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: `# ${newNoteTitle}\n\n开始编写...`,
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    addNote(newNote);
    setNewNoteTitle("");
    setShowNewNote(false);
    onPanelChange("editor");
  };

  const navItems = [
    { id: "editor" as const, icon: FileText, label: "笔记" },
    { id: "search" as const, icon: Search, label: "搜索" },
    { id: "ai" as const, icon: Sparkles, label: "AI助手" },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg">NoteForge</span>
      </div>

      {/* Navigation */}
      <div className="p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activePanel === item.id
                ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Notes List */}
      {activePanel === "editor" && (
        <div className="flex-1 overflow-y-auto px-2">
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              我的笔记
            </span>
            <button
              onClick={() => setShowNewNote(!showNewNote)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {showNewNote && (
            <div className="px-2 mb-2">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateNote()}
                placeholder="笔记标题..."
                className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>
          )}

          <div className="space-y-0.5">
            {folders.map((folder) => (
              <div key={folder.id}>
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  {expandedFolders.has(folder.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <FolderOpen className="w-4 h-4 text-yellow-500" />
                  <span className="truncate">{folder.name}</span>
                </button>
              </div>
            ))}

            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => {
                  setCurrentNote(note);
                  onPanelChange("editor");
                }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
                  currentNote?.id === note.id
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="truncate">{note.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          <span>设置</span>
        </button>
      </div>
    </div>
  );
}
