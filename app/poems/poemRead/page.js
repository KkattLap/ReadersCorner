import { SAMPLE_POEMS } from "@/app/data";
import { lora, openSans } from "@/app/fonts";
import styles from "./page.module.css";
export default function PoemRead() {
  return (
    <>
      <div className={styles.poemRead}>
        <div className={styles.poemRU}>
          <div className={`${lora.className} ${styles.headPoem}`}>
            <div>{SAMPLE_POEMS[0].author}</div>
            <div>{SAMPLE_POEMS[0].name}</div>
          </div>
          <div className={`${lora.className}`}>
            <pre className={`${lora.className}`}>{SAMPLE_POEMS[0].text}</pre>
          </div>
        </div>
        <div className={styles.poemEN}>
          <div className={`${lora.className} ${styles.headPoem}`}>
            <div>{SAMPLE_POEMS[0].authorEN}</div>
            <div>{SAMPLE_POEMS[0].nameEN}</div>
          </div>
          <div className={`${lora.className}`}>
            <pre className={`${lora.className}`}>{SAMPLE_POEMS[0].textEN}</pre>
          </div>
        </div>
        <div className={styles.poemEN}>
          <div className={`${lora.className} ${styles.headPoem}`}>
            <div>{SAMPLE_POEMS[0].authorEN}</div>
            <div>{SAMPLE_POEMS[0].nameEN}</div>
          </div>
          <div className={`${lora.className}`}>
            <pre className={`${lora.className}`}>{SAMPLE_POEMS[0].textEN}</pre>
          </div>
        </div>
        <div className={styles.poemEN}>
          <div className={`${lora.className} ${styles.headPoem}`}>
            <div>{SAMPLE_POEMS[0].authorEN}</div>
            <div>{SAMPLE_POEMS[0].nameEN}</div>
          </div>
          <div className={`${lora.className}`}>
            <pre className={`${lora.className}`}>{SAMPLE_POEMS[0].textEN}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
