import styles from "./Input.module.css";
import closeSVG from "@assets/svg/close.svg";
import { Props } from "./Input.type";
import { classNames } from "@utils/classNames";

export const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  onInputTrim,
  errorMessage,
}: Props) => {
  const isPasswordError = type === "password" && errorMessage;

  const inputWrapperStyles = classNames([
    styles.inputWrapper,
    errorMessage ? styles.error : "",
  ]);

  const inputStyles = classNames([
    styles.inputField,
    errorMessage ? styles.error : "",
    isPasswordError ? styles.passwordError : "",
  ]);

  return (
    <div className={styles.inputContainer}>
      <div className={inputWrapperStyles}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={inputStyles}
        />
        <label className={styles.inputPlaceholder}>{placeholder}</label>
        {value && (
          <div onClick={onInputTrim} className={styles.clearText}>
            <img src={closeSVG} alt="clear" />
          </div>
        )}
      </div>
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
};
