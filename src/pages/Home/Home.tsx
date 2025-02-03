import { Button } from "@components/Button/Button";
import styles from "./Home.module.css";
import back from "@assets/svg/back.svg";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <header className={styles.header}>
          {/* <img src={back} alt="back" onClick={() => console.log("infggffg")} /> */}
          <h1>Hi, Whatever Whatever</h1>
        </header>
        <Button variant="secondary" onClick={() => console.log("aaa")}>
          Logout
        </Button>
      </div>
    </div>
  );
};
