import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useSelector } from "react-redux";
function Navbar() {
  // @ts-ignore
  const isLogged = useSelector((state) => state.session);
  console.log(isLogged);
  if (isLogged) {
    return (
      <nav className={styles.navbar}>
        <span>Witaj!</span>
      </nav>
    );
  }
  return (
    <nav className={styles.navbar}>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
