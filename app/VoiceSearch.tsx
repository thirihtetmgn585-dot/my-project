"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function VoiceSearch({ onSearch }: { onSearch?: (query: string) => void }) {
  const vapiRef = useRef<Vapi | null>(null);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("Speak to search for a book");

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) return;
    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;
    vapi.on("call-start", () => { setActive(true); setMessage("Listening…"); });
    vapi.on("call-end", () => { setActive(false); setMessage("Speak to search for a book"); });
    vapi.on("message", (event) => {
      if (event.type === "transcript" && event.transcript) {
        setMessage(event.transcript);
        if (event.transcriptType === "final") onSearch?.(event.transcript);
      }
    });
    vapi.on("error", () => setMessage("Voice error: check microphone permission and try again"));
    return () => { vapi.stop(); vapi.removeAllListeners(); };
  }, []);

  const toggleVoice = async () => {
    const vapi = vapiRef.current;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!vapi || !assistantId) { setMessage("Add the Vapi public key and assistant ID first"); return; }
    if (active) await vapi.stop(); else await vapi.start(assistantId);
  };

  return <div className="voice-search"><button type="button" onClick={toggleVoice} className="voice-search-button">{active ? "Stop voice search" : "🎙 Voice search"}</button><span>{message}</span></div>;
}
