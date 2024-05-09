"use client";
import { useEffect, useState } from "react";
import styles from "./loginWindow.module.css";
export default function LoginWindow() {
  const [showForm, setShowForm] = useState(false);
  const [formResponse, setFormResponse] = useState(undefined);
  const handleLoginButtonClick = () => {
    setShowForm(!showForm);
  };
  const [data, setData] = useState({ userName: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("отправка формы");
    const response = await fetch("http://localhost:8080/auth", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data sent successfully");
      setFormResponse("Data sent successfully");
    } else {
      console.error("Error sending data");
      setFormResponse("Error sending data");
    }
  };

  const handleChange = (event) => {
    // определение и изменение состояния изменившегося поля
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleLoginButtonClick} className={styles.loginButton}>
        Войти
      </button>
      {showForm && (
        <div className={styles.login}>
          <div className={styles.loginTriangle}></div>
          <h2 className={styles.loginHeader}>Log in</h2>
          <form className={styles.loginContainer} onSubmit={handleSubmit}>
            <p>
              <input
                name="userName"
                value={data.userName}
                type="text"
                placeholder="User name"
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                name="password"
                value={data.password}
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </p>
            <p>
              <input type="submit" value="Log in" />
            </p>
          </form>
          {formResponse && <p>{formResponse}</p>}
        </div>
      )}
    </>
  );
}
