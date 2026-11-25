import { NextResponse } from "next/server";
import { books } from "../../data/books";

function normalizeWords(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      if (word.endsWith("ies") && word.length > 4) return `${word.slice(0, -3)}y`;
      if (word.endsWith("es") && word.length > 4) return word.slice(0, -2);
      if (word.endsWith("s") && word.length > 3) return word.slice(0, -1);
      return word;
    });
}

function matchesSearch(value: string, query: string) {
  const valueText = value.toLowerCase().trim();
  const queryText = query.toLowerCase().trim();
  if (valueText.includes(queryText)) return true;

  const valueWords = normalizeWords(value);
  const queryWords = normalizeWords(query);
  return queryWords.length > 0 && queryWords.every((word) => valueWords.includes(word));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ docs: [] });
  }

  const docs = books
    .filter((book) =>
      [book.title, book.originalAuthor, book.genre].some((value) =>
        matchesSearch(value, query),
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
