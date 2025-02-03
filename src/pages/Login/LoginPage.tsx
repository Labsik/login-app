import { ChangeEvent, SetStateAction, useState } from "react";
import { LoginStep, LoginType } from "./Login.type";
import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import styles from "./Login.module.css";
import { validationPassword, validationUsername } from "@utils/validationUtils";

export const LoginPage = () => {
  const [loginStep, setLoginStep] = useState(LoginStep.INITIAL);

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
    !validationPassword(loginFormValue.password);

  const goToFormStep = () => setLoginStep(LoginStep.FORM);
  return (
    <div className={styles.container}>
      {loginStep === LoginStep.INITIAL && (
        <Button variant="primary" onClick={goToFormStep}>
          Go to login
        </Button>
      )}{" "}
      {loginStep === LoginStep.FORM && (
        <form className={styles.form}>
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
          <Button
            variant="primary"
            disabled={disabledButton}
            onClick={goToFormStep}
          >
            Login
          </Button>
        </form>
      )}
    </div>
  );
};
