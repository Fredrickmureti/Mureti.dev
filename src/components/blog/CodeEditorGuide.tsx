import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Lightbulb, Zap, Palette } from "lucide-react";

export const CodeEditorGuide = () => {
  return (
    <div className="grid gap-6 mb-8">
      <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Zap className="h-5 w-5" />
            New Feature: VS Code-like Code Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700 dark:text-green-300">
          <p className="mb-4">
            You can now add beautifully formatted code snippets with syntax highlighting! 
            Click the <Badge variant="outline" className="mx-1">"Add Code Snippet"</Badge> button above the editor.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-1">
                <Code className="h-4 w-4" />
                Supported Languages:
              </h4>
              <div className="text-sm space-y-1">
                <p>• JavaScript, TypeScript, Python</p>
                <p>• Java, C#, C++, Go, Rust</p>
                <p>• HTML, CSS, SQL, JSON</p>
                <p>• And 10+ more languages!</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-1">
                <Palette className="h-4 w-4" />
                Features:
              </h4>
              <div className="text-sm space-y-1">
                <p>• Syntax highlighting</p>
                <p>• Copy to clipboard</p>
                <p>• Optional code titles</p>
                <p>• Live preview</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Lightbulb className="h-5 w-5" />
            Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 dark:text-blue-300">
          <ul className="space-y-2 text-sm">
            <li>• Code snippets will appear with beautiful syntax highlighting on your live blog</li>
            <li>• Use descriptive titles for your code blocks (e.g., "API Route Handler", "Database Query")</li>
            <li>• The editor supports all VS Code shortcuts and features</li>
            <li>• Code blocks are automatically formatted as markdown for SEO benefits</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
