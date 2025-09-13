import React, { useState } from "react";

interface BannerData {
  id: number;
  image: string;
  date: string;
  link: string;
  status: "active" | "inactive";
}

interface BannerTableProps {
  onRowSelect?: (selectedIds: number[]) => void;
}

const BannerTable: React.FC<BannerTableProps> = ({ onRowSelect }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Sample banner data - replace the image paths with your own photo paths
  const banners: BannerData[] = [
    {
      id: 1,
      image: "/public/assets/layout/your-banner-1.jpg", // Replace with your photo path
      date: "21-08-2025 / 07:22 AM",
      link: "Lagos, Nigeria",
      status: "active"
    },
    {
      id: 2,
      image: "/public/assets/layout/your-banner-2.jpg", // Replace with your photo path
      date: "21-08-2025 / 07:22 AM", 
      link: "Lagos, Nigeria",
      status: "active"
    },
    {
      id: 3,
      image: "/public/assets/layout/your-banner-3.jpg", // Replace with your photo path
      date: "21-08-2025 / 07:22 AM",
      link: "Lagos, Nigeria", 
      status: "active"
    },
    {
      id: 4,
      image: "/public/assets/layout/your-banner-4.jpg", // Replace with your photo path
      date: "21-08-2025 / 07:22 AM",
      link: "Lagos, Nigeria",
      status: "active"
    },
    {
      id: 5,
      image: "/public/assets/layout/your-banner-5.jpg", // Replace with your photo path
      date: "21-08-2025 / 07:22 AM",
      link: "Lagos, Nigeria",
      status: "active"
    },
    {
      id: 6,
      image: "/public/assets/layout/your-banner-6.jpg", // Replace with your photo path
      date: "21-08-2025 / 07:22 AM",
      link: "Lagos, Nigeria",
      status: "active"
    }
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = banners.map(banner => banner.id);
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

  const handleEdit = (id: number) => {
    console.log("Edit clicked for banner:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete clicked for banner:", id);
  };

  return (
    <div className="mt-5 bg-white border border-[#E5E7EB] rounded-lg">
      {/* Table Header */}
      <div className="bg-[#F9FAFB] px-6 py-4 border-b border-[#E5E7EB] rounded-t-lg">
        <h3 className="text-base font-medium text-[#111827]">Latest Banners</h3>
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
                  checked={selectedRows.length === banners.length && banners.length > 0}
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">Banner Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">Link</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {banners.map((banner, index) => (
              <tr 
                key={banner.id} 
                className={`hover:bg-[#F9FAFB] ${index !== banners.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#D1D5DB] text-[#E53E3E] focus:ring-[#E53E3E]"
                    checked={selectedRows.includes(banner.id)}
                    onChange={() => handleRowSelect(banner.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {/* Banner Image Preview */}
                    <div className="w-[220px] h-[41x] rounded-md overflow-hidden shadow-sm border border-gray-200">
                      <img
                        src="/public/assets/layout/banner.svg"
                        alt="Banner"
                        className="w-[220px] h-[41px] object-cover"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.className += ' bg-gradient-to-r from-amber-600 via-orange-500 to-blue-600 flex items-center justify-center';
                          target.parentElement!.innerHTML = '<span class="text-white text-xs font-medium">WHEN</span>';
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-[#6B7280]">{banner.date}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-[#111827]">{banner.link}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    {/* Status Indicator */}
                    <div className="flex items-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        banner.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(banner.id)}
                        className="p-1.5 text-[#6B7280] hover:text-[#374151] transition-colors rounded"
                        title="Edit"
                      >
                       <img src="/public/assets/layout/notiedit.svg" alt="Edit" className="w-8 h-8" />
                      </button>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-1.5 text-[#6B7280] hover:text-[#EF4444] transition-colors rounded"
                        title="Delete"
                      >
                       <img src="/public/assets/layout/notidelred.svg" alt="Delete" className="w-8 h-8" />
                      </button>
                    </div>
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

export default BannerTable;