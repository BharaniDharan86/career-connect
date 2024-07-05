import { useState } from "react";
import Button from "../ui/Button";
import InputError from "../ui/InputError";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import { verifyEmail as verifyEmailApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [validationError, setValidationError] = useState({ otp: false });
  const navigate = useNavigate();

  const { mutate: verifyOtp, isPending: isOtpVerifyPending } = useMutation({
    mutationFn: (data) => verifyEmailApi(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Success");
      localStorage.removeItem("careerconnect_user_email");
      navigate("/app/home");
    },
    onError: (err) => {
      toast.error(err?.message || "Something went very wrong");
    },
  });

  function handleOtpSubmission(e) {
    e.preventDefault();

    if (otp.length === 0 || otp.length < 5) {
      setValidationError((value) => {
        return { ...value, otp: "Invalid otp" };
      });

      return;
    }

    const userEmail = JSON.parse(
      localStorage.getItem("careerconnect_user_email")
    );

    verifyOtp({ email: userEmail, otp });
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
            <Button type="submit">
              {isOtpVerifyPending ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
