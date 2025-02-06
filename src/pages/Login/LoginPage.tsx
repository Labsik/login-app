import { ChangeEvent, useEffect, useState } from "react";
import { LoginStep, LoginType } from "./Login.type";
import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";

import { validationPassword, validationUsername } from "@utils/validationUtils";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "@store/auth/authSlice";
import { RootState } from "@store/store";
import { Alert } from "@components/Alert/Alert";

export const LoginPage = () => {
  const [loginStep, setLoginStep] = useState(LoginStep.INITIAL);
  const { loading, error, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginFormValue, setLoginFormValue] = useState<LoginType>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const onInputChange =
    (name: keyof LoginType) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setLoginFormValue((prev) => ({ ...prev, [name]: value }));

      setErrors(() => ({
        username: validationUsername(
          name === "username" ? value : loginFormValue.username
        )
          ? ""
          : "Username is invalid",
        password: validationPassword(
          name === "password" ? value : loginFormValue.password
        )
          ? ""
          : "Password is required",
      }));
    };

  const onInputTrim = (name: keyof LoginType) => () => {
    setLoginFormValue((prev) => ({ ...prev, [name]: "" }));
  };

  const disabledButton =
    !validationUsername(loginFormValue.username) ||
    !validationPassword(loginFormValue.password) ||
    loading;

  const goToFormStep = () => setLoginStep(LoginStep.FORM);

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      loginRequest({
        username: loginFormValue.username,
        password: loginFormValue.password,
      })
    );
  };

  useEffect(() => {
    // TODO: implement right redirection: Problem in saga for me -> 'history doesn't work'
    const accessToken = localStorage.getItem("accessToken");

    if (isLoggedIn && accessToken) {
      navigate("/");
    }
    if (isLoggedIn && !accessToken) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="page">
      <div className={styles.container}>
        {loginStep === LoginStep.INITIAL && (
          <Button variant="primary" onClick={goToFormStep}>
            Go to login
          </Button>
        )}{" "}
        {loginStep === LoginStep.FORM && (
          <form className={styles.form} onSubmit={submitLogin}>
            <Input
              type="text"
              name="username"
              value={loginFormValue.username}
              placeholder="Username"
              onChange={onInputChange("username")}
              onInputTrim={onInputTrim("username")}
              errorMessage={errors.username}
            />
            <Input
              type="password"
              name="password"
              value={loginFormValue.password}
              placeholder="Enter password"
              onChange={onInputChange("password")}
              onInputTrim={onInputTrim("password")}
              errorMessage={errors.password}
            />
            {error && <Alert />}
            <Button variant="primary" disabled={disabledButton}>
              Login
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
