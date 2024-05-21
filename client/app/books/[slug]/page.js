import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { SAMPLE_DATA } from "@/app/data";
import Recommendations from "@/app/recommendations";
import { lora, openSans } from "@/app/fonts";

export async function generateStaticParams() {
  const cards = await fetch("http://localhost:3000/AuthorsBooks").then((res) =>
    res.json()
  );
  // console.log(
  //   cards.map((card) => ({
  //     slug: card.book_name,
  //   }))
  // );
  return cards.map((card) => ({
    slug: card.book_name,
  }));
}

export default async function BookPage({ params }) {
  // console.log(params.slug);
  const data = await fetch(
    `http://localhost:3000/AuthorsBooks/${params.slug}`
  ).then((res) => res.json());
  // console.log("КОНКРЕТНАЯ ЗАПИСЬ", data);

  // console.log(`http://localhost:8080/AuthorsBooks/${params.slug}`);
  // const udata = await data.json();
  return (
    <>
      <div className={styles.bookPage}>
        {/* Левая часть страницы */}
        <div className={styles.leftPart}>
          <div className={styles.cover}>
            <Image
              src={data[0].cover}
              fill
              alt="cover"
              objectFit="contain"
            ></Image>
            {/* <Image src="/logo.svg" fill alt="cover"></Image> */}
          </div>
          <Link
            href={`/books/${data[0].book_name}/bookRead`}
            className={styles.readButton}
          >
            Читать
          </Link>
          <Link href={data[0].content} className={styles.downloadButton}>
            Скачать
          </Link>
        </div>
        {/* Правая часть страницы */}
        <div className={styles.rightPart}>
          <p className={`${styles.headBook} ${lora.className} `}>
            {data[0].book_name}
          </p>
          <div className={`${styles.additionalInf} ${openSans.className}`}>
            <p>
              <b>Автор:</b> {data[0].full_name}
            </p>
            <p>
              <b>Опубликовано:</b> {data[0].release_date}
            </p>
            <p>
              <b>Уровень англ.яз.: </b>
              {data[0].level_en}
            </p>
          </div>
          <div className={`${styles.description} ${openSans.className}`}>
            <p>
              <b>Описание:</b> {data[0].description}
            </p>
          </div>
        </div>
      </div>
      <Recommendations></Recommendations>
    </>
  );
}
