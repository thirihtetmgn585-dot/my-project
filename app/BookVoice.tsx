"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function BookVoice({ title, text }: { title: string; text: string }) {
  const vapiRef = useRef<Vapi | null>(null);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("Ask about this book");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!key) return;
    const vapi = new Vapi(key);
    vapiRef.current = vapi;
    vapi.on("call-start", () => { setActive(true); setMessage("Listening…"); });
    vapi.on("call-end", () => { setActive(false); setMessage("Ask about this book"); });
    vapi.on("message", (event) => {
      if (event.type === "transcript" && event.transcript) setMessage(event.transcript);
    });
    vapi.on("error", () => { setActive(false); setMessage("Voice error. Check microphone permission."); });
    return () => { vapi.stop(); vapi.removeAllListeners(); };
  }, []);

  async function toggle() {
    const vapi = vapiRef.current;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!vapi || !assistantId) { setMessage("Vapi is not configured yet"); return; }
    if (active) return vapi.stop();
    await vapi.start(assistantId, {
      firstMessage: `We are discussing ${title}. Ask me about this book.`,
      variableValues: { bookTitle: title, bookText: text.slice(0, 12000) },
    });
  }

  return <div className="book-voice"><button type="button" onClick={toggle}>{active ? "Stop voice assistant" : "🎙 Ask about this book"}</button><span>{message}</span></div>;
}
