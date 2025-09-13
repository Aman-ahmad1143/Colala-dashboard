import { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import NotificationsFilters from "./notificationsfilters";
import NotificationTable from "./notificationtable";
import BannerTable from "./bannertable";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("Notification");

  const handleBulkActionSelect = (action: string) => {
    // Handle the bulk action selection from the parent component
    console.log("Bulk action selected in Notifications:", action);
    // Add your custom logic here
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRowSelect = (selectedIds: number[]) => {
    console.log("Selected IDs:", selectedIds);
  };

  return (
    <>
      <PageHeader title="Notifications" />
      <div className="p-5">
        <NotificationsFilters 
          onBulkActionSelect={handleBulkActionSelect}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />
        
        {/* Conditional content based on active tab */}
        {activeTab === "Notification" && (
          <NotificationTable onRowSelect={handleRowSelect} />
        )}
        
        {activeTab === "Banner" && (
          <BannerTable onRowSelect={handleRowSelect} />
        )}
      </div>
    </>
  )
}

export default Notifications