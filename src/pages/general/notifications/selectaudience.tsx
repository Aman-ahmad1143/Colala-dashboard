import React, { useState } from "react";

interface SelectAudienceProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (selectedUsers: string[]) => void;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

const SelectAudience: React.FC<SelectAudienceProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [activeTab, setActiveTab] = useState<"Buyers" | "Sellers">("Buyers");
  const [selectedUsers, setSelectedUsers] = useState<string[]>(["6", "7"]); // Pre-select some sellers to match image
  const [searchQuery, setSearchQuery] = useState("");

  // Sample users data
  const buyers: User[] = [
    {
      id: "1",
      name: "Adewale Faizah",
      avatar: "/public/assets/layout/adam.png"
    },
    {
      id: "2", 
      name: "Chidinma Okoro",
      avatar: "/public/assets/layout/bella.png"
    },
    {
      id: "3",
      name: "Babatunde Adebayo", 
      avatar: "/public/assets/layout/carter.png"
    },
    {
      id: "4",
      name: "Zainab Aliyu",
      avatar: "/public/assets/layout/chris.png"
    },
    {
      id: "5",
      name: "Efemena Ovie",
      avatar: "/public/assets/layout/daisy.png"
    }
  ];

  const sellers: User[] = [
    {
      id: "6",
      name: "Tunde Bakare",
      avatar: "/public/assets/layout/emma.png"
    },
    {
      id: "7",
      name: "Kemi Adebayo",
      avatar: "/public/assets/layout/ethens.png"
    },
    {
      id: "8", 
      name: "Segun Ogundimu",
      avatar: "/public/assets/layout/jennifer.png"
    },
    {
      id: "9",
      name: "Funmi Adeleke",
      avatar: "/public/assets/layout/sasha.png"
    },
    {
      id: "10",
      name: "Ibrahim Musa",
      avatar: "/public/assets/layout/tom.png"
    }
  ];

  const getCurrentUsers = () => {
    return activeTab === "Buyers" ? buyers : sellers;
  };

  const filteredUsers = getCurrentUsers().filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (userType: "Buyers" | "Sellers") => {
    const currentUsers = userType === "Buyers" ? buyers : sellers;
    const currentUserIds = currentUsers.map(user => user.id);
    const allSelected = currentUserIds.every(id => selectedUsers.includes(id));
    
    if (allSelected) {
      // Deselect all current users
      setSelectedUsers(prev => prev.filter(id => !currentUserIds.includes(id)));
    } else {
      // Select all current users
      setSelectedUsers(prev => [...prev.filter(id => !currentUserIds.includes(id)), ...currentUserIds]);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(selectedUsers);
    }
    onClose();
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setSearchQuery("");
    onClose();
  };

  const isUserSelected = (userId: string) => selectedUsers.includes(userId);
  
  const buyersSelected = buyers.some(buyer => selectedUsers.includes(buyer.id));
  const sellersSelected = sellers.some(seller => selectedUsers.includes(seller.id));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 mt-2 flex items-start justify-end z-[9999]">
      <div className="bg-white rounded-lg w-[560px] h-[862px] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={handleClose}
              className="mr-3 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-medium text-gray-900">Select Audience</h2>
          </div>
          <button
            onClick={handleApply}
            className="bg-[#E53E3E] text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors text-sm font-medium"
          >
            Apply
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Audience Type Selection */}
          <div className="mb-4 space-y-3">
            {/* Buyers Row */}
            <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Buyers</span>
              <div className="flex items-center">
                {buyersSelected ? (
                  <div className="w-4 h-4 bg-[#E53E3E] rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div 
                    className="w-4 h-4 border border-gray-300 rounded cursor-pointer"
                    onClick={() => handleSelectAll("Buyers")}
                  ></div>
                )}
              </div>
            </div>

            {/* Sellers Row */}
            <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Sellers</span>
              <div className="flex items-center">
                {sellersSelected ? (
                  <div className="w-4 h-4 bg-[#E53E3E] rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div 
                    className="w-4 h-4 border border-gray-300 rounded cursor-pointer"
                    onClick={() => handleSelectAll("Sellers")}
                  ></div>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-4">
            <button
              onClick={() => setActiveTab("Buyers")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                activeTab === "Buyers" ? "bg-[#E53E3E] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Buyers
            </button>
            <button
              onClick={() => setActiveTab("Sellers")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                activeTab === "Sellers" ? "bg-white text-gray-700 hover:bg-gray-50" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Sellers
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search All buyers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>

          {/* User List */}
          <div className="space-y-3 max-h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleUserToggle(user.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4KPC9zdmc+";
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isUserSelected(user.id)}
                    onChange={() => handleUserToggle(user.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#E53E3E] focus:ring-[#E53E3E]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Send Button */}
          <button
            onClick={handleApply}
            className="w-full mt-6 bg-[#E53E3E] text-white py-3 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAudience;