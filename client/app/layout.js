import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { openSans, lora } from "./fonts";
import Search from "./searchInput";
import LoginWindow from "./loginWindow";
import { AuthProvider } from "./authContext";
export default function RootLayout({ children, pageProps }) {
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
        <AuthProvider>
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
              <Link href="/dictionary" className="menu_link">
                Словарь
              </Link>
            </div>
            <div className="right_header">
              <Search></Search>
              <LoginWindow></LoginWindow>
            </div>
          </header>

          <div className="content">{children}</div>
          <footer className={openSans.className}>
            <Image
              src="/logo.svg"
              width={86}
              height={76}
              alt="logo"
              className="logo"
            ></Image>
            <div className="vertLine"></div>
            {/* <div className="footerItems">
              <Link href="/">Уровень А1</Link>
              <Link href="/">Уровень А2</Link>
            </div>
            <div className="vertLine2"></div>
            <div className="footerItems">
              <Link href="/">Уровень B1</Link>
              <Link href="/">Уровень B2</Link>
            </div>
            <div className="vertLine2"></div>
            <div className="footerItems">
              <Link href="/">Уровень C1</Link>
              <Link href="/">Уровень C2</Link>
            </div> */}
            <div className="textFooter">
              Unlock the power of reading in English with ReadersCorner.
              Discover new books, enjoy instant translations, and enhance your
              language skills. Don't miss the opportunity to improve your
              English and broaden your horizons. Start your exciting journey
              into the world of knowledge right now!
            </div>
            <div className="vertLine"></div>
            <div className="contacts">
              <div className="footerContacts">
                <Image
                  src="/mail.svg"
                  height={30}
                  width={30}
                  alt="mail"
                ></Image>
                <p>ReadersCorner@gmail.com</p>
              </div>
              <div className="footerContacts">
                <Image
                  src="/call.svg"
                  height={30}
                  width={30}
                  alt="call"
                ></Image>
                <p>+7-951-531-77-55</p>
              </div>
              {/* <div className="footerContacts">
                <Image
                  src="/findUs.svg"
                  height={30}
                  width={30}
                  alt="findUs"
                ></Image>
                <p>Find Us</p>
              </div> */}
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
