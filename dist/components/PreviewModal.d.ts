import { default as React } from 'react';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    htmlContent: string;
    markdownContent: string;
    mode: 'wysiwyg' | 'markdown';
}
declare const PreviewModal: React.FC<PreviewModalProps>;
export default PreviewModal;
