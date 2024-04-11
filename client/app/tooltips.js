import Image from "next/image";
import styles from "./tooltips.module.css";

export default function Tooltips() {
  return (
    <>
      {/* Блок2 */}
      <div className={styles.tooltips12}>
        <div
          style={{
            position: "relative",
            width: "35vw",
            height: "35vh",
            aspectRatio: "1/1",
            // background: "yellow",
            // background: "black",
          }}
        >
          <Image
            src="/tooltip1.svg"
            fill
            priority
            // sizes="100vw"
            alt="tooltip1"
          ></Image>
        </div>
        <div
          style={{
            position: "relative",
            width: "35vw",
            height: "35vh",
            aspectRatio: "1/1",
            // background: "black",
          }}
        >
          <Image
            src="/tooltip2.svg"
            fill
            priority
            // sizes="100vw"
            alt="tooltip2"
          ></Image>
        </div>
      </div>
      <div className={styles.tooltips34}>
        <div
          style={{
            position: "relative",
            width: "35vw",
            height: "35vh",
            aspectRatio: "1/1",
            // background: "black",
          }}
        >
          <Image
            src="/tooltip3.svg"
            fill
            priority
            // sizes="100vw"
            alt="tooltip3"
          ></Image>
        </div>
        <div
          style={{
            position: "relative",
            width: "35vw",
            height: "35vh",
            aspectRatio: "1/1",
            // background: "black",
          }}
        >
          <Image
            src="/tooltip4.svg"
            fill
            priority
            // sizes="100vw"
            alt="tooltip4"
          ></Image>
        </div>
      </div>
    </>
  );
}
