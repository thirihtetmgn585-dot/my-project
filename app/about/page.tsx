import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="reader-shell">
      <Link href="/" className="back-link">← Back to Booklish</Link>
      <p className="eyebrow">ABOUT BOOKLISH</p>
      <h1>Books, brought to life.</h1>
      <section className="notice-card search-info-card">
        <h2>About Booklish</h2>
        <p>Booklish is a personal reading space for discovering public-domain books, saving your library, and reading chapters in a calm, simple interface.</p>
        <p>Browse classic stories, open a chapter, and continue reading whenever you like.</p>
      </section>
    </main>
  );
}
