"use client";
import { AuthContext } from "@/app/authContext";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { openSans } from "../fonts";
export default function Dictionary() {
  const { user, dictionary, handleUserDictionary } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setAuth(user);
    handleUserDictionary();
    // console.log(dictionary);
  }, [user]);
  const handleItemDelete = async (id) => {
    const response = await fetch("http://localhost:3000/DeleteDictionary", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dictionaryId: id,
      }),
    });
    if (response.ok) {
      console.log("Data sent successfully");
      const message = await response.json();
      console.log(message);
      handleUserDictionary();
    } else {
      console.error("Error sending data");
    }
  };
  if (auth)
    return (
      <div className={styles.dictionaryPage}>
        <div className={`${styles.dictionary} ${openSans.className}`}>
          Словарь
        </div>
        <div className={styles.dictionaryTable}>
          <div className={styles.textItem}>Предложение/слово</div>
          <div className={styles.textItem}>Перевод</div>
          <div className={styles.textItemDelete}>Удалить</div>
        </div>
        {dictionary &&
          dictionary.map((item) => (
            <div key={item.dictionary_id} className={styles.dictionaryTable}>
              <div className={styles.textItem}>{item.text}</div>
              <div className={styles.textItem}>{item.translation}</div>
              <div
                id={item.dictionary_id}
                onClick={() => handleItemDelete(item.dictionary_id)}
                // onClick={() => console.log("Delete")}
                className={styles.textItemDelete}
              >
                Удалить
              </div>
            </div>
          ))}
      </div>
    );
  else
    return (
      <div className={styles.dictionaryPage}>
        <div>
          <div className={styles.notAuth}>
            Авторизуйтесь для доступа к словарю.
          </div>
          <div className={`${styles.dictionary} ${openSans.className}`}>
            Словарь
          </div>
          <div className={styles.dictionaryTable}>
            <div className={styles.textItem}>Предложение/слово</div>
            <div className={styles.textItem}>Перевод</div>
            <div className={styles.textItemDelete}>Удалить</div>
          </div>
        </div>
      </div>
    );
}
