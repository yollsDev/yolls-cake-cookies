import React, { useEffect, useRef, useState } from "react";
import { GetCategoryData } from "../../../hooks/order/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import { GetMenuData } from "../../../hooks/admin/hooks";
import {
  IconImagePlaceholder,
  MenuCard,
  OrderSidebar,
} from "../../../components";

export const OrderModule = () => {
  const { data } = GetCategoryData();
  const { data: menu } = GetMenuData();
  const formatCategoryName = (name) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const sliderRef = useRef();

  const [selectedMenu, setSelectedMenu] = useState([]);
  const [isMenuSelected, setIsMenuSelected] = useState(
    new Array(selectedMenu?.menuItems?.length).fill(false)
  );

  const addToCart = (item, index) => {
    const updatedSelectedMenu = [...selectedMenu];
    const selectedItemIndex = updatedSelectedMenu.findIndex(
      (selectedItem) => selectedItem.itemName === item.itemName
    );

    if (selectedItemIndex !== -1) {
      // Item is already in the cart, so update its quantity
      updatedSelectedMenu[selectedItemIndex].quantity += 1;
    } else {
      // Item is not in the cart, so add it with quantity 1
      const selectedItem = {
        itemName: item.itemName,
        price: item.price,
        imageURL: item.imageURL,
        quantity: 1,
      };
      updatedSelectedMenu.push(selectedItem);
    }

    const updatedIsMenuSelected = [...isMenuSelected];
    updatedIsMenuSelected[index] = true;

    setSelectedMenu(updatedSelectedMenu);
    setIsMenuSelected(updatedIsMenuSelected);
    localStorage.setItem("selectedMenu", JSON.stringify(updatedSelectedMenu));
  };

  const subtractFromCart = (item, index) => {
    const updatedSelectedMenu = [...selectedMenu];
    const selectedItemIndex = updatedSelectedMenu.findIndex(
      (selectedItem) => selectedItem.itemName === item.itemName
    );

    if (selectedItemIndex !== -1) {
      // Item is in the cart, so decrease its quantity
      if (updatedSelectedMenu[selectedItemIndex].quantity > 1) {
        updatedSelectedMenu[selectedItemIndex].quantity -= 1;
      } else {
        // If quantity is 1, remove the item from the cart
        updatedSelectedMenu.splice(selectedItemIndex, 1);
        const updatedIsMenuSelected = [...isMenuSelected];
        updatedIsMenuSelected[index] = false;
        setIsMenuSelected(updatedIsMenuSelected);
      }

      setSelectedMenu(updatedSelectedMenu);
      localStorage.setItem("selectedMenu", JSON.stringify(updatedSelectedMenu));
    }
  };

  useEffect(() => {
    const selectedMenu = JSON.parse(localStorage.getItem("selectedMenu")) || [];
    setSelectedMenu(selectedMenu);

    // Create a new array for isMenuSelected based on the selectedMenu data
    if (menu && menu.menuItems) {
      const updatedIsMenuSelected = menu.menuItems.map((item) =>
        selectedMenu.some(
          (selectedItem) => selectedItem.itemName === item.itemName
        )
      );
      setIsMenuSelected(updatedIsMenuSelected);
    }
  }, [menu]);

  return (
    <div className="flex pt-16 mt-2 w-full h-full">
      <div className="h-full w-2/3 bg-cover bg-top min-h-screen">
        <div className="p-8 w-full">
          <div className="flex items-center w-full">
            <div
              className="w-full flex justify-center items-center"
              onClick={() => sliderRef.current?.slidePrev()}
            >
              <IoIosArrowBack />
            </div>
            <div className="px-5 py-3 rounded-full shadow-md w-[90%]">
              <Swiper
                onSwiper={(it) => (sliderRef.current = it)}
                modules={[Navigation]}
                className="flex"
                slidesPerView={5}
                spaceBetween={10}
              >
                {data?.category?.map((item, index) => {
                  const categoryName = formatCategoryName(item.name);
                  return (
                    <SwiperSlide
                      key={index}
                      className="rounded-full px-4 py-2 flex justify-center items-center border-2 border-theme-red text-sm"
                    >
                      {categoryName}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div
              className="w-full flex justify-center items-center"
              onClick={() => sliderRef.current?.slideNext()}
            >
              <IoIosArrowForward />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 h-full my-8">
            {menu &&
              menu?.menuItems &&
              menu?.menuItems?.map((item, index) => (
                <div
                  className="p-5 rounded-2xl bg-theme-peach h-full"
                  key={index}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {item.imageURL !== null ? (
                        <img
                          src={`https://dedwkjaekevsyqqfyona.supabase.co/storage/v1/object/public/menu_image/${item.imageURL}`}
                          alt={item.itemName}
                          className="max-w-full mb-4 object-cover rounded-lg aspect-square"
                        />
                      ) : (
                        <div className="bg-gray-300 rounded-lg flex flex-col justify-center items-center mb-3 aspect-square">
                          <IconImagePlaceholder size={100} color={"#fff"} />
                          <p className="text-gray-600 font-bold">
                            Image Not Available
                          </p>
                        </div>
                      )}

                      <div>
                        <h3 className="font-bold text-2xl text-theme-red mt-4 mb-2">
                          {item.itemName}
                        </h3>
                        <p className="md:block hidden text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isMenuSelected[index] ? (
                        <div className="flex justify-between mt-4">
                          <button
                            className="px-5 py-1.5 bg-white rounded-md"
                            onClick={() => subtractFromCart(item, index)}
                          >
                            -
                          </button>
                          <button className="px-5 py-1.5 bg-white rounded-md">
                            {
                              selectedMenu.find(
                                (selectedItem) =>
                                  selectedItem.itemName === item.itemName
                              )?.quantity
                            }
                          </button>
                          <button
                            className="px-5 py-1.5 bg-white rounded-md"
                            onClick={() => addToCart(item, index)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-theme-red w-full text-white rounded-full px-5 py-1.5 mt-4"
                          onClick={() => addToCart(item, index)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-1/3  min-h-screen">
        <OrderSidebar
          selectedMenu={selectedMenu}
          addToCart={addToCart}
          subtractFromCart={subtractFromCart}
        />
      </div>
    </div>
  );
};
