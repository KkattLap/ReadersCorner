"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { openSans } from "../fonts";
import { AuthContext } from "@/app/authContext";
import { useContext } from "react";

async function getData() {
  const res = await fetch("http://localhost:3000/user", {
    cache: "no-store",
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default function Account() {
  // const [user, setUser] = useState({});
  const { user, exitUser } = useContext(AuthContext);
  // const [clickedFeedback, setClickedFeedback] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await getData();
  //       setUser(response);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const handleExit = () => {
    exitUser();
  };
  return (
    <>
      <div className={styles.account}>
        <div className={styles.profile}>
          <div className={styles.profilePhoto}>
            <Image
              src="/profile.svg"
              fill
              alt="cover"
              objectFit="contain"
            ></Image>
          </div>
          <div className={styles.userName}>
            {user.name} {user.surname}
          </div>
        </div>
        {/* <button onClick={() => setClickedFeedback(!clickedFeedback)}>
          Предложить книгу и получить отзыв
        </button> */}
        {/* {clickedFeedback && ( */}
        <div className={styles.popupContent}>
          <p className={`${styles.headerFeedback} ${openSans.className}`}>
            Предложить книгу и получить отзыв
          </p>
          <div className={styles.inputGroup}>
            <p className={styles.hintFeedback}>Название</p>
            <input className={styles.inputFeedback}></input>
          </div>
          <div className={styles.inputGroup}>
            <p className={styles.hintFeedback}>Автор</p>
            <input className={styles.inputFeedback}></input>
          </div>
          <button className={styles.sendFeedback}>Отправить</button>
          <div className={`${styles.infFeedback} ${openSans.className}`}>
            Вы можете предложить добавить новую книгу на сайт. После отправки
            ваше заявление будет рассматриваться максимум в течение 3 дней.
            Посмотреть ответ на ваше заявление вы сможете в личном кабинете в
            пункте "Ответы на предложения". Первое заявление для новых
            пользователей бесплатно!
          </div>
        </div>
        {/* ) } */}
        <div>Ответы на предложения</div>
        <div>Словарь</div>
        <Link href="/" onClick={handleExit} className={styles.exit}>
          Выйти
        </Link>
      </div>
    </>
  );
}
