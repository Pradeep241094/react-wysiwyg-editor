import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImageManagerProps {
  imageElement: HTMLImageElement;
  onUpdate: () => void;
  onRemove: () => void;
}

export const ImageManager: React.FC<ImageManagerProps> = ({
  imageElement,
  onUpdate,
  onRemove
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'none'>('none');
  const [_isResizing, _setIsResizing] = useState(false);
  const managerRef = useRef<HTMLDivElement>(null);

  // Update position and size when image element changes
  useEffect(() => {
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      const editorRect = imageElement.closest('.editable-area')?.getBoundingClientRect();
      
      if (editorRect) {
        setPosition({
          x: rect.left - editorRect.left,
          y: rect.top - editorRect.top
        });
      }
      
      setImageSize({
        width: imageElement.offsetWidth,
        height: imageElement.offsetHeight
      });

      // Detect current alignment
      const computedStyle = window.getComputedStyle(imageElement);
      const display = computedStyle.display;
      const marginLeft = computedStyle.marginLeft;
      const marginRight = computedStyle.marginRight;
      
      if (display === 'block') {
        if (marginLeft === 'auto' && marginRight === 'auto') {
          setAlignment('center');
        } else if (marginLeft === 'auto') {
          setAlignment('right');
        } else {
          setAlignment('left');
        }
      } else {
        setAlignment('none');
      }
    }
  }, [imageElement]);

  // Handle image alignment
  const handleAlignment = useCallback((newAlignment: 'left' | 'center' | 'right' | 'none') => {
    if (!imageElement) return;

    setAlignment(newAlignment);

    switch (newAlignment) {
      case 'left':
        imageElement.style.display = 'block';
        imageElement.style.marginLeft = '0';
        imageElement.style.marginRight = 'auto';
        imageElement.style.float = 'none';
        break;
      case 'center':
        imageElement.style.display = 'block';
        imageElement.style.marginLeft = 'auto';
        imageElement.style.marginRight = 'auto';
        imageElement.style.float = 'none';
        break;
      case 'right':
        imageElement.style.display = 'block';
        imageElement.style.marginLeft = 'auto';
        imageElement.style.marginRight = '0';
        imageElement.style.float = 'none';
        break;
      case 'none':
        imageElement.style.display = 'inline-block';
        imageElement.style.marginLeft = '';
        imageElement.style.marginRight = '';
        imageElement.style.float = '';
        break;
    }
    
    onUpdate();
  }, [imageElement, onUpdate]);

  // Handle image resizing
  const handleResize = useCallback((newWidth: number) => {
    if (!imageElement) return;

    const aspectRatio = imageElement.naturalHeight / imageElement.naturalWidth;
    const newHeight = newWidth * aspectRatio;

    imageElement.style.width = `${newWidth}px`;
    imageElement.style.height = `${newHeight}px`;
    
    setImageSize({ width: newWidth, height: newHeight });
    onUpdate();
  }, [imageElement, onUpdate]);

  // Handle image wrapping (float)
  const handleFloat = useCallback((floatDirection: 'left' | 'right' | 'none') => {
    if (!imageElement) return;

    switch (floatDirection) {
      case 'left':
        imageElement.style.float = 'left';
        imageElement.style.marginRight = '15px';
        imageElement.style.marginBottom = '10px';
        imageElement.style.display = 'block';
        break;
      case 'right':
        imageElement.style.float = 'right';
        imageElement.style.marginLeft = '15px';
        imageElement.style.marginBottom = '10px';
        imageElement.style.display = 'block';
        break;
      case 'none':
        imageElement.style.float = 'none';
        imageElement.style.marginLeft = '';
        imageElement.style.marginRight = '';
        imageElement.style.marginBottom = '';
        break;
    }
    
    onUpdate();
  }, [imageElement, onUpdate]);

  // Handle alt text update
  const handleAltText = useCallback(() => {
    if (!imageElement) return;

    const currentAlt = imageElement.alt || '';
    // For now, we'll use a simple approach - in a full implementation, 
    // this would open a proper modal dialog
    const newAlt = window.prompt('Enter alt text for the image (for accessibility):', currentAlt);
    
    if (newAlt !== null) {
      imageElement.alt = newAlt;
      onUpdate();
    }
  }, [imageElement, onUpdate]);

  // Handle image removal
  const handleRemove = useCallback(() => {
    if (confirm('Are you sure you want to remove this image?')) {
      onRemove();
      setIsVisible(false);
    }
  }, [onRemove]);

  // Show/hide manager on image click
  useEffect(() => {
    const handleImageClick = (e: Event) => {
      e.stopPropagation();
      setIsVisible(true);
    };

    const handleDocumentClick = (e: Event) => {
      if (managerRef.current && !managerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (imageElement) {
      imageElement.addEventListener('click', handleImageClick);
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('click', handleImageClick);
      }
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [imageElement]);

  if (!isVisible || !imageElement) return null;

  return (
    <div
      ref={managerRef}
      className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-64"
      style={{
        left: position.x + imageSize.width + 10,
        top: position.y,
        maxWidth: '300px'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Image Settings</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Size Controls */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Width: {Math.round(imageSize.width)}px
        </label>
        <input
          type="range"
          min="50"
          max="800"
          value={imageSize.width}
          onChange={(e) => handleResize(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50px</span>
          <span>800px</span>
        </div>
      </div>

      {/* Alignment Controls */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-2">Alignment</label>
        <div className="flex gap-1">
          <button
            onClick={() => handleAlignment('left')}
            className={`px-2 py-1 text-xs rounded ${
              alignment === 'left'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            Left
          </button>
          <button
            onClick={() => handleAlignment('center')}
            className={`px-2 py-1 text-xs rounded ${
              alignment === 'center'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            Center
          </button>
          <button
            onClick={() => handleAlignment('right')}
            className={`px-2 py-1 text-xs rounded ${
              alignment === 'right'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            Right
          </button>
          <button
            onClick={() => handleAlignment('none')}
            className={`px-2 py-1 text-xs rounded ${
              alignment === 'none'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            Inline
          </button>
        </div>
      </div>

      {/* Text Wrapping Controls */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-2">Text Wrapping</label>
        <div className="flex gap-1">
          <button
            onClick={() => handleFloat('left')}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Wrap Left
          </button>
          <button
            onClick={() => handleFloat('right')}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Wrap Right
          </button>
          <button
            onClick={() => handleFloat('none')}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            No Wrap
          </button>
        </div>
      </div>

      {/* Quick Size Presets */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-2">Quick Sizes</label>
        <div className="flex gap-1">
          <button
            onClick={() => handleResize(150)}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Small
          </button>
          <button
            onClick={() => handleResize(300)}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Medium
          </button>
          <button
            onClick={() => handleResize(500)}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Large
          </button>
          <button
            onClick={() => handleResize(imageElement.naturalWidth)}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Original
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2 border-t border-gray-200">
        <button
          onClick={handleAltText}
          className="flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 rounded transition-colors"
        >
          Alt Text
        </button>
        <button
          onClick={handleRemove}
          className="flex-1 px-2 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};