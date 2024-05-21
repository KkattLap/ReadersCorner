"use client";
import { ReactReader } from "react-reader";
import React, { useState, useEffect, useRef } from "react";
import ReadHead from "./readHead";
// import { Tooltip } from "react-tooltip";
import styles from "./read.module.css";

// const translate = require("google-translate-api");

export default function Read({ bookText }) {
  const [location, setLocation] = useState(0);
  const [selections, setSelections] = useState([]);
  // Позволяет "вешать" события внутри ReactReader
  // useState<Rendition | undefined>(undefined)
  const [renditionSelect, setRenditionSelect] = useState(undefined);
  const rendition = useRef(undefined);
  const [translatedText, setTranslatedText] = useState([]);
  const [largeText, setLargeText] = useState(false);
  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? "140%" : "100%");
  }, [largeText]);

  // const [tooltipText, setTooltipText] = useState("");
  // const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  // const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // устанавливает обработчик события `selected` для `rendition`
  useEffect(() => {
    if (renditionSelect) {
      // setRenderSelection(cfiRange: string, contents: Contents)
      function setRenderSelection(cfiRange, contents) {
        // Если пользователь что-то выделил
        if (renditionSelect) {
          setSelections((list) =>
            list.concat({
              text: renditionSelect.getRange(cfiRange).toString(),
              cfiRange,
            })
          );
          // Выделить красным цветом выделенный текст
          renditionSelect.annotations.add(
            "highlight",
            cfiRange,
            {},
            undefined,
            "hl",
            { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
          );
          // setIsTooltipVisible(true);
          // setTooltipText(rendition.getRange(cfiRange).toString());
          const selectedText = renditionSelect.getRange(cfiRange).toString();
          const range = renditionSelect
            .getRange(cfiRange)
            .getBoundingClientRect();
          // pageXOffset и pageYOffset - верхний левый угол ReactReader
          const x = range.left + contents.window.pageXOffset + 50;
          const y = range.top + contents.window.pageYOffset + 16;
          // Получение перевода выделенного текста
          (async () => {
            try {
              const response = await fetch("http://localhost:3000/translate", {
                cache: "no-store",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: selectedText }),
              });

              if (response.ok) {
                const data = await response.json();
                setTranslatedText((list) =>
                  list.concat({
                    textTranslate: data.translatedText,
                    cfiRange,
                  })
                );
              } else {
                console.error("Failed to translate text");
              }
            } catch (error) {
              console.error("Error translating text:", error);
            }
          })();

          // setTooltipPosition({ x, y });

          const selection = contents.window.getSelection();
          // Удаление выделенного текста
          selection?.removeAllRanges();
        }
      }
      // Срабатывает при выделении текста внутри ReactReader
      renditionSelect.on("selected", setRenderSelection);
      return () => {
        renditionSelect?.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, setTranslatedText, renditionSelect]);

  return (
    <>
      <ReadHead changeFontSize={() => setLargeText(!largeText)}></ReadHead>
      {/* <button onClick={() => setLargeText(!largeText)} className="btn">
        Toggle font-size
      </button> */}

      {selections.map(({ text, cfiRange }, i) => (
        <li key={i} className={styles.item}>
          <span>{text}</span>
          {translatedText.length > i && translatedText[i] ? (
            <div className={styles.translate}>
              Перевод: {translatedText[i].textTranslate}
            </div>
          ) : (
            <div className={styles.translate}>
              Ожидание получения перевода...
            </div>
          )}
          <button
            className={styles.showButton}
            onClick={() => {
              renditionSelect?.display(cfiRange);
            }}
          >
            Show
          </button>

          <button
            className={styles.removeButton}
            onClick={() => {
              renditionSelect?.annotations.remove(cfiRange, "highlight");
              setSelections(selections.filter((item, j) => j !== i));
            }}
          >
            Remove
          </button>
        </li>
      ))}

      <div
        id="read"
        style={{
          height: "100vh",
          position: "relative",
        }}
      >
        {/* {isTooltipVisible && (
          <div
            style={{
              position: "absolute",
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              // top: "5px",
              // left: "5px",
              backgroundColor: "white",
              padding: "5px",
              border: "1px solid black",
              zIndex: 9999,
            }}
          >
            {tooltipText}
          </div>
        )} */}

        <ReactReader
          url={bookText}
          // url="https://raw.githubusercontent.com/KkattLap/epubBooks/main/A_Son_of_the_Sun.epub"
          location={location}
          // locationChanged={(epubcfi) => setLocation(epubcfi)}
          locationChanged={(loc) => setLocation(loc)}
          epubInitOptions={{
            openAs: "epub",
          }}
          epubOptions={{
            allowPopups: true, // Adds `allow-popups` to sandbox-attribute
            allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
          }}
          getRendition={(_rendition) => {
            setRenditionSelect(_rendition);
            rendition.current = _rendition;
            _rendition.hooks.content.register((contents) => {
              const body = contents.window.document.querySelector("body");
              if (body) {
                body.oncontextmenu = () => {
                  return false;
                };
              }
            });
            rendition.current.themes.fontSize(largeText ? "140%" : "100%");
          }}
        ></ReactReader>
        {/* {selectedText && <Tooltip></Tooltip>} */}
      </div>
    </>
  );
}
