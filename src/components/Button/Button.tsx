import { classNames } from "@utils/classNames";
import styles from "./Button.module.css";
import { Props } from "./Button.type";

export const Button = ({
  onClick,
  variant,
  children,
  disabled = false,
}: Props) => {
  const classNameAdjusted = classNames([styles.button, styles[variant]]);

  return (
    <button onClick={onClick} disabled={disabled} className={classNameAdjusted}>
      {children}
    </button>
  );
};
