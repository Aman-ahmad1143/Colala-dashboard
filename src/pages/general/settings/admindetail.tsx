import React, { useState } from "react";
import images from "../../../constants/images";

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

interface AdminDetailProps {
  admin: Admin;
  onBack: () => void;
}

interface ActivityItem {
  id: string;
  activity: string;
  date: string;
}

const AdminDetail: React.FC<AdminDetailProps> = ({ admin, onBack }) => {
  const [activeTab, setActiveTab] = useState("Admin Management");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectAllActivities, setSelectAllActivities] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

  // Sample activity data
  const activities: ActivityItem[] = [
    {
      id: "1",
      activity: "User Account created",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "2", 
      activity: "User logged in",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "3",
      activity: "User deleted a comment", 
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "4",
      activity: "Replied a chat",
      date: "22/10/25 - 07:22 AM"
    }
  ];

  const handleSelectAllActivities = () => {
    if (selectAllActivities) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities(activities.map(activity => activity.id));
    }
    setSelectAllActivities(!selectAllActivities);
  };

  const handleActivitySelect = (activityId: string) => {
    let newSelectedActivities;
    if (selectedActivities.includes(activityId)) {
      newSelectedActivities = selectedActivities.filter(id => id !== activityId);
    } else {
      newSelectedActivities = [...selectedActivities, activityId];
    }
    setSelectedActivities(newSelectedActivities);
    setSelectAllActivities(newSelectedActivities.length === activities.length);
  };

  const CustomHeader = () => (
    <div className="flex items-center justify-between p-6 bg-white border-b border-t border-[#787878]">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-gray-500 text-sm">Admin Management</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 text-sm font-medium">Admin Details</span>
      </div>
      
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
      </div>
    </div>
  );

  return (
    <>
      <CustomHeader />
      <div className="p-6">
        {/* Admin Profile Card */}
        <div className="bg-[#E53E3E] rounded-2xl h-[277px] p-6 text-white mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center  gap-4">
              <img 
                src={admin.avatar} 
                alt={admin.name}
                className="w-16 h-16 rounded-full -mt-26 object-cover border-2 border-white"
              />
              <div className="space-y-3">
                {/* Name and Location */}
                <div className="flex gap-12">
                  <div>
                    <div className="text-sm text-[#FFFFFF80] opacity-90 mb-4">Name</div>
                    <div className="font-xs text-[14px]">{admin.name}</div>
                  </div>
                  <div>
                    <div className="text-sm ml-22 text-[#FFFFFF80] opacity-90 mb-4">Location</div>
                    <div className="font-xs ml-22 text-[14px]">{admin.location || "Lagos, Nigeria"}</div>
                  </div>
                </div>
                
                {/* Email and Last Login */}
                <div className="flex gap-12">
                  <div>
                    <div className="text-sm text-[#FFFFFF80] opacity-90 mb-4">Email</div>
                    <div className="font-xs text-[14px]">{admin.email || "qamardeen@admingmail.com"}</div>
                  </div>
                  <div>
                    <div className="text-sm ml-4 text-[#FFFFFF80] opacity-90 mb-4">Last Login</div>
                    <div className="font-xs ml-4 text-[14px]">{admin.lastLogin || "23/02/25 - 11:22 AM"}</div>
                  </div>
                </div>
                
                {/* Account Creation */}
                <div>
                  <div className="text-sm text-[#FFFFFF80] opacity-90 mb-4">Account Creation</div>
                  <div className="font-xs text-[14px]">{admin.dateJoined}</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2  bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                <img src={images.edit} alt="Edit" className="w-8 h-8" />
              </button>
              <button className="p-2  bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
               <img src={images.bell} alt="Delete" className="w-8 h-8" />
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
                  className="p-2  bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <img src="/public/assets/layout/threedots.svg" alt="More" className="w-8 h-8 " />
                </button>
                
                {isActionsDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-lg z-10">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 first:rounded-t-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                      </svg>
                      Block User
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 last:rounded-b-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Admin
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Date Filter Dropdown */}
            <div className="relative">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E] focus:border-transparent bg-white">
                <option>Date</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            {/* Bulk Action */}
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none hover:bg-gray-50 transition-colors bg-white">
              Bulk Action
            </button>
          </div>
        </div>

        {/* User Activity Section */}
        <div className="border border-[#989898] rounded-2xl w-full">
          <div className="bg-white p-5 rounded-t-2xl font-semibold text-[16px] border-b border-[#989898]">
            User Activity
          </div>
          <div className="bg-white rounded-b-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F2F2F2]">
                <tr>
                  <th className="text-center p-3 font-semibold text-[14px] w-12">
                    <input
                      type="checkbox"
                      checked={selectAllActivities}
                      onChange={handleSelectAllActivities}
                      className="w-5 h-5 border border-gray-300 rounded cursor-pointer"
                    />
                  </th>
                  <th className="text-left p-3 font-semibold text-[14px]">
                    Activity
                  </th>
                  <th className="text-left p-3 font-semibold text-[14px]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr
                    key={activity.id}
                    className={`border-t border-[#E5E5E5] transition-colors ${
                      index === activities.length - 1 ? "" : "border-b"
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity.id)}
                        onChange={() => handleActivitySelect(activity.id)}
                        className="w-5 h-5 border border-gray-300 rounded cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-[12px] text-black">
                      {activity.activity}
                    </td>
                    <td className="p-4 text-[12px] text-black">
                      {activity.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDetail;
