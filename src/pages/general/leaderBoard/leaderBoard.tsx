import PageHeader from "../../../components/PageHeader";
import images from "../../../constants/images";
import { leaderboardUsers } from "./leaderboardData";
import { useState } from "react";

const LeaderBoard = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(leaderboardUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };
  return (
    <>
      <PageHeader title="Seller Leaderboard" />
      <div className="p-6">
        {/* Leaderboard Podium */}
        <div className="flex justify-evenly items-end gap-6 mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="bg-[#C0C0C0] rounded-t-[50px] rounded-[10px] pt-1 pb-2 text-center min-h-[200px] w-[367px] flex flex-col justify-between shadow-lg">
              <div className="text-3xl font-bold ">2nd</div>
              <div className="flex flex-col items-center">
                <img 
                  src={images.bella} 
                  alt="Bella" 
                  className="w-23 h-23 rounded-full mb-4"
                />
                <h3 className=" text-base mb-2">Bella Stores</h3>
                <p className="text-lg font-medium">400 points</p>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="bg-[#FFD700] rounded-t-[50px] rounded-[10px] p-8 text-center min-h-[240px] w-[367px] flex flex-col justify-between shadow-lg">
              <div className="text-3xl font-bold mb-3">1st</div>
              <div className="flex flex-col items-center">
                <img 
                  src={images.sasha} 
                  alt="Sasha" 
                  className="w-28 h-28 rounded-full mb-4"
                />
                <h3 className=" text-base mb-2">Sasha Stores</h3>
                <p className="text-xl font-medium">400 points</p>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="bg-[#CE8946] rounded-t-[50px] rounded-[10px] p-[2px] text-center min-h-[160px] w-[367px] flex flex-col justify-between shadow-lg">
              <div className="text-3xl font-bold">3rd</div>
              <div className="flex flex-col items-center">
                <img 
                  src={images.jennifer} 
                  alt="Jennifer" 
                  className="w-18 h-18 rounded-full mb-4"
                />
                <h3 className=" text-base mb-2">Jennifer Stores</h3>
                <p className="text-base font-medium">400 points</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Users Table */}
        <div className="">
          {/* Header with Bulk Action and Search */}
          <div className="flex justify-between items-center p-6">
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border-[0.3px] border-[#989898] hover:bg-gray-200 transition-colors">
              Bulk Action
            </button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={images.MagnifyingGlass} alt="Search" className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border-[0.3px] border-[#989898]">

          
          {/* Table Title */}
          <div className="p-5 ">
            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2F2F2]">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      className="rounded w-4 h-4 border-gray-300"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedUsers.length === leaderboardUsers.length}
                    />
                  </th>
                  <th className="px-6 py-6 text-left text-xs  text-gray-900">User Name</th>
                  <th className="px-6 py-6 text-left text-xs  text-gray-900">Position</th>
                  <th className="px-6 py-6 text-left text-xs  text-gray-900">Balance</th>
                  <th className="px-6 py-6 text-left text-xs  text-gray-900">Points Balance</th>
                  <th className="px-6 py-6 text-left text-xs  text-gray-900">User type</th>
                  <th className="px-6 py-6 text-left text-xs  text-gray-900">Other</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 ">
                      <input
                        type="checkbox"
                        className="rounded w-4 h-4 border-gray-300"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-6 ">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <span className="text-xs  text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6  text-xs font-bold text-gray-900">{user.position}</td>
                    <td className="px-6  text-xs font-bold text-gray-900">{user.balance}</td>
                    <td className="px-6  text-xs font-bold text-gray-900">{user.pointsBalance}</td>
                    <td className="px-6  text-xs text-gray-900">{user.userType}</td>
                    <td className="px-6 py-3">
                      <button className="px-5 py-3 bg-[#E53E3E] text-white rounded-lg hover:bg-red-600 transition-colors text-[10px]">
                        User Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default LeaderBoard