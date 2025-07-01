import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center gap-3">
              <div className="text-2xl">✨</div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                WYSIWYG Editor
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === '/'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Editor
              </button>
              {location.pathname === '/preview' && (
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  ← Back to Editor
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 