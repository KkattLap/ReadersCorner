import Image from "next/image";
import styles from "./poemCard.module.css";
// import { SAMPLE_POEMS } from "../data";
import { lora } from "../fonts";
import Link from "next/link";
export default function PoemCard({ author, poem, cover }) {
  return (
    <>
      <Link href="/poems/poemRead" className={styles.linkCard}>
        <div className={`${styles.poemCard} ${lora.className}`}>
          <div className={styles.portrait}>
            <Image src={cover} fill alt="portrait" objectFit="cover"></Image>
          </div>
          <div className={styles.infPoem}>
            <div className={styles.authorName}>{author}</div>
            <div>{poem}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
