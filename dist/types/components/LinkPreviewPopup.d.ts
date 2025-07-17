import React from 'react';
interface LinkPreviewPopupProps {
    isOpen: boolean;
    linkUrl: string;
    linkText: string;
    position: {
        x: number;
        y: number;
    };
    onEdit: () => void;
    onRemove: () => void;
    onGoToLink: () => void;
    onClose: () => void;
}
export declare const LinkPreviewPopup: React.FC<LinkPreviewPopupProps>;
export {};
