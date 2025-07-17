import React, { useState } from 'react';

interface TableInsertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (rows: number, cols: number, hasHeaders: boolean) => void;
}

export const TableInsertModal: React.FC<TableInsertModalProps> = ({
  isOpen,
  onClose,
  onInsert
}) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [previewRows] = useState(3);
  const [previewCols] = useState(3);

  const handleInsert = () => {
    onInsert(rows, cols, hasHeaders);
    onClose();
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Insert Table</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Grid Selector */}
          <div className="mb-6">
            <div className="mt-2 text-sm text-gray-600">
              {previewRows} × {previewCols} table
            </div>
          </div>

          {/* Manual Input */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rows
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Columns
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={cols}
                onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Options */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={hasHeaders}
                onChange={(e) => setHasHeaders(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include header row</span>
            </label>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview:
            </label>
            <div className="border border-gray-300 rounded overflow-hidden">
              <table className="w-full text-xs">
                <tbody>
                  {Array.from({ length: Math.min(rows, 4) }, (_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: Math.min(cols, 6) }, (_, colIndex) => (
                        <td
                          key={colIndex}
                          className={`border border-gray-200 p-1 text-center ${hasHeaders && rowIndex === 0
                              ? 'bg-gray-100 font-medium'
                              : 'bg-white'
                            }`}
                        >
                          {hasHeaders && rowIndex === 0
                            ? `Header ${colIndex + 1}`
                            : `Cell ${rowIndex + 1},${colIndex + 1}`}
                        </td>
                      ))}
                      {cols > 6 && (
                        <td className="border border-gray-200 p-1 text-center bg-gray-50">
                          ...
                        </td>
                      )}
                    </tr>
                  ))}
                  {rows > 4 && (
                    <tr>
                      {Array.from({ length: Math.min(cols + (cols > 6 ? 1 : 0), 7) }, (_, colIndex) => (
                        <td key={colIndex} className="border border-gray-200 p-1 text-center bg-gray-50">
                          ...
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
          >
            Insert Table
          </button>
        </div>
      </div>
    </div>
  );
};