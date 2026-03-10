import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { crops } from "@/data/crops";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Droplets, Thermometer, Clock, Leaf, Sprout, Sun, Bug, Lightbulb, BookOpen } from "lucide-react";
import terracedImg from "@/assets/terraced-fields.jpg";
import seedlingImg from "@/assets/seedling-growth.jpg";

const FarmingGuide = () => {
  const { t } = useLanguage();

  const seasonalTips = [
    {
      season: t("Kharif (June–Oct)", "காரிஃப் (ஜூன்–அக்)"),
      cropsEn: "Rice, Cotton, Maize, Soybean, Groundnut",
      cropsTa: "அரிசி, பருத்தி, சோளம், சோயாபீன், நிலக்கடலை",
      tipsEn: ["Prepare fields before monsoon onset", "Use disease-resistant varieties", "Monitor for pest outbreaks in humid weather"],
      tipsTa: ["பருவமழை தொடங்கும் முன் வயல்களை தயார் செய்யுங்கள்", "நோய் எதிர்ப்பு வகைகளை பயன்படுத்துங்கள்", "ஈரப்பதமான வானிலையில் பூச்சி தாக்குதல்களை கண்காணிக்கவும்"],
      color: "bg-primary/10 border-primary/30",
      icon: "🌧️",
    },
    {
      season: t("Rabi (Nov–Mar)", "ரபி (நவ–மார்)"),
      cropsEn: "Wheat, Potato, Tomato, Mustard, Peas",
      cropsTa: "கோதுமை, உருளைக்கிழங்கு, தக்காளி, கடுகு, பட்டாணி",
      tipsEn: ["Ensure adequate irrigation", "Apply basal fertilizers at sowing", "Protect crops from frost damage"],
      tipsTa: ["போதுமான நீர்ப்பாசனம் உறுதிசெய்யவும்", "விதைப்பின் போது அடி உரங்களை போடவும்", "பனி சேதத்திலிருந்து பயிர்களை பாதுகாக்கவும்"],
      color: "bg-sky/10 border-sky/30",
      icon: "❄️",
    },
    {
      season: t("Zaid (Mar–Jun)", "ஜாய்ட் (மார்–ஜூன்)"),
      cropsEn: "Watermelon, Cucumber, Muskmelon, Moong",
      cropsTa: "தர்பூசணி, வெள்ளரிக்காய், முலாம்பழம், பாசிப்பயறு",
      tipsEn: ["Ensure frequent irrigation in hot weather", "Use mulching to conserve moisture", "Harvest early morning to avoid heat stress"],
      tipsTa: ["வெப்பமான வானிலையில் அடிக்கடி நீர்ப்பாசனம் செய்யுங்கள்", "ஈரப்பதத்தை பாதுகாக்க மல்ச்சிங் பயன்படுத்துங்கள்", "வெப்ப அழுத்தத்தைத் தவிர்க்க அதிகாலையில் அறுவடை செய்யுங்கள்"],
      color: "bg-gold/10 border-gold/30",
      icon: "☀️",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img src={terracedImg} alt="Farming fields" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4"
            >
              {t("Smart Farming Guide", "ஸ்மார்ட் விவசாய வழிகாட்டி")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/90 text-lg max-w-2xl"
            >
              {t(
                "Complete growing guidance for 14 crops — from planting to harvest. Click any crop for detailed information.",
                "14 பயிர்களுக்கான முழுமையான வளர்ப்பு வழிகாட்டுதல் — நடவு முதல் அறுவடை வரை."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">

          {/* Seasonal Farming Calendar */}
          <div className="mt-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-primary" />
              {t("Seasonal Farming Calendar", "பருவகால விவசாய நாட்காட்டி")}
            </h2>
            <p className="text-muted-foreground mb-8">{t("Plan your crops according to the right season for maximum yield.", "அதிகபட்ச மகசூலுக்கு சரியான பருவத்தின்படி உங்கள் பயிர்களை திட்டமிடுங்கள்.")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {seasonalTips.map((s, i) => (
                <motion.div
                  key={s.season}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border-2 ${s.color} p-6`}
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.season}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    <span className="font-medium text-foreground">{t("Crops:", "பயிர்கள்:")}</span> {t(s.cropsEn, s.cropsTa)}
                  </p>
                  <ul className="space-y-2">
                    {(t("en", "ta") === "en" ? s.tipsEn : s.tipsTa).map((tip, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* General Tips with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <img src={seedlingImg} alt="Growing seedlings" className="w-full h-full object-cover rounded-2xl" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-accent/50 rounded-2xl p-8 border border-border flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <Leaf className="h-6 w-6 text-primary" />
                {t("General Farming Best Practices", "பொதுவான விவசாய சிறந்த நடைமுறைகள்")}
              </h2>
              <div className="space-y-4">
                {[
                  { en: "Test your soil before every season for optimal nutrient management", ta: "சிறந்த ஊட்டச்சத்து மேலாண்மைக்கு ஒவ்வொரு பருவத்திற்கும் முன் உங்கள் மண்ணை சோதிக்கவும்", icon: Sprout },
                  { en: "Practice crop rotation to maintain soil health and prevent diseases", ta: "மண் ஆரோக்கியத்தை பராமரிக்கவும் நோய்களைத் தடுக்கவும் பயிர் சுழற்சி செய்யவும்", icon: Sun },
                  { en: "Use drip irrigation to save up to 60% water compared to flood irrigation", ta: "வெள்ள நீர்ப்பாசனத்துடன் ஒப்பிடும்போது 60% நீரை சேமிக்க சொட்டு நீர் பாசனம் பயன்படுத்தவும்", icon: Droplets },
                  { en: "Adopt integrated pest management (IPM) for eco-friendly farming", ta: "சுற்றுச்சூழல் நட்பு விவசாயத்திற்கு ஒருங்கிணைந்த பூச்சி மேலாண்மையை ஏற்றுக்கொள்ளுங்கள்", icon: Bug },
                  { en: "Monitor weather forecasts regularly and plan irrigation accordingly", ta: "வானிலை முன்னறிவிப்புகளை தொடர்ந்து கண்காணித்து அதற்கேற்ப நீர்ப்பாசனம் செய்யுங்கள்", icon: Thermometer },
                  { en: "Keep detailed farm records for better planning and profitability", ta: "சிறந்த திட்டமிடல் மற்றும் லாபத்திற்கு விரிவான பண்ணை பதிவுகளை வைக்கவும்", icon: Clock },
                ].map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <tip.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{t(tip.en, tip.ta)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Crop Grid */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Sprout className="h-7 w-7 text-primary" />
            {t("Explore 14 Crops", "14 பயிர்களை ஆராயுங்கள்")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("Click any crop to get detailed planting, care, and harvest guidance.", "விரிவான நடவு, பராமரிப்பு மற்றும் அறுவடை வழிகாட்டுதலைப் பெற எந்த பயிரையும் கிளிக் செய்யவும்.")}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {crops.map((crop, i) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link to={`/crop/${crop.id}`}>
                  <div className="crop-card bg-card border border-border p-5 md:p-6 text-center group rounded-2xl">
                    <div className="text-4xl md:text-5xl mb-3 group-hover:animate-float transition-transform">{crop.emoji}</div>
                    <h3 className="font-semibold text-sm md:text-base text-foreground">{t(crop.name, crop.nameTa)}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t(crop.season, crop.seasonTa)}</p>
                    <div className="mt-3 flex items-center justify-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
