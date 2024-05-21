"use client";
import BookCard from "../bookCard";
import { SAMPLE_DATA } from "../data";
import styles from "./page.module.css";
import { lora } from "../fonts";
import { useState, useEffect } from "react";

async function getData() {
  const res = await fetch("http://localhost:3000/AuthorsBooks", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  const data = res.json();
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default function Books() {
  // const result = await getData();
  const [items, setItems] = useState([]);

  const [filters, setFilters] = useState({
    a1: false,
    a2: false,
    b1: false,
    b2: false,
    c1: false,
    c2: false,
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFilters({
      ...filters,
      [id]: checked,
    });
  };

  // Function to filter catalog data based on selected checkboxes
  const filterCatalog = () => {
    return items.filter((item) => {
      if (
        (filters.a1 && item.level_en == "А1") ||
        (filters.a2 && item.level_en == "А2") ||
        (filters.b1 && item.level_en == "В1") ||
        (filters.b2 && item.level_en == "В2") ||
        (filters.c1 && item.level_en == "С1") ||
        (filters.c2 && item.level_en == "С2")
      ) {
        // console.log(filters);
        return true;
      } else {
        return false;
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setItems(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // Apply filter
  let filteredData = [];
  if (
    filters.a1 == false &&
    filters.a2 == false &&
    filters.b1 == false &&
    filters.b2 == false &&
    filters.c1 == false &&
    filters.c2 == false
  ) {
    filteredData = items;
  } else {
    filteredData = filterCatalog();
  }
  // console.log(filteredData);
  return (
    <>
      <div className={`${styles.chooseLevel} ${lora.className}`}>
        <p className={styles.headLevel}> Уровень знания английского языка:</p>
        <div className={styles.levels}>
          <input
            type="checkbox"
            id="a1"
            onChange={handleCheckboxChange}
            checked={filters.a1}
            className={styles.checkbox}
          />
          <label htmlFor="a1" className={styles.level}>
            A1
          </label>
          <input
            onChange={handleCheckboxChange}
            checked={filters.a2}
            type="checkbox"
            id="a2"
            className={styles.checkbox}
          />
          <label htmlFor="a2" className={styles.level}>
            A2
          </label>
          <input
            onChange={handleCheckboxChange}
            checked={filters.b1}
            type="checkbox"
            id="b1"
            className={styles.checkbox}
          />
          <label htmlFor="b1" className={styles.level}>
            B1
          </label>
          <input
            onChange={handleCheckboxChange}
            checked={filters.b2}
            type="checkbox"
            id="b2"
            className={styles.checkbox}
          />
          <label htmlFor="b2" className={styles.level}>
            B2
          </label>
          <input
            onChange={handleCheckboxChange}
            checked={filters.c1}
            type="checkbox"
            id="c1"
            className={styles.checkbox}
          />
          <label htmlFor="c1" className={styles.level}>
            C1
          </label>
          <input
            onChange={handleCheckboxChange}
            checked={filters.c2}
            type="checkbox"
            id="c2"
            className={styles.checkbox}
          />
          <label htmlFor="c2" className={styles.level}>
            C2
          </label>
        </div>
      </div>
      <div className={styles.catalog}>
        {/* {SAMPLE_DATA.map((item) => (
          <BookCard
            key={item.id}
            cover={item.cover}
            name={item.name}
            author={item.author}
          ></BookCard>
        ))} */}
        {filteredData.map((item) => (
          <BookCard
            key={item.book_id}
            cover={item.cover}
            name={item.book_name}
            author={item.full_name}
          ></BookCard>
        ))}
      </div>
    </>
  );
}
