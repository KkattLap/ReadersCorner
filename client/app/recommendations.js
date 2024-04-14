import styles from "./recommendations.module.css";
import BookCard from "./bookCard";
import { SAMPLE_DATA } from "./data";
import React from "react";
import { lora } from "./fonts";

async function getData() {
  const res = await fetch("http://localhost:8080/AuthorsBooks", {
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

export default async function Recommendations(coverBook, nameBook, authorBook) {
  const result = await getData();
  console.log("RESULT:");
  console.log(result);

  // const [scrollPosition, setScrollPosition] = useState(0);
  // const containerRef = useRef();

  // const handleScroll = (scrollAmount) => {
  //   const newScrollPosition = scrollPosition + scrollAmount;
  //   setScrollPosition(newScrollPosition);
  //   containerRef.current.scrollLeft = newScrollPosition;
  // };

  // coverBook =
  //   "https://ucarecdn.com/5342e9c5-d583-4d13-9ddc-8c94ccb22183/cover.svg";
  // nameBook = "Гарри Поттер и философский камень";
  // authorBook = "Д.К. Роулинг";

  return (
    <>
      <p className={`${lora.className} ${styles.headline}`}>Рекомендации</p>
      {/* {result.map((item) => (
        <div>{item.full_name}</div>
      ))} */}
      {/* <p>Check</p> */}
      <div className={styles.scroll}>
        {/* {SAMPLE_DATA.map((item) => (
          <BookCard
            key={item.id}
            cover={item.cover}
            name={item.name}
            author={item.author}
          ></BookCard>
        ))} */}
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
