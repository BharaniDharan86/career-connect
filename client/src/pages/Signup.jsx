import AuthFormTemplate from "../ui/AuthFormTemplate";
import Button from "../ui/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import { useState } from "react";
import { validateEmail } from "../utils/helper";
import InputError from "../ui/InputError";
import { useMutation } from "@tanstack/react-query";
import { signUp as SignUpApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState({
    email: false,
    password: false,
    userName: false,
  });

  const { isPending: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: () => SignUpApi({ email, userName, password }),
    onSuccess: (data) => {
      const userEmail = data?.email;

      localStorage.setItem(
        "careerconnect_user_email",
        JSON.stringify(userEmail)
      );
      navigate("/verifyemail");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleSignup(e) {
    e.preventDefault();

    if (userName.length < 8) {
      setValidationError((val) => {
        return { ...val, userName: "Username must be atleast 8 character" };
      });

      return;
    }

    if (email.length === 0) {
      setValidationError((val) => {
        return { ...val, email: "Email is required" };
      });

      return;
    }

    if (password.length < 8) {
      setValidationError((val) => {
        return {
          ...val,
          password:
            password.length === 0
              ? "Password is required"
              : "Password must be atleast 8 characters",
        };
      });

      return;
    }

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      setValidationError((val) => {
        return { ...val, email: "Please provide valid email" };
      });

      return;
    }

    setValidationError((val) => {
      return { ...val, email: false, password: false };
    });

    signUp();
  }

  return (
    <AuthFormTemplate onSubmit={handleSignup}>
      <Input
        placeholder="Enter Username"
        state={userName}
        setState={setUserName}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
      </Input>
      {validationError.userName && (
        <InputError>{validationError.userName}</InputError>
      )}
      <Input placeholder="Enter Email" state={email} setState={setEmail}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
      </Input>
      {validationError.email && (
        <InputError>{validationError.email}</InputError>
      )}

      <Input
        placeholder="Enter Password"
        type="password"
        state={password}
        setState={setPassword}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
      </Input>
      {validationError.password && (
        <InputError>{validationError.password}</InputError>
      )}

      <Button>{isSigningUp ? <Spinner /> : "Sign up"}</Button>

      <div className="text-center">
        <p className="text-lg">
          <span>Already have an account ? </span>{" "}
          <span>
            <NavLink to="/login" className="underline">
              Log in now
            </NavLink>
          </span>
        </p>
      </div>
    </AuthFormTemplate>
  );
};

export default Signup;
