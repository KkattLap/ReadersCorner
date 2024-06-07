"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./searchInput.module.css";
const KEYS_TO_FILTERS = ["full_name", "book_name"];

async function getData() {
  const res = await fetch("https://localhost:3000/AuthorsBooks", {
    cache: "no-store",
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setItems(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let res = [];
    let fullName = "";
    let bookName = "";
    let combinedName = "";
    if (query != "")
      res = items.filter((item) => {
        fullName = item.full_name.toLowerCase();
        bookName = item.book_name.toLowerCase();
        combinedName = `${fullName} ${bookName}`;
        return combinedName.includes(query.toLowerCase());
      });
    setResults(res);
  }, [query, items]);

  return (
    <div>
      <div className={styles.headerSearch}>
        <input
          className={styles.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
        />
        <button type="submit" className={styles.buttonSearch}></button>
      </div>
      <div className={styles.searchResult}>
        {results.map((item) => (
          <Link
            className={styles.itemSearch}
            onClick={() => {
              setResults([]);
              setQuery(""); // Очистка строки запроса
            }}
            href={`/books/${item.book_name}`}
            key={item.book_id}
          >
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "24%",
                // background: "black",
                marginRight: "0.5rem",
              }}
            >
              <Image
                src={item.cover}
                fill
                alt="cover"
                objectFit="contain"
              ></Image>
            </div>
            <div>
              <p>{item.full_name}</p>
              <p>{item.book_name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
