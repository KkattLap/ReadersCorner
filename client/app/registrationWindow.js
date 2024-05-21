"use client";
import { useState } from "react";
import styles from "./loginWindow.module.css";
import Link from "next/link";
import Popup from "reactjs-popup";
const bcrypt = require("bcryptjs");

export default function RegistrationWindow() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [data, setData] = useState({
    name: "",
    surname: "",
    userName: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("отправка формы");
    // Хеширование пароля перед отправкой на сервер
    // const hashedPassword = await bcrypt.hash(data.password, 8);
    // const dataToSend = { ...data, password: hashedPassword };
    // console.log(dataToSend);
    const response = await fetch("http://localhost:3000/registration", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data sent successfully");
      const message = await response.text();
      console.log(message);
      // setFormResponse("Data sent successfully");
    } else {
      console.error("Error sending data");
      // setFormResponse("Error sending data");
    }
  };

  const handleChange = (event) => {
    // определение и изменение состояния изменившегося поля
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <Popup
      trigger={
        <Link href="./" style={{ display: "inline-block" }}>
          Зарегистрироваться
        </Link>
      }
      //   position="center"
      // className={styles.registration}
      modal
      nested
      open={open}
      closeOnDocumentClick={false}
      onClose={closeModal}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.registration}>
        <div onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="button"
            onClick={() => setOpen((o) => !o)}
          >
            Controlled Popup
          </button>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <h2 className={styles.loginHeader}>Registration</h2>
          <form className={styles.loginContainer} onSubmit={handleSubmit}>
            <p>
              <input
                name="name"
                value={data.name}
                type="text"
                placeholder="Name"
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                name="surname"
                value={data.surname}
                type="text"
                placeholder="Surname"
                onChange={handleChange}
              />
            </p>
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
        </div>
      </div>
    </Popup>
  );
}
