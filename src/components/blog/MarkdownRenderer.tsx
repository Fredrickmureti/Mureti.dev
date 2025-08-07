import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import './syntax-highlighting.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom code block component with copy functionality
const CodeBlock = ({ children, className, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  const handleCopy = async () => {
    try {
      const textContent = String(children).replace(/\n$/, '');
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  if (!match) {
    // Inline code
    return (
      <code className="bg-[#1e1e1e] text-[#ce9178] px-2 py-1 rounded text-sm font-mono border border-[#3e3e42]" {...props}>
        {children}
      </code>
    );
  }

  // Code block
  return (
    <div className="relative group my-6">
      {/* Code block header */}
      <div className="flex items-center justify-between bg-[#2d2d30] px-4 py-2 rounded-t-lg border border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
          </div>
          {language && (
            <span className="text-[#cccccc] text-sm font-medium ml-2 capitalize">
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
      
      {/* Code content */}
      <pre className={`bg-[#1e1e1e] border border-[#3e3e42] border-t-0 rounded-b-lg overflow-x-auto p-0 m-0 language-${language}`}>
        <code className={`${className} language-${language}`} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

// Custom components for better styling
const components = {
  code: CodeBlock,
  pre: ({ children }: any) => children, // Remove default pre wrapper since CodeBlock handles it
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground border-b border-border pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-semibold mt-8 mb-4 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-xl font-semibold mt-6 mb-3 text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-foreground leading-relaxed mb-4">
      {children}
    </p>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 text-foreground space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 text-foreground space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="text-foreground">
      {children}
    </li>
  ),
  a: ({ children, href }: any) => (
    <a 
      href={href} 
      className="text-primary hover:text-primary/80 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-lg shadow-md max-w-full h-auto my-6"
    />
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-border px-4 py-2 text-foreground">
      {children}
    </td>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-foreground">
      {children}
    </em>
  ),
};

export const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  // Function to convert HTML back to markdown for code blocks
  const processContent = (htmlContent: string) => {
    // If content already looks like pure markdown, return as is
    if (htmlContent.includes('```') && !htmlContent.includes('<p>') && !htmlContent.includes('<div>')) {
      return htmlContent;
    }
    
    // Convert HTML content back to markdown
    let processedContent = htmlContent;
    
    // Special handling for code blocks split across multiple paragraphs
    // This handles the pattern: <p>```javascript:title</p>...<p>code lines</p>...<p>```</p>
    const codeBlockRegex = /<p>```(\w+):?([^<]*)?<\/p>([\s\S]*?)<p>```<\/p>/g;
    processedContent = processedContent.replace(codeBlockRegex, (match, language, title, codeContent) => {
      // Extract code from paragraph tags
      const code = codeContent
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      
      const titlePart = title ? `:${title}` : '';
      return `\`\`\`${language}${titlePart}\n${code}\n\`\`\``;
    });
    
    // Handle remaining HTML cleanup - be more careful with tag removal
    processedContent = processedContent
      // Remove empty paragraphs first
      .replace(/<p><\/p>/g, '')
      .replace(/<p>\s*<\/p>/g, '')
      // Handle line breaks
      .replace(/<br\s*\/?>/g, '\n')
      // Convert paragraphs to newlines, but preserve content
      .replace(/<p>/g, '\n')
      .replace(/<\/p>/g, '\n')
      // Handle divs
      .replace(/<div>/g, '\n')
      .replace(/<\/div>/g, '\n')
      // Remove any remaining HTML tags safely
      .replace(/<[^>]*>/g, '')
      // Decode HTML entities
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      // Clean up excessive whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/^\s+|\s+$/g, '') // trim start and end
      .trim();
    
    return processedContent;
  };

  const processedContent = processContent(content);

  return (
    <div className={`markdown-content max-w-none prose prose-lg ${className}`}>
      <ReactMarkdown
        components={components}
        rehypePlugins={[
          [rehypePrism, { 
            showLineNumbers: false,
            ignoreMissing: true 
          }]
        ]}
        remarkPlugins={[remarkGfm]}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};
