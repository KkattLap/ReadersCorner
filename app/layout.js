import { headers } from "next/headers";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { openSans, lora } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ReadersCorner</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//fonts.googleapis.com/css?family=Lora"
        />
      </head>
      <body>
        <header className={openSans.className}>
          <div className="menu">
            <Link href="/" className="menu_link">
              <Image
                src="/logo.svg"
                width={86}
                height={76}
                alt="logo"
                className="logo"
              ></Image>
            </Link>
            <Link href="/books" className="menu_link">
              Книги
            </Link>
            <Link href="/poems" className="menu_link">
              Стихотворения
            </Link>
            <Link href="/authors" className="menu_link">
              Авторы
            </Link>
          </div>
          <div>
            <form action="" method="get" className="headerSearch">
              <input placeholder="Поиск" type="text" />
              <button type="submit"></button>
            </form>
          </div>
        </header>
        <div className="content">{children}</div>
        <footer className={openSans.className}>
          <div className="footerItems">
            <Link href="/">Уровень А1</Link>
            <Link href="/">Уровень А2</Link>
          </div>
          <div className="footerItems">
            <Link href="/">Уровень B1</Link>
            <Link href="/">Уровень B2</Link>
          </div>
          <div className="footerItems">
            <Link href="/">Уровень C1</Link>
            <Link href="/">Уровень C2</Link>
          </div>
          <div className="contacts">
            <div className="footerContacts">
              <Image src="/mail.svg" height={30} width={30} alt="mail"></Image>
              <p>Mail</p>
            </div>
            <div className="footerContacts">
              <Image src="/call.svg" height={30} width={30} alt="call"></Image>
              <p>Call</p>
            </div>
            <div className="footerContacts">
              <Image
                src="/findUs.svg"
                height={30}
                width={30}
                alt="findUs"
              ></Image>
              <p>Find Us</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
