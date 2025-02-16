import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IconImagePlaceholder } from "../../../components";
import StarRatingInput from "../../../components/molecules/starRatingInput";
import {
  useOrderById,
  useOrderItem,
} from "../../../hooks/member/orderHistory/hooks";
import { getMenuItem } from "../../../hooks/member/orderHistory/request";
import { useInsertReview } from "../../../hooks/order/hooks";

export const ReviewModule = () => {
  const { id } = useParams();
  const { data: orderData } = useOrderById(id);
  const { data: orderItem, isLoading, isError, error } = useOrderItem(id);
  const navigate = useNavigate();
  const { mutate: insertReviewMutate } = useInsertReview();
  const [itemData, setItemData] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleGetItem = async (id) => {
    const item = await getMenuItem(id);
    const ItemName = item?.data[0]?.itemName;
    const ItemImage = item?.data[0]?.imageURL;
    return { menuItem_id: id, itemName: ItemName, itemImage: ItemImage };
  };

  useEffect(() => {
    if (orderItem && orderItem.data && orderData?.data?.[0]?.member_id) {
      const getItemNames = async () => {
        const itemMenuData = await Promise.all(
          orderItem.data.map((item) => handleGetItem(item.menuItem_id))
        );
        setItemData(itemMenuData);

        // Initialize reviews state
        setReviews([
          ...itemMenuData.map((item) => ({
            menuItem_id: item.menuItem_id,
            rating: 0,
            comment: "",
            user_id: orderData.data[0].member_id,
          })),
          {
            menuItem_id: null,
            rating: 0,
            comment: "",
            user_id: orderData.data[0].member_id,
          },
        ]);
      };
      getItemNames();
    }
  }, [orderItem, orderData]);

  const handleRating = (menuItem_id, rating) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.menuItem_id === menuItem_id ? { ...review, rating } : review
      )
    );
  };

  const handleCommentChange = (menuItem_id, comment) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.menuItem_id === menuItem_id ? { ...review, comment } : review
      )
    );
  };

  const handleSuccessInsertReview = () => {
    Swal.fire({
      html: `<p class='font-bold text-3xl my-2'>Thank You for the Review!</p>`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#78002C",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate(`/order/menu`);
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

  return (
    <div className="px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
      <h1 className="font-bold text-4xl">REVIEW</h1>
      <hr className="h-0.5 my-4 bg-theme-brown border-0" />
      <p className="text-xl mb-5">Add your review for us!</p>

      <div className="bg-white shadow-lg rounded-xl p-5 m-5 w-3/4 mx-auto">
        {itemData.length > 0 ? (
          itemData.map((item) => (
            <div key={item.menuItem_id}>
              <div className="flex gap-5 justify-between">
                <div className="flex gap-5">
                  {item.itemImage ? (
                    <img
                      src={`https://dedwkjaekevsyqqfyona.supabase.co/storage/v1/object/public/menu_image/${item.itemImage}`}
                      alt={item.itemName}
                      className="w-24 object-cover rounded-lg aspect-square"
                    />
                  ) : (
                    <div className="bg-gray-300 rounded-lg flex flex-col justify-center items-center aspect-square w-24">
                      <IconImagePlaceholder size={100} color={"#fff"} />
                      <p className="text-gray-600 font-bold text-center">
                        Image Not Available
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold mb-2">{item.itemName}</p>
                    <StarRatingInput
                      onRate={(rating) =>
                        handleRating(item.menuItem_id, rating)
                      }
                    />
                  </div>
                </div>

                <textarea
                  placeholder="comments"
                  rows="4"
                  className="bg-white border border-theme-pink text-gray-900 text-sm rounded-lg focus:ring-theme-pink focus:border-2 focus:border-theme-peach block w-1/2 p-2.5"
                  onChange={(e) =>
                    handleCommentChange(item.menuItem_id, e.target.value)
                  }
                />
              </div>
              <hr className="h-0.5 my-4 bg-theme-brown border-0 w-full" />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Review for Cafe */}
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
    </div>
  );
};
