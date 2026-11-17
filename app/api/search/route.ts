import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ docs: [] });
  }

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8`,
    );

    if (!response.ok) {
      throw new Error("Open Library request failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    const fallbackBooks = [
      {
        key: "/works/OL262758W",
        title: "The Alchemist",
        author_name: ["Paulo Coelho"],
        localCover: "/alchemist.jpg",
      },
      {
        key: "/works/OL17930368W",
        title: "Atomic Habits",
        author_name: ["James Clear"],
        localCover: "/atomic-habits.jpg",
      },
      {
        key: "/works/OL17358107W",
        title: "Deep Work",
        author_name: ["Cal Newport"],
        localCover: "/deep-work.jpg",
      },
    ];

    const normalizedQuery = query.toLowerCase();
    const docs = fallbackBooks.filter((book) =>
      book.title.toLowerCase().includes(normalizedQuery),
    );

    return NextResponse.json({ numFound: docs.length, docs });
  }
}
