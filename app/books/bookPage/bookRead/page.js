import styles from "./bookRead.module.css";
import { SAMPLE_DATA } from "@/app/data";

<style></style>;
export default function BookRead() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.headPage}>
          {/* <button className={styles.listen}> */}
          {/* <span class="material-icons" className={styles.listen}> */}
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "48px",
              fontWeight: "300",
            }}
            // className={styles.listen}
          >
            record_voice_over
          </span>
          {/* </span> */}
          {/* </button> */}
          <div>
            {/* <button className={styles.increase}> */}
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "48px",
                fontWeight: "300",
              }}
            >
              text_increase
            </span>
            {/* </button> */}
            {/* <button className={styles.decrease}> */}
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "48px",
                fontWeight: "300",
              }}
            >
              text_decrease
            </span>
            {/* </button> */}
          </div>
        </div>
        BookRead
        <div>{SAMPLE_DATA[0].text}</div>
      </div>
    </>
  );
}
