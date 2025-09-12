import React, { useState } from "react";

interface RatingAndReviewFiltersProps {
  onBulkActionSelect?: (action: string) => void;
}

// Embedded BulkActionDropdown component
interface BulkActionDropdownProps {
  onActionSelect?: (action: string) => void;
}

const BulkActionDropdown: React.FC<BulkActionDropdownProps> = ({
  onActionSelect,
}) => {
  const [isBulkDropdownOpen, setIsBulkDropdownOpen] = useState(false);
  const [selectedBulkAction, setSelectedBulkAction] = useState("Bulk Action");

  const bulkActions = ["Export as CSV", "Export as PDF", "Delete"];

  const handleBulkDropdownToggle = () => {
    setIsBulkDropdownOpen(!isBulkDropdownOpen);
  };

  const handleBulkOptionSelect = (action: string) => {
    setSelectedBulkAction(action);
    setIsBulkDropdownOpen(false);

    // Call the parent callback if provided
    if (onActionSelect) {
      onActionSelect(action);
    }

    // Add your logic for each action here
    console.log("Selected bulk action:", action);
  };

  return (
    <div className="relative inline-block text-right">
      <button
        onClick={handleBulkDropdownToggle}
        className="inline-flex justify-center items-center px-4 py-2 border border-[#989898] text-black bg-white rounded-lg cursor-pointer min-w-[120px]"
      >
        {selectedBulkAction}
      </button>

      {isBulkDropdownOpen && (
        <div className="absolute  z-10 mt-2 w-38 bg-white border border-gray-200 font-semibold rounded-2xl shadow-lg">
          {bulkActions.map((action) => (
            <button
              key={action}
              onClick={() => handleBulkOptionSelect(action)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                action === "Delete" ? "text-[#FF0000]" : "text-black"
              } cursor-pointer `}
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const RatingAndReviewFilters: React.FC<RatingAndReviewFiltersProps> = ({ onBulkActionSelect }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");
  const tabs = ["All", "Store", "Products"];

  const TabButtons = () => (
    <div className="flex items-center space-x-0.5 border border-[#989898] rounded-lg p-1 w-fit bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-8 text-sm rounded-lg font-normal transition-all duration-200 cursor-pointer ${
              isActive ? "bg-[#E53E3E] text-white" : "text-black hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );

  const handleBulkActionSelect = (action: string) => {
    // Handle the bulk action selection from the parent component
    console.log("Bulk action selected in Rating and Review:", action);
    // Call parent callback if provided
    if (onBulkActionSelect) {
      onBulkActionSelect(action);
    }
  };

  return (
    <div className="mt-5 flex flex-row items-center justify-between">
      {/* Left side - Tab buttons */}
      <div className="flex items-center">
        <TabButtons />
      </div>
      
      {/* Right side - Today dropdown, Bulk Action, Settings, and Search */}
      <div className="flex flex-row items-center gap-3">
        {/* Today Dropdown */}
        <div className="relative">
          <select 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-[#00000080] rounded-lg text-[14px] focus:outline-none bg-white appearance-none cursor-pointer min-w-[90px]"
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Bulk Action Dropdown */}
        <div className="mr-90">
          <BulkActionDropdown onActionSelect={handleBulkActionSelect} />
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2  border border-[#00000080] rounded-lg text-[14px] w-[235px] focus:outline-none bg-white placeholder-[#00000080]"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReviewFilters;
