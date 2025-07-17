import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Crop Image</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Aspect Ratio Controls */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Aspect Ratio:</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleAspectChange(undefined)}
                className={`px-3 py-1 text-sm rounded ${
                  aspect === undefined
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                Free
              </button>
              <button
                onClick={() => handleAspectChange(1)}
                className={`px-3 py-1 text-sm rounded ${
                  aspect === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                1:1
              </button>
              <button
                onClick={() => handleAspectChange(16 / 9)}
                className={`px-3 py-1 text-sm rounded ${
                  aspect === 16 / 9
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                16:9
              </button>
              <button
                onClick={() => handleAspectChange(4 / 3)}
                className={`px-3 py-1 text-sm rounded ${
                  aspect === 4 / 3
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                4:3
              </button>
            </div>
          </div>
        </div>

        {/* Crop Area */}
        <div className="p-4 max-h-96 overflow-auto">
          <div className="flex justify-center">
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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Drag to select the area you want to crop
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCropComplete}
              disabled={!completedCrop || isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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