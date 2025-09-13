import React, { useState } from "react";
import SelectAudience from "./selectaudience";
import images from "../../../constants/images";

interface NewBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: BannerFormData) => void;
}

interface BannerFormData {
  image: File | null;
  audience: string;
  link: string;
}

const NewBanner: React.FC<NewBannerProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<BannerFormData>({
    image: null,
    audience: "",
    link: "",
  });

  const [selectedAudience, setSelectedAudience] = useState("Select audience");
  const [isSelectAudienceModalOpen, setIsSelectAudienceModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Create preview URL
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleAudienceSelect = (selectedUsers: string[]) => {
    const audienceText = selectedUsers.length > 0 
      ? `${selectedUsers.length} users selected` 
      : "Select audience";
    setSelectedAudience(audienceText);
    setFormData((prev) => ({
      ...prev,
      audience: selectedUsers.join(", "),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form after submission
    setFormData({
      image: null,
      audience: "",
      link: "",
    });
    setSelectedAudience("Select audience");
    setImagePreview(null);
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      image: null,
      audience: "",
      link: "",
    });
    setSelectedAudience("Select audience");
    setImagePreview(null);
    setIsSelectAudienceModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 -mt-3 bg-opacity-50 flex items-start justify-end z-[9999]">
      <div className="bg-white rounded-lg w-[560px] h-[620px] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <img src={images.close} alt="Close" />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <h2 className="text-[18px] font-medium text-gray-900 mb-4">New Banner</h2>
          
          {/* Image Upload Field */}
          <div>
            <label className="block text-[16px] font-medium text-gray-700 mb-2">
              Image
            </label>
            <div className="border-2 border border-gray-300 rounded-lg p-8">
              <input
                type="file"
                id="bannerImage"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="bannerImage"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {imagePreview ? (
                  <div className="w-full max-w-xs">
                    <img
                      src={imagePreview}
                      alt="Banner preview"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-18  rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm -mt-5 text-gray-400">Choose an image</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Audience Selection */}
          <div>
            <label className="block text-[16px] font-medium text-gray-700 mb-2">
              Audience
            </label>
            <button
              type="button"
              onClick={() => setIsSelectAudienceModalOpen(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-left bg-white text-sm flex items-center justify-between"
            >
              <span className={selectedAudience === "Select audience" ? "text-gray-400" : "text-gray-900"}>
                {selectedAudience}
              </span>
              <svg
                className="w-4 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Link Field */}
          <div>
            <label className="block text-[16px] font-medium text-gray-700 mb-2">
              Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Add link"
              className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 text-sm"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-full h-[60px] mt-2 bg-[#E53E3E] text-white py-3 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium text-sm"
          >
            Send
          </button>
        </form>
      </div>

      {/* Select Audience Modal */}
      <SelectAudience
        isOpen={isSelectAudienceModalOpen}
        onClose={() => setIsSelectAudienceModalOpen(false)}
        onApply={handleAudienceSelect}
      />
    </div>
  );
};

export default NewBanner;