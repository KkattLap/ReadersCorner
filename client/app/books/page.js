import BookCard from "../bookCard";
import { SAMPLE_DATA } from "../data";
import styles from "./page.module.css";
import { lora } from "../fonts";

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

export default async function Books() {
  const result = await getData();
  return (
    <>
      <div className={`${styles.chooseLevel} ${lora.className}`}>
        <p className={styles.headLevel}> Уровень знания английского языка:</p>
        <div className={styles.levels}>
          <input type="checkbox" id="a1" className={styles.checkbox} />
          <label htmlFor="a1" className={styles.level}>
            A1
          </label>
          <input type="checkbox" id="a2" className={styles.checkbox} />
          <label htmlFor="a2" className={styles.level}>
            A2
          </label>
          <input type="checkbox" id="b1" className={styles.checkbox} />
          <label htmlFor="b1" className={styles.level}>
            B1
          </label>
          <input type="checkbox" id="b2" className={styles.checkbox} />
          <label htmlFor="b2" className={styles.level}>
            B2
          </label>
          <input type="checkbox" id="c1" className={styles.checkbox} />
          <label htmlFor="c1" className={styles.level}>
            C1
          </label>
          <input type="checkbox" id="c2" className={styles.checkbox} />
          <label htmlFor="c2" className={styles.level}>
            C2
          </label>
        </div>
      </div>
      <div className={styles.catalog}>
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
