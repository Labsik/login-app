import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivatePages from "@routes/PrivatePages";
import {
  AppPrivateRoutes,
  AppPublicRoutes,
  IRoutes,
  PrivateRoutes,
  PublicRoutes,
} from "@routes/routes";
import { AuthGuard } from "@routes/AuthGuard";
import "@styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivatePages />}>
          {PrivateRoutes?.map((route: IRoutes) => (
            <Route element={route.element} key={route.path} path={route.path} />
          ))}

          <Route path="*" element={<Navigate to={AppPrivateRoutes.home} />} />
        </Route>

        <Route element={<AuthGuard />}>
          {PublicRoutes?.map((route: IRoutes) => (
            <Route element={route.element} key={route.path} path={route.path} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={AppPublicRoutes.login} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
