import React from "react";

const Button = ({ children, type = "submit" }) => {
  return (
    <button
      type={type}
      className="bg-[#1d4ed8] w-full text-center py-1.5 rounded-md font-bold cursor-pointer hover:bg-[#1e40af] transition-colors duration-300 my-3 text-slate-50 tracking-wide"
    >
      {children}
    </button>
  );
};

export default Button;
