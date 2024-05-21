import PoemCard from "./poemCard";
import styles from "./page.module.css";
import { SAMPLE_POEMS } from "../data";
// const runCallback = (cb) => {
//   return cb();
// };

async function getData() {
  const res = await fetch("http://localhost:3000/AuthorsPoems", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  const data = res.json();
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Poems() {
  const result = await getData();
  return (
    <>
      <div className={styles.poems}>
        {/* {runCallback(() => {
          const row = [];
          for (var i = 0; i < 9; i++) {
            row.push(<PoemCard />);
          }
          return row;
        })} */}
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
