import React from 'react';
import { WYSIWYGEditor } from '@prmargas/react-wysiwyg-editor';
import '@prmargas/react-wysiwyg-editor/styles';

function App() {
  const [content, setContent] = React.useState('');
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>WYSIWYG Editor Test</h1>
      <WYSIWYGEditor
        initialContent="<p>Hello World!</p>"
        placeholder="Start typing..."
        onChange={setContent}
      />
      <div style={{ marginTop: '20px' }}>
        <h2>Output:</h2>
        <pre>{content}</pre>
      </div>
    </div>
  );
}

export default App;