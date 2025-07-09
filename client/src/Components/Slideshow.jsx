import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link, useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
const SlideShow = () => {
const { products } = useContext(AppContext);
const location = useLocation();

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="w-96 h-96 flex items-center justify-center text-gray-500">
        Loading slideshow...
      </div>
    );
  }

  return (
    <div>
    {location.pathname === "/" &&(
      <div className="w-full h-96">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {products.map((img) => (
          <SwiperSlide key={img._id}>
            <Link to={`/product/${img._id}`}>
              <img
                src={img.imgSrc}
                alt={`slide-${img._id}`}
                className="h-full w-full object-contain cursor-pointer"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>)}
    </div>
    
  );
};

export default SlideShow;
