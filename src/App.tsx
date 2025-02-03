import { useState } from "react";

import "@styles/index.css";
import { Input } from "@components/Input/Input";
import { LoginPage } from "@pages/Login/LoginPage";
import { Home } from "@pages/Home/Home";

function App() {
  return (
    <div className="page">
      {/* <LoginPage /> */}
      <Home />
    </div>
  );
}

export default App;
