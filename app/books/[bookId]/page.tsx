import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "../../data/books";


export default async function BookDetailsPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const book = getBook(bookId);
  if (!book) notFound();

  return (
    <main className="reader-shell">
      <Link href="/books" className="back-link">← All novels</Link>
      <p className="eyebrow">BOOK DETAILS</p>
      <h1>{book.title}</h1>
      <p className="lead">{book.description}</p>
      <p className="metadata">Original author: {book.originalAuthor}<br />Translator: {book.translator}</p>
      {book.status === "available" && book.chapters.length > 0 ? (
        <section className="reader-card">
          <h2>Chapters</h2>
          {book.chapters.map((chapter) => (
            <Link className="chapter-link" href={`/books/${book.id}/chapters/${chapter.id}`} key={chapter.id}>{chapter.title}</Link>
          ))}
        </section>
      ) : (
        <section className="notice-card">
          <h2>Reading text unavailable</h2>
          <p>No authorized full chapter text has been added for this title yet. Add licensed or public-domain text before publishing it.</p>
        </section>
      )}
    </main>
  );
}
