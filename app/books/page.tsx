import Link from "next/link";
import GenreCatalog from "./GenreCatalog";
import { books } from "../data/books";

export default function BooksPage() {
  return (
    <main className="reader-shell">
      <Link href="/" className="back-link">← Back to Booklish</Link>
      <p className="eyebrow">BOOKLISH BOOKS</p>
      <h1>Discover books</h1>
      <p className="lead">Choose a book, view its details, and read authorized chapters inside Booklish.</p>
      <GenreCatalog books={books} />
    </main>
  );
}
