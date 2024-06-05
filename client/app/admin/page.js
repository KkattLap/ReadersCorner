"use client";
import { AuthContext } from "@/app/authContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { openSans } from "../fonts";

async function getWishes() {
  const res = await fetch("http://localhost:3000/getWishes", {
    cache: "no-store",
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default function Admin() {
  const { user, exitUser } = useContext(AuthContext);
  const [wishes, setWishes] = useState(undefined);
  const [clickAnswer, setClickAnswer] = useState(false);
  const [resSetAnswer, setResSetAnswer] = useState(false);
  const [addBook, setAddBook] = useState(false);
  const [data, setData] = useState({
    authorName: "",
    portrait: "",
    biography: "",
    bookName: "",
    cover: "",
    release: "",
    description: "",
    levelEn: "",
    content: "",
  });
  const [message, setMessage] = useState({
    wishId: undefined,
    message: "",
  });
  if ((user.role = "user")) router.replace("/");
  const handleChange = (event) => {
    // определение и изменение состояния изменившегося поля
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleMessage = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await getWishes();
        console.log(response);
        setWishes(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWishes();
  }, []);

  const handleExit = () => {
    exitUser();
  };

  const handleAnswer = (id) => {
    setClickAnswer(wishes[id]);
  };

  useEffect(() => {
    setMessage({
      ...message,
      wishId: clickAnswer.wish_id,
    });
  }, [clickAnswer]);

  // Отправка данных для создания записи автора или книги
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Отправка формы1");
    console.log(data);

    const response = await fetch("http://localhost:3000/addBook", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data sent successfully");
      const servAnswer = await response.text();
      setAddBook(servAnswer);
      console.log(servAnswer);
    } else {
      console.error("Error sending data");
      setResSetAnswer("Ошибка отправки данных");
    }
  };
  // отправка ответа пользователю
  const handleSubmitAnswer = async (event) => {
    event.preventDefault();
    console.log("Отправка формы2");
    console.log(message);

    const response = await fetch("http://localhost:3000/setAnswer", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      console.log("Data sent successfully");
      const servAnswer = await response.text();
      setResSetAnswer(servAnswer);
    } else {
      console.error("Error sending data");
      setResSetAnswer("Ошибка отправки данных");
    }
  };
  return (
    <div className={styles.admin}>
      <div className={styles.panelHeader}>
        <div className={`${styles.panelName} ${openSans.className}`}>
          Панель управления администратора
        </div>
        <Link href="/" onClick={handleExit} className={styles.exit}>
          Выйти
        </Link>
      </div>
      <div className={styles.table}>
        <div className={styles.tableName}>Предложения пользователей</div>
        <div className={styles.adminTableHeader}>
          <div className={styles.itemId}>user_id</div>
          <div className={styles.itemName}>ФИО автора</div>
          <div className={styles.itemName}>Название книги</div>
          <div className={styles.item}>Ответить</div>
        </div>
        {wishes &&
          wishes.map((item, id) => (
            <div key={item.wish_id} className={styles.adminTable}>
              <div className={styles.itemId}>{item.user_id}</div>
              <div className={styles.itemName}>{item.author_name}</div>
              <div className={styles.itemName}>{item.book_name}</div>
              <div
                className={styles.itemAnswer}
                onClick={() => handleAnswer(id)}
              >
                Ответить
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className={styles.panelHeader}>
          <div className={styles.panelName}>
            Форма для добавления новых данных в БД
          </div>
        </div>
        <div className={styles.answerForm}>
          <form onSubmit={handleSubmit} className={styles.postPart}>
            <div>
              <div>Идентификатор пользователя: {clickAnswer.user_id}</div>
              <div>Автор: {clickAnswer.author_name}</div>
              <div>Название книги: {clickAnswer.book_name}</div>
            </div>
            {/* <div> */}
            <div className={styles.instruction}>
              Перед отправкой данных в БД убедитесь, что такой книги
              действительно нет на сайте. Если такая книга уже есть, отправьте
              соответствующее сообщение пользователю.
            </div>
            <div className={styles.formAdd}>
              Добавьте автора или впишите только ФИО, если такой уже есть на
              сайте
            </div>
            <input
              name="authorName"
              value={data.authorName}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="ФИО"
              required
            ></input>
            <input
              name="portrait"
              value={data.portrait}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Ссылка на портрет"
            ></input>
            <input
              name="biography"
              value={data.biography}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Биография"
            ></input>
            <div className={styles.formAdd}>Добавьте книгу</div>
            <input
              name="bookName"
              value={data.bookName}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Название"
            ></input>
            <input
              name="cover"
              value={data.cover}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Ссылка на обложку"
            ></input>
            <input
              name="release"
              value={data.release}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Дата выпуска"
            ></input>
            <input
              name="description"
              value={data.description}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Описание"
            ></input>
            <input
              name="levelEn"
              value={data.levelEn}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Уровень англ. яз."
            ></input>
            <input
              name="content"
              value={data.content}
              type="text"
              onChange={handleChange}
              className={styles.inputAnswer}
              placeholder="Ссылка на содержание"
            ></input>
            {/* </div> */}
            <input
              type="submit"
              className={styles.sendButton}
              value="Отправить"
            ></input>
            <div>Ответ с сервера: {addBook}</div>
          </form>
          <form onSubmit={handleSubmitAnswer} className={styles.adminAnswer}>
            <textarea
              name="message"
              value={message.message}
              type="text"
              onChange={handleMessage}
              className={styles.answer}
              placeholder="Напишите ответ пользователю"
            ></textarea>
            <input
              type="submit"
              className={styles.sendButton}
              value="Отправить"
            ></input>
            <div>Ответ с сервера: {resSetAnswer}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
