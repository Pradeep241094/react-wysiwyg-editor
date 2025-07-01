import WYSIWYGEditor from './components/WYSIWYGEditor';

function App() {
  const handleEditorChange = (htmlContent: string, markdownContent: string) => {
    // Editor content change handler - can be used for saving or other purposes
    console.log('Content updated:', { htmlContent, markdownContent });
  };

  return (
    <div className="container mx-auto p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            WYSIWYG Editor
          </h1>
        </div>
        <div className="relative">
          <WYSIWYGEditor
            initialContent="# Welcome to the Editor\n\nThis is a **WYSIWYG** editor with _Markdown_ support.\n\n## Features:\n\n* Real-time preview\n* Markdown mode\n* WYSIWYG mode\n* Modern UI design\n* Image upload support\n\nStart editing to see the magic! ✨"
            onChange={handleEditorChange}
            height="500px"
          />
        </div>
      </div>
    </div>
  );
}

export default App; 