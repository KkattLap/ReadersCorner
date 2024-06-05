"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { openSans } from "../fonts";
import { AuthContext } from "@/app/authContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function Account() {
  const [message, setMessage] = useState(false);
  const { user, exitUser, handleUser } = useContext(AuthContext);
  const router = useRouter();
  if (user.role != "user") router.replace("/");
  // Изменить состояние user после авторизации
  useEffect(() => {
    handleUser();
    setData({
      ...data,
      userId: user.userId,
    });
  }, []);
  const [data, setData] = useState({
    userId: false,
    authorName: "",
    bookName: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setData({
    //   ...data,
    //   userId: user.userId,
    // });
    console.log(user);
    console.log(data);
    const response = await fetch("http://localhost:3000/wishes", {
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
      setMessage("Ваше заявление отправлено");
    } else {
      console.error("Error sending data");
      setMessage("Не удалось отправить заявление");
    }
  };
  const handleChange = (event) => {
    // определение и изменение состояния изменившегося поля
    setData({ ...data, [event.target.name]: event.target.value });
  };
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
              alt="profile"
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
        <form className={styles.popupContent} onSubmit={handleSubmit}>
          <p className={`${styles.headerFeedback} ${openSans.className}`}>
            Предложить книгу и получить отзыв
          </p>
          <div className={styles.inputGroup}>
            <p className={styles.hintFeedback}>Название</p>
            <input
              name="authorName"
              value={data.authorName}
              type="text"
              placeholder="ФИО автора"
              onChange={handleChange}
              className={styles.inputFeedback}
              required
            ></input>
          </div>
          <div className={styles.inputGroup}>
            <p className={styles.hintFeedback}>Автор</p>
            <input
              name="bookName"
              value={data.bookName}
              type="text"
              placeholder="Название книги"
              onChange={handleChange}
              className={styles.inputFeedback}
              required
            ></input>
          </div>
          <input
            type="submit"
            className={styles.sendFeedback}
            value="Отправить"
          ></input>
          <div className={`${styles.infFeedback} ${openSans.className}`}>
            Вы можете предложить добавить новую книгу на сайт. После отправки
            ваше заявление будет рассматриваться максимум в течение 3 дней.
            Посмотреть ответ на ваше заявление вы сможете в личном кабинете в
            пункте "Ответы на предложения". Первое заявление для новых
            пользователей бесплатно!
          </div>
        </form>
        {/* ) } */}
        <div>Ответы на предложения</div>
        <Link href="/dictionary" className={styles.dictionaryLink}>
          Словарь
        </Link>
        <Link href="/" onClick={handleExit} className={styles.exit}>
          Выйти
        </Link>
      </div>
    </>
  );
}
