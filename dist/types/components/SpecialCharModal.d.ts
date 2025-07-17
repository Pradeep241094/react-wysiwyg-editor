import React from 'react';
interface SpecialCharModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (char: string) => void;
}
export declare const SpecialCharModal: React.FC<SpecialCharModalProps>;
export {};
