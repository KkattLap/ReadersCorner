import styles from "./bookPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { SAMPLE_DATA } from "@/app/data";
import Recommendations from "@/app/recommendations";
import { lora, openSans } from "@/app/fonts";
export default function BookPage() {
  return (
    <>
      <div className={styles.bookPage}>
        {/* Левая часть страницы */}
        <div className={styles.leftPart}>
          <div className={styles.cover}>
            <Image src={SAMPLE_DATA[0].cover} fill alt="cover"></Image>
            {/* <Image src="/logo.svg" fill alt="cover"></Image> */}
          </div>
          <Link href="/books/bookPage/bookRead" className={styles.readButton}>
            Читать
          </Link>
          <Link
            href="/books/bookPage/bookRead"
            className={styles.downloadButton}
          >
            Скачать
          </Link>
        </div>
        {/* Правая часть страницы */}
        <div className={styles.rightPart}>
          <p className={`${styles.headBook} ${lora.className} `}>
            {SAMPLE_DATA[0].name}
          </p>
          <div className={`${styles.additionalInf} ${openSans.className}`}>
            <p>
              <b>Автор:</b> {SAMPLE_DATA[0].author}
            </p>
            <p>
              <b>Опубликовано:</b> {SAMPLE_DATA[0].published}
            </p>
            <p>
              <b>Уровень англ.яз.: </b>
              {SAMPLE_DATA[0].level}
            </p>
          </div>
          <div className={`${styles.description} ${openSans.className}`}>
            <p>
              <b>Описание:</b> {SAMPLE_DATA[0].description}
            </p>
          </div>
        </div>
      </div>
      <Recommendations></Recommendations>
    </>
  );
}
