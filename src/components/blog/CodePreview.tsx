import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface CodePreviewProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

export const CodePreview = ({ code, language, title, className = '' }: CodePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create read-only Monaco editor for preview
    editorRef.current = monaco.editor.create(containerRef.current, {
      value: code,
      language: language,
      theme: 'vs-dark',
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: 'on',
      fontSize: 13,
      lineHeight: 1.4,
      fontFamily: "'Fira Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
      fontLigatures: true,
      contextmenu: false,
      links: false,
      folding: false,
      glyphMargin: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
      renderLineHighlight: 'none',
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8
      }
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, [code, language]);

  return (
    <div className={`border rounded-lg overflow-hidden bg-gray-900 ${className}`}>
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-300 text-sm font-medium ml-2">{title}</span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="h-auto min-h-[100px]" />
    </div>
  );
};
