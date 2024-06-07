import styles from "./recommendations.module.css";
import BookCard from "./bookCard";
import { SAMPLE_DATA } from "./data";
import React from "react";
import { lora } from "./fonts";

async function getData() {
  const res = await fetch("https://localhost:3000/AuthorsBooks", {
    cache: "no-store",
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Recommendations(coverBook, nameBook, authorBook) {
  const result = await getData();
  return (
    <>
      <p className={`${lora.className} ${styles.headline}`}>Рекомендации</p>

      <div className={styles.scroll}>
        {result.map((item) => (
          <BookCard
            key={item.book_id}
            cover={item.cover}
            name={item.book_name}
            author={item.full_name}
          ></BookCard>
        ))}
      </div>
    </>
  );
}
