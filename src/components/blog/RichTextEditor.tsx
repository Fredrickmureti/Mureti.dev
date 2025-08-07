
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

  const insertCodeSnippet = (codeBlock: string) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      const index = range ? range.index : 0;
      
      // Create a temporary div to preserve the markdown format
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `<pre data-markdown="true">${codeBlock.replace(/\n/g, '<br>')}</pre>`;
      
      // Insert the code block preserving markdown format
      quill.insertText(index, '\n' + codeBlock + '\n');
      
      // Move cursor to end of inserted text
      quill.setSelection(index + codeBlock.length + 2);
    }
    setShowCodeEditor(false);
    
    toast({
      title: "Success",
      description: "Code snippet inserted successfully!",
    });
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
            <Button variant="outline" className="flex items-center gap-2">
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
