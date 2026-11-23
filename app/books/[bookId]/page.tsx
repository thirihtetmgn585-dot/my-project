import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "../../data/books";

export const instant = false;

export default async function BookDetailsPage({ params, searchParams }: { params: Promise<{ bookId: string }>; searchParams: Promise<{ cover?: string; author?: string; year?: string }> }) {
  const { bookId } = await params;
  const search = await searchParams;
  const book = getBook(bookId);
  if (!book) notFound();
  const isSearchResult = book.status === "unavailable" && Boolean(search.author || search.cover);

  return (
    <main className="reader-shell">
      <Link href="/books" className="back-link">← All novels</Link>
      <p className="eyebrow">BOOK DETAILS</p>
      <h1>{book.title}</h1>
      {isSearchResult && search.cover && <img className="search-result-cover" src={search.cover} alt={`${book.title} cover`} />}
      {isSearchResult && <p className="metadata">Author: {search.author ?? "Unknown author"}{search.year ? <><br />First published: {search.year}</> : null}</p>}
      <p className="lead">{book.description}</p>
      {!isSearchResult && <p className="metadata">Original author: {book.originalAuthor}<br />Translator: {book.translator}</p>}
      {book.status === "available" && book.chapters.length > 0 ? (
        <section className="reader-card">
          <h2>Chapters</h2>
          {book.chapters.map((chapter) => (
            <Link className="chapter-link" href={`/books/${book.id}/chapters/${chapter.id}`} key={chapter.id}>{chapter.title}</Link>
          ))}
        </section>
      ) : (
        <section className="notice-card search-info-card">
          <h2>Book information</h2>
          <p>This title was found through book search. Add authorized or public-domain chapters to make it available for reading in Booklish.</p>
        </section>
      )}
    </main>
  );
}
