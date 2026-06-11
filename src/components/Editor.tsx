import { useState, useEffect, useCallback } from "react";
import { useNoteStore } from "../hooks/useNoteStore";
import { Save, Wand2, Tag } from "lucide-react";

const API_BASE = "http://127.0.0.1:8787";

export default function Editor() {
  const { currentNote, updateNote } = useNoteStore();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (currentNote) {
      setContent(currentNote.content);
      setTitle(currentNote.title);
      setTags(currentNote.tags);
    } else {
      setContent("");
      setTitle("");
      setTags([]);
    }
  }, [currentNote]);

  const handleSave = useCallback(async () => {
    if (!currentNote) return;
    
    setIsSaving(true);
    try {
      const updated = {
        ...currentNote,
        title,
        content,
        tags,
        updated_at: new Date().toISOString(),
      };
      
      // API call to save
      await fetch(`${API_BASE}/api/notes/${currentNote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
      });
      
      updateNote(updated);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  }, [currentNote, title, content, tags, updateNote]);

  const handleGenerateTags = async () => {
    if (!content) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/ai/generate-tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, existing_tags: tags }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setTags([...new Set([...tags, ...data.tags])]);
      }
    } catch (error) {
      console.error("Tag generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  if (!currentNote) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-lg mb-2">选择一个笔记开始编辑</p>
          <p className="text-sm">或创建一个新笔记</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none focus:outline-none text-gray-900 dark:text-gray-100 w-64"
            placeholder="笔记标题"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateTags}
            disabled={isGenerating}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors disabled:opacity-50"
          >
            <Wand2 className="w-4 h-4" />
            {isGenerating ? "生成中..." : "AI标签"}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <Tag className="w-4 h-4 text-gray-400" />
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="+ 添加标签"
          className="text-xs bg-transparent border-none focus:outline-none w-20"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-4 resize-none bg-transparent border-none focus:outline-none font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200"
        placeholder="# 开始编写 Markdown..."
        spellCheck={false}
      />
    </div>
  );
}
