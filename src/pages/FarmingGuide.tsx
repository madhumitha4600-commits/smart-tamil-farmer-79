import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { crops } from "@/data/crops";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Droplets, Thermometer, Clock, Leaf } from "lucide-react";

const FarmingGuide = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="section-title text-foreground mt-8">
            {t("Smart Farming Guide", "ஸ்மார்ட் விவசாய வழிகாட்டி")}
          </h1>
          <p className="section-subtitle">
            {t(
              "Complete growing guidance for 14 crops — from planting to harvest. Click any crop for detailed information.",
              "14 பயிர்களுக்கான முழுமையான வளர்ப்பு வழிகாட்டுதல் — நடவு முதல் அறுவடை வரை."
            )}
          </p>

          {/* General Tips */}
          <div className="bg-accent/50 rounded-xl p-6 mb-12 border border-border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <Leaf className="h-5 w-5 text-primary" />
              {t("General Farming Tips", "பொதுவான விவசாய குறிப்புகள்")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>✅ {t("Test your soil before every season", "ஒவ்வொரு பருவத்திற்கும் முன் உங்கள் மண்ணை சோதிக்கவும்")}</li>
                <li>✅ {t("Practice crop rotation to maintain soil health", "மண் ஆரோக்கியத்தை பராமரிக்க பயிர் சுழற்சி செய்யவும்")}</li>
                <li>✅ {t("Use organic mulch to retain moisture", "ஈரப்பதத்தை தக்கவைக்க இயற்கை மல்ச் பயன்படுத்தவும்")}</li>
                <li>✅ {t("Monitor weather forecasts regularly", "வானிலை முன்னறிவிப்புகளை தொடர்ந்து கண்காணிக்கவும்")}</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ {t("Adopt integrated pest management (IPM)", "ஒருங்கிணைந்த பூச்சி மேலாண்மையை (IPM) ஏற்றுக்கொள்ளுங்கள்")}</li>
                <li>✅ {t("Use drip irrigation to save water", "நீரை சேமிக்க சொட்டு நீர் பாசனம் பயன்படுத்தவும்")}</li>
                <li>✅ {t("Maintain proper spacing between plants", "செடிகளுக்கு இடையே சரியான இடைவெளியை பராமரிக்கவும்")}</li>
                <li>✅ {t("Keep farm records for better planning", "சிறந்த திட்டமிடலுக்கு பண்ணை பதிவுகளை வைக்கவும்")}</li>
              </ul>
            </div>
          </div>

          {/* Crop Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {crops.map((crop, i) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link to={`/crop/${crop.id}`}>
                  <div className="crop-card bg-card border border-border p-5 text-center group">
                    <div className="text-4xl mb-3">{crop.emoji}</div>
                    <h3 className="font-semibold text-sm text-foreground">{t(crop.name, crop.nameTa)}</h3>
                    <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("View Guide", "வழிகாட்டி")} <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmingGuide;
