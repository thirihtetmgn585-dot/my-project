import { NextResponse } from "next/server";
import { books } from "../../data/books";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ docs: [] });
  }

  const normalizedQuery = query.toLowerCase().trim();
  const docs = books
    .filter((book) =>
      [book.title, book.originalAuthor, book.genre].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    )
    .map((book) => ({
      key: `/works/${book.id}`,
      title: book.title,
      author_name: [book.originalAuthor],
      localCover: book.cover,
      first_publish_year: book.id === "frankenstein-or-the-modern-prometheus" ? 1818 : undefined,
    }));

  return NextResponse.json({ numFound: docs.length, docs });
}
