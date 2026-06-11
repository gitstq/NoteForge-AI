import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import SearchPanel from "./components/SearchPanel";
import AIPanel from "./components/AIPanel";
import { useNoteStore } from "./hooks/useNoteStore";

function App() {
  const [activePanel, setActivePanel] = useState<"editor" | "search" | "ai">("editor");
  const [showPreview, setShowPreview] = useState(true);
  const { currentNote } = useNoteStore();

  return (
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 justify-between bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
              NoteForge AI
            </h1>
            {currentNote && (
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">
                / {currentNote.title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {showPreview ? "隐藏预览" : "显示预览"}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            {activePanel === "editor" && (
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex"
              >
                <div className={`${showPreview ? "w-1/2" : "w-full"} h-full`}>
                  <Editor />
                </div>
                {showPreview && (
                  <div className="w-1/2 h-full border-l border-gray-200 dark:border-gray-700">
                    <Preview />
                  </div>
                )}
              </motion.div>
            )}

            {activePanel === "search" && (
              <motion.div
                key="search"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <SearchPanel />
              </motion.div>
            )}

            {activePanel === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <AIPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
