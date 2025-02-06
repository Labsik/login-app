import styles from "./Alert.module.css";
import info from "@assets/svg/info.svg";

export const Alert = () => {
  return (
    <div className={styles.alert}>
      <img src={info} alt="info" />
      {/* Changed error message for better security */}
      <p>Invalid credentials</p>
    </div>
  );
};
