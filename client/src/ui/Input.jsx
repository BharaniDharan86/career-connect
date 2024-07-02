import React from "react";

const Input = ({ children, placeholder, type = "text", state, setState }) => {
  return (
    <label className="input input-bordered flex items-center gap-2 mb-2">
      {children}
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </label>
  );
};

export default Input;
