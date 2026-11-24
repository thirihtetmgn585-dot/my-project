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
      {book.status === "unavailable" && book.cover && <img className="search-result-cover" src={book.cover} alt={`${book.title} cover`} />}
      {isSearchResult && search.cover && <img className="search-result-cover" src={search.cover} alt={`${book.title} cover`} />}
      {isSearchResult && <p className="metadata">Author: {search.author ?? "Unknown author"}{search.year ? <><br />First published: {search.year}</> : null}</p>}
      <p className="lead">{book.description}</p>
      {!isSearchResult && <p className="metadata">Original author: {book.originalAuthor}<br />Translator: {book.translator}</p>}
      {book.id === "frankenstein-or-the-modern-prometheus" ? (
        <section className="reader-card">
          <h2>28 chapters available</h2>
          <p className="lead">Read the letters and chapters in the Frankenstein reader.</p>
          <Link className="reader-button" href={`/books/${book.id}/read`}>Open reader →</Link>
        </section>
      ) : book.status === "available" && book.chapters.length > 0 ? (
        <section className="reader-card">
          <h2>Chapters</h2>
          {book.chapters.map((chapter) => (
            <Link className="chapter-link" href={`/books/${book.id}/chapters/${chapter.id}`} key={chapter.id}>{chapter.title}</Link>
          ))}
        </section>
      ) : (
        <section className="notice-card search-info-card">
          <h2>Book information</h2>
          {book.id === "frankenstein-or-the-modern-prometheus" || book.id === "frankenstein" ? (
            <>
              <p>This public-domain edition is available in the Booklish reader.</p>
              <Link className="reader-button" href={`/books/${book.id}/read`}>Open reader →</Link>
            </>
          ) : <p>This title was found through book search. You can read the public-domain edition from the source below.</p>}
          {book.publicDomainUrl && <a className="reader-button" href={book.publicDomainUrl} target="_blank" rel="noreferrer">Read public-domain edition →</a>}
        </section>
      )}
    </main>
  );
}
