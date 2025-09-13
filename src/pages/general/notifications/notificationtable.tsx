import React, { useState } from "react";

interface NotificationData {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}

interface NotificationTableProps {
  onRowSelect?: (selectedIds: number[]) => void;
}

const NotificationTable: React.FC<NotificationTableProps> = ({ onRowSelect }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Sample notification data based on the image
  const notifications: NotificationData[] = [
    {
      id: 1,
      title: "Experience seamless shopping",
      description: "Discover top-notch ecommerce products from stores across the nation. Place your first order today and unlock exclusive rewards!",
      link: "https://www.colala.com",
      date: "21-08-2025 / 07:22 AM"
    },
    {
      id: 2,
      title: "Experience seamless shopping", 
      description: "Discover top-notch ecommerce products from stores across the nation. Place your first order today and unlock exclusive rewards!",
      link: "https://www.colala.com",
      date: "21-08-2025 / 07:22 AM"
    },
    {
      id: 3,
      title: "Experience seamless shopping",
      description: "Discover top-notch ecommerce products from stores across the nation. Place your first order today and unlock exclusive rewards!",
      link: "https://www.colala.com", 
      date: "21-08-2025 / 07:22 AM"
    }
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = notifications.map(notification => notification.id);
      setSelectedRows(allIds);
      onRowSelect?.(allIds);
    } else {
      setSelectedRows([]);
      onRowSelect?.([]);
    }
  };

  const handleRowSelect = (id: number) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter(rowId => rowId !== id)
      : [...selectedRows, id];
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSendNow = (id: number) => {
    console.log("Send now clicked for notification:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit clicked for notification:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete clicked for notification:", id);
  };

  return (
    <div className="mt-5 bg-white border border-[#E5E7EB] rounded-lg">
      {/* Table Header */}
      <div className="bg-[#F9FAFB] px-6 py-4 border-b border-[#E5E7EB] rounded-t-lg">
        <h3 className="text-base font-medium text-[#111827]">Latest Notifications</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F9FAFB]">
            <tr className="border-b border-[#E5E7EB]">
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#D1D5DB] text-[#E53E3E] focus:ring-[#E53E3E]"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === notifications.length && notifications.length > 0}
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">Notification</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-[#374151]">Link</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {notifications.map((notification, index) => (
              <tr 
                key={notification.id} 
                className={`hover:bg-[#F9FAFB] ${index !== notifications.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#D1D5DB] text-[#E53E3E] focus:ring-[#E53E3E]"
                    checked={selectedRows.includes(notification.id)}
                    onChange={() => handleRowSelect(notification.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-sm">
                    <h4 className="text-sm font-semibold text-[#111827] mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex  items-center gap-2">
                    <div className="w-8 h-10 mr-12  rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-[#D9D9D9] rounded-sm"></div>
                    </div>
                    <span className="text-xs text-[#111827]">
                      {notification.link}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-[#6B7280]">{notification.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {/* Send Now Button */}
                    <button
                      onClick={() => handleSendNow(notification.id)}
                      className="bg-[#E53E3E] text-white px-5 py-[0.5] rounded-lg text-[12px] font-medium  transition-colors"
                    >
                      Send New
                    </button>
                    
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(notification.id)}
                      className="p-1.5 text-[#6B7280] hover:text-[#374151] transition-colors"
                      title="Edit"
                    >
                     <img src="/public/assets/layout/notiedit.svg" alt="Edit " className=" " />
                    </button>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-1.5 text-[#6B7280] hover:text-[#EF4444] transition-colors"
                      title="Delete"
                    >
                     <img src="public/assets/layout/notidel.svg" className="" ></img>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationTable;