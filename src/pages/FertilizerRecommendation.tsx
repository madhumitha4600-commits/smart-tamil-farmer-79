import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fertilizers } from "@/data/fertilizers";
import { FlaskConical, Leaf, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import fertilizerImg from "@/assets/fertilizer-hands.jpg";
import seedlingImg from "@/assets/seedling-growth.jpg";

const FertilizerRecommendation = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img src={fertilizerImg} alt="Fertilizer" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-earth/70" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4"
            >
              {t("Fertilizer Recommendation", "உர பரிந்துரை")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/90 text-lg max-w-2xl"
            >
              {t(
                "Choose the right fertilizer for your crops. Learn about NPK ratios, application methods, and best practices.",
                "உங்கள் பயிர்களுக்கு சரியான உரத்தை தேர்வு செய்யுங்கள். NPK விகிதங்கள், பயன்பாட்டு முறைகள் பற்றி அறியுங்கள்."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">

          {/* Fertilizer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {fertilizers.map((fert, i) => (
              <motion.div
                key={fert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 feature-card-hover group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FlaskConical className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{t(fert.name, fert.nameTa)}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-accent rounded-full text-accent-foreground font-medium">{t(fert.type, fert.typeTa)}</span>
                      <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full text-primary font-bold">NPK: {fert.npk}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t(fert.usage, fert.usageTa)}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <Leaf className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{t("Best for:", "சிறந்தது:")}</span>
                  {(t("en", "ta") === "en" ? fert.crops : fert.cropsTa).map((crop) => (
                    <span key={crop} className="text-xs px-2.5 py-1 bg-accent rounded-full text-accent-foreground">
                      {crop}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* NPK Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t("Understanding NPK Ratios", "NPK விகிதங்களை புரிந்துகொள்ளுதல்")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { letter: "N", name: t("Nitrogen", "நைட்ரஜன்"), desc: t("Promotes leaf and stem growth. Essential for green, leafy vegetables and cereals. Deficiency causes yellowing of older leaves.", "இலை மற்றும் தண்டு வளர்ச்சியை ஊக்குவிக்கிறது. பச்சை, இலை காய்கறிகள் மற்றும் தானியங்களுக்கு அத்தியாவசியம்."), color: "bg-primary text-primary-foreground", borderColor: "border-primary/30" },
                { letter: "P", name: t("Phosphorus", "பாஸ்பரஸ்"), desc: t("Supports root development, flowering, and fruit formation. Critical during early growth stages and reproduction phase.", "வேர் வளர்ச்சி, பூக்கும் நிலை மற்றும் பழ உருவாக்கத்தை ஆதரிக்கிறது. ஆரம்ப வளர்ச்சி மற்றும் இனப்பெருக்க கட்டத்தில் முக்கியம்."), color: "bg-gold text-gold-foreground", borderColor: "border-gold/30" },
                { letter: "K", name: t("Potassium", "பொட்டாசியம்"), desc: t("Improves disease resistance, drought tolerance, and overall plant vigor. Enhances fruit quality and shelf life.", "நோய் எதிர்ப்பு, வறட்சி சகிப்புத்தன்மை மற்றும் ஒட்டுமொத்த தாவர வீரியத்தை மேம்படுத்துகிறது."), color: "bg-earth text-earth-foreground", borderColor: "border-earth/30" },
              ].map((npk, i) => (
                <motion.div
                  key={npk.letter}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-center bg-card rounded-2xl p-8 border-2 ${npk.borderColor}`}
                >
                  <div className={`w-16 h-16 rounded-full ${npk.color} flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg`}>
                    {npk.letter}
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{npk.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{npk.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Application Tips */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <img src={seedlingImg} alt="Plant growth" className="w-full h-full object-cover rounded-2xl" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-accent/50 rounded-2xl p-8 border border-border flex flex-col justify-center"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                {t("Fertilizer Application Best Practices", "உர பயன்பாட்டு சிறந்த நடைமுறைகள்")}
              </h3>
              <div className="space-y-4">
                {[
                  { en: "Always do a soil test before applying fertilizers", ta: "உரங்களை பயன்படுத்தும் முன் எப்போதும் மண் பரிசோதனை செய்யுங்கள்" },
                  { en: "Apply fertilizers in split doses for better absorption", ta: "சிறந்த உறிஞ்சுதலுக்கு உரங்களை பிரித்து போடுங்கள்" },
                  { en: "Water immediately after applying fertilizer", ta: "உரம் போட்ட உடனேயே நீர் ஊற்றவும்" },
                  { en: "Mix organic and chemical fertilizers for balanced nutrition", ta: "சமநிலை ஊட்டச்சத்துக்கு இயற்கை மற்றும் ரசாயன உரங்களை கலக்கவும்" },
                  { en: "Avoid fertilizing during heavy rain to prevent runoff", ta: "கழிவு ஓட்டத்தைத் தடுக்க கனமழையின் போது உரமிடுவதைத் தவிர்க்கவும்" },
                  { en: "Use neem-coated urea for slow nitrogen release", ta: "மெதுவான நைட்ரஜன் வெளியீட்டுக்கு வேப்ப பூசிய யூரியா பயன்படுத்தவும்" },
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{t(tip.en, tip.ta)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FertilizerRecommendation;
