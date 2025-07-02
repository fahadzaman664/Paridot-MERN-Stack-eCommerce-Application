import AppContext from "../../Context/AppContext";
import  { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category }) => {
    const { products } = useContext(AppContext);
      const [hovered, setHovered] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

   const handleHover = (id, isHovering) => {
    setHovered((prev) => {
      return { ...prev, [id]: isHovering };
    });
  };

  useEffect(() => {
    if (products && category) {
      const filtered = products.filter(
        (data) =>
          data.category &&
          data.category.toLowerCase() === category.toLowerCase()       
      );
      setRelatedProducts(filtered);
    }
  }, [category, products]);


       if (!relatedProducts) {
    return <div className="p-6 text-center">Loading Related product...</div>;
  }
    return (
        <div>
            <div className="mt-8 my-8 flex flex-wrap justify-center ">
                <div className="block">
                    <div className="p-2 mt-10 w-fit mx-auto flex justify-center rounded-md">
                        <h1 className=" text-red font-bold underline decoration-pink-500/30 text-2xl  ">RELATED PRODUCTS</h1>
                    </div>
                    

                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 mt-20 mb-20">
                        {(relatedProducts || []).map((product) => (
                            <div
                                className="bg-white h-full w-80 flex flex-col justify-center relative "
                                key={product._id}
                                onMouseEnter={() => handleHover(product._id, true)}
                                onMouseLeave={() => handleHover(product._id, false)}
                            >
                                <Link
                                      to={`/product/${product._id}`}
                                    className="w-full h-96 object-cover overflow-hidden relative "
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
                                </Link>

                                <div className=" mt-4 ">
                                    <div className="flex justify-between items-center ">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {product.title}
                                        </p>
                                    </div>
                                    <div>
                                        {hovered[product._id] && (
                                            <div className=" absolute bottom-5 right-5  ">
                                                <button className="relative bg-black text-white w-30 h-[42px] rounded-md cursor-pointer overflow-hidden group ">
                                                    <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-20">
                                                        🛒
                                                    </span>

                                                    <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-100 group-hover:opacity-0 text-lg    z-10">
                                                        Add to Cart
                                                    </span>
                                                </button>
                                            </div>
                                        )}
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
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
