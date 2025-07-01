import { default as React } from 'react';

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageInsert: (imageData: string, alt: string, size: string) => void;
}
declare const ImageUploadModal: React.FC<ImageUploadModalProps>;
export default ImageUploadModal;
