import styles from "./recommendations.module.css";
import BookCard from "./bookCard";
import { SAMPLE_DATA } from "./data";
import React from "react";

export default function Recommendations(coverBook, nameBook, authorBook) {
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
      <p className={styles.headline}>Рекомендации</p>
      <div className={styles.scroll}>
        {SAMPLE_DATA.map((item) => (
          <BookCard
            cover={item.cover}
            name={item.name}
            author={item.author}
          ></BookCard>
        ))}
      </div>
    </>
  );
}
