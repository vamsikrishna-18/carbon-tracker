import React from "react";

const Button = ({ text, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;