import styles from "./bookCard.module.css";
import Image from "next/image";
import Link from "next/link";
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
          <p>{name}</p>
          <p>{author}</p>
          <Link className={styles.readButton} href="/books/bookPage">
            Читать
          </Link>
        </div>
      </div>
    </>
  );
}
