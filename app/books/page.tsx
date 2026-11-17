import Link from "next/link";
import { books } from "../data/books";
import GenreCatalog from "./GenreCatalog";


export default function BooksPage() {
  return (
    <main className="reader-shell">
      <Link href="/" className="back-link">← Back to Booklish</Link>
      <p className="eyebrow">BOOKLISH READER</p>
      <h1>Myanmar-translated novels</h1>
      <p className="lead">Browse verified books and read authorized chapters inside Booklish.</p>
      <GenreCatalog books={books} />
    </main>
  );
}
