import React from "react";
import { useState } from "react";
import Button from "../ui/Button";
import InputError from "../ui/InputError";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [validationError, setValidationError] = useState({ otp: false });

  function handleOtpSubmission(e) {
    e.preventDefault();

    if (otp.length === 0 || otp.length < 5) {
      setValidationError((value) => {
        return { ...value, otp: "Invalid otp" };
      });

      return;
    }

    console.log(otp);
  }
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <form className="w-[80%] text-center" onSubmit={handleOtpSubmission}>
        <h1 className="text-lg font-semibold md:text-2xl lg:text-3xl mb-8 tracking-wide">
          An OTP has been sent to your registered email address. <br></br>{" "}
          Please check your email and enter the OTP to complete the verification
          process.
        </h1>
        <div className="text-center flex flex-col items-center">
          <input
            type="text"
            placeholder="Please enter the otp"
            className="input input-bordered w-full input-md max-w-xs placeholder:text-lg mb-2"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {validationError.otp && (
            <InputError>{validationError.otp}</InputError>
          )}
          <div className="w-[20%]">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
