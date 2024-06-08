import styles from "./readHead.module.css";

export default function ReadHead({ changeFontSize }) {
  return (
    <>
      <div className={styles.headPage}>
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
