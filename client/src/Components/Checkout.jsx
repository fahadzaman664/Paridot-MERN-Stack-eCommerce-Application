import React, { useContext, useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import UserContext from "../Context/UserContext";
import AppContext from "../Context/AppContext";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { userProfile } = useContext(UserContext);
  const { cart, userAddress,clearCart, confirmOrder, getuserOrder } = useContext(AppContext);

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [shippingcharges, setShippingCharges] = useState(250);
  const [isCodSelected, setIsCodSelected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let totalqty = 0;
    let totalprice = 0;
    //const priceperproduct = {};

    // for totalqty and total price
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        totalqty += cart.items[i].qty;
        totalprice += cart.items[i].price;
        //   priceperproduct[cart.items[i].productId] = cart.items[i].price;
      }
      // console.log("totalprice", totalprice);

      setQuantity(totalqty);
      setPrice(totalprice);
    }
  }, [cart]);

  useEffect(() => {
    if (price > 10000) {
      setShippingCharges(0);
    } else {
      setShippingCharges(250); // or any default shipping cost you use
    }
  }, [price]);

  const handleOrder = async (shippingInfo, cartItems, totalAmount,Totalquantity, shippingcharges) => {
    const response = await confirmOrder(shippingInfo, cartItems, totalAmount,   Totalquantity,shippingcharges);
    if (response.success) {
      toast.success("Order created successfully!", { autoClose: 3000 });
      await getuserOrder();
      navigate(`/order-success/${response.orderId}`);
     clearCart();
    } else {
       toast.error("Order creation failed or missing order ID.");
    }
  };

  const handleCashOnDelivery = (e) => {
    setIsCodSelected(e.target.checked);
  };

  return (
    <>
      <div className="flex justify-between items-start mx-auto -mt-14 max-w-7xl w-full px-8 ">
        {/*start  contact info */}
        <div>
          <div className="bg-white  rounded-lg  mb-6">
            <h2 className="text-2xl font-bold ">Contact Information</h2>

            <div className="">
              <p className="text-1xl text-gray-800">{userProfile.email}</p>
            </div>
          </div>
          {/* end contact info */}

          {/* start Shipping adress detail*/}
          <div className="  w-200 mt-4   pb-24 -mt-8 rounded shadow">
            <div className=" flex justify-between">
              <p className="  text-2xl font-bold mb-6 ">
                <span>Shipping Address</span>
              </p>
              <p>
                <span
                  className="ml-40 mx-8 text-lg cursor-pointer underline underline-offset-2 decoration-black"
                  onClick={() => navigate("address")}
                >
                  Edit
                </span>
              </p>
            </div>{" "}
            <p className="text-base mb-1">
              <span className="font-semibold">Full Name:</span>{" "}
              {userAddress?.fullName}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">Address:</span>{" "}
              {userAddress?.address}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">City:</span> {userAddress?.city}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">State:</span> {userAddress?.state}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">Country:</span>{" "}
              {userAddress?.country}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">Pin Code:</span>{" "}
              {userAddress?.pinCode}
            </p>
            <p className="text-base">
              <span className="font-semibold">Phone:</span>{" "}
              {userAddress?.phoneNumber}
            </p>
            <p className="  text-base font-semibold flex justify-between">
              <span>Standard Shipping (5 Business Days)</span>
              <span className="ml-40 mx-8">Rs. {shippingcharges}</span>
            </p>
          </div>
          {/* cash on delivery start */}
          <div className="  p-4 rounded-xl ">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="codCheckbox"
                className="w-5 h-5 text-red-500 focus:ring-red-300 rounded"
                onChange={handleCashOnDelivery}
              />
              <label
                htmlFor="codCheckbox"
                className="text-lg font-semibold cursor-pointer"
              >
                Cash on Delivery (COD)
              </label>
            </div>
          </div>
          {/* cash on delivery end */}

          {/* Proceed To Payment section start*/}
          {isCodSelected && (
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-80 bg-black text-white py-3 rounded cursor-pointer uppercase font-semibold hover:bg-gray-900 transition"
                onClick={() => {
                  handleOrder(
                    userAddress,
                    cart?.items,
                    price + shippingcharges,
                    quantity,
                    shippingcharges
                  );
                }}
              >
                Confirm Order
              </button>
            </div>
          )}

          {/* Proceed To Payment section end*/}
        </div>

        {/* end Shipping adress detial*/}

        {/* summary section */}
        <div className="border border-gray-300 w-96 mb-40 pb-2 ">
          {/* start 1 ordersummary and total rs  */}
          <div className="flex justify-between border-b border-gray-400 mb-2 mt-4 w-80 mx-auto h-10 ">
            <p className="mx-4 font-normal "> Order Summary ({quantity})</p>
            <p className="pr-10 mr-8">
              {" "}
              <span>Rs.{price} </span>
            </p>
          </div>
          {/* end 1 ordersummary and total rs  */}

          {/* start 2 product img,title, price and quantity */}
          <div className="max-h-80 overflow-y-auto">
            {cart?.items?.map((product) => (
              <div
                key={product._id}
                className=" mx-4 border-b border-gray-300 flex gap-4 py-8 sm:space-x-8"
              >
                <div className="flex items-start space-x-4  ">
                  <img
                    className="w-20 h-20 object-cover flex-shrink-0  "
                    src={product.imgSrc}
                    alt="title"
                  />
                  <div className="flex flex-col flex-grow justify-between">
                    <p className="text-base font-semibold">{product.title}</p>

                    <div className="flex flex-col gap- 2 mt-2 text-gray-600 text-sm">
                      <p>Rs. {product.price}</p>
                      <p>Quantity: {product.qty}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* end 2 product img,title, price and quantity */}

          {/* start 3 order summary with detail */}
          <div className="border-b border-gray-500 mx-4">
            <h2 className="font-bold mx-2 uppercase mt-6 p-4">
              {" "}
              Order Summary
            </h2>
            <div className="flex justify-between p-4 mx-2">
              <h2>Subtotal (inclusive of Tax)</h2>
              <h2>Rs.{price}</h2>
            </div>
            {/* end 3 order summary with detail */}

            {/* start 4 shipping charges  */}
            <div className="flex justify-between -mt-4 p-4 mb-6 mx-2">
              <h2>Shipping</h2>
              <h2>Rs. {shippingcharges}</h2>
            </div>
          </div>
          {/* end 4 shipping charges  */}

          {/* start 5 total amount */}
          <div className="flex justify-between border-gray-300 p-4 mx-4 border-b ">
            <h2>Total(PKR)</h2>
            <h2>
              Rs. <span>{price + shippingcharges}</span>
            </h2>
          </div>

          {/* end 5 total amount */}
        </div>
        {/* summary section end */}
      </div>
    </>
  );
};

export default Checkout;
