"use client";

import Link from "next/link";
import { Show, SignInButton } from "@clerk/nextjs";
import { FormEvent, useState } from "react";

export default function CreateBookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSubmitted(false);
    setError("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (response.ok) {
        form.reset();
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Could not save the book.");
      }
    } catch {
      setError("Could not connect to the database.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="reader-shell create-book-page">
      <Link href="/" className="back-link">← Back to Booklish</Link>
      <p className="eyebrow">BOOKLISH LIBRARY</p>
      <h1>Create a book</h1>
      <p className="lead">Add the details for a book you want to keep in your personal library.</p>

      <Show when="signed-out">
        <section className="notice-card">
          <h2>Sign in to add a book</h2>
          <p>You need a Booklish account before creating a book.</p>
          <SignInButton mode="modal">
            <button type="button" className="reader-button">Sign in</button>
          </SignInButton>
        </section>
      </Show>

      <Show when="signed-in">
        <form className="create-book-form" onSubmit={handleSubmit}>
          <label>
            Book title
            <input name="title" required placeholder="e.g. The Alchemist" />
          </label>
          <label>
            Author
            <input name="author" required placeholder="e.g. Paulo Coelho" />
          </label>
          <label>
            Genre
            <select name="genre" defaultValue="Fantasy">
              <option>Fantasy</option>
              <option>Romance</option>
              <option>Mystery</option>
              <option>Drama</option>
              <option>Adventure</option>
              <option>Historical</option>
            </select>
          </label>
          <label>
            Cover image URL
            <input name="coverUrl" type="url" placeholder="https://example.com/cover.jpg" />
          </label>
          <label>
            Description
            <textarea name="description" required rows={6} placeholder="What is this book about?" />
          </label>
          <label>
            Reading text
            <textarea name="readingText" required rows={14} placeholder="Paste the authorized or public-domain text you want to read..." />
          </label>
          <button type="submit" className="reader-button" disabled={isSaving}>
            {isSaving ? "Saving..." : "Create book"}
          </button>
          {submitted && <p className="form-success">Book saved successfully.</p>}
          {error && <p className="form-error">{error}</p>}
        </form>
      </Show>
    </main>
  );
}
