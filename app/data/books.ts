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

const additionalGenreBooks: Book[] = [
  ["the-adventures-of-sherlock-holmes", "The Adventures of Sherlock Holmes", "Arthur Conan Doyle", "Mystery", "A public-domain collection of clever cases and impossible clues.", 12, "https://www.gutenberg.org/ebooks/1661", "https://www.gutenberg.org/cache/epub/1661/pg1661.txt"],
  ["the-moonstone", "The Moonstone", "Wilkie Collins", "Mystery", "A foundational public-domain mystery about a missing diamond.", 23, "https://www.gutenberg.org/ebooks/155", "https://www.gutenberg.org/cache/epub/155/pg155.txt"],
  ["the-woman-in-white", "The Woman in White", "Wilkie Collins", "Mystery", "A suspenseful public-domain mystery of identity, secrets, and inheritance.", 40, "https://www.gutenberg.org/ebooks/583", "https://www.gutenberg.org/cache/epub/583/pg583.txt"],
  ["the-call-of-the-wild", "The Call of the Wild", "Jack London", "Adventure", "A public-domain wilderness adventure about survival and instinct.", 7, "https://www.gutenberg.org/ebooks/215", "https://www.gutenberg.org/cache/epub/215/pg215.txt"],
  ["around-the-world-in-eighty-days", "Around the World in Eighty Days", "Jules Verne", "Adventure", "A public-domain race around the world by steam, rail, and sea.", 37, "https://www.gutenberg.org/ebooks/103", "https://www.gutenberg.org/cache/epub/103/pg103.txt"],
  ["the-three-musketeers", "The Three Musketeers", "Alexandre Dumas", "Adventure", "A swashbuckling public-domain adventure of friendship and daring.", 67, "https://www.gutenberg.org/ebooks/1257", "https://www.gutenberg.org/cache/epub/1257/pg1257.txt"],
  ["the-picture-of-dorian-gray", "The Picture of Dorian Gray", "Oscar Wilde", "Thriller", "A public-domain psychological thriller about beauty, corruption, and consequence.", 21, "https://www.gutenberg.org/ebooks/174", "https://www.gutenberg.org/cache/epub/174/pg174.txt"],
  ["the-count-of-monte-cristo", "The Count of Monte Cristo", "Alexandre Dumas", "Thriller", "A public-domain revenge thriller of betrayal, imprisonment, and transformation.", 117, "https://www.gutenberg.org/ebooks/1184", "https://raw.githubusercontent.com/GITenberg/The-Count-of-Monte-Cristo_1184/master/1184.txt"],
  ["the-island-of-doctor-moreau", "The Island of Doctor Moreau", "H. G. Wells", "Thriller", "A public-domain science thriller set on a terrifying isolated island.", 22, "https://www.gutenberg.org/ebooks/159", "https://raw.githubusercontent.com/GITenberg/The-Island-of-Doctor-Moreau_159/master/159.txt"],
  ["the-importance-of-being-earnest", "The Importance of Being Earnest", "Oscar Wilde", "Comedy", "A witty public-domain comedy of manners, mistaken identities, and romance.", 3, "https://www.gutenberg.org/ebooks/844", "https://www.gutenberg.org/cache/epub/844/pg844.txt"],
  ["three-men-in-a-boat", "Three Men in a Boat", "Jerome K. Jerome", "Comedy", "A beloved public-domain comic travel adventure along the Thames.", 19, "https://www.gutenberg.org/ebooks/308", "https://raw.githubusercontent.com/GITenberg/Three-Men-in-a-Boat_308/master/308.txt"],
  ["a-connecticut-yankee-in-king-arthurs-court", "A Connecticut Yankee in King Arthur's Court", "Mark Twain", "Comedy", "A public-domain comic time-travel adventure through Arthurian legend.", 44, "https://www.gutenberg.org/ebooks/86", "https://raw.githubusercontent.com/GITenberg/A-Connecticut-Yankee-in-King-Arthur-s-Court_86/master/86.txt"],
  ["the-prince", "The Prince", "Niccolò Machiavelli", "History", "A public-domain historical and political classic from Renaissance Italy.", 26, "https://www.gutenberg.org/ebooks/1232", "https://raw.githubusercontent.com/GITenberg/The-Prince_1232/master/1232.txt"],
  ["the-histories", "The Histories", "Herodotus", "History", "A foundational public-domain account of the ancient Mediterranean world.", 9, "https://www.gutenberg.org/ebooks/2707", "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"],
  ["the-art-of-war", "The Art of War", "Sun Tzu", "History", "A concise public-domain classic on strategy, leadership, and conflict.", 13, "https://www.gutenberg.org/ebooks/132", "https://raw.githubusercontent.com/GITenberg/The-Art-of-War_132/master/132.txt"],
].map(([id, title, author, genre, description, chapterCount, publicDomainUrl, gutenbergTextUrl]) => ({
  id: id as string,
  title: title as string,
  originalAuthor: author as string,
  translator: "Public-domain English edition",
  genre: genre as string,
  description: description as string,
  cover: `/book-covers/${id}.svg`,
  status: "available" as const,
  chapters: makeChapters(Number(chapterCount), `Begin reading ${String(title)} in Booklish. This public-domain edition is available through the linked source.`),
  publicDomainUrl: publicDomainUrl as string,
  gutenbergTextUrl: gutenbergTextUrl as string,
}));

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
    gutenbergTextUrl: "https://raw.githubusercontent.com/GITenberg/Frankenstein_84/master/84.txt",
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
    genre: "Science Fiction",
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
    gutenbergTextUrl: "https://raw.githubusercontent.com/GITenberg/Dracula_345/master/345.txt",
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
    gutenbergTextUrl: "https://raw.githubusercontent.com/GITenberg/Little-Women_514/master/514.txt",
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
    gutenbergTextUrl: "https://raw.githubusercontent.com/GITenberg/Jane-Eyre_1260/master/1260.txt",
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
    gutenbergTextUrl: "https://raw.githubusercontent.com/GITenberg/Wuthering-Heights_768/master/768.txt",
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
    gutenbergTextUrl: "https://raw.githubusercontent.com/GITenberg/Treasure-Island_120/master/120.txt",
  },
  ...additionalGenreBooks,
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
