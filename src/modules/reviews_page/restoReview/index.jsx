import "swiper/css";
import "swiper/css/navigation";
import { useInsertReview, useRestoReview } from "../../../hooks/order/hooks";
import StarRatingInput from "../../../components/molecules/starRatingInput";
import { useState } from "react";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

export const RestoReviewModule = () => {
  const { data, error } = useRestoReview();
  const [reviews, setReviews] = useState([]);
  const { mutate: insertReviewMutate } = useInsertReview();
  const queryClient = useQueryClient();

  const handleRating = (menuItem_id, rating) => {
    setReviews((prev) => {
      const existingReview = prev.find(
        (review) => review.menuItem_id === menuItem_id
      );
      if (existingReview) {
        return prev.map((review) =>
          review.menuItem_id === menuItem_id ? { ...review, rating } : review
        );
      } else {
        return [...prev, { menuItem_id, rating, comment: "", user_id: null }];
      }
    });
  };

  const handleCommentChange = (menuItem_id, comment) => {
    setReviews((prev) => {
      const existingReview = prev.find(
        (review) => review.menuItem_id === menuItem_id
      );

      if (existingReview) {
        // Update existing review
        return prev.map((review) =>
          review.menuItem_id === menuItem_id ? { ...review, comment } : review
        );
      } else {
        // Add new review
        return [...prev, { menuItem_id, rating: 0, comment, user_id: null }];
      }
    });
  };

  const submitReview = async () => {
    let successCount = 0;

    const filteredReviews = reviews.filter(
      (review) => review.rating !== 0 || review.comment.trim() !== ""
    );

    if (filteredReviews.length === 0) {
      console.log("⚠️ No reviews to submit.");
      return;
    }

    const handleSuccessInsertReview = () => {
      Swal.fire({
        html: `<p class='font-bold text-3xl my-2'>Thank You for the Review!</p>`,
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#78002C",
      });
      queryClient.invalidateQueries(["get-resto-review"]);

      setReviews([]);
    };

    // console.log(filteredReviews);

    filteredReviews.forEach((item, index) => {
      insertReviewMutate(
        {
          menuItem_id: item.menuItem_id,
          rating: item.rating,
          comment: item.comment,
          user_id: item.user_id,
        },
        {
          onSuccess: () => {
            successCount++;
            console.log(`✅ Review ${index + 1} inserted!`);

            handleSuccessInsertReview();
          },
          onError: (error) => {
            console.error(`❌ Review ${index + 1} failed:`, error);
          },
        }
      );
    });
  };

  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">Error: {error.message}</p>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-6 bg-gray-100  md:pt-32 pt-28 ">
      <div className="bg-white shadow-lg rounded-xl p-5 m-5 w-3/4 mx-auto">
        <div className="flex gap-5 flex-col justify-center items-center">
          <p className="text-lg font-bold mb-2">
            Review for Yolls Cake & Cookies
          </p>
          <StarRatingInput
            onRate={(rating) => handleRating(null, rating)} // menuItem_id = 0 for cafe review
          />
          <textarea
            placeholder="comments"
            rows="4"
            className="bg-white border border-theme-pink text-gray-900 text-sm rounded-lg focus:ring-theme-pink focus:border-2 focus:border-theme-peach block w-1/2 p-2.5"
            value={reviews.find((r) => r.menuItem_id === null)?.comment || ""}
            // value={""}
            onChange={(e) => handleCommentChange(null, e.target.value)}
          />
        </div>
        <hr className="h-0.5 my-4 bg-theme-brown border-0 w-full" />
      </div>

      <div className="w-full flex justify-center items-center flex-col py-5 gap-5">
        <button
          className="bg-theme-red text-white hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red rounded-full px-5 py-2"
          onClick={submitReview}
        >
          Submit Review
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Customer Reviews for Yolls Cake & Cookie
      </h1>

      {data?.data?.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {data?.data?.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center">
                {/* <h2 className="text-lg font-semibold">
                  {review.name || "Anonymous"}
                </h2> */}
                <div className="text-yellow-500 text-xl">
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
