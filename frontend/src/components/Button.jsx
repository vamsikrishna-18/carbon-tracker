import React from "react";

const Button = ({ text, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full
        bg-green-600
        hover:bg-green-700
        dark:bg-green-500
        dark:hover:bg-green-600
        text-white
        font-semibold
        py-2.5
        sm:py-3
        px-4
        sm:px-6
        rounded-lg
        sm:rounded-xl
        transition
        duration-300
        text-sm
        sm:text-base
        min-h-[44px]
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;