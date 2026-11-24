"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending...");
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())) });
    setStatus(response.ok ? "Message sent successfully." : "Please complete all fields and try again.");
    if (response.ok) event.currentTarget.reset();
  }
  return (
    <main className="reader-shell">
      <Link href="/" className="back-link">← Back to Booklish</Link>
      <p className="eyebrow">CONTACT BOOKLISH</p>
      <h1>We would love to hear from you.</h1>
      <form className="reader-card contact-card" onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} placeholder="How can we help?" />
        <button type="submit" className="reader-button">Send message</button>
        {status && <p role="status">{status}</p>}
      </form>
    </main>
  );
}
