import aliceChapters from "./alice-chapters.json";

export type Chapter = {
  id: string;
  title: string;
  parts: { id: string; title: string; text: string }[];
};

export type Book = {
  id: string;
  title: string;
  originalAuthor: string;
  translator: string;
  genre: string;
  description: string;
  cover?: string;
  status: "available" | "unavailable";
  chapters: Chapter[];
};

export const books: Book[] = [
  {
    id: "alice-s-adventures-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    originalAuthor: "Lewis Carroll",
    translator: "Public-domain English original",
    genre: "Fantasy",
    description:
      "A public-domain fantasy novel. Its full text is stored locally in Booklish and split into chapters for internal reading.",
    status: "available",
    chapters: aliceChapters,
  },
  {
    id: "myanmar-catalog-coming-soon",
    title: "Myanmar-translated novels catalog",
    originalAuthor: "Multiple authors",
    translator: "Verified translations will be listed here",
    genre: "All genres",
    description:
      "The reader is ready, but authorized Myanmar-translated chapter text must be added before this book can be read.",
    status: "unavailable",
    chapters: [],
  },
];

export function getBook(bookId: string) {
  return books.find((book) => book.id === bookId) ?? {
    id: bookId,
    title: bookId.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
    originalAuthor: "Author information not verified",
    translator: "Translator information not verified",
    genre: "Uncategorized",
    description: "This search result has no authorized reading text in Booklish yet.",
    status: "unavailable" as const,
    chapters: [],
  };
}
