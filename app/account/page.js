"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { openSans } from "../fonts";
import { AuthContext } from "@/app/authContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Popup from "reactjs-popup";

async function getWishes(id) {
  const res = await fetch("https://localhost:3000/getWish", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: id }),
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default function Account() {
  const [message, setMessage] = useState("");
  const { user, exitUser, handleUser } = useContext(AuthContext);
  const [wishes, setWishes] = useState(undefined);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const router = useRouter();
  if (user.role != "user") router.replace("/");
  // Изменить состояние user после авторизации
  useEffect(() => {
    handleUser();
    setData({
      ...data,
      userId: user.userId,
    });
    // Ответы администратора на предложения
    const fetchWishes = async () => {
      try {
        console.log(user);
        const response = await getWishes(user.userId);
        console.log(response);
        setWishes(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWishes();
  }, []);

  const [data, setData] = useState({
    userId: false,
    authorName: "",
    bookName: "",
  });

  const handleSubmit = async (event) => {
    setMessage("Ваше заявление отправлено");
    event.preventDefault();
    const response = await fetch("https://localhost:3000/wishes", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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
        <form className={styles.popupContent} onSubmit={handleSubmit}>
          <p className={`${styles.headerFeedback} ${openSans.className}`}>
            Предложить книгу и получить отзыв
          </p>
          <div className={styles.inputGroup}>
            <p className={styles.hintFeedback}>Автор</p>
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
            <p className={styles.hintFeedback}>Название</p>
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
          <div style={{ color: "green", fontSize: "1rem" }}>{message}</div>
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
        <Popup
          trigger={<div>Ответы на предложения</div>}
          modal
          open={open}
          onClose={closeModal}
          closeOnDocumentClick
        >
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.closeModal}
              onClick={() => setOpen((o) => !o)}
            >
              Х
            </button>
            <div className={styles.wishPopup}>
              <div className={styles.rowAnswer}>
                <div>Предложения</div>
                <div>Ответы</div>
              </div>
              {wishes &&
                wishes.map((item) => (
                  <div key={item.wish_id} className={styles.rowAnswer}>
                    <div className={styles.itemWish}>
                      <div>Автор: {item.author_name}</div>{" "}
                      <div>Книга: {item.book_name}</div>
                    </div>
                    <div className={styles.itemWish}>{item.answer}</div>
                  </div>
                ))}
            </div>
          </div>
        </Popup>
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
