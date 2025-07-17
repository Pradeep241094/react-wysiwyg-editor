import React from 'react';
interface UrlInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (url: string) => void;
    title: string;
    placeholder?: string;
    initialValue?: string;
    description?: string;
}
export declare const UrlInputModal: React.FC<UrlInputModalProps>;
export {};
