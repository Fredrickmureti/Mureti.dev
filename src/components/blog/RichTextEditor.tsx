
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Code } from 'lucide-react';
import { CodeSnippetEditor } from './CodeSnippetEditor';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const { toast } = useToast();
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [savedSelection, setSavedSelection] = useState<{ index: number; length: number } | null>(null);

  const insertCodeSnippet = (codeBlock: string) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      // Use saved selection or current selection, fallback to end of document
      let insertIndex = 0;
      
      if (savedSelection) {
        insertIndex = savedSelection.index;
      } else {
        const currentSelection = quill.getSelection();
        if (currentSelection) {
          insertIndex = currentSelection.index;
        } else {
          // If no selection, insert at end of content
          insertIndex = quill.getLength() - 1;
        }
      }
      
      // Insert the code block with proper formatting
      const formattedCodeBlock = `\n\`\`\`\n${codeBlock}\n\`\`\`\n`;
      
      quill.insertText(insertIndex, formattedCodeBlock);
      
      // Move cursor to end of inserted text
      const newPosition = insertIndex + formattedCodeBlock.length;
      quill.setSelection(newPosition, 0);
      
      // Focus back to editor
      quill.focus();
    }
    
    setShowCodeEditor(false);
    setSavedSelection(null);
    
    toast({
      title: "Success",
      description: "Code snippet inserted successfully!",
    });
  };

  const handleCodeEditorOpen = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      // Save current selection before opening dialog
      const selection = quill.getSelection();
      if (selection) {
        setSavedSelection(selection);
      } else {
        // If no selection, save cursor at end of content
        setSavedSelection({ index: quill.getLength() - 1, length: 0 });
      }
    }
    setShowCodeEditor(true);
  };

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          const filePath = `blog-images/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath);

          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            const index = range ? range.index : 0;
            quill.insertEmbed(index, 'image', data.publicUrl);
          }

          toast({
            title: "Success",
            description: "Image uploaded successfully!",
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div className="space-y-4">
      {/* Code Editor Button */}
      <div className="flex justify-end">
        <Dialog open={showCodeEditor} onOpenChange={setShowCodeEditor}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleCodeEditorOpen}
            >
              <Code className="h-4 w-4" />
              Add Code Snippet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Insert Code Snippet</DialogTitle>
            </DialogHeader>
            <CodeSnippetEditor onInsert={insertCodeSnippet} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Rich Text Editor */}
      <div className="bg-white rounded-lg border">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          style={{ minHeight: '300px' }}
          placeholder="Start writing your blog post..."
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
