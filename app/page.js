import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Tooltips from "./tooltips";
import Recommendations from "./recommendations";
export default function Home() {
  return (
    <>
      {/* Первый экран */}
      <div className={styles.main_motivation}>
        <div className={styles.motivation_text}>
          <p
            style={{
              fontSize: "3.5rem",
              // textAlign: "left",
              fontFamily: "Lora",
              // fontWeight: "bolder",
            }}
          >
            Изучай английский язык без труда
          </p>
          <p
            style={{
              fontSize: "1rem",
              // textAlign: "left",
              fontFamily: "Lora",
              // width: "30vw",
            }}
          >
            Параллельный перевод - твой ключ к успеху в мире знаний. Теперь вы
            можете наслаждаться любимыми книгами на английском языке,
            одновременно получая перевод незнакомых слов и выражений. Не
            упустите возможность улучшить свой английский язык и расширить
            кругозор. Начните свое увлекательное путешествие в мир знаний прямо
            сейчас!
          </p>
          <div style={{ height: "1rem" }}></div>
          <div>
            {/* <button className={styles.big_button}> */}
            <Link className={styles.big_button} href="/books">
              к выбору книг
              <Image
                src="/arrow.svg"
                width={62}
                height={16}
                alt="arrow"
                style={{
                  marginLeft: "2rem",
                }}
              ></Image>
            </Link>
            {/* </button> */}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            width: "50vw",
            height: "90vh",
            marginRight: "5vw",
            // maxWidth: "960px",
            //Отношение ширины к высоте для автоматического подсчета высоты
            aspectRatio: "1/1",
            // background: "red",
          }}
        >
          <Image
            src="/main_motivation.svg"
            // width={960}
            // height={952}
            fill
            priority
            alt="main_motivation"
          ></Image>
        </div>
      </div>
      <Tooltips></Tooltips>
      <Recommendations></Recommendations>
    </>
  );
}
