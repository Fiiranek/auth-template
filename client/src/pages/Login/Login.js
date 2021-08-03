import React, { useState } from "react";
import styles from "./auth.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../store/actions";
import { SERVER_URL } from "../../config/config";
function Login() {
  const dispatch = useDispatch();

  //const counter = useSelector((state) => state.counter);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    fetch(`${SERVER_URL}/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          dispatch(login(data.token));
        }
      });
  };

  const changeCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.authBox} onSubmit={(e) => submitForm(e)}>
      <input
        onChange={(e) => changeCredentials(e)}
        name="email"
        type="email"
        placeholder="Email"
      ></input>
      <input
        onChange={(e) => changeCredentials(e)}
        name="password"
        placeholder="Password"
        type="password"
      ></input>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
