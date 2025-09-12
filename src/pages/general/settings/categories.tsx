import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
  image: string;
  subcategoriesCount: number;
  brandsCount: number;
}

interface CategoriesProps {
  onBack?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ activeTab, setActiveTab }) => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Mobile Phone & Tablet",
      image: "/assets/layout/iphone.png",
      subcategoriesCount: 5,
      brandsCount: 10,
    },
    {
      id: "2",
      name: "Electronics",
      image: "/assets/layout/laptop.png",
      subcategoriesCount: 8,
      brandsCount: 15,
    },
    {
      id: "3",
      name: "Fashion",
      image: "/assets/layout/i1.png",
      subcategoriesCount: 12,
      brandsCount: 25,
    },
    {
      id: "4",
      name: "Sport",
      image: "/assets/layout/i2.png",
      subcategoriesCount: 6,
      brandsCount: 12,
    },
    {
      id: "5",
      name: "Health & Beauty",
      image: "/assets/layout/i3.png",
      subcategoriesCount: 9,
      brandsCount: 18,
    },
  ]);

  const handleCategoryNameChange = (categoryId: string, newName: string) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, name: newName } : cat
      )
    );
  };

  const handleAddSubcategory = (categoryId: string) => {
    console.log("Add Subcategory for category:", categoryId);
    // Add your add subcategory logic here
  };

  const handleAddBrand = (categoryId: string) => {
    console.log("Add Brand for category:", categoryId);
    // Add your add brand logic here
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleAddNewCategory = () => {
    console.log("Add New Category clicked");
    // Add your add new category logic here
  };

  const handleSaveChanges = () => {
    console.log("Save Changes clicked");
    // Add your save changes logic here
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
      </div>
    </div>
  );

  return (
    <>
      <CustomHeader />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl border border-gray-200 px-6 py-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Category Image */}
                <div className="w-[60px] h-[60px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 flex-shrink-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a default icon if image fails to load
                      (e.target as HTMLImageElement).src = "/assets/layout/icon.png";
                    }}
                  />
                </div>
                
                {/* Category Name Input Field */}
                <div className="flex-1 max-w-[400px]">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleCategoryNameChange(category.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#E53E3E] focus:border-transparent"
                  />
                </div>

                {/* Action Buttons Section */}
                <div className="flex items-center gap-3 ml-auto">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  {/* Add Subcategory Button */}
                  <button
                    onClick={() => handleAddSubcategory(category.id)}
                    className="px-4 py-2 bg-[#E53E3E] text-white text-sm font-medium rounded-lg hover:bg-[#D32F2F] transition-colors"
                  >
                    Add Subcategory
                  </button>

                  {/* Add Brand Button */}
                  <button
                    onClick={() => handleAddBrand(category.id)}
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add Brand
                  </button>

                  {/* More Actions Dropdown */}
                  <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7 7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <button
              onClick={handleAddNewCategory}
              className="px-6 py-3 bg-[#E53E3E] text-white font-medium rounded-2xl hover:bg-[#D32F2F] transition-colors"
            >
              Add New Category
            </button>

            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-black text-white font-medium rounded-2xl hover:bg-gray-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
