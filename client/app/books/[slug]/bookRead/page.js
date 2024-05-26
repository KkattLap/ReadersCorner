import styles from "./page.module.css";
import { SAMPLE_DATA } from "@/app/data";
import { lora, openSans } from "@/app/fonts";
import Read from "./read";

export default async function BookRead({ params }) {
  const data = await fetch(
    `http://localhost:3000/AuthorsBooks/${params.slug}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  console.log(data);

  return (
    <>
      <div className={styles.page}>
        <Read bookText={data[0].content}></Read>
      </div>
    </>
  );
}
