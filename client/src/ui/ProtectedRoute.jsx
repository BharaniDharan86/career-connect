/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [cookie] = useCookies();

  return cookie.auth_token_careerconnect ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
