import React, { useEffect } from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  autoClose = false,
  autoCloseDelay = 3000
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: '✅',
          iconColor: '#10b981',
          borderColor: '#10b981',
          backgroundColor: '#f0fdf4'
        };
      case 'warning':
        return {
          icon: '⚠️',
          iconColor: '#f59e0b',
          borderColor: '#f59e0b',
          backgroundColor: '#fffbeb'
        };
      case 'error':
        return {
          icon: '❌',
          iconColor: '#ef4444',
          borderColor: '#ef4444',
          backgroundColor: '#fef2f2'
        };
      default:
        return {
          icon: 'ℹ️',
          iconColor: '#3b82f6',
          borderColor: '#3b82f6',
          backgroundColor: '#eff6ff'
        };
    }
  };

  const typeStyles = getTypeStyles();

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
          maxWidth: '400px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'slideIn 0.3s ease-out',
          border: `2px solid ${typeStyles.borderColor}`
        }}
        onKeyDown={handleKeyDown}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            fontSize: '24px',
            flexShrink: 0
          }}>
            {typeStyles.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1f2937' 
            }}>
              {title}
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              {message}
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end' 
        }}>
          <button
            onClick={onClose}
            autoFocus
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: typeStyles.iconColor,
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            OK
          </button>
        </div>

        {autoClose && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: typeStyles.backgroundColor,
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: typeStyles.iconColor,
              animation: `shrink ${autoCloseDelay}ms linear`,
              transformOrigin: 'left'
            }} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};