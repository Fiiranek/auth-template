import React from "react";
import styles from "./home.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { decrement, increment } from "../../store/actions";
function Home() {
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);

  return <div classNames={styles.home}></div>;
}

export default Home;
