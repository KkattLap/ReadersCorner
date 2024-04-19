import styles from "./readHead.module.css";

export default function ReadHead({ changeFontSize }) {
  return (
    <>
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
          {/* record_voice_over */}
        </span>
        <div
          onClick={changeFontSize}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "48px",
              fontWeight: "300",
            }}
          >
            text_increase
          </span>
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "48px",
              fontWeight: "300",
            }}
          >
            text_decrease
          </span>
        </div>
      </div>
    </>
  );
}
