import React from 'react';
import type { SplitViewProps } from '../types/editor';

const SplitView: React.FC<SplitViewProps> = ({ editor, preview, mode }) => {
  return (
    <div className="flex h-full">
      <div className={`${mode === 'markdown' ? 'w-1/2' : 'w-full'} h-full transition-all duration-300`}>
        {editor}
      </div>
      {mode === 'markdown' && (
        <div className="w-1/2 h-full border-l border-gray-200">
          {preview}
        </div>
      )}
    </div>
  );
};

export default SplitView; 