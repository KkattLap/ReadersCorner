"use client";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import styles from "./loginWindow.module.css";
import RegistrationWindow from "./registrationWindow";
import Link from "next/link";
import { AuthContext } from "./authContext";
import { useContext } from "react";

export default function LoginWindow() {
  const { user, handleUser } = useContext(AuthContext);
  const [userName, setUserName] = useState(false);
  const [formResponse, setFormResponse] = useState({
    success: false,
    message: "",
  });
  const [data, setData] = useState({ userName: "", password: "" });

  useEffect(() => {
    console.log(user);
    if (user) setUserName(user.user_name);
    else setUserName(false);
  }, [user]);

  useEffect(() => {
    handleUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("отправка формы");
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data sent successfully");
      const message = await response.json();
      console.log(message);
      setFormResponse({ success: message.success, message: message.message });
      if (message.success == true) {
        handleUser();
      }
    } else {
      console.error("Error sending data");
      setFormResponse({
        success: false,
        message: "Ошибка при отправке данных",
      });
      // setFormResponse("Error sending data");
    }
  };

  const handleChange = (event) => {
    // определение и изменение состояния изменившегося поля
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div>
      {!userName && (
        <Popup
          trigger={<button className={styles.loginButton}>Войти</button>}
          position="bottom right"
          arrowStyle={{ color: "#b591ff" }}
          // closeOnDocumentClick={false}
          nested
        >
          {/* {showForm && ( */}
          <div className={styles.login}>
            {/* <div className={styles.loginTriangle}></div> */}
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
            <div className={styles.loginContainer}>
              <p style={{ display: "inline-block" }}>
                Нет аккаунта в ReaderCorner?
                <RegistrationWindow></RegistrationWindow>
              </p>
              {formResponse && (
                <p>
                  {formResponse.success}
                  {formResponse.message}
                </p>
              )}
            </div>
          </div>
          {/* )} */}
        </Popup>
      )}
      {userName && (
        <Link href="/account" className={styles.loginButton}>
          {userName}
        </Link>
      )}
    </div>
  );
}
