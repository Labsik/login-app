import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { axiosInstance } from "@services/axiosInstance";
import { Home } from "@pages/Home/Home";

export interface JwtTokenDecoded {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  iat: number;
  exp: number;
}

const PrivatePages = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("accessToken"));
  }, []);

  if (isLoggedIn === undefined || "") {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = jwtDecode(isLoggedIn) as JwtTokenDecoded;

  const isValidTimeToken = Date.now() < decodedToken.exp * 1000;

  if (isLoggedIn && !isValidTimeToken) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axiosInstance.defaults.headers.common.Authorization;
    return <Navigate to="/login" />;
  }

  return isLoggedIn && isValidTimeToken && <Home />;
};

export default PrivatePages;
