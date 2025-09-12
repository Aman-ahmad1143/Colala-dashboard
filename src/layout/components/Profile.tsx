import React, { useState, useRef, useEffect } from 'react';
import images from '../../constants/images';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileProps {
  name?: string;
  img?: string;
}

const Profile: React.FC<ProfileProps> = ({ name = 'Admin'}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <div className="relative flex items-center gap-5" ref={dropdownRef}>
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img src={images.admin} className="w-14 h-14 rounded-full bg-gray-200" />
        <div>
          <h2 className="text-xl capitalize"> Hey {name}</h2>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
