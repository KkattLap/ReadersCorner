import styles from "./authors.module.css";
import { SAMPLE_DATA } from "../data";
import Link from "next/link";
export default function Authors() {
  return (
    <>
      <div className={styles.mainTable}>
        <div className={styles.authors}>
          <div className={styles.headAuthor}>Автор</div>
          {SAMPLE_DATA.map((item) => (
            <Link href="/" className={styles.itemA}>
              {item.author}
            </Link>
          ))}
        </div>
        <div className={styles.count}>
          {/* &#8203; */}
          <div className={styles.headCount}>Произведений</div>
          {SAMPLE_DATA.map((item) => (
            <div className={styles.itemB}>{item.count}</div>
          ))}
        </div>
      </div>
    </>
  );
}
