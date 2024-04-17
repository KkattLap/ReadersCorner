"use client";
import { ReactReader } from "react-reader";
import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import ReactTooltip from "./tooltip";
import styles from "./read.module.css";

export default function Read({ bookText }) {
  const [location, setLocation] = useState(0);
  const [selections, setSelections] = useState([]);
  // Позволяет "вешать" события внутри ReactReader
  // useState<Rendition | undefined>(undefined)
  const [rendition, setRendition] = useState(undefined);

  // const [tooltipText, setTooltipText] = useState("");
  // const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  // const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // устанавливает обработчик события `selected` для `rendition`
  useEffect(() => {
    if (rendition) {
      // setRenderSelection(cfiRange: string, contents: Contents)
      function setRenderSelection(cfiRange, contents) {
        if (rendition) {
          setSelections((list) =>
            list.concat({
              text: rendition.getRange(cfiRange).toString(),
              cfiRange,
            })
          );

          rendition.annotations.add(
            "highlight",
            cfiRange,
            {},
            undefined,
            "hl",
            { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
          );
          // setIsTooltipVisible(true);
          // setTooltipText(rendition.getRange(cfiRange).toString());
          const selectedText = rendition.getRange(cfiRange).toString();
          const range = rendition.getRange(cfiRange).getBoundingClientRect();
          // pageXOffset и pageYOffset - верхний левый угол ReactReader
          const x = range.left + contents.window.pageXOffset + 50;
          const y = range.top + contents.window.pageYOffset + 16;

          // setTooltipPosition({ x, y });

          const selection = contents.window.getSelection();
          // Удаление выделенного текста
          selection?.removeAllRanges();
        }
      }
      // rendition.on("rendered", (e, i) => {
      //   i.document.documentElement.addEventListener(
      //     "click",
      //     (cfiRange, contents) => {
      //       // console.log("hey");
      //       setIsTooltipVisible(false);
      //     }
      //   );
      // });
      rendition.on("selected", setRenderSelection);
      return () => {
        rendition?.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, rendition]);

  return (
    <>
      <div>Selections </div>
      {selections.map(({ text, cfiRange }, i) => (
        <li key={i} className="p-2">
          <span>{text}</span>
          <button
            onClick={() => {
              rendition?.display(cfiRange);
            }}
          >
            Show
          </button>

          <button
            onClick={() => {
              rendition?.annotations.remove(cfiRange, "highlight");
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
          // id="reader"

          url="https://raw.githubusercontent.com/KkattLap/epubBooks/main/alice.epub"
          location={location}
          locationChanged={(epubcfi) => setLocation(epubcfi)}
          epubInitOptions={{
            openAs: "epub",
          }}
          epubOptions={{
            allowPopups: true, // Adds `allow-popups` to sandbox-attribute
            allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
          }}
          getRendition={(_rendition) => {
            setRendition(_rendition);
          }}
        ></ReactReader>
        {/* {selectedText && <Tooltip></Tooltip>} */}
      </div>
    </>
  );
}
