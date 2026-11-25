import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "../../../../data/books";
import ReaderControls from "../../../ReaderControls";
import BookVoice from "../../../../BookVoice";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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
      const rawText = book.localTextFile
        ? await readFile(join(process.cwd(), "public", book.localTextFile.replace(/^\//, "")), "utf8")
        : await (await fetch(book.gutenbergTextUrl, { next: { revalidate: 86400 } })).text();
      const allBlocks = rawText
        .replace(/\r/g, "")
        .split(/\n(?=(?:CHAPTER\s+(?:[A-Z0-9IVXLCDM]+)|\s*[IVXLCDM]{1,4}\.\s+[A-Z]|\s*[IVXLCDM]{1,4}\s*\n\s*[A-Z]|\s*\d{1,2}\s*\n\s*[A-Z]|\s*\d{1,2}\.\s+[A-Z]))/i)
      const firstChapterIndex = allBlocks.findIndex((block) => /^\s*(?:CHAPTER\s+|I(?:\.\s+|\s*$)|1(?:\.\s+|\s*$))/i.test(block));
      const chapterBlocks = (firstChapterIndex >= 0 ? allBlocks.slice(firstChapterIndex) : allBlocks)
        .filter((block) => block.trim().length > 80);
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
