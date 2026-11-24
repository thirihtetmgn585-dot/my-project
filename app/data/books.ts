import aliceChapters from "./alice-chapters.json";
import ozChapters from "./oz-chapters.json";
import secretGardenChapters from "./secret-garden-chapters.json";
import timeMachineChapters from "./time-machine-chapters.json";
import prideAndPrejudiceChapters from "./pride-and-prejudice-chapters.json";

const frankensteinChapters = [
  ...Array.from({ length: 24 }, (_, index) => ({ id: `chapter-${index + 1}`, title: `Chapter ${index + 1}`, parts: [] })),
];

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
  publicDomainUrl?: string;
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
    id: "frankenstein-or-the-modern-prometheus",
    title: "Frankenstein; or, The Modern Prometheus",
    originalAuthor: "Mary Shelley",
    translator: "Public-domain English original",
    genre: "Horror",
    description:
      "A public-domain Gothic classic. All 24 chapters are available in the Booklish reader.",
    cover: "https://covers.openlibrary.org/b/isbn/0486282112-M.jpg",
    status: "available",
    chapters: frankensteinChapters,
    publicDomainUrl: "https://www.gutenberg.org/ebooks/84",
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
    description: "A book discovered through the Booklish search catalog.",
    status: "unavailable" as const,
    chapters: [],
    cover: ({
      frankenstein: "https://covers.openlibrary.org/b/isbn/0486282112-M.jpg",
      "frankenstein-or-the-modern-prometheus": "https://covers.openlibrary.org/b/isbn/0486282112-M.jpg",
      dracula: "https://covers.openlibrary.org/b/isbn/9780486411095-M.jpg",
      "little-women": "https://covers.openlibrary.org/b/isbn/9780486290737-M.jpg",
      "jane-eyre": "https://covers.openlibrary.org/b/isbn/9780486410265-M.jpg",
      "wuthering-heights": "https://covers.openlibrary.org/b/isbn/9780486292564-M.jpg",
      "great-expectations": "https://covers.openlibrary.org/b/isbn/9780486415864-M.jpg",
      "treasure-island": "https://covers.openlibrary.org/b/isbn/9780486275593-M.jpg",
      "the-picture-of-dorian-gray": "https://covers.openlibrary.org/b/isbn/9780486278075-M.jpg",
      "moby-dick": "https://covers.openlibrary.org/b/isbn/9780486432159-M.jpg",
      "the-adventures-of-sherlock-holmes": "https://covers.openlibrary.org/b/isbn/9780486474913-M.jpg",
    } as Record<string, string>)[bookId],
    publicDomainUrl: ({
      frankenstein: "https://www.gutenberg.org/ebooks/84",
      "frankenstein-or-the-modern-prometheus": "https://www.gutenberg.org/ebooks/84",
      dracula: "https://www.gutenberg.org/ebooks/345",
      "little-women": "https://www.gutenberg.org/ebooks/514",
      "jane-eyre": "https://www.gutenberg.org/ebooks/1260",
      "wuthering-heights": "https://www.gutenberg.org/ebooks/768",
      "great-expectations": "https://www.gutenberg.org/ebooks/1400",
      "treasure-island": "https://www.gutenberg.org/ebooks/120",
      "the-picture-of-dorian-gray": "https://www.gutenberg.org/ebooks/174",
      "moby-dick": "https://www.gutenberg.org/ebooks/2701",
      "the-adventures-of-sherlock-holmes": "https://www.gutenberg.org/ebooks/1661",
    } as Record<string, string>)[bookId],
  };
}
