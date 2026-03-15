import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sprout, Loader2, Bot } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import seedlingImg from "@/assets/seedling-growth.jpg";

const CropRecommendation = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ nitrogen: 50, phosphorus: 50, potassium: 50, temperature: 28, humidity: 70, ph: 6.5, rainfall: 150 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const fields = [
    { key: "nitrogen", label: t("Nitrogen (N)", "நைட்ரஜன் (N)"), min: 0, max: 140, unit: "kg/ha" },
    { key: "phosphorus", label: t("Phosphorus (P)", "பாஸ்பரஸ் (P)"), min: 0, max: 145, unit: "kg/ha" },
    { key: "potassium", label: t("Potassium (K)", "பொட்டாசியம் (K)"), min: 0, max: 205, unit: "kg/ha" },
    { key: "temperature", label: t("Temperature", "வெப்பநிலை"), min: 10, max: 50, unit: "°C" },
    { key: "humidity", label: t("Humidity", "ஈரப்பதம்"), min: 10, max: 100, unit: "%" },
    { key: "ph", label: t("Soil pH", "மண் pH"), min: 3, max: 10, unit: "", step: 0.1 },
    { key: "rainfall", label: t("Rainfall", "மழையளவு"), min: 0, max: 300, unit: "mm" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    try {
      const prompt = `As an agricultural AI for Tamil Nadu, analyze these soil & climate parameters and recommend the BEST crop:
N=${form.nitrogen}kg/ha, P=${form.phosphorus}kg/ha, K=${form.potassium}kg/ha, Temp=${form.temperature}°C, Humidity=${form.humidity}%, pH=${form.ph}, Rainfall=${form.rainfall}mm.

Provide:
1. **Top Recommended Crop** with match percentage and detailed reason
2. **5 Additional Crops** ranked by suitability with match % and brief reason
3. Growing tips for the top crop in Tamil Nadu conditions

Use markdown with headers and bold text.`;

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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-48 md:h-64">
          <img src={seedlingImg} alt="Crop recommendation" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-primary/65" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground mb-3">
              {t("AI Crop Recommendation", "AI பயிர் பரிந்துரை")}
            </motion.h1>
            <p className="text-primary-foreground/80">{t("7-parameter analysis with AI-powered matching", "AI மூலம் 7 அளவுரு பகுப்பாய்வு")}</p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mt-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Sprout className="h-6 w-6 text-primary" />
              <h2 className="font-display font-bold text-lg">{t("Adjust Parameters", "அளவுருக்களை சரிசெய்யவும்")}</h2>
            </div>
            <div className="space-y-5">
              {fields.map(f => (
                <div key={f.key}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-foreground">{f.label}</label>
                    <span className="text-sm font-bold text-primary">{(form as any)[f.key]}{f.unit}</span>
                  </div>
                  <Slider
                    value={[(form as any)[f.key]]}
                    min={f.min}
                    max={f.max}
                    step={(f as any).step || 1}
                    onValueChange={v => setForm(p => ({ ...p, [f.key]: v[0] }))}
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleSubmit} disabled={loading} className="w-full mt-6 gap-2 py-5 rounded-xl">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Bot className="h-5 w-5" />}
              {loading ? t("Analyzing...", "பகுப்பாய்வு...") : t("Get AI Recommendation", "AI பரிந்துரை பெறு")}
            </Button>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-8 prose prose-sm max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
              <ReactMarkdown>{result}</ReactMarkdown>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendation;
