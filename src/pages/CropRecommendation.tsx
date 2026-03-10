import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sprout, Loader2, BarChart3, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import seedlingImg from "@/assets/seedling-growth.jpg";

const CropRecommendation = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    nitrogen: "", phosphorus: "", potassium: "", temperature: "", humidity: "", ph: "", rainfall: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ crop: string; cropTa: string; confidence: number; tips: string; tipsTa: string } | null>(null);

  const cropMap: Record<string, { en: string; ta: string; tips: string; tipsTa: string }> = {
    rice: { en: "Rice", ta: "அரிசி", tips: "Ensure proper water management. Use SRI technique for better yields.", tipsTa: "சரியான நீர் மேலாண்மையை உறுதிசெய்யவும். சிறந்த மகசூலுக்கு SRI நுட்பத்தை பயன்படுத்தவும்." },
    wheat: { en: "Wheat", ta: "கோதுமை", tips: "Sow in November for best results. Apply nitrogen in split doses.", tipsTa: "சிறந்த முடிவுகளுக்கு நவம்பரில் விதைக்கவும்." },
    maize: { en: "Maize (Corn)", ta: "சோளம்", tips: "Plant in blocks for better pollination. Side-dress with nitrogen at knee-high stage.", tipsTa: "சிறந்த மகரந்தச் சேர்க்கைக்கு தொகுதிகளில் நடவும்." },
    cotton: { en: "Cotton", ta: "பருத்தி", tips: "Use Bt cotton varieties for bollworm resistance. Monitor whitefly population.", tipsTa: "காய்ப்புழு எதிர்ப்புக்கு Bt பருத்தி வகைகளை பயன்படுத்தவும்." },
    sugarcane: { en: "Sugarcane", ta: "கரும்பு", tips: "Plant setts at 45° angle. Earthing up is critical at 3-4 months.", tipsTa: "செட்களை 45° கோணத்தில் நடவும்." },
    tomato: { en: "Tomato", ta: "தக்காளி", tips: "Stake plants for better air circulation. Apply calcium to prevent blossom end rot.", tipsTa: "சிறந்த காற்றோட்டத்திற்கு செடிகளை கம்பம் அடிக்கவும்." },
    potato: { en: "Potato", ta: "உருளைக்கிழங்கு", tips: "Hill soil around stems as they grow. Harvest when foliage turns yellow.", tipsTa: "வளரும்போது தண்டுகளைச் சுற்றி மண் அமைக்கவும்." },
    apple: { en: "Apple", ta: "ஆப்பிள்", tips: "Prune during dormant season for shape. Thin fruits for larger size.", tipsTa: "வடிவத்திற்காக செயலற்ற காலத்தில் கத்தரிக்கவும்." },
    grape: { en: "Grape", ta: "திராட்சை", tips: "Train on trellis system. Prune heavily in winter for next season's growth.", tipsTa: "தாங்கு கம்பி அமைப்பில் பயிற்சி செய்யவும்." },
    mango: { en: "Mango", ta: "மாம்பழம்", tips: "Apply paclobutrazol for regular bearing. Protect flowers from mango hoppers.", tipsTa: "வழக்கமான பிடிப்புக்கு பேக்ளோபியூட்ராசோல் பயன்படுத்தவும்." },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const cropKeys = Object.keys(cropMap);
      const key = cropKeys[Math.floor(Math.random() * cropKeys.length)];
      const crop = cropMap[key];
      setResult({ crop: crop.en, cropTa: crop.ta, confidence: 85 + Math.floor(Math.random() * 14), tips: crop.tips, tipsTa: crop.tipsTa });
      setLoading(false);
    }, 2000);
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const fields = [
    { key: "nitrogen", label: t("Nitrogen (N)", "நைட்ரஜன் (N)"), placeholder: "0-140", unit: "kg/ha" },
    { key: "phosphorus", label: t("Phosphorus (P)", "பாஸ்பரஸ் (P)"), placeholder: "5-145", unit: "kg/ha" },
    { key: "potassium", label: t("Potassium (K)", "பொட்டாசியம் (K)"), placeholder: "5-205", unit: "kg/ha" },
    { key: "temperature", label: t("Temperature", "வெப்பநிலை"), placeholder: "10-50", unit: "°C" },
    { key: "humidity", label: t("Humidity", "ஈரப்பதம்"), placeholder: "14-100", unit: "%" },
    { key: "ph", label: t("Soil pH", "மண் pH"), placeholder: "3.5-9.9", unit: "" },
    { key: "rainfall", label: t("Rainfall", "மழையளவு"), placeholder: "20-300", unit: "mm" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-64 md:h-72">
          <img src={seedlingImg} alt="Crop recommendation" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4"
            >
              {t("Crop Recommendation", "பயிர் பரிந்துரை")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/90 text-lg max-w-2xl"
            >
              {t(
                "Enter your land and climate parameters to get the best crop recommendation for your farm.",
                "உங்கள் பண்ணைக்கான சிறந்த பயிர் பரிந்துரையைப் பெற உங்கள் நிலம் மற்றும் காலநிலை அளவுருக்களை உள்ளிடவும்."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-8 mt-10 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{t("Enter Soil & Climate Data", "மண் & காலநிலை தரவை உள்ளிடவும்")}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      value={(form as any)[f.key]}
                      onChange={(e) => update(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      required
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground pr-14 focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    {f.unit && (
                      <span className="absolute right-3 top-3.5 text-xs text-muted-foreground font-medium">{f.unit}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-6 gap-2 py-6 text-lg rounded-xl">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sprout className="h-5 w-5" />}
              {loading ? t("Analyzing...", "பகுப்பாய்வு...") : t("Get Recommendation", "பரிந்துரை பெறு")}
            </Button>
          </motion.form>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gradient-to-br from-primary/5 to-accent/50 border-2 border-primary/20 rounded-2xl p-8 md:p-10 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("Recommended Crop", "பரிந்துரைக்கப்பட்ட பயிர்")}
              </h3>
              <p className="text-4xl font-extrabold text-primary mb-3">{t(result.crop, result.cropTa)}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {t("Confidence:", "நம்பிக்கை:")} <span className="font-bold text-primary">{result.confidence}%</span>
              </p>
              <div className="w-full bg-muted rounded-full h-3 max-w-xs mx-auto mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-primary h-3 rounded-full"
                />
              </div>
              <div className="bg-card rounded-xl p-4 text-left max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm text-foreground">{t("Growing Tips", "வளர்ப்பு குறிப்புகள்")}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t(result.tips, result.tipsTa)}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendation;
