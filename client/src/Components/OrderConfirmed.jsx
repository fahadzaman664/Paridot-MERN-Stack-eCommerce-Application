import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const { userOrder } = useContext(AppContext);
  const { userProfile } = useContext(UserContext);
  const navigate = useNavigate();



  return (
    <>

    <div className="flex justify-between items-start mx-auto -mt-14 max-w-7xl w-full px-8 ">
        {/*start  contact info */}
        <div>
          <div className="bg-white flex justify-center items-center rounded-lg mb-6 p-6 shadow">
            <h2 className="text-2xl font-bold text-green-600 text-center">
              Your order has been confirmed
            </h2>
          </div>
          <div className="bg-white  rounded-lg mt-6  mb-6">
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
            </div>{" "}
            <p className="text-base mb-1">
              <span className="font-semibold">Full Name:</span>{" "}
              {userOrder?.shippingInfo?.fullName}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">Address:</span>{" "}
              {userOrder?.shippingInfo?.address}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">City:</span>{" "}
              {userOrder?.shippingInfo?.city}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">State:</span>{" "}
              {userOrder?.shippingInfo?.state}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">Country:</span>{" "}
              {userOrder?.shippingInfo?.country}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">Pin Code:</span>{" "}
              {userOrder?.shippingInfo?.pinCode}
            </p>
            <p className="text-base">
              <span className="font-semibold">Phone:</span>{" "}
              {userOrder?.shippingInfo?.phoneNumber}
            </p>
          </div>
          <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-80 bg-black text-white py-3 rounded cursor-pointer uppercase font-semibold hover:bg-gray-900 transition"
            onClick={() => {navigate('/')}}
          >
            Continue Shopping
          </button>
        </div>

        </div>

        
        {/* end Shipping adress detial*/}

        {/* summary section */}
        <div className="border border-gray-300 w-96 mb-40 pb-2 ">
          {/* start 1 ordersummary and total rs  */}
          <div className="flex justify-between border-b border-gray-400 mb-2 mt-4 w-80 mx-auto h-10 ">
            <p className="mx-4 font-normal ">
              {" "}
              Order Summary ({userOrder.Totalquantity})
            </p>
            <p className="pr-10 mr-8">
              {" "}
              <span>Rs.{userOrder.totalAmount} </span>
            </p>
          </div>
          {/* end 1 ordersummary and total rs  */}

          {/* start 2 product img,title, price and quantity */}
          <div className="max-h-80 overflow-y-auto">
            {userOrder?.cartItems?.map((product) => (
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
              <h2>Rs.{userOrder.totalAmount}</h2>
            </div>
            {/* end 3 order summary with detail */}

            {/* start 4 shipping charges  */}
            <div className="flex justify-between -mt-4 p-4 mb-6 mx-2">
              <h2>Shipping</h2>
              <h2>Rs. {userOrder.shippingcharges}</h2>
            </div>
          </div>
          {/* end 4 shipping charges  */}

          {/* start 5 total amount */}
          <div className="flex justify-between border-gray-300 p-4 mx-4 border-b ">
            <h2>Total(PKR)</h2>
            <h2>
              Rs. <span>{userOrder.totalAmount}</span>
            </h2>
          </div>

          {/* end 5 total amount */}
        </div>
        {/* summary section end */}
      </div>
      
    </>
  );
};

export default OrderConfirmed;
