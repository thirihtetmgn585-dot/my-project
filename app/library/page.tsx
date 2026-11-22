import { auth } from "@clerk/nextjs/server";
import { connection } from "next/server";
import Link from "next/link";
import { mongoClient } from "../../lib/mongodb";

export default async function LibraryPage() {
  await connection();
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="reader-shell">
        <Link href="/" className="back-link">← Back to Booklish</Link>
        <p className="eyebrow">BOOKLISH LIBRARY</p>
        <h1>My library</h1>
        <section className="notice-card">
          <h2>Sign in to view your library</h2>
          <p>Your saved books are private to your Booklish account.</p>
        </section>
      </main>
    );
  }

  const books = await mongoClient
    .db("booklish")
    .collection("books")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <main className="reader-shell">
      <Link href="/" className="back-link">← Back to Booklish</Link>
      <p className="eyebrow">BOOKLISH LIBRARY</p>
      <h1>My library</h1>
      <p className="lead">Books saved to your private Booklish collection.</p>

      {books.length === 0 ? (
        <section className="notice-card">
          <h2>Your library is empty</h2>
          <p>Create a book to see it appear here.</p>
          <Link href="/create-book" className="reader-button">Create a book</Link>
        </section>
      ) : (
        <section className="book-grid">
          {books.map((book) => (
            <Link className="reader-card" key={book._id.toString()} href={`/library/${book._id.toString()}`}>
              {book.coverUrl ? (
                <img className="library-cover" src={String(book.coverUrl)} alt={`${book.title} cover`} />
              ) : (
                <div className="cover-placeholder">{String(book.genre || "Book")}</div>
              )}
              <p className="availability available">Saved in your library</p>
              <h2>{String(book.title)}</h2>
              <p className="metadata">Author: {String(book.author)}<br />Genre: {String(book.genre || "Uncategorized")}</p>
              <p>{String(book.description)}</p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
