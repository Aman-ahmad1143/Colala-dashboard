import React, { useState } from "react";
import images from "../../../constants/images";
import SelectAudience from "./selectaudience";

interface NewNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: NotificationFormData) => void;
}

interface NotificationFormData {
  subject: string;
  message: string;
  link: string;
  audience: string;
  attachment?: File | null;
}

const NewNotification: React.FC<NewNotificationProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<NotificationFormData>({
    subject: "",
    message: "",
    link: "",
    audience: "",
    attachment: null,
  });

  const [selectedAudience, setSelectedAudience] = useState("Select audience");
  const [isSelectAudienceModalOpen, setIsSelectAudienceModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form after submission
    setFormData({
      subject: "",
      message: "",
      link: "",
      audience: "",
      attachment: null,
    });
    setSelectedAudience("Select audience");
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      subject: "",
      message: "",
      link: "",
      audience: "",
      attachment: null,
    });
    setSelectedAudience("Select audience");
    setIsSelectAudienceModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50  bg-opacity-50 flex items-start justify-end -mt-4 z-[9999]">
      <div className="bg-white rounded-lg w-[560px] h-[862px] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
         <img src={images.close} alt="Close" className="w-5 h-5 mt-3" />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <h2 className="text-[16px] font-medium border-b p-4  -mt-4 text-gray-900 mb-4">New Notification</h2>
          
          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Message Subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type Message"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 text-sm resize-none"
              required
            />
          </div>

          {/* Link Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Add link"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 text-sm"
            />
          </div>

          {/* Audience Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Attachment Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment
            </label>
            <div className="border border-gray-300 rounded-lg p-6 w-20 h-20 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="file"
                id="attachment"
                onChange={handleAttachmentChange}
                className="hidden"
                accept="image/*,application/pdf,.doc,.docx"
              />
              <label
                htmlFor="attachment"
                className="cursor-pointer flex items-center justify-center w-full h-[60px]"
              >
                {formData.attachment ? (
                  <span className="text-xs text-gray-600 text-center">{formData.attachment.name}</span>
                ) : (
                  <svg className="w-8 h-z text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </label>
            </div>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-full bg-[#E53E3E] text-white py-3 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium text-sm"
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

export default NewNotification;