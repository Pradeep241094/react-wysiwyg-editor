import React, { useState, useEffect } from 'react';

interface UrlInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  title: string;
  placeholder?: string;
  initialValue?: string;
  description?: string;
}

export const UrlInputModal: React.FC<UrlInputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  placeholder = 'Enter URL...',
  initialValue = '',
  description
}) => {
  const [url, setUrl] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUrl(initialValue);
      setError('');
    }
  }, [isOpen, initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('URL is required');
      return;
    }

    // Basic URL validation
    try {
      if (url.trim().startsWith('http://') || url.trim().startsWith('https://') || url.trim().startsWith('/')) {
        onSubmit(url.trim());
        onClose();
      } else {
        // Try to add https:// prefix
        const urlWithProtocol = `https://${url.trim()}`;
        new URL(urlWithProtocol); // This will throw if invalid
        onSubmit(urlWithProtocol);
        onClose();
      }
    } catch {
      setError('Please enter a valid URL');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="modal-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'slideIn 0.3s ease-out'
        }}
        onKeyDown={handleKeyDown}
      >
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937' 
          }}>
            {title}
          </h3>
          {description && (
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              {description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder={placeholder}
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${error ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                if (!error) {
                  e.target.style.borderColor = '#e5e7eb';
                }
              }}
            />
            {error && (
              <p style={{ 
                margin: '8px 0 0 0', 
                fontSize: '14px', 
                color: '#ef4444' 
              }}>
                {error}
              </p>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end' 
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: 'white',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              {initialValue ? 'Update' : 'Add'} Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};