import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "../../../../data/books";
import ReaderControls from "../../../ReaderControls";


export default async function ChapterPage({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
  const { bookId, chapterId } = await params;
  const book = getBook(bookId);
  const chapterIndex = book?.chapters.findIndex((item) => item.id === chapterId) ?? -1;
  const chapter = chapterIndex >= 0 ? book?.chapters[chapterIndex] : undefined;
  if (!book || !chapter) notFound();

  const previousChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : undefined;
  const nextChapter = chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : undefined;

  return (
    <main className="reader-shell reading-view">
      <ReaderControls>
      <Link href={`/books/${book.id}`} className="back-link">← Back to chapters</Link>
      <p className="eyebrow">{book.title}</p>
      <h1>{chapter.title}</h1>
      <nav className="chapter-navigation" aria-label="Chapter navigation">
        {previousChapter ? (
          <Link href={`/books/${book.id}/chapters/${previousChapter.id}`} className="chapter-link">
            ← Previous chapter
          </Link>
        ) : <span />}
        {nextChapter ? (
          <Link href={`/books/${book.id}/chapters/${nextChapter.id}`} className="chapter-link">
            Next chapter →
          </Link>
        ) : <span />}
      </nav>
      {chapter.parts.map((part) => (
        <section className="reading-part" key={part.id}>
          <h2>{part.title}</h2>
          {part.text.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>
      ))}
      <nav className="chapter-navigation" aria-label="Chapter navigation">
        {previousChapter ? (
          <Link href={`/books/${book.id}/chapters/${previousChapter.id}`} className="chapter-link">
            ← Previous chapter
          </Link>
        ) : <span />}
        {nextChapter ? (
          <Link href={`/books/${book.id}/chapters/${nextChapter.id}`} className="chapter-link">
            Next chapter →
          </Link>
        ) : <span />}
      </nav>
      </ReaderControls>
    </main>
  );
}
