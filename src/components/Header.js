import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

const Header = ({ loggedIn, setLoggedIn }) => {
  const login = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  return (
    <header>
      <h1 className={styles.logo}>CryptoTrade</h1>
      <ul>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/home"
          >
            Home
          </NavLink>
        </li>
        {loggedIn && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/favorites"
            >
              Favorites
            </NavLink>
          </li>
        )}
        {!loggedIn && (
          <li>
            <button className={styles.login} onClick={login}>
              Login
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
