import { useMemo } from "react";
import { useNoteStore } from "../hooks/useNoteStore";

// Simple markdown parser (can be replaced with marked or similar)
function parseMarkdown(content: string): string {
  if (!content) return "";

  let html = content
    // Headers
    .replace(/^### (.*$)/gim, "<h3 class=\"text-lg font-bold mt-4 mb-2\">$1</h3>")
    .replace(/^## (.*$)/gim, "<h2 class=\"text-xl font-bold mt-5 mb-3\">$1</h2>")
    .replace(/^# (.*$)/gim, "<h1 class=\"text-2xl font-bold mt-6 mb-4\">$1</h1>")
    // Bold and Italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/gim, "<pre class=\"bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto my-3\"><code class=\"text-sm\">$2</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/gim, "<code class=\"bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm\">$1</code>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, "<li class=\"ml-4\">$1</li>")
    // Blockquotes
    .replace(/^\> (.*$)/gim, "<blockquote class=\"border-l-4 border-indigo-500 pl-4 my-3 italic text-gray-600 dark:text-gray-400\">$1</blockquote>")
    // Horizontal rule
    .replace(/^---$/gim, "<hr class=\"my-4 border-gray-300 dark:border-gray-600\">")
    // Paragraphs
    .replace(/\n\n/gim, "</p><p class=\"my-2\">")
    // Line breaks
    .replace(/\n/gim, "<br>");

  return `<div class="prose dark:prose-invert max-w-none">${html}</div>`;
}

export default function Preview() {
  const { currentNote } = useNoteStore();

  const htmlContent = useMemo(() => {
    if (!currentNote) return "";
    return parseMarkdown(currentNote.content);
  }, [currentNote]);

  if (!currentNote) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <p>预览区域</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-white dark:bg-gray-800">
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
