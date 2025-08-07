import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownRenderer } from './MarkdownRenderer';

export const ContentDebugger = () => {
  const [testContent, setTestContent] = useState(`
<p>This is a test blog post with a code snippet:</p>
<p>\`\`\`javascript:Hello world</p>
<p></p>
<p>let name = "Fredrick";</p>
<p></p>
<p></p>
<p></p>
<p></p>
<p>// console.log the variable name</p>
<p></p>
<p></p>
<p></p>
<p>console.log(name);</p>
<p></p>
<p>\`\`\`</p>
<p>And this is the end of the post.</p>
  `);

  const markdownContent = `
This is a test blog post with a code snippet:

\`\`\`javascript:Hello world
let name = "Fredrick";

// console.log the variable name

console.log(name);
\`\`\`

And this is the end of the post.
  `;

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Debugger</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Original HTML Content:</h3>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
              {testContent}
            </pre>
          </div>
          
          <Button onClick={() => setTestContent(markdownContent)}>
            Switch to Markdown Format
          </Button>
          
          <div>
            <h3 className="font-semibold mb-2">Rendered Output:</h3>
            <div className="border rounded p-4">
              <MarkdownRenderer content={testContent} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
