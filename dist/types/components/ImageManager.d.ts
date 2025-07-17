import React from 'react';
interface ImageManagerProps {
    imageElement: HTMLImageElement;
    onUpdate: () => void;
    onRemove: () => void;
}
export declare const ImageManager: React.FC<ImageManagerProps>;
export {};
