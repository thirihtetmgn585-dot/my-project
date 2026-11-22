import aliceChapters from "./alice-chapters.json";
import ozChapters from "./oz-chapters.json";
import secretGardenChapters from "./secret-garden-chapters.json";
import timeMachineChapters from "./time-machine-chapters.json";
import prideAndPrejudiceChapters from "./pride-and-prejudice-chapters.json";

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
    cover: "/alice-cover.jpg",
    status: "available",
    chapters: aliceChapters,
  },
  {
    id: "the-wonderful-wizard-of-oz",
    title: "The Wonderful Wizard of Oz",
    originalAuthor: "L. Frank Baum",
    translator: "Public-domain English original",
    genre: "Fantasy",
    description:
      "A public-domain fantasy novel. All 24 chapters are stored locally in Booklish for internal reading.",
    cover: "/oz-cover.jpg",
    status: "available",
    chapters: ozChapters,
  },
  {
    id: "the-secret-garden",
    title: "The Secret Garden",
    originalAuthor: "Frances Hodgson Burnett",
    translator: "Public-domain English original",
    genre: "Fantasy",
    description:
      "A public-domain classic. All 27 chapters are stored locally in Booklish for internal reading.",
    cover: "/secret-garden-cover.jpg",
    status: "available",
    chapters: secretGardenChapters,
  },
  {
    id: "the-time-machine",
    title: "The Time Machine",
    originalAuthor: "H. G. Wells",
    translator: "Public-domain English original",
    genre: "Fantasy",
    description:
      "A public-domain science-fiction classic. All 12 chapters are stored locally in Booklish for internal reading.",
    cover: "/time-machine-cover.jpg",
    status: "available",
    chapters: timeMachineChapters,
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    originalAuthor: "Jane Austen",
    translator: "Public-domain English original",
    genre: "Romance",
    description:
      "A public-domain romance classic. All 61 chapters are stored locally in Booklish for internal reading.",
    cover: "/pride-and-prejudice-cover.jpg",
    status: "available",
    chapters: prideAndPrejudiceChapters,
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
