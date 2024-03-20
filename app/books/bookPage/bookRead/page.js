import styles from "./page.module.css";
import { SAMPLE_DATA } from "@/app/data";
import { lora, openSans } from "@/app/fonts";
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
          <div>
            <span
              class="material-symbols-outlined"
              style={{
                fontSize: "36px",
                fontWeight: "300",
              }}
            >
              format_align_left
            </span>
            <span
              class="material-symbols-outlined"
              style={{
                fontSize: "36px",
                fontWeight: "300",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              format_align_justify
            </span>
            <span
              class="material-symbols-outlined"
              style={{
                fontSize: "36px",
                fontWeight: "300",
              }}
            >
              format_align_right
            </span>
          </div>
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
        <div className={`${styles.textHead} ${lora.className}`}>
          {SAMPLE_DATA[0].head}
        </div>
        <div className={`${styles.textBook} ${openSans.className}`}>
          {SAMPLE_DATA[0].text}
        </div>
        <div className={styles.arrows}>
          <span
            class="material-symbols-outlined"
            style={{
              fontSize: "88px",
              fontWeight: "200",
            }}
          >
            chevron_left
          </span>
          <span
            class="material-symbols-outlined"
            style={{
              fontSize: "88px",
              fontWeight: "200",
            }}
          >
            chevron_right
          </span>
        </div>
      </div>
    </>
  );
}
