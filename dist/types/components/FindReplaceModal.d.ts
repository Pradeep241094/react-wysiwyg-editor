import React from 'react';
interface FindReplaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFindReplace: (findText: string, replaceText: string) => void;
}
export declare const FindReplaceModal: React.FC<FindReplaceModalProps>;
export {};
