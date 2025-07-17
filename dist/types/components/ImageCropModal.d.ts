import React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
interface ImageCropModalProps {
    isOpen: boolean;
    imageUrl: string;
    onClose: () => void;
    onCropComplete: (croppedImageUrl: string) => void;
}
export declare const ImageCropModal: React.FC<ImageCropModalProps>;
export {};
