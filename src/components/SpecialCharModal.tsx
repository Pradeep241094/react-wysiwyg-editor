import React, { useState } from 'react';

interface SpecialCharModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (char: string) => void;
}

const specialCharCategories = {
  General: [
    '©', '®', '™', '§', '¶', '†', '‡', '•', '‰', '′', '″', '‴', '‹', '›', '«', '»',
    '–', '—', '…', '¡', '¿'
  ],
  Currency: [
    '$', '¢', '£', '¤', '¥', '€', '₹', '₽', '₩', '₪', '₫', '₦', '₡', '₨', '₱', '₵'
  ],
  Math: [
    '±', '×', '÷', '=', '≠', '≈', '≡', '≤', '≥', '<', '>', '∞', '∑', '∏', '∂', '∆',
    '∇', '∈', '∉', '∋', '∌', '∩', '∪', '⊂', '⊃', '⊆', '⊇', '⊕', '⊗', '⊥', '∥', '∠'
  ],
  Greek: [
    'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π',
    'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ',
    'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'
  ],
  Arrows: [
    '←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜', '↝', '↞', '↟',
    '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩', '↪', '↫', '↬', '↭', '↮', '↯'
  ],
  Symbols: [
    '☀', '☁', '☂', '☃', '☄', '★', '☆', '☇', '☈', '☉', '☊', '☋', '☌', '☍', '☎', '☏',
    '☐', '☑', '☒', '☓', '☔', '☕', '☖', '☗', '☘', '☙', '☚', '☛', '☜', '☝', '☞', '☟'
  ],
  Fractions: [
    '½', '⅓', '⅔', '¼', '¾', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞', '⅟'
  ]
};

export const SpecialCharModal: React.FC<SpecialCharModalProps> = ({
  isOpen,
  onClose,
  onInsert
}) => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCharClick = (char: string) => {
    onInsert(char);
    onClose();
  };

  const filteredChars = searchTerm
    ? Object.values(specialCharCategories)
        .flat()
        .filter(char => 
          char.includes(searchTerm) || 
          char.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : specialCharCategories[activeCategory as keyof typeof specialCharCategories];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Special Characters</h2>
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

        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex h-96">
          {!searchTerm && (
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              <div className="p-2">
                {Object.keys(specialCharCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === category
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={`${searchTerm ? 'w-full' : 'w-2/3'} overflow-y-auto`}>
            <div className="p-4">
              <div className="grid grid-cols-8 gap-2">
                {filteredChars.map((char, index) => (
                  <button
                    key={`${char}-${index}`}
                    onClick={() => handleCharClick(char)}
                    className="w-10 h-10 flex items-center justify-center text-lg border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    title={`Insert ${char}`}
                  >
                    {char}
                  </button>
                ))}
              </div>
              {filteredChars.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No characters found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};