import React from 'react';

interface LinkPreviewPopupProps {
  isOpen: boolean;
  linkUrl: string;
  linkText: string;
  position: { x: number; y: number };
  onEdit: () => void;
  onRemove: () => void;
  onGoToLink: () => void;
  onClose: () => void;
}

export const LinkPreviewPopup: React.FC<LinkPreviewPopupProps> = ({
  isOpen,
  linkUrl,
  linkText: _linkText,
  position,
  onEdit,
  onRemove,
  onGoToLink,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop to close popup when clicking outside */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          background: 'transparent'
        }}
        onClick={onClose}
      />
      
      {/* Popup */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
          background: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          padding: '12px 16px',
          minWidth: '300px',
          maxWidth: '400px',
          fontSize: '14px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Link preview */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{ 
            color: '#374151',
            fontWeight: '500'
          }}>
            Go to link:
          </span>
          <button
            onClick={onGoToLink}
            style={{
              color: '#2563eb',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '0',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            title={linkUrl}
          >
            {linkUrl}
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          alignItems: 'center'
        }}>
          <button
            onClick={onEdit}
            style={{
              color: '#2563eb',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#eff6ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Change
          </button>
          
          <span style={{ color: '#d1d5db' }}>|</span>
          
          <button
            onClick={onRemove}
            style={{
              color: '#dc2626',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};