import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className="
        w-full
        p-3
        sm:p-3.5
        text-sm
        sm:text-base
        border-2
        border-gray-200
        dark:border-gray-600
        bg-white
        dark:bg-gray-800
        text-gray-900
        dark:text-white
        placeholder-gray-400
        dark:placeholder-gray-500
        rounded-lg
        sm:rounded-xl
        focus:outline-none
        focus:ring-2
        focus:ring-green-500
        focus:border-transparent
        dark:focus:ring-green-400
        transition
        min-h-[44px]
      "
    />
  );
};

export default Input;