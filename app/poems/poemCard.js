import Image from "next/image";
import styles from "./poemCard.module.css";
import { SAMPLE_POEMS } from "../data";
import { lora } from "../fonts";
import Link from "next/link";
export default function PoemCard() {
  return (
    <>
      <Link href="/poems/poemRead" className={styles.linkCard}>
        <div className={`${styles.poemCard} ${lora.className}`}>
          <div className={styles.portrait}>
            <Image src={SAMPLE_POEMS[0].cover} fill alt="portrait"></Image>
          </div>
          <div className={styles.infPoem}>
            <div className={styles.authorName}>{SAMPLE_POEMS[0].author}</div>
            <div>{SAMPLE_POEMS[0].name}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
