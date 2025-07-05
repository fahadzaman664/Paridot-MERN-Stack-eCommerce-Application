import AppContext from "../Context/AppContext";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@headlessui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQuantity, addToCart, removeProductById, clearCart,   } =
    useContext(AppContext);

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
 // const [priceperqtys, setTotalPriceperqtys, ] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let totalqty = 0;
    let totalprice = 0;
    const priceperproduct = {};

    // for totalqty and total price
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        totalqty += cart.items[i].qty;
        totalprice += cart.items[i].price;
        //   priceperproduct[cart.items[i].productId] = cart.items[i].price;
      }
      console.log("totalprice", totalprice);
      setQuantity(totalqty);
      setPrice(totalprice);
      //setTotalPriceperqtys(priceperproduct);
    }
  }, [cart]);

  // clear cart
  const deleteCart = async () => {
    const response = await clearCart();
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // add to cart
  const onClickAddToCart = async (title, price, qty, productId, imgSrc) => {
    const response = await addToCart(title, price, qty, productId, imgSrc);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  //remove product by id
  const removeProduct = async (productId) => {
    const response = await removeProductById(productId);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const decreaseQty = async (productId, qty) => {
    const response = await decreaseQuantity(productId, qty);
    if (response.success && response.removed) {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (response.success) {
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-8 pb-20">
      <div className="flex justify-center bg-[#f8f8f8] mb-4 py-4 rounded">
        <h2 className="text-2xl font-bold uppercase">Shopping Cart</h2>
      </div>

      {cart?.items && cart?.items?.length > 0 ? (
        <>
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-gray-300 py-4">
            <div className="mx-8 w-full">
              {cart?.items && cart?.items?.length > 0 && (
                <p className="font-semibold text-1xl leading-6 uppercase">
                  {" "}
                  Product(<span className="">{cart?.items?.length}</span>)
                </p>
              )}
            </div>

            <div className="  font-semibold text-1xl leading-6 uppercase">
              <p>Price</p>
            </div>

            <div className="  font-semibold text-1xl leading-6 uppercase">
              <p>Quantity</p>
            </div>

            <div className=" mr-8 font-semibold text-1xl leading-6 uppercase">
              <p>Total</p>
            </div>
          </div>

          {cart?.items?.map((product) => (
            <div
              key={product._id}
              className=" flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr]  gap-4 py-8 sm:space-x-8"
            >
              <div className="flex items-start space-x-4  ">
                <img
                  className="w-20 h-20 object-cover border border-gray-100 "
                  src={product.imgSrc}
                  alt=""
                />
                <p className="text-base font-semibold mt-2 relative ">
                  {product.title}
                </p>

                <FontAwesomeIcon
                  className="absolute mt-14 ml-24 cursor-pointer text-gray-600 "
                  icon={faTrash}
                  onClick={() => {
                    if (confirm("Are you sure you want to remove the product?")) 
                      {
                      removeProduct(product.productId);
                     }
                  }}
                />
              </div>

              <div className="text-md leading-6 font-normal text-black mt-2">
                RS, {product.price}
              </div>

              <div className="flex items-center justify-center ">
                <FontAwesomeIcon
                  onClick={() => decreaseQty(product.productId, 1)}
                  icon={faSquareMinus}
                  className="text-2xl cursor-pointer "
                />
                <p className="p-5 text-1xl">{product.qty}</p>
                <FontAwesomeIcon
                  onClick={() =>
                    onClickAddToCart(
                      product.title,
                      product.price / product.qty,

                      1,
                      product.productId,
                      product.imgSrc
                    )
                  }
                  icon={faSquarePlus}
                  className="text-2xl cursor-pointer"
                />
              </div>
              {/* Total */}
              <div className="text-md leading-6 font-normal text-black mx-4 md:mt-2">
                Rs, {product.price}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button
              className="w-30 p-2  bg-black text-white rounded-full  hover:bg-gray-900 transition cursor-pointer"
              onClick={() =>{
                if(confirm("Are you sure want to clear cart ?"))
                deleteCart()
              } }
            >
              Clear Cart
            </button>
          </div>

          <div className="flex flex-col md:flex-row  justify-between pt-20 ">
            <div className="w-full md:w-1/2 mt-8 text-base  font-normal leading-6">
              <h2 className="">Add Order Note</h2>
              <textarea
                className="w-150 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black resize-none min-h-[120px]"
                placeholder="Write any special instructions here..."
              />
            </div>

            <div className="flex flex-col ">
              <div className="mr-10">
                <h2 className=" text-1xl font-bold">
                  TOTALQUANTITY: {quantity}
                </h2>
              </div>

              <div className="mr-10 pt-5">
                <h2 className=" text-1xl font-bold ">
                  SUBTOTAL: <span className="mx-1"> Rs,{price}</span>
                </h2>
              </div>

              <div className="mt-4 md:mt-6 mr-0  md:mr-10 -ml-8  ">
                <Button className="w-60 p-2  bg-black text-white rounded-full  hover:bg-gray-900 transition"   
                onClick={()=> navigate('/checkout/address')}
                >
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className=" mt-14 flex flex-col justify-center items-center min-h-[300px] ">
          <span className="text-8xl mb-4">🛒</span>
          <h1 className="text-4xl uppercase text-black font-semibold pt-4">
            Your cart is empty{" "}
          </h1>
          <p className="text-1xl leading-6 mt-8 font-normal">
            Before proceed to checkout you must add some products to your
            shopping cart.
          </p>
          <Link
            className="rounded-md mt-15 h-10 inline-flex items-center justify-centerflex items-center    border  border-black  uppercase rounded-[10px] font-semibold text-[14px]  px-6 py-[5px] bg-black text-white  hover:bg-gray-900 transition"
            to={"/"}
          >
            RETURN TO SHOP
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
