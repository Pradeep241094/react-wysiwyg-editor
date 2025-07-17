import React from 'react';
interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    autoClose?: boolean;
    autoCloseDelay?: number;
}
export declare const NotificationModal: React.FC<NotificationModalProps>;
export {};
