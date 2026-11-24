import Link from "next/link";

const chapters = [
  ["letter-1", "Letter 1"], ["letter-2", "Letter 2"], ["letter-3", "Letter 3"], ["letter-4", "Letter 4"],
  ...Array.from({ length: 24 }, (_, index) => [`chapter-${index + 1}`, `Chapter ${index + 1}`]),
];

const sourcePages: Record<string, string> = {
  "letter-1": "01-letter-1", "letter-2": "02-letter-2", "letter-3": "03-letter-3", "letter-4": "04-letter-4",
};

export default async function FrankensteinReader({ params, searchParams }: { params: Promise<{ bookId: string }>; searchParams: Promise<{ chapter?: string }> }) {
  const { bookId } = await params;
  const { chapter = "letter-1" } = await searchParams;
  const selected = chapters.find(([id]) => id === chapter) ?? chapters[0];
  const source = sourcePages[chapter] ?? `05-chapter-${chapter.replace("chapter-", "")}`;
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
