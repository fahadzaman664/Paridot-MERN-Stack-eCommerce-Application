import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
const ProductCard = () => {
  const { products } = useContext(AppContext);
  const [hovered, setHovered] = useState({});

  const handleHover = (id, isHovering) => {
    setHovered((prev) => {
      return { ...prev, [id]: isHovering };
    });
  };
// "bg-white h-full w-80 flex flex-col justify-center relative group
  return (
    <div className=" flex flex-wrap justify-center gap-x-10 gap-y-10 mt-20 mb-20 ">
      {(products || []).map((product) => (
        <div
          className="bg-white h-full w-80 flex flex-col justify-center relative group"
          key={product._id}
        >
          <div
            className="w-full h-96 object-cover overflow-hidden relative "
            onMouseEnter={() => handleHover(product._id, true)}
            onMouseLeave={() => handleHover(product._id, false)}
          >
            <img
              className=" w-full h-full object-cover hover:scale-105 transition delay-150 duration-700 ease-in-out "
              src={
                product.imgSrc === "empty"
                  ? "/mobileimagedefualt.jpeg"
                  : hovered[product._id]
                  ? "/mobileimagedefualt.jpeg"
                  : product.imgSrc
              }
              alt="Product Image"
              loading="lazy"
            />
          </div>

          <div className="text-left mt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.title}
              </p>

              {/* Hoverable Button */}
              <button className={`bg-black text-white text-xs px-3 py-2 rounded-md transition duration-300 ${
                hovered[product._id] ? 'opacity-100' : 'opacity-0'}`}>
                Add to Cart
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <b className="text-red-600 dark:text-green-400 font-semibold">
                Rs. {product.price}
              </b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
