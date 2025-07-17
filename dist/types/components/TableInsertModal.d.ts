import React from 'react';
interface TableInsertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (rows: number, cols: number, hasHeaders: boolean) => void;
}
export declare const TableInsertModal: React.FC<TableInsertModalProps>;
export {};
