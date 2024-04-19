import styles from "./page.module.css";
import { SAMPLE_DATA } from "../data";
import Link from "next/link";
import { lora } from "../fonts";
export default async function Authors() {
  const res1 = await fetch("http://localhost:8080/AuthorsBooks", {
    cache: "no-store",
  });
  const res2 = await fetch("http://localhost:8080/AuthorsPoems", {
    cache: "no-store",
  });
  const res3 = await fetch("http://localhost:8080/Authors", {
    cache: "no-store",
  });
  const data1 = await res1.json();
  const data2 = await res2.json();
  const allAuthors = await res3.json();

  // Создаем объект для хранения количества встречаний каждого числа
  const countMap = {};

  // Посчитать для каждого автора количество
  // произведений в каждой связывающей таблице
  data1.map((item) => {
    countMap[item.fk_author_id] = (countMap[item.fk_author_id] || 0) + 1;
  });
  data2.map((item) => {
    countMap[item.fk_author_id] = (countMap[item.fk_author_id] || 0) + 1;
  });
  const keys = Object.keys(countMap);
  return (
    <>
      <div>{countMap[6]}</div>
      <div className={`${styles.mainTable} ${lora.className}`}>
        <div className={styles.authors}>
          <div className={styles.headAuthor}>Автор</div>
          {allAuthors.map((item) => (
            <Link key={item.author_id} href="/" className={styles.itemA}>
              {item.full_name}
            </Link>
          ))}
        </div>
        <div className={styles.count}>
          {/* &#8203; */}
          <div className={styles.headCount}>Произведений</div>
          {Object.keys(countMap).map((key, i) => (
            <div key={i} className={styles.itemB}>
              {countMap[key]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
