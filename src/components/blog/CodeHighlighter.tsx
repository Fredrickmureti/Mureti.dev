import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeHighlighterProps {
  code: string;
  language: string;
  title?: string;
}

export const CodeHighlighter = ({ code, language, title }: CodeHighlighterProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg overflow-hidden border border-[#3e3e42] bg-[#1e1e1e] my-4">
      {/* Header with macOS-style buttons and language indicator */}
      <div className="flex items-center justify-between bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42]">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-3">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
          </div>
          {title && (
            <span className="text-[#cccccc] text-sm font-medium mr-2">
              {title}
            </span>
          )}
          {language && (
            <span className="text-[#888] text-sm capitalize">
              {language}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[#cccccc] hover:text-white h-8 px-2 hover:bg-[#3e3e42]"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="ml-1 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
      </div>
      
      {/* Code content with syntax highlighting */}
      <div className="relative">
        <Highlight
          theme={{
            ...themes.vsDark,
            plain: {
              color: '#d4d4d4',
              backgroundColor: '#1e1e1e',
            },
            styles: [
              ...themes.vsDark.styles,
              {
                types: ['comment', 'prolog', 'doctype', 'cdata'],
                style: {
                  color: '#6a9955',
                  fontStyle: 'italic',
                },
              },
              {
                types: ['keyword', 'boolean', 'null', 'undefined', 'important'],
                style: {
                  color: '#569cd6',
                  fontWeight: 'bold',
                },
              },
              {
                types: ['string', 'char', 'attr-value', 'regex'],
                style: {
                  color: '#ce9178',
                },
              },
              {
                types: ['number'],
                style: {
                  color: '#b5cea8',
                },
              },
              {
                types: ['function', 'class-name'],
                style: {
                  color: '#dcdcaa',
                },
              },
              {
                types: ['variable'],
                style: {
                  color: '#d7ba7d',
                },
              },
              {
                types: ['punctuation'],
                style: {
                  color: '#d4d4d4',
                },
              },
              {
                types: ['property', 'tag', 'constant', 'symbol'],
                style: {
                  color: '#b5cea8',
                },
              },
              {
                types: ['selector', 'attr-name', 'builtin'],
                style: {
                  color: '#ce9178',
                },
              },
              {
                types: ['operator'],
                style: {
                  color: '#d4d4d4',
                },
              },
            ],
          }}
          code={code.trim()}
          language={language as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-x-auto p-4 m-0 text-sm leading-relaxed`}
              style={{
                ...style,
                background: '#1e1e1e',
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
