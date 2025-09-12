import images from "../../../constants/images";
import PageHeader from "../../../components/PageHeader";
import RatingAndReviewFilters from "./ratingreviewfilters";
import RatingAndReviewTable from "./ratingandreviewtable";


const AllRatingAndReview = () => {
  const handleBulkActionSelect = (action: string) => {
    // Handle the bulk action selection from the parent component
    console.log("Bulk action selected in Rating and Review:", action);
    // Add your custom logic here
  };

  return (
    <>
      <PageHeader title="Ratings and Reviews" />
      <div className="p-5">
        <div className="flex flex-row justify-between items-center gap-4">
          {/* Card 1 - Total Store Reviews */}
          <div
            className="flex flex-row rounded-2xl w-72"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-5 flex justify-center items-center">
              <img className="w-7 h-7" src={images.Star} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-8 gap-1">
              <span className="font-semibold text-[13px]">Total Store Reviews</span>
              <span className="font-semibold text-xl">10</span>
              <span className="text-[#00000080] text-[11px]">
                <span className="text-[#1DB61D]">+5%</span> increase from last month
              </span>
            </div>
          </div>

          {/* Card 2 - Total Product Reviews */}
          <div
            className="flex flex-row rounded-2xl w-72"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-5 flex justify-center items-center">
              <img className="w-7 h-7" src={images.Star} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-8 gap-1">
              <span className="font-semibold text-[13px]">Total Product Reviews</span>
              <span className="font-semibold text-xl">2</span>
              <span className="text-[#00000080] text-[11px]">
                <span className="text-[#1DB61D]">+5%</span> increase from last month
              </span>
            </div>
          </div>

          {/* Card 3 - Average Store Rating */}
          <div
            className="flex flex-row rounded-2xl w-72"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-5 flex justify-center items-center">
              <img className="w-7 h-7" src={images.Star} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-8 gap-1">
              <span className="font-semibold text-[13px]">Average Store Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xl">4.5</span>
                <span className="text-[#E53E3E] text-lg">★</span>
              </div>
              <span className="text-[#00000080] text-[11px]">
                <span className="text-[#1DB61D]">+5%</span> increase from last month
              </span>
            </div>
          </div>

          {/* Card 4 - Average Product Rating */}
          <div
            className="flex flex-row rounded-2xl w-72"
            style={{ boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="bg-[#E53E3E] rounded-l-2xl p-5 flex justify-center items-center">
              <img className="w-7 h-7" src={images.Star} alt="" />
            </div>
            <div className="flex flex-col bg-[#FFF1F1] rounded-r-2xl p-3 pr-8 gap-1">
              <span className="font-semibold text-[13px]">Average Product Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-xl">4</span>
                <span className="text-[#E53E3E] text-lg">★</span>
              </div>
              <span className="text-[#00000080] text-[11px]">
                <span className="text-[#1DB61D]">+5%</span> increase from last month
              </span>
            </div>
          </div>
        </div>
        <RatingAndReviewFilters onBulkActionSelect={handleBulkActionSelect} />
        <RatingAndReviewTable onRowSelect={(selectedIds: string[]) => console.log("Selected ratings:", selectedIds)} />
       
      </div>
    </>
  );
};

export default AllRatingAndReview;
