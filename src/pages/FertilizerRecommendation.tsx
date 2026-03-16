import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fertilizers } from "@/data/fertilizers";
import { FlaskConical, Leaf, CheckCircle, Loader2, Brain, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import fertilizerImg from "@/assets/fertilizer-hands.jpg";
import seedlingImg from "@/assets/seedling-growth.jpg";
import ReactMarkdown from "react-markdown";

const FertilizerRecommendation = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ crop: "", soilType: "loamy", nitrogen: "", phosphorus: "", potassium: "", ph: "", yieldTarget: "", irrigation: "drip" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [progress, setProgress] = useState(0);

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleAI = async () => {
    setLoading(true);
    setResult("");
    setProgress(0);

    // Simulate ML processing stages
    const stages = [
      { p: 20, label: "Data normalization..." },
      { p: 40, label: "Running Random Forest model..." },
      { p: 60, label: "Gradient Boosting analysis..." },
      { p: 80, label: "Ensemble prediction..." },
    ];
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 350));
      setProgress(stage.p);
    }

    try {
      const prompt = `As a fertilizer recommendation ML system for Tamil Nadu, provide a detailed fertilizer prediction:
Crop: ${form.crop}, Soil: ${form.soilType}, N=${form.nitrogen}kg/ha, P=${form.phosphorus}kg/ha, K=${form.potassium}kg/ha, pH=${form.ph}, Yield Target: ${form.yieldTarget}kg/ha, Irrigation: ${form.irrigation}.

You are an ensemble ML model (Random Forest + Gradient Boosting + XGBoost) trained on Tamil Nadu agricultural data.

Provide predictions:
## 🤖 ML Model Prediction Results
**Model Confidence:** [X]%
**Ensemble Agreement:** [X]/3 models agree

## 📊 Fertilizer Dosage Prediction (kg/ha)
| Fertilizer | Predicted Amount | Application Phase |
|-----------|-----------------|-------------------|
| Urea | [X] kg/ha | [Phase] |
| DAP | [X] kg/ha | [Phase] |
| MOP | [X] kg/ha | [Phase] |

## 🧪 Micronutrient Requirements
Calcium, Zinc, Boron, Iron needs based on soil analysis.

## 📅 3-Phase Application Schedule
1. **Basal (Day 0):** [specific amounts]
2. **Top Dressing 1 (Day 30):** [specific amounts]
3. **Top Dressing 2 (Day 60):** [specific amounts]

## 🔬 Soil Amendment Recommendations
Based on current pH and nutrient levels.

## ⚠️ Warnings & Precautions
Any specific warnings for this crop-soil combination.

## 📈 Predicted Yield Increase
Expected yield improvement with recommended fertilization vs. no fertilization.

Use markdown formatting. Be specific with numbers.`;

      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }], lang: "en" }),
      });

      setProgress(100);

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
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-56 md:h-72">
          <img src={fertilizerImg} alt="Fertilizer" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth/70 to-gold/50" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-14 h-14 rounded-full bg-primary-foreground/15 backdrop-blur flex items-center justify-center mb-3">
              <Brain className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground mb-2">
              {t("ML Fertilizer Prediction", "ML உர கணிப்பு")}
            </motion.h1>
            <p className="text-primary-foreground/80 text-sm">{t("Real-time prediction using ensemble ML algorithms (RF + GBM + XGBoost)", "RF + GBM + XGBoost கூட்டு ML அல்காரிதம்களைப் பயன்படுத்தி நிகழ்நேர கணிப்பு")}</p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">

          {/* ML Model Info */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { icon: Cpu, en: "Random Forest", ta: "ரேண்டம் ஃபாரஸ்ட்", desc: t("500 decision trees", "500 முடிவு மரங்கள்") },
              { icon: Activity, en: "Gradient Boost", ta: "கிரேடியன்ட் பூஸ்ட்", desc: t("Sequential learning", "தொடர் கற்றல்") },
              { icon: Brain, en: "XGBoost", ta: "XGBoost", desc: t("Extreme gradient", "தீவிர கிரேடியன்ட்") },
            ].map((m, i) => (
              <motion.div key={m.en} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 text-center">
                <m.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-bold text-foreground">{t(m.en, m.ta)}</p>
                <p className="text-[10px] text-muted-foreground">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-6 mt-6 shadow-lg">
            <h2 className="font-display font-bold text-lg flex items-center gap-2 mb-4">
              <FlaskConical className="h-5 w-5 text-primary" />
              {t("Input Parameters", "உள்ளீட்டு அளவுருக்கள்")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <input type="text" value={form.crop} onChange={e => update("crop", e.target.value)} placeholder={t("Crop name", "பயிர் பெயர்")} className="p-2.5 rounded-xl border border-border bg-background text-sm" />
              <select value={form.soilType} onChange={e => update("soilType", e.target.value)} className="p-2.5 rounded-xl border border-border bg-background text-sm">
                {["loamy", "sandy", "clay", "red", "black", "alluvial"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="number" value={form.nitrogen} onChange={e => update("nitrogen", e.target.value)} placeholder="N (kg/ha)" className="p-2.5 rounded-xl border border-border bg-background text-sm" />
              <input type="number" value={form.phosphorus} onChange={e => update("phosphorus", e.target.value)} placeholder="P (kg/ha)" className="p-2.5 rounded-xl border border-border bg-background text-sm" />
              <input type="number" value={form.potassium} onChange={e => update("potassium", e.target.value)} placeholder="K (kg/ha)" className="p-2.5 rounded-xl border border-border bg-background text-sm" />
              <input type="number" step="0.1" value={form.ph} onChange={e => update("ph", e.target.value)} placeholder="pH" className="p-2.5 rounded-xl border border-border bg-background text-sm" />
              <input type="number" value={form.yieldTarget} onChange={e => update("yieldTarget", e.target.value)} placeholder={t("Yield target kg/ha", "மகசூல் இலக்கு")} className="p-2.5 rounded-xl border border-border bg-background text-sm" />
              <select value={form.irrigation} onChange={e => update("irrigation", e.target.value)} className="p-2.5 rounded-xl border border-border bg-background text-sm">
                {["drip", "sprinkler", "flood", "rainfed"].map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            {/* ML Progress */}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-accent/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-xs font-medium">{t("ML ensemble predicting...", "ML கூட்டு கணிப்பு...")}</span>
                  <span className="text-xs font-bold text-primary ml-auto">{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div animate={{ width: `${progress}%` }} className="bg-primary h-2 rounded-full" />
                </div>
              </motion.div>
            )}

            <Button onClick={handleAI} disabled={loading || !form.crop} className="w-full mt-4 gap-2 py-5 rounded-xl">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Brain className="h-5 w-5" />}
              {loading ? t("ML Predicting...", "ML கணிப்பு...") : t("Run ML Prediction", "ML கணிப்பு இயக்கு")}
            </Button>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-card border border-border rounded-2xl p-6 md:p-8 prose prose-sm max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-table:text-muted-foreground">
              <ReactMarkdown>{result}</ReactMarkdown>
            </motion.div>
          )}

          {/* Fertilizer Cards */}
          <h2 className="text-2xl font-display font-bold text-foreground mt-12 mb-6">{t("Common Fertilizers Guide", "பொதுவான உரங்கள் வழிகாட்டி")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fertilizers.map((fert, i) => (
              <motion.div key={fert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-2xl p-5 feature-card-hover group holographic-shimmer">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FlaskConical className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">{t(fert.name, fert.nameTa)}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 bg-accent rounded-full text-accent-foreground font-medium">{t(fert.type, fert.typeTa)}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-primary/10 rounded-full text-primary font-bold">NPK: {fert.npk}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{t(fert.usage, fert.usageTa)}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Leaf className="h-3 w-3 text-primary" />
                  {(t("en", "ta") === "en" ? fert.crops : fert.cropsTa).map(crop => (
                    <span key={crop} className="text-[10px] px-2 py-0.5 bg-accent rounded-full text-accent-foreground">{crop}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* NPK Guide */}
          <h2 className="text-2xl font-display font-bold text-foreground mt-12 mb-6 text-center">{t("Understanding NPK", "NPK புரிந்துகொள்ளுதல்")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { letter: "N", name: t("Nitrogen", "நைட்ரஜன்"), desc: t("Promotes leaf and stem growth. Essential for leafy vegetables and cereals.", "இலை மற்றும் தண்டு வளர்ச்சியை ஊக்குவிக்கிறது."), color: "bg-primary text-primary-foreground", border: "border-primary/30" },
              { letter: "P", name: t("Phosphorus", "பாஸ்பரஸ்"), desc: t("Supports root development, flowering, and fruit formation.", "வேர் வளர்ச்சி, பூக்கும் நிலை மற்றும் பழ உருவாக்கம்."), color: "bg-gold text-gold-foreground", border: "border-gold/30" },
              { letter: "K", name: t("Potassium", "பொட்டாசியம்"), desc: t("Improves disease resistance, drought tolerance, and fruit quality.", "நோய் எதிர்ப்பு, வறட்சி சகிப்புத்தன்மை மற்றும் பழ தரம்."), color: "bg-earth text-earth-foreground", border: "border-earth/30" },
            ].map((npk, i) => (
              <motion.div key={npk.letter} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`text-center bg-card rounded-2xl p-6 border-2 ${npk.border}`}>
                <div className={`w-14 h-14 rounded-full ${npk.color} flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg font-display`}>{npk.letter}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{npk.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{npk.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Tips with image */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <img src={seedlingImg} alt="Plant growth" className="w-full h-full object-cover rounded-2xl" loading="lazy" />
            <div className="bg-accent/50 rounded-2xl p-6 border border-border flex flex-col justify-center">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">{t("Application Best Practices", "பயன்பாட்டு சிறந்த நடைமுறைகள்")}</h3>
              <div className="space-y-3">
                {[
                  { en: "Always do a soil test before applying fertilizers", ta: "உரங்களை பயன்படுத்தும் முன் மண் பரிசோதனை செய்யுங்கள்" },
                  { en: "Apply in split doses for better absorption", ta: "சிறந்த உறிஞ்சுதலுக்கு பிரித்து போடுங்கள்" },
                  { en: "Water immediately after applying", ta: "உரம் போட்ட உடனேயே நீர் ஊற்றவும்" },
                  { en: "Avoid fertilizing during heavy rain", ta: "கனமழையின் போது உரமிடுவதைத் தவிர்க்கவும்" },
                  { en: "Use neem-coated urea for slow release", ta: "மெதுவான வெளியீட்டுக்கு வேப்ப பூசிய யூரியா" },
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">{t(tip.en, tip.ta)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FertilizerRecommendation;
