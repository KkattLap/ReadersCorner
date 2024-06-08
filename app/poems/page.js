import PoemCard from "./poemCard";
import styles from "./page.module.css";

async function getData() {
  const res = await fetch("https://localhost:3000/AuthorsPoems", {
    cache: "no-store",
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Poems() {
  const result = await getData();
  return (
    <>
      <div className={styles.poems}>
        {result.map((item) => (
          <PoemCard
            key={item.poem_id}
            author={item.full_name}
            poem={item.poem_name}
            cover={item.portrait}
          ></PoemCard>
        ))}
      </div>
    </>
  );
}
