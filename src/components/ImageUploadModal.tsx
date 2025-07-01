import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageInsert: (imageData: string, alt: string, size: string) => void;
}

type ImageSize = 'small' | 'medium' | 'large' | 'original';

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageInsert
}) => {

  const [imageSrc, setImageSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImageData, setCroppedImageData] = useState<string>('');
  const [altText, setAltText] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<ImageSize>('medium');
  const [step, setStep] = useState<'upload' | 'crop' | 'preview'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sizeOptions = {
    small: { label: 'Small', maxWidth: '300px', description: 'Thumbnails' },
    medium: { label: 'Medium', maxWidth: '600px', description: 'Balanced' },
    large: { label: 'Large', maxWidth: '900px', description: 'Full width' },
    original: { label: 'Original', maxWidth: '100%', description: 'Original size' }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAltText(file.name.split('.')[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setStep('crop');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setAltText(file.name.split('.')[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setStep('crop');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const getCroppedImage = useCallback((cropData?: PixelCrop | Crop) => {
    const cropToUse = cropData || completedCrop;
    
    if (!cropToUse || !imgRef.current) {
      return null;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    let cropX, cropY, cropWidth, cropHeight;
    
    if (cropToUse.unit === '%') {
      cropX = (cropToUse.x / 100) * image.width;
      cropY = (cropToUse.y / 100) * image.height;
      cropWidth = (cropToUse.width / 100) * image.width;
      cropHeight = (cropToUse.height / 100) * image.height;
    } else {
      cropX = cropToUse.x;
      cropY = cropToUse.y;
      cropWidth = cropToUse.width;
      cropHeight = cropToUse.height;
    }

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      ctx.drawImage(
        image,
        cropX * scaleX,
        cropY * scaleY,
        cropWidth * scaleX,
        cropHeight * scaleY,
        0,
        0,
        cropWidth,
        cropHeight
      );

      return canvas.toDataURL('image/jpeg', 0.9);
    } catch (error) {
      console.error('Error drawing to canvas:', error);
      return null;
    }
  }, [completedCrop]);

  useEffect(() => {
    if (step === 'preview' && croppedImageData && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.onload = () => {
        if (canvasRef.current && ctx) {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx.drawImage(img, 0, 0);
        }
      };
      img.src = croppedImageData;
    }
  }, [step, croppedImageData]);

  const handleCropComplete = async () => {
    setIsProcessing(true);
    
    const cropToUse = completedCrop || crop;
    
    if (!cropToUse || !imgRef.current) {
      setIsProcessing(false);
      return;
    }
    
    if (!completedCrop) {
      setCompletedCrop(cropToUse as PixelCrop);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const generatedImageData = getCroppedImage(cropToUse);
    if (generatedImageData) {
      setCroppedImageData(generatedImageData);
      setStep('preview');
    }
    
    setIsProcessing(false);
  };

  const handleInsertImage = () => {
    if (!croppedImageData) {
      return;
    }

    onImageInsert(croppedImageData, altText || 'Cropped image', selectedSize);
    handleClose();
  };

  const handleClose = () => {
    setImageSrc('');
    setAltText('');
    setCroppedImageData('');
    setSelectedSize('medium');
    setStep('upload');
    setIsDragging(false);
    setIsProcessing(false);
    setCrop({
      unit: '%',
      width: 90,
      height: 90,
      x: 5,
      y: 5
    });
    setCompletedCrop(undefined);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-auto max-h-[85vh] flex flex-col">
        {/* Compact Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg">🖼️</span>
              <h2 className="text-lg font-semibold text-gray-800">Insert Image</h2>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center text-sm font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {step === 'upload' && (
            <div className="flex items-center justify-center min-h-[300px]">
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer w-full max-w-sm
                  ${isDragging 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }
                `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <div className="text-4xl mb-3">📸</div>
                <p className="font-medium text-gray-700 mb-2">
                  {isDragging ? 'Drop image here' : 'Upload image'}
                </p>
                <p className="text-sm text-gray-500 mb-4">Drag & drop or click</p>
                <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  Choose File
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
              </div>
            </div>
          )}

          {step === 'crop' && imageSrc && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-1">Crop Image</h3>
                <p className="text-sm text-gray-600">Adjust selection area</p>
              </div>
              
              <div className="flex justify-center bg-gray-50 rounded-lg p-3">
                <div className="max-w-full max-h-[400px] overflow-hidden">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={undefined}
                    minWidth={50}
                    minHeight={50}
                    className="rounded overflow-hidden"
                  >
                    <img
                      ref={imgRef}
                      src={imageSrc}
                      alt="Crop preview"
                      className="max-w-[450px] max-h-[350px] w-auto h-auto object-contain"
                      style={{
                        maxWidth: '450px',
                        maxHeight: '350px',
                        width: 'auto',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                  </ReactCrop>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => setStep('upload')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleCropComplete}
                  disabled={!completedCrop || isProcessing}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    completedCrop && !isProcessing
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Apply Crop →'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-1">Customize & Insert</h3>
                <p className="text-sm text-gray-600">Review and configure</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Image Preview */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                    <div className="flex justify-center">
                      <div className="max-w-[350px] max-h-[200px] overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          className="max-w-full max-h-full rounded border border-gray-200"
                          style={{ 
                            maxWidth: '350px',
                            maxHeight: '200px',
                            width: 'auto',
                            height: 'auto'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-3">
                  {/* Size Selection */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Size</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {Object.entries(sizeOptions).map(([key, option]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedSize(key as ImageSize)}
                          className={`p-2 rounded border-2 transition-all text-left text-xs ${
                            selectedSize === key
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="font-medium">{option.label}</div>
                          <div className="text-gray-500">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Alt Text */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Alt Text</h4>
                    <input
                      type="text"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe image..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2 border-t border-gray-100">
                <button
                  onClick={() => setStep('crop')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  ← Re-crop
                </button>
                <button
                  onClick={handleInsertImage}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span>✨</span>
                  Insert Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal; 