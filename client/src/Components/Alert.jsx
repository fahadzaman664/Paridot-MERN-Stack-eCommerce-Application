import React from "react";
import clsx from "clsx";

// Tailwind color classes based on alert type
const alertColors = {
  success: "bg-green-100 text-green-800 border-green-300",
  danger: "bg-red-100 text-red-800 border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

const Alert = ({ color = "info", message, onClose }) =>
     (
  <div
    className={clsx(
      "border px-4 py-3 rounded flex justify-between items-center w-full mb-4 shadow",
      alertColors[color]
    )}
  >
    <span className="font-medium">{message}</span>
    <button
      onClick={onClose}
      className="ml-4 text-xl leading-none hover:text-black focus:outline-none"
    >
      &times;
    </button>
  </div>
);

export default Alert;
