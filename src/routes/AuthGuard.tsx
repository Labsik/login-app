import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { Navigate, Outlet } from "react-router-dom";

import { JwtTokenDecoded } from "./PrivatePages";
import { axiosInstance } from "@services/axiosInstance";

export const AuthGuard = () => {
  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken: JwtTokenDecoded = jwtDecode(accessToken);

      if (Date.now() < decodedToken.exp * 1000) {
        setIsRedirect(true);
        return;
      }
      localStorage.removeItem("accessToken");
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  }, []);

  return isRedirect ? <Navigate to="/" /> : <Outlet />;
};
