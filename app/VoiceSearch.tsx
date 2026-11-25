"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

export default function VoiceSearch({ onSearch }: { onSearch?: (query: string) => void }) {
  const vapiRef = useRef<Vapi | null>(null);
  const speechRef = useRef<SpeechRecognitionLike | null>(null);
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
      if (event.type === "transcript" && event.transcript && (event.role === "user" || !event.role)) {
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

    // Keep the Vapi assistant as the primary path so its introduction and
    // book-aware conversation still work. Use browser speech only if Vapi is
    // not configured or cannot be used in the current browser.
    if (vapi && assistantId) {
      if (active) await vapi.stop(); else await vapi.start(assistantId);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (speechRef.current) {
        speechRef.current.stop();
        speechRef.current = null;
        setActive(false);
        setMessage("Speak to search for a book");
        return;
      }
      const speech = new SpeechRecognition();
      speech.lang = "en-US";
      speech.interimResults = false;
      speech.maxAlternatives = 1;
      speech.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) {
          setMessage(transcript);
          onSearch?.(transcript);
        }
      };
      speech.onerror = () => {
        speechRef.current = null;
        setActive(false);
        setMessage("Voice error: check microphone permission and try again");
      };
      speech.onend = () => {
        speechRef.current = null;
        setActive(false);
      };
      speechRef.current = speech;
      setActive(true);
      setMessage("Listening…");
      speech.start();
      return;
    }
    setMessage("Add the Vapi public key and assistant ID first");
  };

  return <div className="voice-search"><button type="button" onClick={toggleVoice} className="voice-search-button">{active ? "Stop voice search" : "🎙 Voice search"}</button><span>{message}</span></div>;
}
