import { SAMPLE_POEMS } from "@/app/data";
import { lora, openSans } from "@/app/fonts";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const cards = await fetch("http://localhost:3000/AuthorsPoems").then((res) =>
    res.json()
  );
  // console.log(
  //   cards.map((card) => ({
  //     slug: card.book_name,
  //   }))
  // );
  return cards.map((card) => ({
    slug: card.poem_name,
  }));
}
export default async function PoemRead({ params }) {
  const data = await fetch(
    `https://localhost:3000/AuthorsPoems/${params.slug}`
  ).then((res) => res.json());
  return (
    <>
      <div className={styles.poemRead}>
        <div className={styles.poemRU}>
          <div className={`${lora.className} ${styles.headPoem}`}>
            <div>{data[0].full_name}</div>
            <div>{data[0].poem_name}</div>
          </div>
          <div className={`${lora.className}`}>
            <pre className={`${lora.className}`}>{data[0].content}</pre>
          </div>
        </div>
        <div className={styles.poemEN}>
          <div className={`${lora.className} ${styles.headPoem}`}>
            <div>{data[0].full_name}</div>
            <div>{data[0].poem_name_en}</div>
          </div>
          <div className={`${lora.className}`}>
            <pre className={`${lora.className}`}>
              {data[0].translation_option}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
