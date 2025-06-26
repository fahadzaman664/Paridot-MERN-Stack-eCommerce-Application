import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
const SlideShow= () => {
  const { products } = useContext(AppContext);
  const [currentP, setCurrentProduct] = useState(0);

  useEffect(() => {
    // for slideshow
     const interval = setInterval(() => {
      setCurrentProduct((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval)
  }, [products]);

   if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="w-96 h-96 flex items-center justify-center text-gray-500">
        Loading slideshow...
      </div>
    );
  }

  // setting current index to get current index image
  const currentProduct = products[currentP];

  return (
    <div className="w-full h-96 flex items-center justify-center overflow-hidden relative">
      <img
        src={ currentProduct.imgSrc === "empty"
            ? "/mobileimagedefualt.jpeg"
            : currentProduct.imgSrc
        }
        alt="Slideshow"
        className="object-cover w-full h-full transition-all duration-700 ease-in-out"
      />
      </div>
  )
       
};

export default SlideShow;
