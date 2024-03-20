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
            <Image src={cover} fill alt="cover"></Image>
          </div>
        </div>
        <div className={styles.cardBottom}>
          <p className={lora.className}>{name}</p>
          <p className={lora.className}>{author}</p>
          <Link
            className={`${styles.readButton} ${lora.className}`}
            href="/books/bookPage"
          >
            Читать
          </Link>
        </div>
      </div>
    </>
  );
}
