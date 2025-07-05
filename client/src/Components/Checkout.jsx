import React, { useContext, useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import UserContext from "../Context/UserContext";
import AppContext from "../Context/AppContext";
import {toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { userProfile } = useContext(UserContext);
  const { cart, userAddress } = useContext(AppContext);
  c
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

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


  return (
    <>
      <div className="flex justify-normal mx-auto -mt-14 ">
        {/*start  contact info */}
        <div>
          <div className="bg-white  rounded-lg p-8 mx-8 mb-6">
            <h2 className="text-2xl font-bold ">Contact Information</h2>
            <div className="">
              <p className="text-1xl text-gray-800">{userProfile.email}</p>
            </div>
          </div>
          {/* end contact info */}

          {/* start Shipping adress detail*/}
          <div className="  max-w-4xl p-8 mx-8 pb-24 -mt-8 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 ">Shipping Address</h2>
            <form onSubmit={handleSubmit} className=" space-y-4">
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-3 rounded"
                required
              />
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border p-3 rounded"
                required
              />
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border p-3 rounded"
                required
              />
              <CountryDropdown
                value={shippingInfo.country}
                onChange={handleCountryChange}
                className="w-full border p-3 rounded"
                defaultOptionLabel="Select a country"
              />
              <RegionDropdown
                country={shippingInfo.country}
                value={shippingInfo.state}
                onChange={handleRegionChange}
                className={`w-full border p-3 rounded  ${
                  !shippingInfo.country
                    ? "bg-gray-100 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                blankOptionLabel="Select a state/region"
                disableWhenEmpty
                disabled={!shippingInfo.country} // key part: disable if no country selected
              />
              <input
                type="text"
                name="pinCode"
                value={shippingInfo.pinCode}
                onChange={handleChange}
                placeholder="Postal/ZIP Code"
                className="w-full border p-3 rounded"
                required
              />

              <PhoneInput
                country={"us"}
                value={shippingInfo.phoneNumber}
                onChange={handlePhoneChange}
                className="w-full !border !p-3 !rounded"
                inputProps={{
                  required: true,
                  name: "phone",
                }}
              />
              <div className="flex justify-center">
              <button
                type="submit"
                className="w-80 bg-black text-white py-3 rounded cursor-pointer uppercase font-semibold hover:bg-gray-900 transition"
              >
                Confirm
              </button>
              </div>

              {userAddress &&(
                <div className="flex justify-center">
                <button
                type="button"
                className="w-80   items-center bg-black text-white py-3 rounded uppercase cursor-pointer font-semibold hover:bg-gray-900 transition"
                onClick={()=>navigate('/CheckOut')}
              >
                Click To Use Old Address
              </button>
              </div>
              )}
            </form>
          </div>
        </div>
        {/* end Shipping adress detial*/}

        {/* summary section */}
        <div className="border w-100 mx-auto my-auto  pb-2  ">
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
