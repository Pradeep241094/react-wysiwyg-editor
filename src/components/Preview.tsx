import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import html2canvas from 'html2canvas';

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previewRef = useRef<HTMLDivElement>(null);
  const [imageFormat, setImageFormat] = useState<'png' | 'jpeg' | 'webp'>('png');

  // Get content from URL params or sessionStorage
  const htmlContent = searchParams.get('html') || sessionStorage.getItem('editor-html') || '';
  const markdownContent = searchParams.get('markdown') || sessionStorage.getItem('editor-markdown') || '';
  const mode = (searchParams.get('mode') as 'wysiwyg' | 'markdown') || 'wysiwyg';

  useEffect(() => {
    if (previewRef.current) {
      let content = '';
      if (mode === 'wysiwyg') {
        content = DOMPurify.sanitize(htmlContent);
      } else {
        content = DOMPurify.sanitize(marked(markdownContent) as string);
      }
      previewRef.current.innerHTML = content;
    }
  }, [htmlContent, markdownContent, mode]);

  // Redirect to editor if no content
  useEffect(() => {
    if (!htmlContent && !markdownContent) {
      navigate('/', { replace: true });
    }
  }, [htmlContent, markdownContent, navigate]);

  const handleDownloadImage = async () => {
    if (!previewRef.current) {
      alert('No content available for image generation.');
      return;
    }

    try {
      // Create a temporary element for image generation with proper styling
      const tempElement = document.createElement('div');
      tempElement.innerHTML = previewRef.current.innerHTML;
      
      // Apply inline styles for image generation
      tempElement.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
      tempElement.style.lineHeight = '1.6';
      tempElement.style.color = '#374151';
      tempElement.style.fontSize = '16px';
      tempElement.style.maxWidth = '800px';
      tempElement.style.margin = '0 auto';
      tempElement.style.padding = '40px';
      tempElement.style.background = 'white';
      tempElement.style.borderRadius = '8px';
      tempElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      
      // Style headings
      const headings = tempElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        (heading as HTMLElement).style.color = '#1f2937';
        (heading as HTMLElement).style.fontWeight = 'bold';
        (heading as HTMLElement).style.marginTop = '1.5em';
        (heading as HTMLElement).style.marginBottom = '0.5em';
      });
      
      // Style h1 specifically
      const h1Elements = tempElement.querySelectorAll('h1');
      h1Elements.forEach(h1 => {
        (h1 as HTMLElement).style.fontSize = '2.25em';
        (h1 as HTMLElement).style.borderBottom = '2px solid #e5e7eb';
        (h1 as HTMLElement).style.paddingBottom = '0.3em';
        (h1 as HTMLElement).style.marginTop = '0';
      });
      
      // Style paragraphs
      const paragraphs = tempElement.querySelectorAll('p');
      paragraphs.forEach(p => {
        (p as HTMLElement).style.marginBottom = '1em';
      });
      
      // Style images
      const images = tempElement.querySelectorAll('img');
      images.forEach(img => {
        (img as HTMLElement).style.maxWidth = '100%';
        (img as HTMLElement).style.height = 'auto';
        (img as HTMLElement).style.margin = '1em 0';
        (img as HTMLElement).style.borderRadius = '6px';
      });
      
      // Style blockquotes
      const blockquotes = tempElement.querySelectorAll('blockquote');
      blockquotes.forEach(bq => {
        (bq as HTMLElement).style.borderLeft = '4px solid #3b82f6';
        (bq as HTMLElement).style.background = '#f8fafc';
        (bq as HTMLElement).style.padding = '1em';
        (bq as HTMLElement).style.margin = '1em 0';
        (bq as HTMLElement).style.fontStyle = 'italic';
        (bq as HTMLElement).style.borderRadius = '4px';
      });
      
      // Style code blocks
      const codeBlocks = tempElement.querySelectorAll('code');
      codeBlocks.forEach(code => {
        (code as HTMLElement).style.background = '#f1f5f9';
        (code as HTMLElement).style.padding = '0.2em 0.4em';
        (code as HTMLElement).style.borderRadius = '3px';
        (code as HTMLElement).style.fontFamily = 'Courier New, monospace';
        (code as HTMLElement).style.fontSize = '0.9em';
      });
      
      const preBlocks = tempElement.querySelectorAll('pre');
      preBlocks.forEach(pre => {
        (pre as HTMLElement).style.background = '#1e293b';
        (pre as HTMLElement).style.color = '#e2e8f0';
        (pre as HTMLElement).style.padding = '1em';
        (pre as HTMLElement).style.borderRadius = '6px';
        (pre as HTMLElement).style.overflowX = 'auto';
        (pre as HTMLElement).style.margin = '1em 0';
      });
      
      // Style lists
      const lists = tempElement.querySelectorAll('ul, ol');
      lists.forEach(list => {
        (list as HTMLElement).style.paddingLeft = '2em';
        (list as HTMLElement).style.marginBottom = '1em';
      });
      
      // Temporarily add to document for rendering
      tempElement.style.position = 'absolute';
      tempElement.style.left = '-9999px';
      tempElement.style.top = '0';
      tempElement.style.width = '800px';
      document.body.appendChild(tempElement);
      
      // Generate canvas from the element
      const canvas = await html2canvas(tempElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempElement.scrollHeight + 80,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 800,
        windowHeight: tempElement.scrollHeight + 80
      });
      
      // Clean up temporary element
      document.body.removeChild(tempElement);
      
      // Convert canvas to blob and download
      const mimeType = imageFormat === 'png' ? 'image/png' : imageFormat === 'jpeg' ? 'image/jpeg' : 'image/webp';
      const quality = imageFormat === 'png' ? 1.0 : 0.95;
      
      canvas.toBlob((blob) => {
        if (!blob) {
          alert('Failed to generate image. Please try again.');
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `document-${new Date().toISOString().split('T')[0]}.${imageFormat}`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
      }, mimeType, quality);
      
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    }
  };

  const handlePrint = () => {
    if (!previewRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Document Preview</title>
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              line-height: 1.6; 
              color: #374151; 
              max-width: 8.5in; 
              margin: 0 auto; 
              padding: 1in;
              background: white;
            }
            h1, h2, h3, h4, h5, h6 { 
              color: #1f2937; 
              font-weight: bold; 
              margin-top: 1.5em; 
              margin-bottom: 0.5em; 
            }
            h1 { font-size: 2.25em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.3em; }
            h2 { font-size: 1.875em; }
            h3 { font-size: 1.5em; }
            h4 { font-size: 1.25em; }
            h5 { font-size: 1.125em; }
            h6 { font-size: 1em; }
            p { margin-bottom: 1em; }
            img { max-width: 100%; height: auto; margin: 1em 0; }
            blockquote { 
              border-left: 4px solid #3b82f6; 
              background: #f8fafc; 
              padding: 1em; 
              margin: 1em 0; 
              font-style: italic; 
            }
            code { 
              background: #f1f5f9; 
              padding: 0.2em 0.4em; 
              border-radius: 3px; 
              font-family: 'Courier New', monospace; 
            }
            pre { 
              background: #1e293b; 
              color: #e2e8f0; 
              padding: 1em; 
              border-radius: 6px; 
              overflow-x: auto; 
            }
            pre code { 
              background: none; 
              padding: 0; 
              color: inherit; 
            }
            ul, ol { padding-left: 2em; margin-bottom: 1em; }
            li { margin-bottom: 0.5em; }
            table { border-collapse: collapse; width: 100%; margin: 1em 0; }
            th, td { border: 1px solid #d1d5db; padding: 0.75em; text-align: left; }
            th { background: #f9fafb; font-weight: bold; }
            strong { font-weight: bold; color: #1f2937; }
            em { font-style: italic; }
            a { color: #2563eb; text-decoration: none; }
            a:hover { text-decoration: underline; }
            hr { border: none; border-top: 1px solid #e5e7eb; margin: 2em 0; }
            
            @media print {
              body { margin: 0; padding: 0.5in; }
              h1 { page-break-after: avoid; }
              h2, h3, h4, h5, h6 { page-break-after: avoid; }
              img { page-break-inside: avoid; }
              blockquote { page-break-inside: avoid; }
              pre { page-break-inside: avoid; }
              table { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${previewRef.current.innerHTML}
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Preview Content - Full Screen */}
      <div className="flex-1 overflow-y-auto bg-white min-h-0">
        <div 
          ref={previewRef}
          className="
            prose prose-lg prose-gray max-w-none p-8 mx-auto max-w-4xl
            prose-headings:text-gray-800 prose-headings:font-bold
            prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6 prose-h1:leading-tight prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2
            prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5 prose-h2:leading-tight
            prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-4 prose-h3:leading-tight
            prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3
            prose-strong:text-gray-800 prose-strong:font-semibold
            prose-em:text-gray-600 prose-em:italic
            prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:py-3 prose-blockquote:rounded-r-lg
            prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:shadow-lg prose-pre:overflow-x-auto
            prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1
            prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1
            prose-li:text-gray-700 prose-li:leading-relaxed
            prose-hr:border-gray-200 prose-hr:my-6
            prose-table:border-collapse prose-table:w-full
            prose-th:bg-gray-50 prose-th:p-2 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-200
            prose-td:p-2 prose-td:border prose-td:border-gray-200
            prose-img:rounded-lg prose-img:shadow-md prose-img:border prose-img:border-gray-200
            
            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0
          "
        />
      </div>

      {/* Action Bar - Fixed Bottom */}
      <div className="border-t border-gray-200 bg-white px-6 py-4 flex-shrink-0 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {/* Export Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Export as:</span>
              <select
                value={imageFormat}
                onChange={(e) => setImageFormat(e.target.value as 'png' | 'jpeg' | 'webp')}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="png">PNG Image</option>
                <option value="jpeg">JPEG Image</option>
                <option value="webp">WebP Image</option>
              </select>
            </div>
            
            <button
              onClick={handleDownloadImage}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium shadow-sm"
              title={`Download as ${imageFormat.toUpperCase()}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Image
            </button>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm"
            title="Print Document"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview; 