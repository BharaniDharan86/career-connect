import React from "react";

const AuthFormTemplate = ({ children, onSubmit }) => {
  return (
    <div className="flex h-screen justify-center items-center flex-col gap-3">
      <form
        onSubmit={onSubmit}
        className="w-[80%] sm:w-[100%] md:w-[50%] lg:w-[30%] xl:w-[25%]"
      >
        {children}
      </form>
    </div>
  );
};

export default AuthFormTemplate;
