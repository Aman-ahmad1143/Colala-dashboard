import images from "../../../constants/images";
import { useState } from "react";
import ManagementSettingTable from "./managementsettingtable";
import AddNewAdmin from "./addnewadmin";
import AdminDetail from "./admindetail";

interface Admin {
  id: string;
  name: string;
  avatar: string;
  role: string;
  dateJoined: string;
  status: "active" | "inactive";
  email?: string;
  location?: string;
  lastLogin?: string;
}

const AllUsers = () => {
  const [selectedOption, setSelectedOption] = useState("Online");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Admin Management");
  const [isThisWeekDropdownOpen, setIsThisWeekDropdownOpen] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [newAdminData, setNewAdminData] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  } | null>(null);
  
  const dropdownOptions = ["Online", "All", "Active", "Inactive"];

  const handleAddNewAdmin = (adminData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setNewAdminData(adminData);
    // Reset after a short delay to allow the table to process the new admin
    setTimeout(() => {
      setNewAdminData(null);
    }, 100);
  };

  const handleOpenModal = () => {
    // Close all dropdowns before opening modal
    setIsDropdownOpen(false);
    setIsThisWeekDropdownOpen(false);
    setIsAddAdminModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close modal and ensure all dropdowns are closed
    setIsAddAdminModalOpen(false);
    setIsDropdownOpen(false);
    setIsThisWeekDropdownOpen(false);
  };

  const handleAdminDetails = (admin: Admin) => {
    setSelectedAdmin(admin);
  };

  const handleBackToTable = () => {
    setSelectedAdmin(null);
  };

  const CustomHeader = () => (
    <div className="flex items-center justify-between p-6 bg-white border-b border-t border-[#787878]">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="flex items-center gap-3">
        {/* Main Tabs Group */}
        <div className="flex items-center bg-white border border-gray-300 rounded-2xl p-1 shadow-sm">
          {["General", "Admin Management", "Categories", "FAQs"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-[#E53E3E] text-white" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        
        {/* This Week Dropdown - Separate */}
        <div className="relative">
          <div className="bg-white border border-gray-300 rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setIsThisWeekDropdownOpen(!isThisWeekDropdownOpen)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full transition-all duration-200"
            >
              <span>This Week</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  isThisWeekDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          
          {isThisWeekDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {["This Week", "Last Week", "This Month", "Last Month"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setIsThisWeekDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const DropdownComponent = () => (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-between px-6 py-3 border border-[#989898] rounded-lg bg-white text-black text-sm font-normal w-32 focus:outline-none hover:bg-gray-50 transition-colors"
      >
        <span>{selectedOption}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#989898] rounded-lg shadow-lg z-10">
          {dropdownOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsDropdownOpen(false);
              }}
              className="w-full px-6 py-3 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {selectedAdmin ? (
        <AdminDetail 
          admin={selectedAdmin} 
          onBack={handleBackToTable}
        />
      ) : (
        <>
          <CustomHeader />
          <div className="p-5">
        <div className="flex flex-row justify-between items-center">
          {/* Card 1 */}
          <div
            className="flex flex-row rounded-2xl  w-90"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-7 flex justify-center items-center ">
              <img className="w-9 h-9" src={images.Users} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-11 gap-1">
              <span className="font-semibold text-[15px]">Total Admins</span>
              <span className="font-semibold text-2xl">50</span>
              <span className="text-[#00000080] text-[8px] ">
                <span className="text-[#1DB61D]">+5%</span> increase from last
                month
              </span>
            </div>
          </div>

          {/* Card 2 */}

          <div
            className="flex flex-row rounded-2xl w-90"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-7 flex justify-center items-center ">
              <img className="w-9 h-9" src={images.Users} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-11 gap-1">
              <span className="font-semibold text-[15px]">Online admins</span>
              <span className="font-semibold text-2xl">20</span>
              <span className="text-[#00000080] text-[8px] ">
                <span className="text-[#1DB61D]">+5%</span> increase from last
                month
              </span>
            </div>
          </div>

          {/* Card 3 */}

          <div
            className="flex flex-row rounded-2xl w-90"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-7 flex justify-center items-center ">
              <img className="w-9 h-9" src={images.Users} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-11 gap-1">
              <span className="font-semibold text-[15px]">Active Admins</span>
              <span className="font-semibold text-2xl">40</span>
              <span className="text-[#00000080] text-[8px] ">
                <span className="text-[#1DB61D]">+5%</span> increase from last
                month
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-row justify-between">
          <div className="flex gap-2">
            <div>
              <DropdownComponent />
            </div>
           
          </div>
          <div className="flex flex-row gap-2">
           
            <div>
              <button 
                onClick={handleOpenModal}
                className="bg-[#E53E3E] text-white cursor-pointer px-6 py-3 rounded-2xl"
              >
                Add New 
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-12 pr-6 py-3 border border-[#00000080] rounded-lg text-[15px] w-[267px] focus:outline-none bg-white shadow-[0_2px_6px_rgba(0,0,0,0.05)] placeholder-[#00000080]"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
        
        {/* Management Settings Table */}
        <ManagementSettingTable 
          newAdmin={newAdminData} 
          onAdminDetails={handleAdminDetails}
        />
        
        {/* Add New Admin Modal */}
        <AddNewAdmin
          isOpen={isAddAdminModalOpen}
          onClose={handleCloseModal}
          onAddAdmin={handleAddNewAdmin}
        />
        
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;
