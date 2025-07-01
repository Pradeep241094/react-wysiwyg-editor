import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WYSIWYGEditor from '../components/WYSIWYGEditor';
import type { EditorMode } from '../types/editor';

const Editor: React.FC = () => {
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('# Welcome to WYSIWYG Editor\n\nStart creating amazing content!');

  const handleContentChange = (html: string, markdown: string) => {
    setHtmlContent(html);
    setMarkdownContent(markdown);
    
    // Store content in sessionStorage for preview page
    sessionStorage.setItem('editor-html', html);
    sessionStorage.setItem('editor-markdown', markdown);
  };

  return (
    <div className="h-full bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full p-4">
        <WYSIWYGEditor
          initialContent={markdownContent}
          onChange={handleContentChange}
          height="calc(100vh - 8rem)"
        />
      </div>
    </div>
  );
};

export default Editor; 