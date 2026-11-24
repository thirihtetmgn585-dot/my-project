import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "../../../../data/books";
import ReaderControls from "../../../ReaderControls";
import BookVoice from "../../../../BookVoice";

export const instant = false;

export default async function ChapterPage({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
  const { bookId, chapterId } = await params;
  const book = getBook(bookId);
  const chapterIndex = book?.chapters.findIndex((item) => item.id === chapterId) ?? -1;
  const chapter = chapterIndex >= 0 ? book?.chapters[chapterIndex] : undefined;
  if (!book || !chapter) notFound();

  let publicDomainParagraphs: string[] = [];
  if (book.gutenbergTextUrl) {
    try {
      const response = await fetch(book.gutenbergTextUrl, { next: { revalidate: 86400 } });
      const rawText = await response.text();
      const chapterBlocks = rawText
        .replace(/\r/g, "")
        .split(/\n(?=CHAPTER\s+(?:[A-Z0-9IVXLCDM]+))/i)
        .filter((block) => block.trim().length > 500);
      const selectedBlock = chapterBlocks[chapterIndex];
      if (selectedBlock) {
        publicDomainParagraphs = selectedBlock
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
          .filter((paragraph) => paragraph.length > 40);
      }
    } catch {
      publicDomainParagraphs = [];
    }
  }

  const previousChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : undefined;
  const nextChapter = chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : undefined;

  return (
    <main className="reader-shell reading-view">
      <ReaderControls>
      <Link href={`/books/${book.id}`} className="back-link">← Back to chapters</Link>
      <p className="eyebrow">{book.title}</p>
      <h1>{chapter.title}</h1>
      <BookVoice title={book.title} text={publicDomainParagraphs.length > 0 ? publicDomainParagraphs.join("\n\n") : chapter.parts.map((part) => part.text).join("\n\n")} />
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
      {publicDomainParagraphs.length > 0 && (
        <section className="reading-part">
          {publicDomainParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>
      )}
      {publicDomainParagraphs.length === 0 && chapter.parts.length === 0 && (
        <section className="notice-card search-info-card">
          <h2>Chapter text unavailable</h2>
          <p>The public-domain source is temporarily unavailable. Try opening the source edition, then return here to continue using Booklish navigation.</p>
          {book.publicDomainUrl && <a className="reader-button" href={book.publicDomainUrl} target="_blank" rel="noreferrer">Open public-domain edition →</a>}
        </section>
      )}
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
