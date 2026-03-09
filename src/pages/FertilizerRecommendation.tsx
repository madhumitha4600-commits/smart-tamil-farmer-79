import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fertilizers } from "@/data/fertilizers";
import { FlaskConical, Leaf } from "lucide-react";

const FertilizerRecommendation = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="section-title text-foreground mt-8">
            {t("Fertilizer Recommendation", "உர பரிந்துரை")}
          </h1>
          <p className="section-subtitle">
            {t(
              "Choose the right fertilizer for your crops. Learn about NPK ratios, application methods, and best practices.",
              "உங்கள் பயிர்களுக்கு சரியான உரத்தை தேர்வு செய்யுங்கள். NPK விகிதங்கள், பயன்பாட்டு முறைகள் பற்றி அறியுங்கள்."
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fertilizers.map((fert) => (
              <div key={fert.id} className="bg-card border border-border rounded-xl p-6 feature-card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <FlaskConical className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{t(fert.name, fert.nameTa)}</h3>
                    <p className="text-xs text-muted-foreground">{t(fert.type, fert.typeTa)} • NPK: {fert.npk}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{t(fert.usage, fert.usageTa)}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <Leaf className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground">{t("Best for:", "சிறந்தது:")}</span>
                  {(t("en", "ta") === "en" ? fert.crops : fert.cropsTa).map((crop) => (
                    <span key={crop} className="text-xs px-2 py-0.5 bg-accent rounded-full text-accent-foreground">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* NPK Guide */}
          <div className="mt-12 bg-accent/50 border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {t("Understanding NPK Ratios", "NPK விகிதங்களை புரிந்துகொள்ளுதல்")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { letter: "N", name: t("Nitrogen", "நைட்ரஜன்"), desc: t("Promotes leaf and stem growth. Essential for green, leafy vegetables.", "இலை மற்றும் தண்டு வளர்ச்சியை ஊக்குவிக்கிறது."), color: "bg-primary text-primary-foreground" },
                { letter: "P", name: t("Phosphorus", "பாஸ்பரஸ்"), desc: t("Supports root development and flowering. Critical for fruit formation.", "வேர் வளர்ச்சி மற்றும் பூக்கும் நிலையை ஆதரிக்கிறது."), color: "bg-gold text-gold-foreground" },
                { letter: "K", name: t("Potassium", "பொட்டாசியம்"), desc: t("Improves disease resistance and overall plant health.", "நோய் எதிர்ப்பு மற்றும் ஒட்டுமொத்த தாவர ஆரோக்கியத்தை மேம்படுத்தும்."), color: "bg-earth text-earth-foreground" },
              ].map((npk) => (
                <div key={npk.letter} className="text-center">
                  <div className={`w-14 h-14 rounded-full ${npk.color} flex items-center justify-center mx-auto mb-3 text-xl font-bold`}>
                    {npk.letter}
                  </div>
                  <h3 className="font-semibold text-foreground">{npk.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{npk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FertilizerRecommendation;
