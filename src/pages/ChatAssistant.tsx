import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Mic, MicOff, Loader2, Leaf, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Simulated local AI responses for farming questions
const farmingKnowledge: Record<string, { en: string; ta: string }> = {
  default: {
    en: "I'm AgriSync's AI farming assistant! I can help you with:\n\n- **Crop selection** based on your soil and climate\n- **Disease identification** and treatment\n- **Fertilizer recommendations**\n- **Weather-based farming advice**\n- **Best practices** for 14+ crops\n\nWhat would you like to know?",
    ta: "நான் அக்ரிசிங்க்-ன் AI விவசாய உதவியாளர்! நான் உங்களுக்கு உதவ முடியும்:\n\n- உங்கள் மண் மற்றும் காலநிலை அடிப்படையில் **பயிர் தேர்வு**\n- **நோய் கண்டறிதல்** மற்றும் சிகிச்சை\n- **உர பரிந்துரைகள்**\n- **வானிலை அடிப்படையிலான விவசாய ஆலோசனை**\n\nநீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?"
  },
  tomato: {
    en: "## Growing Tomatoes 🍅\n\n**Best Season:** March - August\n**Soil:** Rich, well-drained loam (pH 6.0-6.8)\n**Water:** 1-2 inches per week\n\n### Key Tips:\n1. **Staking** — Support plants with cages or stakes\n2. **Mulching** — Use straw mulch to retain moisture\n3. **Pruning** — Remove suckers for better fruit production\n4. **Watering** — Water at base, avoid wetting leaves\n\n### Common Diseases:\n- Early Blight → Apply chlorothalonil\n- Late Blight → Use copper fungicides\n- Blossom End Rot → Add calcium, consistent watering",
    ta: "## தக்காளி வளர்ப்பு 🍅\n\n**சிறந்த பருவம்:** மார்ச் - ஆகஸ்ட்\n**மண்:** செழிப்பான, நல்ல வடிகால் களிமண்\n\n### முக்கிய குறிப்புகள்:\n1. செடிகளை கம்பம் அடிக்கவும்\n2. ஈரப்பதத்தை தக்கவைக்க மல்ச் பயன்படுத்தவும்\n3. சிறந்த பழ உற்பத்திக்கு பக்கக்கிளைகளை அகற்றவும்"
  },
  rice: {
    en: "## Rice Cultivation 🌾\n\n**Best Season:** Kharif (June-October)\n**Soil:** Clayey, loamy soil with good water retention\n**Water:** Standing water 2-5 cm during growing period\n\n### Key Practices:\n1. **SRI Method** — System of Rice Intensification for 20-30% more yield\n2. **Nursery** — Raise seedlings for 20-25 days before transplanting\n3. **Spacing** — 25×25 cm for SRI method\n4. **Fertilizer** — Apply NPK 120:60:40 kg/ha\n\n### Disease Management:\n- Blast → Apply Tricyclazole\n- Brown spot → Use Mancozeb\n- Sheath blight → Apply Validamycin",
    ta: "## நெல் சாகுபடி 🌾\n\n**சிறந்த பருவம்:** காரிஃப் (ஜூன்-அக்டோபர்)\n**மண்:** களிமண், நல்ல நீர் தக்கவைப்பு\n\nSRI முறை 20-30% அதிக மகசூல் தரும்."
  },
  fertilizer: {
    en: "## Fertilizer Guide 🧪\n\n### Understanding NPK:\n- **N (Nitrogen):** Leaf & stem growth → Use Urea (46-0-0)\n- **P (Phosphorus):** Root & flower development → Use DAP (18-46-0)\n- **K (Potassium):** Disease resistance → Use MOP (0-0-60)\n\n### Application Tips:\n1. Always do soil test first\n2. Apply in split doses\n3. Water immediately after application\n4. Mix organic + chemical for best results\n5. Avoid during heavy rain",
    ta: "## உர வழிகாட்டி 🧪\n\n### NPK புரிந்துகொள்ளுதல்:\n- **N:** இலை & தண்டு வளர்ச்சி → யூரியா\n- **P:** வேர் & பூ வளர்ச்சி → DAP\n- **K:** நோய் எதிர்ப்பு → MOP\n\nமண் பரிசோதனை செய்த பின் உரம் போடவும்."
  },
  weather: {
    en: "## Weather & Farming Advisory 🌤️\n\n### General Weather Tips:\n- **Hot weather (>35°C):** Irrigate early morning/late evening. Use mulch.\n- **Rainy season:** Watch for fungal diseases. Ensure drainage.\n- **Cold weather:** Protect seedlings with covers. Avoid transplanting.\n- **Windy days:** Stake tall plants. Don't spray pesticides.\n\n### Seasonal Planning:\n- **Kharif (Jun-Oct):** Plant rice, cotton, maize\n- **Rabi (Nov-Mar):** Plant wheat, potato, mustard\n- **Zaid (Mar-Jun):** Plant watermelon, cucumber",
    ta: "## வானிலை & விவசாய ஆலோசனை 🌤️\n\nவெப்பமான நாட்கள்: அதிகாலை நீர் ஊற்றவும்.\nமழைக்காலம்: பூஞ்சை நோய்களை கண்காணிக்கவும்."
  },
  disease: {
    en: "## Plant Disease Guide 🔍\n\n### How to Identify Diseases:\n1. **Leaf spots** — Brown/yellow patches → Fungal infection\n2. **Wilting** — Plants drooping despite water → Bacterial wilt\n3. **Mosaic patterns** — Discolored leaf patterns → Viral disease\n4. **White powder** — On leaf surface → Powdery mildew\n\n### Prevention:\n- Rotate crops every season\n- Use disease-resistant varieties\n- Maintain proper spacing\n- Remove infected plants immediately\n- Apply preventive fungicides",
    ta: "## தாவர நோய் வழிகாட்டி 🔍\n\nஇலைப் புள்ளிகள், வாடல், மொசைக் வடிவங்கள் போன்ற அறிகுறிகளை கவனியுங்கள்.\nபயிர் சுழற்சி செய்து நோய் எதிர்ப்பு வகைகளை பயன்படுத்துங்கள்."
  },
};

const getResponse = (input: string, lang: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("tomato") || lower.includes("தக்காளி")) return lang === "en" ? farmingKnowledge.tomato.en : farmingKnowledge.tomato.ta;
  if (lower.includes("rice") || lower.includes("நெல்") || lower.includes("அரிசி")) return lang === "en" ? farmingKnowledge.rice.en : farmingKnowledge.rice.ta;
  if (lower.includes("fertilizer") || lower.includes("உரம்")) return lang === "en" ? farmingKnowledge.fertilizer.en : farmingKnowledge.fertilizer.ta;
  if (lower.includes("weather") || lower.includes("வானிலை")) return lang === "en" ? farmingKnowledge.weather.en : farmingKnowledge.weather.ta;
  if (lower.includes("disease") || lower.includes("நோய்")) return lang === "en" ? farmingKnowledge.disease.en : farmingKnowledge.disease.ta;
  return lang === "en" ? farmingKnowledge.default.en : farmingKnowledge.default.ta;
};

const ChatAssistant = () => {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: lang === "en" ? farmingKnowledge.default.en : farmingKnowledge.default.ta,
      }]);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(userMsg.content, lang);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1500);
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert(t("Speech recognition not supported in this browser", "இந்த உலாவியில் குரல் அங்கீகாரம் ஆதரிக்கப்படவில்லை"));
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "en" ? "en-US" : "ta-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const quickPrompts = [
    { en: "How to grow tomatoes?", ta: "தக்காளி எவ்வாறு வளர்ப்பது?" },
    { en: "Best fertilizer for rice?", ta: "நெல்லுக்கு சிறந்த உரம்?" },
    { en: "How to identify plant diseases?", ta: "தாவர நோய்களை எவ்வாறு கண்டறிவது?" },
    { en: "Weather tips for farming", ta: "விவசாயத்திற்கான வானிலை குறிப்புகள்" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/30 border-b border-border px-4 py-4">
          <div className="container mx-auto max-w-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground text-lg">{t("AgriSync AI Assistant", "அக்ரிசிங்க் AI உதவியாளர்")}</h1>
                <p className="text-xs text-muted-foreground">{t("Ask anything about farming", "விவசாயம் பற்றி எதையும் கேளுங்கள்")}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setMessages([{ id: "welcome", role: "assistant", content: lang === "en" ? farmingKnowledge.default.en : farmingKnowledge.default.ta }])}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="container mx-auto max-w-3xl space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border rounded-bl-md"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none text-foreground">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-primary" />
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

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-3">
            <div className="container mx-auto max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(t(p.en, p.ta)); }}
                    className="text-xs px-3 py-2 bg-accent rounded-full text-accent-foreground hover:bg-accent/80 transition-colors"
                  >
                    {t(p.en, p.ta)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-border bg-card px-4 py-4">
          <div className="container mx-auto max-w-3xl flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoice}
              className={`flex-shrink-0 rounded-xl ${isListening ? "bg-destructive text-destructive-foreground border-destructive" : ""}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t("Ask about farming, crops, diseases...", "விவசாயம், பயிர்கள், நோய்கள் பற்றி கேளுங்கள்...")}
              className="flex-1 p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={isLoading}
            />
            <Button onClick={sendMessage} disabled={!input.trim() || isLoading} className="flex-shrink-0 rounded-xl px-5">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
