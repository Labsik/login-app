import { Home } from "@pages/Home/Home";
import { LoginPage } from "@pages/Login/LoginPage";

export const AppPrivateRoutes = {
  home: "/",
};

export const AppPublicRoutes = {
  login: "/login",
};

export interface IRoutes {
  path: string;
  element: React.ReactNode;
  Component?: React.ComponentType;
}

export const PrivateRoutes: IRoutes[] = [
  { path: AppPrivateRoutes.home, element: <Home /> },
];

export const PublicRoutes: IRoutes[] = [
  { path: AppPublicRoutes.login, element: <LoginPage /> },
];
