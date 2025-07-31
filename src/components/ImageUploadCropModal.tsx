import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';

interface ImageUploadCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageInsert: (croppedImageUrl: string) => void;
}

type ModalStep = 'upload' | 'crop' | 'save';

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

export const ImageUploadCropModal: React.FC<ImageUploadCropModalProps> = ({
  isOpen,
  onClose,
  onImageInsert
}) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>('upload');
  const [, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>('');
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const maxSize = 10 * 1024 * 1024; // 10MB
  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  // Reset modal state when opening/closing
  const resetModal = useCallback(() => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setImageUrl('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    setCroppedImageUrl('');
    setAspect(undefined);
    setIsProcessing(false);
    setIsDragOver(false);
    setError(null);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    if (croppedImageUrl) {
      URL.revokeObjectURL(croppedImageUrl);
    }
  }, [imageUrl, croppedImageUrl]);

  const handleClose = useCallback(() => {
    resetModal();
    onClose();
  }, [resetModal, onClose]);

  // File validation
  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds 10MB limit`;
    }

    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Please select a JPEG, PNG, GIF, or WebP image.`;
    }

    return null;
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCurrentStep('crop');
  }, [validateFile]);

  // File input change handler
  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  // Drag and drop handlers
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Image load handler for crop initialization
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect || width / height));
  }, [aspect]);

  // Aspect ratio change handler
  const handleAspectChange = useCallback((newAspect: number | undefined) => {
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, newAspect || width / height));
    }
  }, []);

  // Generate cropped image
  const getCroppedImg = useCallback(async (): Promise<string | null> => {
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

  // Handle crop completion
  const handleCrop = useCallback(async () => {
    setIsProcessing(true);
    try {
      const croppedUrl = await getCroppedImg();
      if (croppedUrl) {
        setCroppedImageUrl(croppedUrl);
        setCurrentStep('save');
      }
    } catch (error) {
      console.error('Error cropping image:', error);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [getCroppedImg]);

  // Handle save image to editor
  const handleSaveToEditor = useCallback(() => {
    if (croppedImageUrl) {
      onImageInsert(croppedImageUrl);
      handleClose();
    }
  }, [croppedImageUrl, onImageInsert, handleClose]);

  // Handle back to crop from save step
  const handleBackToCrop = useCallback(() => {
    if (croppedImageUrl) {
      URL.revokeObjectURL(croppedImageUrl);
    }
    setCroppedImageUrl('');
    setCurrentStep('crop');
  }, [croppedImageUrl]);

  // Format file size for display
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  if (!isOpen) return null;

  return (
    <div className="image-crop-modal">
      <div className="image-crop-modal__content" style={{ 
        maxWidth: currentStep === 'crop' ? '900px' : '500px' 
      }}>
        {/* Header */}
        <div className="image-crop-modal__header">
          <h2 className="image-crop-modal__title">
            {currentStep === 'upload' ? 'Upload Image' : 
             currentStep === 'crop' ? 'Crop Image' : 'Save Image'}
          </h2>
          <button
            onClick={handleClose}
            className="image-crop-modal__close"
            aria-label="Close"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Upload Step */}
        {currentStep === 'upload' && (
          <>
            <div style={{ padding: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                Select an image to upload and crop
              </p>

              {/* Drag and Drop Area */}
              <div
                style={{
                  border: `2px dashed ${isDragOver ? '#3b82f6' : '#d1d5db'}`,
                  borderRadius: '0.5rem',
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: isDragOver ? '#eff6ff' : 'transparent',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg
                    width="48"
                    height="48"
                    style={{ marginBottom: '1rem', color: isDragOver ? '#3b82f6' : '#9ca3af' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Drag and drop your image here, or click to browse
                  </p>
                  
                  <button
                    type="button"
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#3b82f6',
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {/* File Info */}
              <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                <p>Accepted formats: JPEG, PNG, GIF, WebP</p>
                <p>Maximum size: {formatFileSize(maxSize)}</p>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '0.375rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg width="20" height="20" style={{ color: '#ef4444', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p style={{ fontSize: '0.875rem', color: '#dc2626' }}>{error}</p>
                </div>
              )}
            </div>

            {/* Upload Footer */}
            <div className="image-crop-modal__footer">
              <div></div>
              <div className="image-crop-modal__actions">
                <button
                  onClick={handleClose}
                  className="image-crop-modal__button image-crop-modal__button--secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {/* Crop Step */}
        {currentStep === 'crop' && (
          <>
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
                  style={{ maxHeight: '500px', maxWidth: '100%' }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>

            {/* Crop Footer */}
            <div className="image-crop-modal__footer">
              <div className="image-crop-modal__help-text">
                Drag to select the area you want to crop
              </div>
              <div className="image-crop-modal__actions">
                <button
                  onClick={handleClose}
                  className="image-crop-modal__button image-crop-modal__button--secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCrop}
                  disabled={!completedCrop || isProcessing}
                  className="image-crop-modal__button image-crop-modal__button--primary"
                >
                  {isProcessing ? 'Processing...' : 'Crop'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Save Step */}
        {currentStep === 'save' && (
          <>
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                Your image has been cropped successfully. Click "Save Image to Editor" to add it to your content.
              </p>

              {/* Cropped Image Preview */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <img
                  src={croppedImageUrl}
                  alt="Cropped preview"
                  style={{ 
                    maxWidth: '300px', 
                    maxHeight: '300px',
                    borderRadius: '0.375rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>

              <div style={{ 
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '0.375rem',
                border: '1px solid #bfdbfe',
                marginBottom: '1rem'
              }}>
                <p style={{ fontSize: '0.875rem', color: '#0c5460', margin: 0 }}>
                  ✓ Image cropped and ready to be added to your editor
                </p>
              </div>
            </div>

            {/* Save Footer */}
            <div className="image-crop-modal__footer">
              <div></div>
              <div className="image-crop-modal__actions">
                <button
                  onClick={handleBackToCrop}
                  className="image-crop-modal__button image-crop-modal__button--secondary"
                >
                  Back to Crop
                </button>
                <button
                  onClick={handleClose}
                  className="image-crop-modal__button image-crop-modal__button--secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveToEditor}
                  className="image-crop-modal__button image-crop-modal__button--primary"
                >
                  Save Image to Editor
                </button>
              </div>
            </div>
          </>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        {/* Hidden canvas for cropping */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};