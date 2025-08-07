import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, Code, Trash2 } from 'lucide-react';

interface CodeSnippetEditorProps {
  onInsert: (codeBlock: string) => void;
  initialCode?: string;
  initialLanguage?: string;
  initialTitle?: string;
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'scss', label: 'SCSS' },
  { value: 'json', label: 'JSON' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'xml', label: 'XML' },
  { value: 'php', label: 'PHP' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' }
];

const themeMapping = {
  light: 'light',
  dark: 'vs-dark',
  system: 'vs-dark' // fallback
};

export const CodeSnippetEditor = ({ 
  onInsert, 
  initialCode = '', 
  initialLanguage = 'javascript',
  initialTitle = ''
}: CodeSnippetEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [title, setTitle] = useState(initialTitle);
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Detect dark mode from document class or media query
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);
  
  const monacoTheme = isDarkMode ? 'vs-dark' : 'light';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleInsert = () => {
    const codeBlock = `
\`\`\`${language}${title ? `:${title}` : ''}
${code}
\`\`\`
`;
    onInsert(codeBlock);
  };

  const handleClear = () => {
    setCode('');
    setTitle('');
  };

  const editorOptions = {
    minimap: { enabled: true },
    fontSize: 14,
    lineNumbers: 'on' as const,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: 'on' as const,
    lineHeight: 1.5,
    fontFamily: "'Fira Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
    fontLigatures: true,
    cursorBlinking: 'smooth' as const,
    cursorSmoothCaretAnimation: true,
    smoothScrolling: true,
    contextmenu: true,
    links: true,
    folding: true,
    foldingStrategy: 'indentation' as const,
    showFoldingControls: 'always' as const,
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  };

  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="h-5 w-5 text-primary" />
            Code Snippet Editor
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="language">Programming Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Code Block Title (Optional)</Label>
            <Input
              id="title"
              placeholder="e.g., API Route Handler"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Monaco Editor */}
        <div className="border-t border-border">
          <Editor
            height="400px"
            language={language}
            value={code}
            theme={monacoTheme}
            onChange={(value) => setCode(value || '')}
            options={editorOptions}
            loading={
              <div className="flex items-center justify-center h-96 bg-muted">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading editor...</p>
                </div>
              </div>
            }
          />
        </div>
        
        {/* Preview */}
        {code && (
          <div className="border-t border-border p-4 bg-muted/30">
            <Label className="text-sm font-medium mb-2 block">Preview:</Label>
            <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
              <code>{`\`\`\`${language}${title ? `:${title}` : ''}\n${code}\n\`\`\``}</code>
            </pre>
          </div>
        )}
        
        {/* Insert Button */}
        <div className="p-4 border-t border-border bg-muted/10">
          <Button 
            onClick={handleInsert} 
            className="w-full"
            disabled={!code.trim()}
          >
            <Code className="h-4 w-4 mr-2" />
            Insert Code Snippet into Blog
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
