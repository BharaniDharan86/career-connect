/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [cookie] = useCookies();

  console.log(cookie.auth_token_careerconnect);

  return cookie.auth_token_careerconnect ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
