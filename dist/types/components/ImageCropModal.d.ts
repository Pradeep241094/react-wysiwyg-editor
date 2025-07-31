import React from 'react';
interface ImageCropModalProps {
    isOpen: boolean;
    imageUrl: string;
    onClose: () => void;
    onCropComplete: (croppedImageUrl: string) => void;
}
export declare const ImageCropModal: React.FC<ImageCropModalProps>;
export {};
