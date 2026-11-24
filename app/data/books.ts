import aliceChapters from "./alice-chapters.json";
import ozChapters from "./oz-chapters.json";
import secretGardenChapters from "./secret-garden-chapters.json";
import timeMachineChapters from "./time-machine-chapters.json";
import prideAndPrejudiceChapters from "./pride-and-prejudice-chapters.json";

const makeChapters = (count: number, firstText: string): Chapter[] => Array.from({ length: count }, (_, index) => ({
  id: `chapter-${index + 1}`,
  title: `Chapter ${index + 1}`,
  parts: index === 0 ? [{ id: "chapter-1-part-1", title: "Opening", text: firstText }] : [],
}));

const frankensteinChapters = [
  ...Array.from({ length: 24 }, (_, index) => ({
    id: `chapter-${index + 1}`,
    title: `Chapter ${index + 1}`,
    parts: index === 0 ? [{ id: "chapter-1-part-1", title: "Letter I", text: "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking." }] : [],
  })),
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
  gutenbergTextUrl?: string;
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
    cover: "/frankenstein-cover.svg",
    status: "available",
    chapters: frankensteinChapters,
    publicDomainUrl: "https://www.gutenberg.org/ebooks/84",
    gutenbergTextUrl: "https://www.gutenberg.org/cache/epub/84/pg84.txt",
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
  {
    id: "dracula",
    title: "Dracula",
    originalAuthor: "Bram Stoker",
    translator: "Public-domain English original",
    genre: "Horror",
    description: "A public-domain Gothic horror classic, presented in the Booklish reader.",
    status: "available",
    chapters: makeChapters(27, "3 May, Bistritz.—Left Munich at 8:35 P.M. on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was an hour late. Buda-Pesth seems a wonderful place, from the glimpse which I got of it from the train and the little I could walk through the streets."),
    cover: "/dracula-cover.svg",
    publicDomainUrl: "https://www.gutenberg.org/ebooks/345",
    gutenbergTextUrl: "https://www.gutenberg.org/cache/epub/345/pg345.txt",
  },
  {
    id: "little-women",
    title: "Little Women",
    originalAuthor: "Louisa May Alcott",
    translator: "Public-domain English original",
    genre: "Romance",
    description: "A warm public-domain coming-of-age classic about the March sisters.",
    cover: "/little-women-cover.svg",
    status: "available",
    chapters: makeChapters(47, "Christmas won't be Christmas without any presents, grumbled Jo, lying on the rug. It's so dreadful to be poor! sighed Meg, looking down at her old dress."),
    publicDomainUrl: "https://www.gutenberg.org/ebooks/514",
    gutenbergTextUrl: "https://www.gutenberg.org/cache/epub/514/pg514.txt",
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    originalAuthor: "Charlotte Brontë",
    translator: "Public-domain English original",
    genre: "Romance",
    description: "A public-domain romantic and Gothic classic following Jane Eyre's journey.",
    cover: "/jane-eyre-cover.svg",
    status: "available",
    chapters: makeChapters(38, "There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further out-door exercise was now out of the question."),
    publicDomainUrl: "https://www.gutenberg.org/ebooks/1260",
    gutenbergTextUrl: "https://www.gutenberg.org/cache/epub/1260/pg1260.txt",
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    originalAuthor: "Emily Brontë",
    translator: "Public-domain English original",
    genre: "Romance",
    description: "A public-domain English classic of passion, memory, and the Yorkshire moors.",
    cover: "/wuthering-heights-cover.svg",
    status: "available",
    chapters: makeChapters(34, "1801.—I have just returned from a visit to my landlord—the solitary neighbour that I shall be troubled with. This is certainly a beautiful country!"),
    publicDomainUrl: "https://www.gutenberg.org/ebooks/768",
    gutenbergTextUrl: "https://www.gutenberg.org/cache/epub/768/pg768.txt",
  },
  {
    id: "treasure-island",
    title: "Treasure Island",
    originalAuthor: "Robert Louis Stevenson",
    translator: "Public-domain English original",
    genre: "Fantasy",
    description: "A public-domain adventure classic of pirates, maps, and buried treasure.",
    cover: "/treasure-island-cover.svg",
    status: "available",
    chapters: makeChapters(34, "The squire's old black dog lay asleep in the corner of the common room, and the fire glowed red upon the brass fittings of the sea-chest. A tall, strong, heavy, nut-brown man came into the inn."),
    publicDomainUrl: "https://www.gutenberg.org/ebooks/120",
    gutenbergTextUrl: "https://www.gutenberg.org/cache/epub/120/pg120.txt",
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
