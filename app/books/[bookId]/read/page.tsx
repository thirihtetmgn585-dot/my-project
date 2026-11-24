import Link from "next/link";

export const instant = false;

const chapters = [
  ...Array.from({ length: 24 }, (_, index) => [`chapter-${index + 1}`, `Chapter ${index + 1}`]),
];

export default async function FrankensteinReader({ params, searchParams }: { params: Promise<{ bookId: string }>; searchParams: Promise<{ chapter?: string }> }) {
  const { bookId } = await params;
  const { chapter = "letter-1" } = await searchParams;
  const selected = chapters.find(([id]) => id === chapter) ?? chapters[0];
  const source = `05-chapter-${chapter.replace("chapter-", "")}`;
  const sourceUrl = `https://dcnb.github.io/frankenstein/essay/${source}.html`;

  return (
    <main className="reader-shell reading-view">
      <Link href={`/books/${bookId}`} className="back-link">← Back to book</Link>
      <p className="eyebrow">FRANKENSTEIN</p>
      <h1>{selected[1]}</h1>
      <nav className="reader-card" aria-label="Chapters">
        <h2>Chapters</h2>
        <div className="chapter-list">
          {chapters.map(([id, title]) => <Link className="chapter-link" href={`/books/${bookId}/read?chapter=${id}`} key={id}>{title}</Link>)}
        </div>
      </nav>
      <section className="notice-card search-info-card">
        <p>Public-domain chapter text:</p>
        <iframe title={selected[1]} src={sourceUrl} className="public-domain-reader" />
      </section>
    </main>
  );
}
