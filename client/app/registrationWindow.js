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
      //   position="center"
      // className={styles.registration}
      modal
      nested
      open={open}
      // closeOnDocumentClick={false}
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
              <div style={{ color: "rgb(187, 0, 0)", fontSize: "0.9rem" }}>
                {formResponse.message == "Такое имя уже существует" &&
                  formResponse.message}
              </div>
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
              <div style={{ color: "green", fontSize: "1rem" }}>
                {formResponse.success == true && formResponse.message}
              </div>
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
