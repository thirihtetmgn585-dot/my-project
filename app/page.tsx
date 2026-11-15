export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4efe6",
        color: "#241f1a",
        padding: "80px 10%",
        fontFamily: "Georgia, serif",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "100px",
        }}
      >
        <strong style={{ fontSize: "22px" }}>Booklish</strong>
        <div style={{ display: "flex", gap: "24px" }}>
          <a
            href="#books"
            style={{
              color: "#8b5e3c",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Books
          </a>
          <a
            href="#books"
            style={{
              color: "#8b5e3c",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            About
          </a>
          <a
            href="#books"
            style={{
              color: "#8b5e3c",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Contact
          </a>{" "}
        </div>
      </nav>

      <p style={{ color: "#8b5e3c", letterSpacing: "3px" }}>BOOKLISH</p>
      <h1 style={{ fontSize: "64px", maxWidth: "700px" }}>
        Your books, brought to life.
      </h1>
      <p style={{ fontSize: "20px", maxWidth: "560px", lineHeight: 1.6 }}>
        Explore stories, discover ideas, and build a deeper connection with
        every book you read.
      </p>
      <a
        href="#books"
        style={{
          display: "inline-block",
          marginTop: "24px",
          padding: "14px 24px",
          borderRadius: "999px",
          background: "#8b5e3c",
          color: "white",
          fontSize: "16px",
          textDecoration: "none",
        }}
      >
        Explore books
      </a>
      <section id="books" style={{ marginTop: "100px" }}>
        <h2 style={{ fontSize: "36px" }}>Featured books</h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <article
            style={{
              width: "220px",
              flex: "1 1 220px",
              padding: "24px",
              borderRadius: "16px",
              background: "#fffaf2",
              boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
            }}
          >
            <div
              style={{
                height: "180px",
                borderRadius: "10px",
                background: "#8b5e3c",
                marginBottom: "18px",
              }}
            />
            <h3>The Alchemist</h3>
            <p>A story about dreams, courage, and finding your path.</p>
          </article>

          <article
            style={{
              width: "220px",
              flex: "1 1 220px",
              padding: "24px",
              borderRadius: "16px",
              background: "#3f5c55",
              boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
            }}
          >
            <h3>Atomic Habits</h3>
            <p>Small changes that create powerful results.</p>
          </article>

          <article
            style={{
              width: "220px",
              flex: "1 1 220px",
              padding: "24px",
              borderRadius: "16px",
              background: "#c28b5a",
              boxShadow: "0 8px 24px rgba(80, 50, 20, 0.12)",
            }}
          >
            <h3>Deep Work</h3>
            <p>How to focus and produce meaningful work.</p>
          </article>
        </div>
      </section>
      <section id="about" style={{ marginTop: "100px" }}>
        <h2 style={{ fontSize: "36px" }}>About Booklish</h2>
        <p style={{ maxWidth: "600px", lineHeight: 1.6 }}>
          Booklish is a calm space for discovering meaningful books and building
          a lasting reading habit.
        </p>
      </section>

      <section id="contact" style={{ marginTop: "60px" }}>
        <h2 style={{ fontSize: "36px" }}>Stay connected</h2>
        <p>Email us at hello@booklish.com</p>
      </section>
      <section
        style={{
          marginTop: "100px",
          padding: "40px",
          borderRadius: "20px",
          background: "#3f5c55",
          color: "white",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "28px", fontStyle: "italic" }}>
          “A reader lives a thousand lives before he dies.”
        </p>
        <small>— George R. R. Martin</small>
      </section>
      <footer
        style={{
          marginTop: "80px",
          paddingTop: "24px",
          borderTop: "1px solid #d8cbbb",
          color: "#8b5e3c",
          fontSize: "14px",
        }}
      >
        © 2026 Booklish. Made for people who love books.
      </footer>
    </main>
  );
}
