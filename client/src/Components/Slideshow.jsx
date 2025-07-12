import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import Spinner from "./Spinner";
const SlideShow = () => {
  const { products } = useContext(AppContext);
  const location = useLocation();
  const [slideShowData, setSlideShowData] = useState("");
  const [loading, setLoading] = useState(true);
  //const url = "http://localhost:1000";
    const url = "https://paidot-mern-ecommerce-api.onrender.com";


  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const api = await axios.get(`${url}/api/product/getallslideshow`, {
          withCredentials: true,
        });
        setSlideShowData(api.data.slideshowdata);
        setLoading(false);
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error.response?.data || error.message
        );
      }
    };

    fetchdata();
  }, []);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {location.pathname === "/" && (
        <div className="w-full h-96">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-full"
          >
            {slideShowData.map((slide) => (
              <SwiperSlide key={slide._id}>
                <Link to={`/`}>
                  {slide.videoSrc ? (
                    <video
                      src={slide.videoSrc}
                      autoPlay
                      muted
                      loop
                      controls={false}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={slide.imgSrc}
                      alt={`slide-${slide._id}`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default SlideShow;
