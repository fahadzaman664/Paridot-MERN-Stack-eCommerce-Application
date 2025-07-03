import AppContext from "../Context/AppContext";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@headlessui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Cart = () => {
  const { cart } = useContext(AppContext);
  return (
    <div className="p-4 sm:p-8">
      <div className="flex justify-center bg-[#f8f8f8] mb-4 py-4 rounded">
        <h2 className="text-2xl font-bold uppercase">Shopping Cart</h2>
      </div>

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
            <p className="text-base font-semibold mt-2 relative ">{product.title}</p>
            <FontAwesomeIcon className="absolute mt-14 ml-24 cursor-pointer text-gray-600 " icon={faTrash} />  
          </div>



          <div className="text-md leading-6 font-normal text-black mt-2">
            RS, {product.price}
          </div>

          <div className="flex items-center justify-center ">
            <FontAwesomeIcon icon={faSquareMinus} className="text-2xl cursor-pointer " />
            <p className="p-5 text-1xl">{product.qty}</p>
            <FontAwesomeIcon icon={faSquarePlus} className="text-2xl cursor-pointer" />
          </div>
             {/* Total */}
          <div className="text-md leading-6 font-normal text-black mx-4 md:mt-2">
            RS, {Number(product.price * product.qty).toLocaleString()}
          </div>

        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button className="w-30 p-2  bg-black text-white rounded-full  hover:bg-gray-900 transition" >Clear Cart</button>
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
            <h2 className=" text-2xl font-normal uppercase">
              SubTotal: <span className="mx-2"> RS,</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-6 mr-0  md:mr-10 -ml-8  ">
            <Button className="w-60 p-2  bg-black text-white rounded-full  hover:bg-gray-900 transition">
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
