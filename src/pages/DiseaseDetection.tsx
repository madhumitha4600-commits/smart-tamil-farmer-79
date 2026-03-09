import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { crops } from "@/data/crops";

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
    // Simulate AI analysis
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
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="section-title text-foreground mt-8">
            {t("Plant Disease Detection", "தாவர நோய் கண்டறிதல்")}
          </h1>
          <p className="section-subtitle">
            {t(
              "Upload a photo of a diseased leaf to identify the disease and get treatment recommendations.",
              "நோயைக் கண்டறிந்து சிகிச்சை பரிந்துரைகளைப் பெற நோயுற்ற இலையின் புகைப்படத்தை பதிவேற்றவும்."
            )}
          </p>

          {/* Crop Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("Select Crop (Optional)", "பயிரைத் தேர்ந்தெடுக்கவும் (விருப்பம்)")}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-card text-foreground"
            >
              <option value="">{t("Auto-detect", "தானாகக் கண்டறி")}</option>
              {crops.map((c) => (
                <option key={c.id} value={c.id}>{t(c.name, c.nameTa)}</option>
              ))}
            </select>
          </div>

          {/* Upload Area */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-card"
          >
            {image ? (
              <img src={image} alt="Uploaded leaf" className="max-h-64 mx-auto rounded-lg object-contain" />
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">{t("Click or drag to upload a leaf image", "இலைப் படத்தை பதிவேற்ற கிளிக் செய்யவும்")}</p>
                <p className="text-xs text-muted-foreground">{t("Supports JPG, PNG, WEBP", "JPG, PNG, WEBP ஆதரிக்கப்படுகிறது")}</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </div>

          {image && (
            <div className="mt-4 flex gap-3 justify-center">
              <Button onClick={analyze} disabled={analyzing} className="gap-2">
                {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                {analyzing ? t("Analyzing...", "பகுப்பாய்வு...") : t("Analyze Disease", "நோயை பகுப்பாய்வு செய்")}
              </Button>
              <Button variant="outline" onClick={() => { setImage(null); setResult(null); }}>
                {t("Clear", "அழி")}
              </Button>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 space-y-4 animate-fade-in-up">
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="font-bold text-foreground">{t("Disease Detected", "நோய் கண்டறியப்பட்டது")}</h3>
                </div>
                <p className="text-lg font-semibold text-destructive mb-1">{t(result.disease, result.diseaseTa)}</p>
                <p className="text-sm text-muted-foreground">{t("Crop:", "பயிர்:")} {t(result.crop, result.cropTa)}</p>
              </div>
              <div className="bg-accent/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">{t("Recommended Treatment", "பரிந்துரைக்கப்பட்ட சிகிச்சை")}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t(result.remedy, result.remedyTa)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiseaseDetection;
