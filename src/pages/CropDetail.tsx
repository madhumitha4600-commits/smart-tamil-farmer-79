import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { crops } from "@/data/crops";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Droplets, Sun, Clock, Bug, Lightbulb, Layers } from "lucide-react";
import { motion } from "framer-motion";

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
    { icon: Sun, label: t("Season", "பருவம்"), value: t(crop.season, crop.seasonTa), color: "bg-gold/10 text-gold" },
    { icon: Layers, label: t("Soil Type", "மண் வகை"), value: t(crop.soilType, crop.soilTypeTa), color: "bg-earth/10 text-earth" },
    { icon: Droplets, label: t("Water Needs", "நீர் தேவை"), value: t(crop.waterNeeds, crop.waterNeedsTa), color: "bg-sky/10 text-sky" },
    { icon: Clock, label: t("Growth Duration", "வளர்ச்சி காலம்"), value: crop.growthDuration, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero with emoji */}
      <section className="pt-16">
        <div className="bg-gradient-to-br from-primary/10 to-accent/30 py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/farming-guide" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
              <ArrowLeft className="h-4 w-4" /> {t("Back to Guide", "வழிகாட்டிக்கு திரும்பு")}
            </Link>
            <div className="text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-7xl md:text-8xl block mb-4"
              >
                {crop.emoji}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-extrabold text-foreground mb-4"
              >
                {t(crop.name, crop.nameTa)}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
              >
                {t(crop.description, crop.descriptionTa)}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-8 relative z-10 mb-10">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 text-center shadow-md"
              >
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mx-auto mb-3`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
                <div className="text-sm font-bold text-foreground">{card.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Diseases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-8 mb-6"
          >
            <h2 className="font-bold text-xl mb-4 flex items-center gap-3 text-foreground">
              <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                <Bug className="h-5 w-5 text-destructive" />
              </div>
              {t("Common Diseases", "பொதுவான நோய்கள்")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {(t("en", "ta") === "en" ? crop.diseases : crop.diseasesTa).map((d) => (
                <span key={d} className="px-4 py-2 bg-destructive/10 text-destructive rounded-xl text-sm font-medium">{d}</span>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-accent/50 border-2 border-primary/20 rounded-2xl p-8"
          >
            <h2 className="font-bold text-xl mb-4 flex items-center gap-3 text-foreground">
              <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-gold" />
              </div>
              {t("Growing Tips", "வளர்ப்பு குறிப்புகள்")}
            </h2>
            <div className="space-y-3">
              {(t("en", "ta") === "en" ? crop.tips : crop.tipsTa).map((tip, i) => (
                <motion.div
                  key={tip}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-card rounded-xl p-4"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropDetail;
