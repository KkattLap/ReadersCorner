import PoemCard from "./poemCard";
import styles from "./page.module.css";
import { SAMPLE_POEMS } from "../data";
const runCallback = (cb) => {
  return cb();
};
export default function Poems() {
  return (
    <>
      <div className={styles.poems}>
        {runCallback(() => {
          const row = [];
          for (var i = 0; i < 5; i++) {
            row.push(<PoemCard />);
          }
          return row;
        })}
      </div>
    </>
  );
}
