import styles from "./bookCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { openSans, lora } from "./fonts";

export default function BookCard({ cover, name, author }) {
  return (
    <>
      <div className={styles.bookCard}>
        <div className={styles.card_top}>
          <div
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
              // background: "black",
            }}
          >
            <Image src={cover} fill alt="cover" objectFit="contain"></Image>
          </div>
        </div>
        <div className={styles.cardBottom}>
          <p className={`${lora.className} ${styles.bookName}`}>{name}</p>
          <p className={`${lora.className} ${styles.authorName}`}>{author}</p>
        </div>
        <Link
          className={`${styles.readButton} ${lora.className}`}
          href={`/books/${name}`}
        >
          Читать
        </Link>
      </div>
    </>
  );
}
