import styles from "./page.module.css";
import { SAMPLE_DATA } from "../data";
import Link from "next/link";
import { lora } from "../fonts";
export default function Authors() {
  return (
    <>
      <div className={`${styles.mainTable} ${lora.className}`}>
        <div className={styles.authors}>
          <div className={styles.headAuthor}>Автор</div>
          {SAMPLE_DATA.map((item) => (
            <Link key={item.id} href="/" className={styles.itemA}>
              {item.author}
            </Link>
          ))}
        </div>
        <div className={styles.count}>
          {/* &#8203; */}
          <div className={styles.headCount}>Произведений</div>
          {SAMPLE_DATA.map((item) => (
            <div key={item.id} className={styles.itemB}>
              {item.count}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
