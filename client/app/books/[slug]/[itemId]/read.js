"use client";
import { ReactReader } from "react-reader";

import React, { useState, useEffect, useRef } from "react";
export default function Read({ bookText }) {
  // const viewerRef = useRef(null);

  const [location, setLocation] = useState(0);
  // console.log(bookText);
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url="https://raw.githubusercontent.com/KkattLap/epubBooks/main/alice.epub"
        // url="https://drive.google.com/uc?export=download&id=1_5aa07crAfTa-RHRuFF9TTzBGAUYRurz"
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        epubInitOptions={{
          openAs: "epub",
        }}
      />
    </div>
  );
}
