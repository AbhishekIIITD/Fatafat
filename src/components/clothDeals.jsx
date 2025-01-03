import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

// Register modules
SwiperCore.use([Pagination, Autoplay]);

const HeroSlider = () => {
  const sliderData = [
    {
      title: "Flat 50% Off on Casual Wear!",
      subtitle: "Trending t-shirts, jeans, and more.",
      image: "/casual_slide.jpg",
    },
    {
      title: "Buy 1 Get 1 Free on Ethnic Wear!",
      subtitle: "Perfect for festive seasons.",
      image: "/ethnic_wear_2.jpg",
    },
    {
      title: "Exclusive Winter Collection!",
      subtitle: "Sweaters, jackets, and more.",
      image: "/winter_cloth_slide.jpg",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row h-[300px] sm:h-[500px] w-full">
              {/* Image Section (75%) */}
              <div
                className="w-full md:w-3/4 h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              {/* Text Section (25%) */}
              <div className="w-full md:w-1/4 bg-white flex flex-col justify-center items-center p-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  {slide.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-600">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
