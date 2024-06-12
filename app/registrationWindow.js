"use client";
import { useState, useEffect } from "react";
import styles from "./loginWindow.module.css";
import Link from "next/link";
import Popup from "reactjs-popup";
const jwt = require("jsonwebtoken");

export default function RegistrationWindow() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [formResponse, setFormResponse] = useState({
    success: false,
    message: "",
  });
  useEffect(() => {
    console.log(formResponse.message);
    console.log(formResponse);
  }, [formResponse]);

  const [data, setData] = useState({
    name: "",
    surname: "",
    userName: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://localhost:3000/registration", {
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
      console.log(message.message);
      setFormResponse({ success: message.success, message: message.message });
    } else {
      console.error("Error sending data");
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
      modal
      open={open}
      onClose={closeModal}
    >
      <div className={styles.registration}>
        <button
          type="button"
          className={styles.closeModal}
          onClick={() => setOpen((o) => !o)}
        >
          Х
        </button>
        <div className={styles.modalRegist}>
          <h2 className={styles.loginHeader}>Registration</h2>
          <form className={styles.loginContainer} onSubmit={handleSubmit}>
            <p>
              <input
                name="name"
                value={data.name}
                type="text"
                placeholder="Name"
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <input
                name="surname"
                value={data.surname}
                type="text"
                placeholder="Surname"
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <input
                name="userName"
                value={data.userName}
                type="text"
                placeholder="User name"
                onChange={handleChange}
                required
              />
              <span style={{ color: "rgb(187, 0, 0)", fontSize: "0.9rem" }}>
                {formResponse.message == "Такое имя уже существует" &&
                  formResponse.message}
              </span>
            </p>

            <p>
              <input
                name="password"
                value={data.password}
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <span style={{ color: "green", fontSize: "1rem" }}>
                {formResponse.success == true && formResponse.message}
              </span>
            </p>
            <p>
              <input type="submit" value="Registration" />
            </p>
          </form>
        </div>
      </div>
    </Popup>
  );
}
