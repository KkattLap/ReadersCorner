"use client";
import { ReactReader } from "react-reader";
import React, { useState, useEffect, useRef } from "react";
import ReadHead from "./readHead";
// import { Tooltip } from "react-tooltip";
import styles from "./read.module.css";
import { AuthContext } from "@/app/authContext";
import { useContext } from "react";

export default function Read({ bookText }) {
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(undefined);
  const [location, setLocation] = useState(0);
  const [selections, setSelections] = useState([]);
  // Позволяет "вешать" события внутри ReactReader
  // useState<Rendition | undefined>(undefined)
  const [renditionSelect, setRenditionSelect] = useState(undefined);
  const rendition = useRef(undefined);
  const [translatedText, setTranslatedText] = useState([]);
  const [largeText, setLargeText] = useState(false);
  const [iconStates, setIconStates] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getData();
  //       setUserId(response.user_id);
  //       console.log(userId, user);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [user]);
  async function getData(id, startState) {
    const response = await fetch("http://localhost:3000/AddDictionary", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.user_id,
        text: selections[id].text,
        translatedText: translatedText[id].textTranslate,
      }),
    });

    if (response.ok) {
      console.log("Data sent successfully");
      const message = await response.json();

      console.log(message);
      return message.id;
      // if (startState === 1) {
      //   setIconStates((prevStates) => {
      //     // Переключаем состояние иконки
      //     // const newState = prevStates[id].state === "add" ? "check" : "add";
      //     return {
      //       ...prevStates,
      //       [id]: { state: newState, addDictionary: message.id },
      //     };
      //   });
      // } else if (startState === 0) {
      //   setIconStates((prevStates) => {
      //     // Переключаем состояние иконки
      //     return {
      //       ...prevStates,
      //       [id]: { state: "add", addDictionary: false },
      //     };
      //   });
      // }
    } else {
      console.error("Error sending data");
    }
  }
  const handleIconClick = async (id) => {
    console.log(iconStates);
    if (iconStates[id] === undefined) {
      const dicId = await getData(id);
      setIconStates((prevStates) => {
        // Переключаем состояние иконки
        return {
          ...prevStates,
          [id]: { state: "check", addDictionary: dicId },
        };
      });
    }
    // console.log(iconStates, iconStates[id]);
    else if (iconStates[id].state === "add") {
      console.log("checked");
      const dicId = await getData(id);
      setIconStates((prevStates) => {
        // Переключаем состояние иконки
        return {
          ...prevStates,
          [id]: { state: "check", addDictionary: dicId },
        };
      });
      // Добавить в словарь пользователя
      // const response = await fetch("http://localhost:3000/AddDictionary", {
      //   method: "POST",
      //   cache: "no-store",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     userId: user.user_id,
      //     text: selections[id].text,
      //     translatedText: translatedText[id].textTranslate,
      //   }),
      // });

      // if (response.ok) {
      //   console.log("Data sent successfully");
      //   const message = await response.json();

      //   console.log(message);
      //   setIconStates((prevStates) => {
      //     // Переключаем состояние иконки
      //     const newState = prevStates[id] === "add" ? "check" : "add";
      //     return {
      //       ...prevStates,
      //       [id]: { state: newState, addDictionary: message.id },
      //     };
      //   });
      // } else {
      //   console.error("Error sending data");
      // }
    } else if (iconStates[id].state === "check") {
      console.log("added");
      // Удалить из словаря пользователя

      const response = await fetch("http://localhost:3000/DeleteDictionary", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dictionaryId: iconStates[id].addDictionary,
        }),
      });
      if (response.ok) {
        console.log("Data sent successfully");
        const message = await response.json();
        console.log(message);
      } else {
        console.error("Error sending data");
      }

      setIconStates((prevStates) => {
        // Переключаем состояние иконки
        return { ...prevStates, [id]: { state: "add", addDictionary: false } };
      });
    }
  };
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
  const showIcon = (i) => {
    if (iconStates[i]) {
      if (iconStates[i].state === "add") {
        return "add";
      } else if (iconStates[i].state === "check") {
        return "check";
      }
    } else {
      return "add";
    }
  };
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
          <div className={styles.options}>
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
            {/* {setIconStates((prevStates) => {
              return {
                ...prevStates,
                [i]: { state: "add", addDictionary: false },
              };
            })} */}
            <span
              id={i}
              onClick={() => handleIconClick(i)}
              className={`material-symbols-outlined ${styles.add}`}
            >
              {/* {iconStates[i] ? (
                iconStates[i].state ? (
                  iconStates[i].state === "check" && (
                    <span className="material-symbols-outlined">check</span>
                  )
                ) : (
                  iconStates[i].state === "add" && (
                    <span className="material-symbols-outlined">add</span>
                  )
                )
              ) : (
                <span className="material-symbols-outlined">add</span>
              )} */}
              {showIcon(i) === "add" ? (
                <span className="material-symbols-outlined">add</span>
              ) : (
                <span className="material-symbols-outlined">check</span>
              )}
            </span>
          </div>
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
          // URL="https://react-reader.metabits.no/files/alice.epub"
          location={location}
          // locationChanged={(epubcfi) => setLocation(epubcfi)}
          locationChanged={(loc) => setLocation(loc)}
          // epubInitOptions={{
          //   openAs: "epub",
          // }}
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
