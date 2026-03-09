import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { crops } from "@/data/crops";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Droplets, Sun, Clock, Bug, Lightbulb, Layers } from "lucide-react";

const CropDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const crop = crops.find((c) => c.id === id);

  if (!crop) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-xl text-muted-foreground">{t("Crop not found", "பயிர் கிடைக்கவில்லை")}</p>
          <Link to="/farming-guide" className="text-primary underline mt-4 inline-block">{t("Back to Guide", "வழிகாட்டிக்கு திரும்பு")}</Link>
        </div>
      </div>
    );
  }

  const infoCards = [
    { icon: Sun, label: t("Season", "பருவம்"), value: t(crop.season, crop.seasonTa) },
    { icon: Layers, label: t("Soil Type", "மண் வகை"), value: t(crop.soilType, crop.soilTypeTa) },
    { icon: Droplets, label: t("Water Needs", "நீர் தேவை"), value: t(crop.waterNeeds, crop.waterNeedsTa) },
    { icon: Clock, label: t("Growth Duration", "வளர்ச்சி காலம்"), value: crop.growthDuration },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/farming-guide" className="inline-flex items-center gap-2 text-primary hover:underline mt-6 mb-6 text-sm">
            <ArrowLeft className="h-4 w-4" /> {t("Back to Guide", "வழிகாட்டிக்கு திரும்பு")}
          </Link>

          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">{crop.emoji}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t(crop.name, crop.nameTa)}</h1>
          </div>

          <p className="text-muted-foreground text-center text-lg mb-8 max-w-2xl mx-auto">
            {t(crop.description, crop.descriptionTa)}
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {infoCards.map((card) => (
              <div key={card.label} className="bg-card border border-border rounded-xl p-4 text-center">
                <card.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
                <div className="text-sm font-semibold text-foreground">{card.value}</div>
              </div>
            ))}
          </div>

          {/* Diseases */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 mb-6">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2 text-foreground">
              <Bug className="h-5 w-5 text-destructive" />
              {t("Common Diseases", "பொதுவான நோய்கள்")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {(t("en", "ta") === "en" ? crop.diseases : crop.diseasesTa).map((d) => (
                <span key={d} className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm">{d}</span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-accent/50 border border-border rounded-xl p-6">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2 text-foreground">
              <Lightbulb className="h-5 w-5 text-gold" />
              {t("Growing Tips", "வளர்ப்பு குறிப்புகள்")}
            </h2>
            <ul className="space-y-2">
              {(t("en", "ta") === "en" ? crop.tips : crop.tipsTa).map((tip) => (
                <li key={tip} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropDetail;
