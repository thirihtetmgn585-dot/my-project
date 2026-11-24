import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="reader-shell">
      <Link href="/" className="back-link">← Back to Booklish</Link>
      <p className="eyebrow">CONTACT BOOKLISH</p>
      <h1>We would love to hear from you.</h1>
      <section className="reader-card contact-card">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} placeholder="How can we help?" />
        <button type="button" className="reader-button">Send message</button>
      </section>
    </main>
  );
}
