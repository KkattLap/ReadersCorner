"use client";
import { useState } from "react";
import Popup from "reactjs-popup";
import styles from "./loginWindow.module.css";
import RegistrationWindow from "./registrationWindow";
import Link from "next/link";
async function getData() {
  const res = await fetch("http://localhost:3000/user", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  const data = res.json();
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data;
}
export default function LoginWindow() {
  const [formResponse, setFormResponse] = useState({
    success: false,
    message: "",
  });
  const [data, setData] = useState({ userName: "", password: "" });

  const [userName, setUserName] = useState(undefined);

  const fetchData = async () => {
    try {
      const response = await getData();
      setUserName(response.user_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("отправка формы");
    // Хеширование пароля перед отправкой на сервер
    // const hashedPassword = await bcrypt.hash(data.password, 8);
    // const dataToSend = { ...data, password: hashedPassword };
    // console.log(dataToSend);
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
      // setFormResponse("Data sent successfully");
      // const message = await response.text();
      const message = await response.json();
      console.log(message);
      setFormResponse({ success: message.success, message: message.message });
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
          closeOnDocumentClick={false}
        >
          <div>Привет, {userName}</div>
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
