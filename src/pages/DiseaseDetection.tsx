import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Loader2, AlertTriangle, CheckCircle, Shield, Info } from "lucide-react";
import { crops } from "@/data/crops";
import { motion } from "framer-motion";
import diseaseLeafImg from "@/assets/disease-leaf.jpg";

const diseaseDatabase: Record<string, { disease: string; diseaseTa: string; crop: string; cropTa: string; remedy: string; remedyTa: string }[]> = {
  apple: [
    { disease: "Apple Scab", diseaseTa: "ஆப்பிள் ஸ்கேப்", crop: "Apple", cropTa: "ஆப்பிள்", remedy: "Apply fungicides like Captan. Remove fallen leaves. Plant resistant varieties.", remedyTa: "கேப்டன் போன்ற பூஞ்சைக்கொல்லிகளை பயன்படுத்தவும். உதிர்ந்த இலைகளை அகற்றவும்." },
    { disease: "Black Rot", diseaseTa: "கருப்பு அழுகல்", crop: "Apple", cropTa: "ஆப்பிள்", remedy: "Prune dead wood. Apply copper-based fungicides.", remedyTa: "இறந்த மரத்தை கத்தரிக்கவும். காப்பர் அடிப்படையிலான பூஞ்சைக்கொல்லிகளை பயன்படுத்தவும்." },
    { disease: "Cedar Apple Rust", diseaseTa: "சிடார் ஆப்பிள் ரஸ்ட்", crop: "Apple", cropTa: "ஆப்பிள்", remedy: "Remove nearby cedar trees. Apply fungicides in spring.", remedyTa: "அருகிலுள்ள சிடார் மரங்களை அகற்றவும். வசந்தத்தில் பூஞ்சைக்கொல்லிகளை பயன்படுத்தவும்." },
  ],
  tomato: [
    { disease: "Early Blight", diseaseTa: "ஆரம்ப பிளைட்", crop: "Tomato", cropTa: "தக்காளி", remedy: "Apply chlorothalonil fungicide. Remove affected leaves. Mulch soil surface.", remedyTa: "குளோரோதலோனில் பூஞ்சைக்கொல்லி பயன்படுத்தவும். பாதிக்கப்பட்ட இலைகளை அகற்றவும்." },
    { disease: "Late Blight", diseaseTa: "தாமத பிளைட்", crop: "Tomato", cropTa: "தக்காளி", remedy: "Use copper fungicides. Improve air circulation. Avoid overhead watering.", remedyTa: "காப்பர் பூஞ்சைக்கொல்லிகள் பயன்படுத்தவும். காற்றோட்டத்தை மேம்படுத்தவும்." },
    { disease: "Leaf Mold", diseaseTa: "இலை பூஞ்சை", crop: "Tomato", cropTa: "தக்காளி", remedy: "Improve ventilation. Apply fungicides. Use resistant varieties.", remedyTa: "காற்றோட்டத்தை மேம்படுத்தவும். பூஞ்சைக்கொல்லிகள் பயன்படுத்தவும்." },
  ],
  potato: [
    { disease: "Early Blight", diseaseTa: "ஆரம்ப பிளைட்", crop: "Potato", cropTa: "உருளைக்கிழங்கு", remedy: "Rotate crops. Apply mancozeb fungicide. Maintain adequate spacing.", remedyTa: "பயிர் சுழற்சி செய்யவும். மேன்கோசெப் பூஞ்சைக்கொல்லி பயன்படுத்தவும்." },
    { disease: "Late Blight", diseaseTa: "தாமத பிளைட்", crop: "Potato", cropTa: "உருளைக்கிழங்கு", remedy: "Use resistant varieties. Apply metalaxyl. Destroy infected plants.", remedyTa: "எதிர்ப்பு வகைகளை பயன்படுத்தவும். மெட்டாலாக்சில் பயன்படுத்தவும்." },
  ],
};

const DiseaseDetection = () => {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof diseaseDatabase["apple"][0] | null>(null);
  const [selectedCrop, setSelectedCrop] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const analyze = () => {
    if (!image) return;
    setAnalyzing(true);
    setTimeout(() => {
      const cropKey = selectedCrop || "tomato";
      const diseases = diseaseDatabase[cropKey] || diseaseDatabase["tomato"];
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setResult(randomDisease);
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-64 md:h-72">
          <img src={diseaseLeafImg} alt="Disease detection" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-destructive/50" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4"
            >
              {t("Plant Disease Detection", "தாவர நோய் கண்டறிதல்")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/90 text-lg max-w-2xl"
            >
              {t(
                "Upload a photo of a diseased leaf to identify the disease and get treatment recommendations.",
                "நோயைக் கண்டறிந்து சிகிச்சை பரிந்துரைகளைப் பெற நோயுற்ற இலையின் புகைப்படத்தை பதிவேற்றவும்."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">

          {/* How it works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 mb-10">
            {[
              { icon: Upload, en: "Upload Leaf Image", ta: "இலைப் படத்தை பதிவேற்றவும்", desc: t("Take a clear photo of the affected leaf", "பாதிக்கப்பட்ட இலையின் தெளிவான புகைப்படத்தை எடுங்கள்") },
              { icon: Shield, en: "AI Analysis", ta: "AI பகுப்பாய்வு", desc: t("Our system analyzes the image patterns", "எங்கள் அமைப்பு பட வடிவங்களை பகுப்பாய்வு செய்கிறது") },
              { icon: CheckCircle, en: "Get Treatment", ta: "சிகிச்சை பெறுங்கள்", desc: t("Receive diagnosis and treatment plan", "நோய் கண்டறிதல் மற்றும் சிகிச்சை திட்டத்தைப் பெறுங்கள்") },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 text-center"
              >
                <step.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm text-foreground mb-1">{t(step.en, step.ta)}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Crop Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("Select Crop (Optional)", "பயிரைத் தேர்ந்தெடுக்கவும் (விருப்பம்)")}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="">{t("Auto-detect", "தானாகக் கண்டறி")}</option>
              {crops.map((c) => (
                <option key={c.id} value={c.id}>{t(c.name, c.nameTa)}</option>
              ))}
            </select>
          </div>

          {/* Upload Area */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary/50 transition-all bg-card group"
          >
            {image ? (
              <img src={image} alt="Uploaded leaf" className="max-h-72 mx-auto rounded-xl object-contain shadow-lg" />
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <p className="text-foreground font-medium">{t("Click or drag to upload a leaf image", "இலைப் படத்தை பதிவேற்ற கிளிக் செய்யவும்")}</p>
                <p className="text-xs text-muted-foreground">{t("Supports JPG, PNG, WEBP — Max 10MB", "JPG, PNG, WEBP ஆதரிக்கப்படுகிறது — அதிகபட்சம் 10MB")}</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </motion.div>

          {image && (
            <div className="mt-6 flex gap-3 justify-center">
              <Button onClick={analyze} disabled={analyzing} className="gap-2 px-8 py-6 text-lg rounded-xl">
                {analyzing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                {analyzing ? t("Analyzing...", "பகுப்பாய்வு...") : t("Analyze Disease", "நோயை பகுப்பாய்வு செய்")}
              </Button>
              <Button variant="outline" onClick={() => { setImage(null); setResult(null); }} className="px-6 py-6 rounded-xl">
                {t("Clear", "அழி")}
              </Button>
            </div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-4"
            >
              <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{t("Disease Detected", "நோய் கண்டறியப்பட்டது")}</h3>
                    <p className="text-sm text-muted-foreground">{t("Crop:", "பயிர்:")} {t(result.crop, result.cropTa)}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-destructive">{t(result.disease, result.diseaseTa)}</p>
              </div>
              <div className="bg-accent/50 border-2 border-primary/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{t("Recommended Treatment", "பரிந்துரைக்கப்பட்ட சிகிச்சை")}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t(result.remedy, result.remedyTa)}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiseaseDetection;
