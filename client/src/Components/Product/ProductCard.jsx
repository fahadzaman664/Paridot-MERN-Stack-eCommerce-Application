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

    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {(products || []).map((product) => (
                <div className=" mt-6 bg-white rounded-lg shadow hover:shadow-lg p-4 transition-transform hover:scale-105"
                    key={product._id}
                >
                    <div className="w-full object-cover overflow-hidden rounded-md"
                        onMouseEnter={() => handleHover(product._id, true)}
                        onMouseLeave={() => handleHover(product._id, false)}
                    >
                        <img className=" object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
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

                    <div className="text-center  mt-4">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {product.title}
                        </p>
                      
                            <span className=" mt-2 block text-sm text-gray-500 dark:text-gray-400">
                                {product.description}
                            </span>

                            <b className="block mt-2 text-red-600 dark:text-green-400 font-semibold">
                                Rs. {product.price}
                            </b>
                       
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;
