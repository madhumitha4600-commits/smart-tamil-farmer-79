import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Send, Bot, Mic, Volume2, VolumeX, Loader2, Trash2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import LanguageSelector from "@/components/chat/LanguageSelector";
import VoiceRecordingPanel from "@/components/chat/VoiceRecordingPanel";
import SpeakingBar from "@/components/chat/SpeakingBar";
import MessageBubble from "@/components/chat/MessageBubble";
import { useStreamChat } from "@/components/chat/useStreamChat";
import { useSpeechToText, useTextToSpeech } from "@/components/chat/useSpeech";
import type { ChatLang } from "@/components/chat/types";

const ChatAssistant = () => {
  const [chatLang, setChatLang] = useState<ChatLang>("en");
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const lastBotMsgRef = useRef<string>("");

  const { messages, isLoading, sendMessage, clearMessages } = useStreamChat();
  const { isListening, interimText, startListening, stopListening } = useSpeechToText(chatLang);
  const { isSpeaking, ttsEnabled, speak, stopSpeaking, toggleTts } = useTextToSpeech();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-speak bot replies when done loading
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.role === "assistant" && last.content !== lastBotMsgRef.current) {
        lastBotMsgRef.current = last.content;
        speak(last.content, last.lang || chatLang);
      }
    }
  }, [isLoading, messages, speak, chatLang]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    await sendMessage(text, chatLang);
  }, [input, isLoading, sendMessage, chatLang]);

  const handleVoice = useCallback(() => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening(async (text) => {
      await sendMessage(text, chatLang);
    });
  }, [isListening, stopListening, startListening, sendMessage, chatLang]);

  const quickPrompts = [
    "How to grow tomatoes?",
    "Best fertilizer for rice?",
    "How to identify plant diseases?",
    "Weather tips for farming",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 flex flex-col relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/30 border-b border-border px-4 py-3">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground text-lg">AgriBot AI</h1>
                  <p className="text-xs text-muted-foreground">Smart farming assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleTts} title={ttsEnabled ? "Mute TTS" : "Enable TTS"}>
                  {ttsEnabled ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { clearMessages(); lastBotMsgRef.current = ""; }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <LanguageSelector selected={chatLang} onChange={setChatLang} />
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 relative">
          <AnimatePresence>
            {isListening && (
              <VoiceRecordingPanel interimText={interimText} chatLang={chatLang} onStop={stopListening} />
            )}
          </AnimatePresence>

          <div className="container mx-auto max-w-3xl space-y-4">
            {messages.length === 0 && !isLoading && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Welcome to AgriBot!</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Ask me anything about farming — crop advice, disease treatment, fertilizers, weather tips, and more.
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(p)}
                      className="text-xs px-3 py-2 bg-accent rounded-full text-accent-foreground hover:bg-accent/80 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} isBotSpeaking={isSpeaking && msg.id === messages[messages.length - 1]?.id && msg.role === "assistant"} onSpeak={speak} />
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-5 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Speaking bar */}
        <AnimatePresence>
          {isSpeaking && (
            <div className="px-4 pb-2">
              <SpeakingBar onStop={stopSpeaking} />
            </div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="border-t border-border bg-card px-4 py-4">
          <div className="container mx-auto max-w-3xl flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoice}
              className={`flex-shrink-0 rounded-xl transition-all ${isListening ? "bg-destructive text-destructive-foreground border-destructive animate-pulse" : ""}`}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about farming, crops, diseases..."
              className="flex-1 p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="flex-shrink-0 rounded-xl px-5">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
