import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';

interface ImageCropModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
  onCropComplete
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect || width / height));
  }, [aspect]);

  const getCroppedImg = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      return null;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );

    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve(url);
        }
      }, 'image/jpeg', 0.9);
    });
  }, [completedCrop]);

  const handleCropComplete = async () => {
    setIsProcessing(true);
    try {
      const croppedImageUrl = await getCroppedImg();
      if (croppedImageUrl) {
        onCropComplete(croppedImageUrl);
        onClose();
      }
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, newAspect || width / height));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="image-crop-modal">
      <div className="image-crop-modal__content">
        {/* Header */}
        <div className="image-crop-modal__header">
          <h2 className="image-crop-modal__title">Crop Image</h2>
          <button
            onClick={onClose}
            className="image-crop-modal__close"
            aria-label="Close"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Aspect Ratio Controls */}
        <div className="image-crop-modal__controls">
          <div className="image-crop-modal__aspect-controls">
            <span className="image-crop-modal__aspect-label">Aspect Ratio:</span>
            <button
              onClick={() => handleAspectChange(undefined)}
              className={`image-crop-modal__aspect-button ${
                aspect === undefined ? 'image-crop-modal__aspect-button--active' : ''
              }`}
            >
              Free
            </button>
            <button
              onClick={() => handleAspectChange(1)}
              className={`image-crop-modal__aspect-button ${
                aspect === 1 ? 'image-crop-modal__aspect-button--active' : ''
              }`}
            >
              1:1
            </button>
            <button
              onClick={() => handleAspectChange(16 / 9)}
              className={`image-crop-modal__aspect-button ${
                aspect === 16 / 9 ? 'image-crop-modal__aspect-button--active' : ''
              }`}
            >
              16:9
            </button>
            <button
              onClick={() => handleAspectChange(4 / 3)}
              className={`image-crop-modal__aspect-button ${
                aspect === 4 / 3 ? 'image-crop-modal__aspect-button--active' : ''
              }`}
            >
              4:3
            </button>
          </div>
        </div>

        {/* Crop Area */}
        <div className="image-crop-modal__crop-area">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minWidth={50}
            minHeight={50}
          >
            <img
              ref={imgRef}
              alt="Crop preview"
              src={imageUrl}
              style={{ maxHeight: '400px', maxWidth: '100%' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>

        {/* Footer */}
        <div className="image-crop-modal__footer">
          <div className="image-crop-modal__help-text">
            Drag to select the area you want to crop
          </div>
          <div className="image-crop-modal__actions">
            <button
              onClick={onClose}
              className="image-crop-modal__button image-crop-modal__button--secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleCropComplete}
              disabled={!completedCrop || isProcessing}
              className="image-crop-modal__button image-crop-modal__button--primary"
            >
              {isProcessing ? 'Processing...' : 'Apply Crop'}
            </button>
          </div>
        </div>

        {/* Hidden canvas for cropping */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};