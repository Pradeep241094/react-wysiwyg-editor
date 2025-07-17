import React from 'react';
interface FileUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFileSelect: (file: File) => void;
    accept?: string;
    maxSize?: number;
    title?: string;
    description?: string;
}
export declare const FileUploadModal: React.FC<FileUploadModalProps>;
export {};
