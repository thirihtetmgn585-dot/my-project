import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { mongoClient } from "../../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "You must be signed in to create a book." }, { status: 401 });
    }

    const body = await request.json();
    const { title, author, genre, coverUrl, description, readingText } = body;

    if (!title || !author || !description || !readingText) {
      return NextResponse.json({ error: "Title, author, description, and reading text are required." }, { status: 400 });
    }

    const database = mongoClient.db("booklish");
    const result = await database.collection("books").insertOne({
      userId,
      title,
      author,
      genre: genre || "Uncategorized",
      coverUrl: coverUrl || "",
      description,
      readingText,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save the book." }, { status: 500 });
  }
}
