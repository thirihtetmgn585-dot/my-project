import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "../../../../data/books";
import ReaderControls from "../../../ReaderControls";
import BookVoice from "../../../../BookVoice";

export const instant = false;

function cleanHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export default async function ChapterPage({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
  const { bookId, chapterId } = await params;
  const book = getBook(bookId);
  const chapterIndex = book?.chapters.findIndex((item) => item.id === chapterId) ?? -1;
  const chapter = chapterIndex >= 0 ? book?.chapters[chapterIndex] : undefined;
  if (!book || !chapter) notFound();

  let publicDomainParagraphs: string[] = [];
  if (book.id === "frankenstein-or-the-modern-prometheus" && chapter.id.startsWith("chapter-")) {
    const sourceUrl = `https://dcnb.github.io/frankenstein/essay/05-chapter-${chapter.id.replace("chapter-", "")}.html`;
    try {
      const response = await fetch(sourceUrl, { next: { revalidate: 86400 } });
      const html = await response.text();
      publicDomainParagraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((match) => cleanHtml(match[1]))
        .filter((paragraph) => paragraph.length > 40);
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
      <BookVoice title={book.title} text={chapter.parts.map((part) => part.text).join("\n\n")} />
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
