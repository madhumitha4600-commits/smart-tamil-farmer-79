import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Loader2, Shield, CheckCircle, Bot } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import diseaseLeafImg from "@/assets/disease-leaf.jpg";

const DiseaseDetection = () => {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const crops = [
    "Rice", "Sugarcane", "Cotton", "Groundnut", "Tomato", "Onion",
    "Banana", "Coconut", "Maize", "Turmeric", "Chili", "Mango",
    "Apple", "Grape", "Potato", "Wheat",
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResult("");
  };

  const analyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    setResult("");
    try {
      const cropHint = selectedCrop ? `The crop is ${selectedCrop}.` : "Try to identify the crop from the image.";
      const prompt = `You are a plant pathology expert for Tamil Nadu farming. A farmer has uploaded a leaf image. ${cropHint}

Analyze and provide in this EXACT format:
## 🔬 Disease Identified
**Disease Name (English):** [name]
**நோய் பெயர் (Tamil):** [Tamil name]

## 📊 Analysis
- **Severity:** [High/Medium/Low] with color badge
- **Confidence:** [X]%

## 🔍 Symptoms
[List key symptoms]

## 🧪 Causes
[List probable causes]

## 💊 Treatment Steps
1. [Step 1 with specific chemical & dosage]
2. [Step 2]
3. [Step 3]

## 🛡️ Prevention Tips
[List prevention methods]

## 🧴 Recommended Chemicals
| Chemical | Dosage | Application |
|----------|--------|-------------|
| [Name] | [Amount] | [Method] |

## 🌿 Organic Control
[Organic alternatives]

Provide practical advice specific to Tamil Nadu conditions.`;

      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }], lang: "en" }),
      });

      if (!resp.ok || !resp.body) throw new Error("Failed");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "", full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx); buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try { const p = JSON.parse(json); const c = p.choices?.[0]?.delta?.content; if (c) { full += c; setResult(full); } } catch { break; }
        }
      }
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-48 md:h-64">
          <img src={diseaseLeafImg} alt="Disease detection" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-destructive/50" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground mb-3">
              {t("AI Disease Detection", "AI நோய் கண்டறிதல்")}
            </motion.h1>
            <p className="text-primary-foreground/80">{t("Upload a leaf photo for instant AI diagnosis", "உடனடி AI நோய் கண்டறிதலுக்கு இலை படத்தை பதிவேற்றவும்")}</p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          {/* Steps */}
          <div className="grid grid-cols-3 gap-3 mt-8 mb-6">
            {[
              { icon: Upload, en: "Upload Leaf", ta: "இலை பதிவேற்று" },
              { icon: Shield, en: "AI Analyzes", ta: "AI பகுப்பாய்வு" },
              { icon: CheckCircle, en: "Get Treatment", ta: "சிகிச்சை பெறு" },
            ].map((step, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
                <step.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">{t(step.en, step.ta)}</p>
              </div>
            ))}
          </div>

          {/* Crop Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5">{t("Select Crop (Optional)", "பயிர் (விருப்பம்)")}</label>
            <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-card text-sm">
              <option value="">{t("Auto-detect", "தானாகக் கண்டறி")}</option>
              {crops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Upload */}
          <motion.div whileHover={{ scale: 1.01 }} onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 transition-all bg-card group">
            {image ? (
              <img src={image} alt="Uploaded leaf" className="max-h-64 mx-auto rounded-xl object-contain shadow-lg" />
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="h-7 w-7 text-primary" />
                </div>
                <p className="text-foreground font-medium text-sm">{t("Click or drag to upload", "பதிவேற்ற கிளிக் செய்யவும்")}</p>
                <p className="text-xs text-muted-foreground">JPG, PNG, WEBP — Max 10MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </motion.div>

          {image && (
            <div className="mt-4 flex gap-3 justify-center">
              <Button onClick={analyze} disabled={analyzing} className="gap-2 px-6 py-5 rounded-xl">
                {analyzing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Bot className="h-5 w-5" />}
                {analyzing ? t("Analyzing...", "பகுப்பாய்வு...") : t("AI Analyze", "AI பகுப்பாய்வு")}
              </Button>
              <Button variant="outline" onClick={() => { setImage(null); setResult(""); }} className="rounded-xl">
                {t("Clear", "அழி")}
              </Button>
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-card border border-border rounded-2xl p-6 md:p-8 prose prose-sm max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-table:text-muted-foreground">
              <ReactMarkdown>{result}</ReactMarkdown>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiseaseDetection;
