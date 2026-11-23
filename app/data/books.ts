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
      frankenstein: "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg",
      dracula: "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg",
      "little-women": "https://www.gutenberg.org/cache/epub/514/pg514.cover.medium.jpg",
      "jane-eyre": "https://www.gutenberg.org/cache/epub/1260/pg1260.cover.medium.jpg",
      "wuthering-heights": "https://www.gutenberg.org/cache/epub/768/pg768.cover.medium.jpg",
      "great-expectations": "https://www.gutenberg.org/cache/epub/1400/pg1400.cover.medium.jpg",
      "treasure-island": "https://www.gutenberg.org/cache/epub/120/pg120.cover.medium.jpg",
      "the-picture-of-dorian-gray": "https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg",
      "moby-dick": "https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg",
      "the-adventures-of-sherlock-holmes": "https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg",
    } as Record<string, string>)[bookId],
    publicDomainUrl: ({
      frankenstein: "https://www.gutenberg.org/ebooks/84",
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
