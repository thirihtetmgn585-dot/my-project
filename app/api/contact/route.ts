import { NextResponse } from "next/server";
import { mongoClient } from "../../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    if (!name || !email || !message) return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
    await mongoClient.connect();
    await mongoClient.db("booklish").collection("contactMessages").insertOne({ name, email, message, createdAt: new Date() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}
