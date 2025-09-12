import React, { useState } from "react";
import images from "../../../constants/images";
import PageHeader from "../../../components/PageHeader";

// DisputesModal component (equivalent to ChatsModel)
interface DisputesModalProps {
  isOpen: boolean;
  onClose: () => void;
  disputeData?: Dispute | null;
}

const DisputesModal: React.FC<DisputesModalProps> = ({ isOpen, onClose, disputeData }) => {
  const [hasJoinedChat, setHasJoinedChat] = useState(false);
  const [wonBy, setWonBy] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  
  if (!isOpen) return null;

  const handleJoinChat = () => {
    setHasJoinedChat(true);
  };

  const handleLeaveChat = () => {
    if (!wonBy) {
      setShowWarningModal(true);
    } else {
      setHasJoinedChat(false);
      onClose();
    }
  };

  const handleClose = () => {
    if (hasJoinedChat && !wonBy) {
      setShowWarningModal(true);
    } else {
      onClose();
    }
  };

  const handleWonByChange = (value: string) => {
    setWonBy(value);
  };

  return (
    <div className="fixed inset-0 z-100 bg-[#00000080] bg-opacity-50 flex justify-end">
      <div className="bg-white w-[530px] relative h-full overflow-y-auto">
        {/* Header */}
        <div className="border-b border-[#787878] px-3 py-3 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Chat</h2>
            <div className="flex flex-row items-center gap-3">
              <div className="flex items-center gap-2">
                
                <select 
                  value={wonBy}
                  onChange={(e) => handleWonByChange(e.target.value)}
                  className="border border-[#CDCDCD] rounded-lg px-2 py-2 text-sm"
                >
                  <option value="" disabled hidden>Won by</option>
                  <option value="customer">Customer</option>
                  <option value="store">Store</option>
                </select>
              </div>
              <div className="rounded-full p-2 border border-[#CDCDCD]">
                <img
                  className="cursor-pointer"
                  src={images.shoppingcart}
                  alt=""
                />
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-md cursor-pointer"
                aria-label="Close"
              >
                <img className="w-7 h-7" src={images.close} alt="Close" />
              </button>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="pr-5 pl-5 mt-3">
          <div className="flex flex-row justify-between">
            <div className="flex gap-2">
              <div>
                <img className="w-14 h-14" src={images.sasha} alt="" />
              </div>
              <div className="flex flex-col gap-1 items-center justify-center">
                <span className="text-[14px]">{disputeData?.userName || "Cynthia Grace"}</span>
                <span className="text-[#00000080] text-[6px] ml-[-18px]">
                  Last seen: 2 min ago
                </span>
              </div>
            </div>
            <div className="mt-5">
              {!hasJoinedChat ? (
                <button 
                  onClick={handleJoinChat}
                  className="px-5 py-2 cursor-pointer text-white text-[10px] bg-[#E53E3E] rounded-lg mr-2"
                >
                  Join Chat
                </button>
              ) : (
                <button 
                  onClick={handleLeaveChat}
                  className="px-5 py-2 cursor-pointer text-white text-[10px] bg-[#E53E3E] rounded-lg mr-2"
                >
                  Leave Chat
                </button>
              )}
              <button className="px-3 py-2 cursor-pointer text-white text-[10px] bg-black rounded-lg">
                Switch to buyer
              </button>
            </div>
          </div>
          <div className="border border-[#E53E3E] bg-[#FFE5E5] rounded-2xl p-3 mt-3">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <span className="font-semibold">Items in cart (2)</span>
                <span className="text-[#E53E3E] font-semibold">N5,000,000</span>
              </div>
              <div className="flex flex-row mt-3">
                <div>
                  <img className="rounded-l-lg" src={images.iphone} alt="" />
                </div>
                <div className="flex flex-col p-1 pr-3 pl-3 bg-[#F9F9F9] w-full rounded-r-lg justify-between">
                  <div className="text-[18px]">Iphone 16 pro max - Black</div>
                  <div className="flex flex-row justify-between">
                    <span className="text-[#E53E3E] font-semibold">
                      N2,500,000
                    </span>
                    <span>Qty: 1</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-3">
                <div>
                  <img className="rounded-l-lg" src={images.iphone} alt="" />
                </div>
                <div className="flex flex-col p-1 pr-3 pl-3 bg-[#F9F9F9] w-full rounded-r-lg justify-between">
                  <div className="text-[18px]">Iphone 16 pro max - Black</div>
                  <div className="flex flex-row justify-between">
                    <span className="text-[#E53E3E] font-semibold">
                      N2,500,000
                    </span>
                    <span>Qty: 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Messages Section */}
          {/* Original messages - always visible */}
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="bg-[#E53E3E] flex flex-col px-4 py-3 w-75 mt-3 rounded-t-3xl rounded-bl-3xl rounded-br-lg">
              <span className="text-white">
                How will i get the product delivered
              </span>
              <span className="text-[#FFFFFF80] text-[12px] flex justify-end-safe mr-4">
                07:22AM
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="bg-[#FFD8D8] flex flex-col px-4 py-3 w-70 mt-3 rounded-t-3xl rounded-bl-lg rounded-br-3xl">
              <span className="text-black">
                Thank you for purchasing from us
              </span>
              <span className="text-[#00000080] text-[12px] flex justify-end-safe mr-3">
                07:22AM
              </span>
            </div>
            <div></div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="bg-[#FFD8D8] flex flex-col px-4 py-3 w-80 mt-2 rounded-tl-lg rounded-tr-3xl rounded-b-3xl">
              <span className="text-black">
                I will arrange a dispatch rider soon and i will contact you
              </span>
              <span className="text-[#00000080] text-[12px] flex justify-end-safe mr-3">
                07:22AM
              </span>
            </div>
            <div></div>
          </div>
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="bg-[#E53E3E] flex flex-col px-3 py-3 w-53 mt-3 rounded-t-3xl rounded-bl-3xl rounded-br-lg">
              <span className="text-white">
                Okay i will be expecting.
              </span>
              <span className="text-[#FFFFFF80] text-[12px] flex justify-end-safe mr-4">
                07:22AM
              </span>
            </div>
          </div>

          {/* Additional messages shown after joining chat */}
          {hasJoinedChat && (
            <>
              {/* Dispute Category Section */}
              <div className="mt-4 p-4 bg-[#FFE5E5] border border-[#E53E3E] rounded-2xl">
                <div className="text-[#E53E3E] text-sm font-semibold mb-2">Category</div>
                <div className="text-black font-semibold text-lg mb-3">Order Dispute</div>
                <div className="text-[#E53E3E] text-sm font-semibold mb-2">Details</div>
                <div className="text-black">The store is not responding to me</div>
              </div>
              
              {/* You have joined chat notification */}
              <div className="w-full mt-4 p-3 bg-[#FFE5E5] border border-[#E53E3E] rounded-2xl text-center">
                <span className="text-[#E53E3E] font-medium">You have joined this chat</span>
              </div>
              
              {/* Customer Agent Message */}
              <div className="flex flex-row justify-between mt-4 mb-10">
                <div className="bg-[#E8D5FF] flex flex-col px-4 py-3 w-80 rounded-t-3xl rounded-bl-lg rounded-br-3xl">
                  <span className="text-black">
                    We will find a way to resolve it
                  </span>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#9333EA] text-[10px] font-medium">Customer Agent</span>
                    <span className="text-[#00000080] text-[12px]">
                      07:22AM
                    </span>
                  </div>
                </div>
                <div></div>
              </div>
            </>
          )}
        </div>
        
        {/* Message Input */}
        <div className="sticky bottom-0 bg-white p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Type a message"
              className="w-full pl-12 pr-16 py-3 border border-[#CDCDCD] rounded-2xl text-[14px] bg-[#FFFFFF]"
            />
            {/* Attachment Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <img src="/public/assets/layout/pin.svg" alt="Attachment" />
            </div>
            {/* Send Button */}
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full">
              <img src="/public/assets/layout/sendmessage.svg" alt="Send" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-[200] backdrop-brightness-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#FFE5E5] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg"><img src={images.Warning} alt="" /></span>
              </div>
            </div>
            <p className="text-gray-800 mb-6 text-sm leading-relaxed">
              You cannot leave or close this chat until you select who won
            </p>
            <button
              onClick={() => setShowWarningModal(false)}
              className="w-full py-2 px-4 border border-gray-200  text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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

    if (onActionSelect) {
      onActionSelect(action);
    }

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

// DisputeFilters component (equivalent to ChatFilters)
interface DisputeFiltersProps {
  onBulkActionSelect?: (action: string) => void;
}

const DisputeFilters: React.FC<DisputeFiltersProps> = ({ onBulkActionSelect }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");
  const tabs = ["All", "Pending", "On Hold", "Resolved"];

  const TabButtons = () => (
    <div className="flex items-center space-x-0.5 border border-[#989898] rounded-lg p-1 w-fit bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm rounded-lg font-normal transition-all duration-200 cursor-pointer ${
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
    console.log("Bulk action selected in Disputes:", action);
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
      
      {/* Right side - Today dropdown, Bulk Action, and Search */}
      <div className="flex flex-row items-center gap-6">
        {/* Today Dropdown */}
        <div className="relative">
          <select 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-[#00000080] rounded-lg text-[15px] focus:outline-none bg-white appearance-none cursor-pointer min-w-[100px]"
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
        <div className="mr-65">
          <BulkActionDropdown onActionSelect={handleBulkActionSelect} />
        </div>
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-12 pr-6 py-2 border border-[#00000080] rounded-lg text-[15px] w-[280px] focus:outline-none bg-white placeholder-[#00000080]"
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
  );
};

// DisputesTable component (equivalent to ChatsTable)
interface Dispute {
  id: string;
  storeName: string;
  userName: string;
  lastMessage: string;
  chatDate: string;
  wonBy: string;
  status: "pending" | "resolved" | "onhold";
}

interface DisputesTableProps {
  title?: string;
  onRowSelect?: (selectedIds: string[]) => void;
}

const DisputesTable: React.FC<DisputesTableProps> = ({ onRowSelect }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  // Sample data based on the image
  const disputes: Dispute[] = [
    {
      id: "1",
      storeName: "Pet Paradise",
      userName: "David Chen",
      lastMessage: "What are the ingredients in your gr...",
      chatDate: "20-07-2025/07:58PM",
      wonBy: "Store",
      status: "resolved",
    },
    {
      id: "2",
      storeName: "Fitness Forward",
      userName: "Sofia Rossi",
      lastMessage: "I'd like to return the yoga mat I...",
      chatDate: "20-07-2025/07:58PM",
      wonBy: "-",
      status: "pending",
    },
    {
      id: "3",
      storeName: "Fresh Blooms Co.",
      userName: "Elena Petrova",
      lastMessage: "Can I change the delivery address for...",
      chatDate: "20-07-2025/07:58PM",
      wonBy: "Store",
      status: "resolved",
    },
    {
      id: "4",
      storeName: "AutoPro Parts",
      userName: "Kenji Tanaka",
      lastMessage: "Is this compatible with a 2023 Hon...",
      chatDate: "20-07-2025/07:58PM",
      wonBy: "-",
      status: "pending",
    },
    {
      id: "5",
      storeName: "Gadget Haven",
      userName: "Qamar Malik",
      lastMessage: "I need this delivered to my location...",
      chatDate: "20-07-2025/07:58PM",
      wonBy: "Store",
      status: "onhold",
    },
    {
      id: "6",
      storeName: "Artisan Coffee Roasters",
      userName: "Liam O'Connell",
      lastMessage: "Do you offer a subscription servi...",
      chatDate: "20-07-2025/07:58PM",
      wonBy: "Store",
      status: "resolved",
    },
    {
      id: "7",
      storeName: "The Book Nook",
      userName: "Fatima Al-Sayed",
      lastMessage: "My order seems to be delayed, any...",
      chatDate: "20-07-2025/07:58PM",
      wonBy: "Store",
      status: "resolved",
    },
  ];

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "resolved":
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case "pending":
        return <div className="w-3 h-3 bg-orange-500 rounded-full"></div>;
      case "onhold":
        return <div className="w-3 h-3 bg-black rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-300 rounded-full"></div>;
    }
  };

  const handleShowDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowModal(true);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(disputes.map((dispute) => dispute.id));
    }
    setSelectAll(!selectAll);

    if (onRowSelect) {
      onRowSelect(selectAll ? [] : disputes.map((dispute) => dispute.id));
    }
  };

  const handleRowSelect = (disputeId: string) => {
    let newSelectedRows;
    if (selectedRows.includes(disputeId)) {
      newSelectedRows = selectedRows.filter((id) => id !== disputeId);
    } else {
      newSelectedRows = [...selectedRows, disputeId];
    }

    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === disputes.length);

    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  return (
    <div className="border border-[#989898] rounded-2xl w-[1160px] ml-6 mt-1 mb-4">
      <div className="bg-white p-5 rounded-t-2xl font-semibold text-[16px] border-b border-[#989898]">
        Latest Chats
      </div>
      <div className="bg-white rounded-b-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F2F2F2]">
            <tr>
              <th className="text-center p-3 font-semibold text-[14px] w-12">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-5 h-5 border border-gray-300 rounded cursor-pointer"
                />
              </th>
              <th className="text-left p-3 font-semibold text-[14px]">
                Store Name
              </th>
              <th className="text-left p-3 font-semibold text-[14px]">
                User Name
              </th>
              <th className="text-left p-3 font-semibold text-[14px]">
                Last Message
              </th>
              <th className="text-left p-3 font-semibold text-[14px]">
                Chat Date
              </th>
              <th className="text-left p-3 font-semibold text-[14px]">
                Won by
              </th>
              <th className="text-left p-3 font-semibold text-[14px]">
                Status
              </th>
              <th className="text-center p-3 font-semibold text-[14px]">
                Other
              </th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute, index) => (
              <tr
                key={dispute.id}
                className={`border-t border-[#E5E5E5] transition-colors ${
                  index === disputes.length - 1 ? "" : "border-b"
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(dispute.id)}
                    onChange={() => handleRowSelect(dispute.id)}
                    className="w-5 h-5 border border-gray-300 rounded cursor-pointer text-center"
                  />
                </td>
                <td className="p-4 text-[12px] text-black text-left">
                  {dispute.storeName}
                </td>
                <td className="p-4 text-[12px] text-black text-left">
                  {dispute.userName}
                </td>
                <td className="p-4 text-[12px] text-black text-left">
                  {dispute.lastMessage}
                </td>
                <td className="p-4 text-[12px] text-black text-left">
                  {dispute.chatDate}
                </td>
                <td className="p-4 text-[12px] text-black text-left">
                  {dispute.wonBy}
                </td>
                <td className="p-4 text-[12px] text-left">
                  <div className="flex items-center">
                    {getStatusIndicator(dispute.status)}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleShowDetails(dispute)}
                    className="bg-[#E53E3E] text-white px-6 py-2 rounded-lg text-[12px] font-medium hover:bg-[#D32F2F] cursor-pointer"
                  >
                    View Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Disputes Modal */}
      <DisputesModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        disputeData={selectedDispute}
      />
    </div>
  );
};

const Disputes = () => {
  const handleBulkActionSelect = (action: string) => {
    console.log("Bulk action selected in Disputes:", action);
  };

  return (
    <>
      <PageHeader title="Disputes" />
      <div className="p-5">
        <div className="flex flex-row justify-between items-center">
          {/* Card 1 - Total Chats */}
          <div
            className="flex flex-row rounded-2xl w-90"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-7 flex justify-center items-center">
              <img className="w-9 h-9" src={images.chatcircle} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-11 gap-1">
              <span className="font-semibold text-[15px]">Total Chats</span>
              <span className="font-semibold text-2xl">10</span>
              <span className="text-[#00000080] text-[13px]">
                <span className="text-[#1DB61D]">+5%</span> increase from last month
              </span>
            </div>
          </div>

          {/* Card 2 - Pending Chats */}
          <div
            className="flex flex-row rounded-2xl w-90"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-7 flex justify-center items-center">
              <img className="w-9 h-9" src={images.chatcircle} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-11 gap-1">
              <span className="font-semibold text-[15px]">Pending Chats</span>
              <span className="font-semibold text-2xl">2</span>
              <span className="text-[#00000080] text-[13px]">
                <span className="text-[#1DB61D]">-5%</span> decrease from last month
              </span>
            </div>
          </div>

          {/* Card 3 - Resolved Chats */}
          <div
            className="flex flex-row rounded-2xl w-90"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-7 flex justify-center items-center">
              <img className="w-9 h-9" src={images.chatcircle} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-11 gap-1">
              <span className="font-semibold text-[15px]">Resolved Chats</span>
              <span className="font-semibold text-2xl">0</span>
              <span className="text-[#00000080] text-[13px]">
                <span className="text-[#1DB61D]">+5%</span> increase from last month
              </span>
            </div>
          </div>
        </div>
        <DisputeFilters onBulkActionSelect={handleBulkActionSelect} />
      </div>
      <DisputesTable
        title="Latest Chats"
        onRowSelect={(selectedIds) => {
          console.log("Selected dispute IDs:", selectedIds);
        }}
      />
    </>
  );
};

export default Disputes;
