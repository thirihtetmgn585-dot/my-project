import { auth } from "@clerk/nextjs/server";
import { connection } from "next/server";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { mongoClient } from "../../../lib/mongodb";

export const instant = false;

type PageProps = { params: Promise<{ bookId: string }> };

export default async function SavedBookPage({ params }: PageProps) {
  await connection();
  const { userId } = await auth();
  const { bookId } = await params;

  if (!userId || !ObjectId.isValid(bookId)) {
    return <main className="reader-shell"><Link href="/library" className="back-link">← Back to library</Link><h1>Book unavailable</h1></main>;
  }

  const book = await mongoClient.db("booklish").collection("books").findOne({ _id: new ObjectId(bookId), userId });
  if (!book) {
    return <main className="reader-shell"><Link href="/library" className="back-link">← Back to library</Link><h1>Book not found</h1></main>;
  }

  return (
    <main className="reader-shell">
      <Link href="/library" className="back-link">← Back to library</Link>
      <p className="eyebrow">BOOKLISH LIBRARY</p>
      <h1>{String(book.title)}</h1>
      <p className="lead">By {String(book.author)} · {String(book.genre || "Uncategorized")}</p>
      <section className="reader-card">
        {book.coverUrl && <img className="library-cover" src={String(book.coverUrl)} alt={`${book.title} cover`} />}
        <p>{String(book.description)}</p>
        <p className="availability unavailable">Reading chapters are not available for this saved book yet.</p>
        <p>Only authorized full text can be added to the internal reader.</p>
      </section>
    </main>
  );
}
