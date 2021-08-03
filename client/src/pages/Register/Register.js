import React, { useState } from "react";
import styles from "../Login/auth.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { decrement, increment } from "../../store/actions";
import { SERVER_URL } from "../../config/config";
function Register() {
  const dispatch = useDispatch();

  //const counter = useSelector((state) => state.counter);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const submitForm = (e) => {
    e.preventDefault();

    fetch(`${SERVER_URL}/register`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
      <input
        onChange={(e) => changeCredentials(e)}
        name="password"
        placeholder="Repeat password"
        type="password2"
      ></input>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
