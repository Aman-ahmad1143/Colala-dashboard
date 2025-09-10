import React, { useState } from "react";

interface SupportFiltersProps {
  onBulkActionSelect?: (action: string) => void;
  onTabChange?: (tab: string) => void;
  selectedTab?: string;
  onSearchChange?: (search: string) => void;
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

const SupportFilters: React.FC<SupportFiltersProps> = ({
  onBulkActionSelect,
  onTabChange,
  selectedTab,
  onSearchChange,
}) => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedIssueType, setSelectedIssueType] = useState("Issue Type");
  const [selectedSeller, setSelectedSeller] = useState("Sellers");
  const tabs = ["All", "Pending", "Resolved"];

  const TabButtons = () => (
    <div className="flex items-center space-x-0.5 border border-[#989898] rounded-lg p-1 w-fit bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-6 text-sm rounded-lg font-normal transition-all duration-200 cursor-pointer ${
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
    console.log("Bulk action selected in Support:", action);
    // Call parent callback if provided
    if (onBulkActionSelect) {
      onBulkActionSelect(action);
    }
  };

  return (
    <div className="mt-5 flex flex-row items-center gap-4">
      {/* Tab buttons */}
      <TabButtons />
      
      {/* Issue Type Dropdown */}
      <div className="relative">
        <select 
          value={selectedIssueType} 
          onChange={(e) => setSelectedIssueType(e.target.value)}
          className="px-3 py-2.5 border border-[#CDCDCD] rounded-lg text-[14px] focus:outline-none bg-white appearance-none cursor-pointer min-w-[110px] text-[black]"
        >
          <option value="Issue Type">Issue Type</option>
          <option value="Account Issues">Account Issues</option>
          <option value="Payment Issues">Payment Issues</option>
          <option value="Product Issues">Product Issues</option>
          <option value="Technical Issues">Technical Issues</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Sellers Dropdown */}
      <div className="relative">
        <select 
          value={selectedSeller} 
          onChange={(e) => setSelectedSeller(e.target.value)}
          className="px-3 py-2.5 border border-[#CDCDCD] rounded-lg text-[14px] focus:outline-none bg-white appearance-none cursor-pointer min-w-[100px] text-black"
        >
          <option value="Sellers">Sellers</option>
          <option value="Pet Paradise">Pet Paradise</option>
          <option value="Fitness Forward">Fitness Forward</option>
          <option value="Fresh Blooms Co.">Fresh Blooms Co.</option>
          <option value="AutoPro Parts">AutoPro Parts</option>
          <option value="Gadget Haven">Gadget Haven</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Today Dropdown */}
      <div className="relative">
        <select 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2.5 border border-[#CDCDCD] rounded-lg text-[14px] focus:outline-none bg-white appearance-none cursor-pointer min-w-[100px] text-black"
        >
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Bulk Action Dropdown */}
      <BulkActionDropdown onActionSelect={handleBulkActionSelect} />
      
      {/* Search Input */}
      <div className="relative ml-auto">
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border border-[#CDCDCD] rounded-lg text-[14px] w-[250px] focus:outline-none bg-white placeholder-[#999999]"
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
  );
};

export default SupportFilters;
