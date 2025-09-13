import React, { useState } from "react";
import NewNotification from "./newnotification";
import NewBanner from "./newbanner";

interface NotificationsFiltersProps {
  onBulkActionSelect?: (action: string) => void;
  onTabChange?: (tab: string) => void;
  activeTab?: string;
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
        <div className="absolute z-10 mt-2 w-38 bg-white border border-gray-200 font-semibold rounded-2xl shadow-lg">
          {bulkActions.map((action) => (
            <button
              key={action}
              onClick={() => handleBulkOptionSelect(action)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                action === "Delete" ? "text-[#FF0000]" : "text-black"
              } cursor-pointer`}
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const NotificationsFilters: React.FC<NotificationsFiltersProps> = ({ 
  onBulkActionSelect, 
  onTabChange, 
  activeTab: externalActiveTab 
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState("Notification");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [isNewNotificationModalOpen, setIsNewNotificationModalOpen] = useState(false);
  const [isNewBannerModalOpen, setIsNewBannerModalOpen] = useState(false);
  
  const activeTab = externalActiveTab || internalActiveTab;
  const tabs = ["Notification", "Banner"];

  const handleTabChange = (tab: string) => {
    if (!externalActiveTab) {
      setInternalActiveTab(tab);
    }
    onTabChange?.(tab);
  };

  const TabButtons = () => (
    <div className="flex items-center space-x-0.5 border border-[#989898] rounded-lg p-1 w-fit bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
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
    console.log("Bulk action selected in Notifications:", action);
    // Call parent callback if provided
    if (onBulkActionSelect) {
      onBulkActionSelect(action);
    }
  };

  const handleOpenNewNotificationModal = () => {
    setIsNewNotificationModalOpen(true);
  };

  const handleCloseNewNotificationModal = () => {
    setIsNewNotificationModalOpen(false);
  };

  const handleNewNotificationSubmit = (data: any) => {
    console.log("New notification data:", data);
    // Handle the notification submission logic here
    // You can add API calls or state updates as needed
  };

  const handleOpenNewBannerModal = () => {
    setIsNewBannerModalOpen(true);
  };

  const handleCloseNewBannerModal = () => {
    setIsNewBannerModalOpen(false);
  };

  const handleNewBannerSubmit = (data: any) => {
    console.log("New banner data:", data);
    // Handle the banner submission logic here
    // You can add API calls or state updates as needed
  };

  return (
    <>
      <div className="mt-5 flex flex-row items-center justify-between">
        {/* Left side - Tab buttons */}
        <div className="flex items-center">
          <TabButtons />
        </div>
        
        {/* Middle section - Today dropdown and Bulk Action */}
        <div className="flex flex-row items-center gap-3 ml-3">
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
          <BulkActionDropdown onActionSelect={handleBulkActionSelect} />
        </div>
        
        {/* Right side - Banner button, Notification button, and Search */}
        <div className="flex flex-row items-center mr-50 gap-3">
          {/* Banner Button */}
          <button 
            onClick={handleOpenNewBannerModal}
            className="bg-[#E53E3E] ml-65 text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium text-sm"
          >
            Banner
          </button>

          {/* Notification Button */}
          <button 
            onClick={handleOpenNewNotificationModal}
            className="bg-[#E53E3E]  text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium text-sm"
          >
            Notification
          </button>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-[#00000080] rounded-lg text-[14px] w-[235px] focus:outline-none bg-white placeholder-[#00000080]"
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

      {/* New Notification Modal */}
      <NewNotification
        isOpen={isNewNotificationModalOpen}
        onClose={handleCloseNewNotificationModal}
        onSubmit={handleNewNotificationSubmit}
      />

      {/* New Banner Modal */}
      <NewBanner
        isOpen={isNewBannerModalOpen}
        onClose={handleCloseNewBannerModal}
        onSubmit={handleNewBannerSubmit}
      />
    </>
  );
};

export default NotificationsFilters;