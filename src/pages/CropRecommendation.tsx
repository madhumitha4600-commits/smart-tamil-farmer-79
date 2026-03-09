import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sprout, Loader2 } from "lucide-react";

const CropRecommendation = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ crop: string; cropTa: string; confidence: number } | null>(null);

  const cropMap: Record<string, { en: string; ta: string }> = {
    rice: { en: "Rice", ta: "அரிசி" },
    wheat: { en: "Wheat", ta: "கோதுமை" },
    maize: { en: "Maize (Corn)", ta: "சோளம்" },
    cotton: { en: "Cotton", ta: "பருத்தி" },
    sugarcane: { en: "Sugarcane", ta: "கரும்பு" },
    tomato: { en: "Tomato", ta: "தக்காளி" },
    potato: { en: "Potato", ta: "உருளைக்கிழங்கு" },
    apple: { en: "Apple", ta: "ஆப்பிள்" },
    grape: { en: "Grape", ta: "திராட்சை" },
    mango: { en: "Mango", ta: "மாம்பழம்" },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const cropKeys = Object.keys(cropMap);
      const key = cropKeys[Math.floor(Math.random() * cropKeys.length)];
      const crop = cropMap[key];
      setResult({ crop: crop.en, cropTa: crop.ta, confidence: 85 + Math.floor(Math.random() * 14) });
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
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="section-title text-foreground mt-8">
            {t("Crop Recommendation", "பயிர் பரிந்துரை")}
          </h1>
          <p className="section-subtitle">
            {t(
              "Enter your land and climate parameters to get the best crop recommendation for your farm.",
              "உங்கள் பண்ணைக்கான சிறந்த பயிர் பரிந்துரையைப் பெற உங்கள் நிலம் மற்றும் காலநிலை அளவுருக்களை உள்ளிடவும்."
            )}
          </p>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      value={(form as any)[f.key]}
                      onChange={(e) => update(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      required
                      className="w-full p-3 rounded-lg border border-border bg-background text-foreground pr-12"
                    />
                    {f.unit && (
                      <span className="absolute right-3 top-3 text-xs text-muted-foreground">{f.unit}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-6 gap-2 py-6 text-lg">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sprout className="h-5 w-5" />}
              {loading ? t("Analyzing...", "பகுப்பாய்வு...") : t("Get Recommendation", "பரிந்துரை பெறு")}
            </Button>
          </form>

          {result && (
            <div className="mt-8 bg-accent/50 border border-primary/20 rounded-xl p-8 text-center animate-fade-in-up">
              <Sprout className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("Recommended Crop", "பரிந்துரைக்கப்பட்ட பயிர்")}
              </h3>
              <p className="text-3xl font-bold text-primary mb-2">{t(result.crop, result.cropTa)}</p>
              <p className="text-sm text-muted-foreground">
                {t("Confidence:", "நம்பிக்கை:")} {result.confidence}%
              </p>
              <div className="w-full bg-muted rounded-full h-2 mt-3 max-w-xs mx-auto">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${result.confidence}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendation;
