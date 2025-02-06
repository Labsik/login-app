import { Button } from "@components/Button/Button";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { fetchUserRequest } from "@store/user/userSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("logged out");
    navigate("/login");
  };

  const logoutBtn = (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.home}>
          {loading && <>Loading...</>}
          {error && (
            <>
              <p>Ooops something went wrong...</p>
              {logoutBtn}
            </>
          )}
          {!loading && user && (
            <>
              <header className={styles.header}>
                <h1>
                  Hi, {user.firstName} {user.lastName}
                </h1>
              </header>
              {logoutBtn}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
