"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "../data/books";

export default function GenreCatalog({ books }: { books: Book[] }) {
  const [genre, setGenre] = useState("All");
  const genres = ["All", ...new Set(books.map((book) => book.genre))];
  const visibleBooks = genre === "All" ? books : books.filter((book) => book.genre === genre);

  return (
    <>
      <div className="genre-filter" aria-label="Filter by genre">
        {genres.map((item) => (
          <button type="button" className={genre === item ? "active" : ""} onClick={() => setGenre(item)} key={item}>
            {item}
          </button>
        ))}
      </div>
      <section className="book-grid">
        {visibleBooks.map((book) => (
          <article className="reader-card" key={book.id}>
            <div className="cover-placeholder">{book.genre}</div>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p className="metadata">Author: {book.originalAuthor}<br />Translator: {book.translator}</p>
            <Link className="reader-button" href={`/books/${book.id}`}>
              {book.status === "available" ? "Read now" : "View status"}
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
