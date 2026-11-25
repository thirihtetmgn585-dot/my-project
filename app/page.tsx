"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import VoiceSearch from "./VoiceSearch";

type SearchResult = {
  key: string;
  title: string;
  author_name?: string[];
  localCover?: string;
  cover_i?: number;
  first_publish_year?: number;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedBooks, setSavedBooks] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem("booklish-saved-books");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("booklish-saved-books", JSON.stringify(savedBooks));
  }, [savedBooks]);

  async function searchFromVoice(voiceQuery: string) {
    const cleaned = voiceQuery.trim();
    if (!cleaned) return;
    setQuery(cleaned);
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(cleaned)}`);
      const data = await response.json();
      setResults(data.docs ?? []);
    } catch {
      setResults([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main
      className="home-page"
      style={{
        minHeight: "100vh",
        background: "#f4efe6",
        color: "#241f1a",
        padding: "80px 10%",
        fontFamily: "Georgia, serif",
      }}
    >
      <nav
        className="home-nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "100px",
        }}
      >
        <strong style={{ fontSize: "22px" }}>Booklish</strong>
        <div className="home-links" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a
            href="/create-book"
            style={{
              color: "#8b5e3c",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Create book
          </a>
          <Link
            href="/library"
            style={{ color: "#8b5e3c", textDecoration: "none", fontWeight: "bold" }}
          >
            My library
          </Link>
          <Link
            href="/books"
            style={{
              color: "#8b5e3c",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            All novels
          </Link>
          <a
            href="/about"
            style={{
              color: "#8b5e3c",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            About
          </a>
          <a
            href="/contact"
            style={{
              color: "#8b5e3c",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Contact
          </a>{" "}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button type="button" style={{ border: "none", background: "transparent", color: "#8b5e3c", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}>
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button type="button" style={{ border: "none", borderRadius: "999px", padding: "10px 16px", background: "#8b5e3c", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}>
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>

      <p style={{ color: "#8b5e3c", letterSpacing: "3px" }}>BOOKLISH</p>
      <h1 className="home-title" style={{ fontSize: "64px", maxWidth: "700px" }}>
        Your books, brought to life.
      </h1>
      <p className="home-lead" style={{ fontSize: "20px", maxWidth: "560px", lineHeight: 1.6 }}>
        Explore stories, discover ideas, and build a deeper connection with
        every book you read.
      </p>
      <div
        className="home-search"
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "28px",
          maxWidth: "560px",
        }}
      >
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={{
            flex: 1,
            padding: "14px 18px",
            border: "1px solid #d8cbbb",
            borderRadius: "999px",
            fontSize: "16px",
            background: "#fffaf2",
          }}
        />

        <button
          disabled={isLoading}
          type="button"
          onClick={async () => {
            setIsLoading(true);
            setError("");

            try {
              const response = await fetch(
                `/api/search?q=${encodeURIComponent(query)}`,
              );

              if (!response.ok) {
                throw new Error("Search request failed");
              }

              const data = await response.json();
              setResults(data.docs ?? []);
            } catch {
              setResults([]);
              setError("Something went wrong. Please try again.");
            }

            setIsLoading(false);
          }}
          style={{
            padding: "14px 22px",
            border: "none",
            borderRadius: "999px",
            background: "#3f5c55",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      <VoiceSearch onSearch={searchFromVoice} />
      {query && (
        <p style={{ marginTop: "16px", color: "#3f5c55" }}>
          Searching for: {query}
        </p>
      )}
      {isLoading && (
        <p style={{ marginTop: "16px", color: "#3f5c55" }}>
          Searching for books...
        </p>
      )}
      {error && (
        <p style={{ marginTop: "16px", color: "#a33a2b" }}>{error}</p>
      )}
      {!isLoading && query && results.length === 0 && (
        <p style={{ marginTop: "16px", color: "#8b5e3c" }}>
          No books found. Try another title.
        </p>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginTop: "24px",
          maxWidth: "900px",
        }}
      >
        {results.map((book, index) => (
          <article
            key={`${book.key}-${index}`}
            style={{
              padding: "16px",
              borderRadius: "16px",
              background: "#fffaf2",
              boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
            }}
          >
      {book.localCover || book.cover_i ? (
              <img
          src={
            book.localCover ??
            `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          }
                alt={book.title}
                onError={(event) => {
                  const fallback = book.title?.toLowerCase().includes("frankenstein")
                    ? "https://covers.openlibrary.org/b/isbn/0486282112-M.jpg"
                    : "";
                  if (fallback && event.currentTarget.src !== fallback) {
                    event.currentTarget.src = fallback;
                  } else {
                    event.currentTarget.style.display = "none";
                  }
                }}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  height: "220px",
                  borderRadius: "10px",
                  background: "#d8cbbb",
                }}
              />
            )}

            <h3>{book.title}</h3>

            <button
              type="button"
              onClick={() => {
                setSavedBooks((current) =>
                  current.includes(book.title)
                    ? current.filter((title) => title !== book.title)
                    : [...current, book.title],
                );
              }}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                border: "1px solid #8b5e3c",
                borderRadius: "999px",
                background: "transparent",
                color: "#8b5e3c",
                cursor: "pointer",
              }}
            >
              {savedBooks.includes(book.title) ? "Saved ✓" : "Save book"}
            </button>

            <p>{book.author_name?.[0] ?? "Unknown author"}</p>

            {book.first_publish_year && (
              <small>First published: {book.first_publish_year}</small>
            )}
            <a
              href={`/books/${book.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}?cover=${encodeURIComponent(book.localCover ?? (book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : ""))}&author=${encodeURIComponent(book.author_name?.[0] ?? "Unknown author")}&year=${encodeURIComponent(book.first_publish_year ?? "")}`}
              style={{
                display: "inline-block",
                marginTop: "12px",
                color: "#8b5e3c",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Open reader →
            </a>
          </article>
        ))}
      </div>
      {savedBooks.length > 0 && (
        <section
          style={{
            maxWidth: "900px",
            marginTop: "40px",
            padding: "24px",
            borderRadius: "16px",
            background: "#fffaf2",
            boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
          }}
        >
          <h2>Saved books</h2>
          <ul>
            {savedBooks.map((title) => (
              <li key={title} style={{ marginBottom: "8px" }}>
                <a
                  href={`/books/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                  style={{ color: "#8b5e3c", fontWeight: "bold", textDecoration: "none" }}
                >
                  {title}
                </a>
                <button
                  type="button"
                  onClick={() => setSavedBooks((current) => current.filter((item) => item !== title))}
                  style={{
                    marginLeft: "12px",
                    border: "none",
                    background: "transparent",
                    color: "#a33a2b",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
      <a
        href="#books"
        style={{
          display: "inline-block",
          marginTop: "24px",
          padding: "14px 24px",
          borderRadius: "999px",
          background: "#8b5e3c",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "none",
          transition: "background 0.2s ease",
          boxShadow: "0 6px 14px rgba(80, 50, 20, 0.18)",
        }}
      >
        Explore books
      </a>
      <section id="books" style={{ marginTop: "100px" }}>
        <h2 style={{ fontSize: "36px" }}>Featured books</h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <article
            style={{
              width: "220px",
              flex: "1 1 220px",
              padding: "24px",
              borderRadius: "16px",
              background: "#fffaf2",
              boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
            }}
          >
            <img
              src="/alice-cover.jpg"
              alt="Alice's Adventures in Wonderland book cover"
              style={{
                width: "100%",
                height: "270px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "18px",
              }}
            />
            <h3>Alice&apos;s Adventures in Wonderland</h3>
            <p>A public-domain adventure available to read in Booklish.</p>
            <Link
              href="/books/alice-s-adventures-in-wonderland"
              style={{
                color: "#8b5e3c",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              View book →
            </Link>
          </article>

          <article
            style={{
              width: "220px",
              flex: "1 1 220px",
              padding: "24px",
              borderRadius: "16px",
              background: "#3f5c55",
              boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
            }}
          >
            <img
              src="/oz-cover.jpg"
              alt="The Wonderful Wizard of Oz book cover"
              style={{
                width: "100%",
                height: "270px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "18px",
              }}
            />
            <h3>The Wonderful Wizard of Oz</h3>
            <p>All 24 chapters are available to read in Booklish.</p>
            <Link
              href="/books/the-wonderful-wizard-of-oz"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              View book →
            </Link>
          </article>

          <article
            style={{
              width: "220px",
              flex: "1 1 220px",
              padding: "24px",
              borderRadius: "16px",
              background: "#c28b5a",
              boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
            }}
          >
            <img
              src="https://covers.openlibrary.org/b/isbn/0486282112-M.jpg"
              alt="Frankenstein book cover"
              style={{
                width: "100%",
                height: "270px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "18px",
              }}
            />
            <h3>Frankenstein; or, The Modern Prometheus</h3>
            <p>A public-domain classic with chapters available in Booklish.</p>
            <Link
              href="/books/frankenstein-or-the-modern-prometheus"
              style={{
                color: "#241f1a",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              View book →
            </Link>
          </article>
        </div>
      </section>
      <section id="about" style={{ marginTop: "100px" }}>
        <h2 style={{ fontSize: "36px" }}>About Booklish</h2>
        <p style={{ maxWidth: "600px", lineHeight: 1.6 }}>
          Booklish is a calm space for discovering meaningful books and building
          a lasting reading habit.
        </p>
      </section>

      <section
        style={{
          marginTop: "100px",
          padding: "40px",
          borderRadius: "20px",
          background: "#3f5c55",
          color: "white",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "28px", fontStyle: "italic" }}>
          “A reader lives a thousand lives before he dies.”
        </p>
        <small>— George R. R. Martin</small>
      </section>
      <footer
        style={{
          marginTop: "80px",
          paddingTop: "24px",
          borderTop: "1px solid #d8cbbb",
          color: "#8b5e3c",
          fontSize: "14px",
        }}
      >
        © 2026 Booklish. Made for people who love books.
      </footer>
    </main>
  );
}
