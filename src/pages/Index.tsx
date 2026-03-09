import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Bug, CloudSun, FlaskConical, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farming.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Sprout,
    titleEn: "Crop Recommendations",
    titleTa: "பயிர் பரிந்துரைகள்",
    descEn: "Get personalized crop suggestions based on your soil, climate, and land parameters.",
    descTa: "உங்கள் மண், காலநிலை மற்றும் நில அளவுருக்கள் அடிப்படையில் தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்.",
    link: "/crop-recommendation",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Bug,
    titleEn: "Disease Detection",
    titleTa: "நோய் கண்டறிதல்",
    descEn: "Upload a leaf image to identify diseases instantly using AI-powered analysis.",
    descTa: "AI பகுப்பாய்வைப் பயன்படுத்தி நோய்களை உடனடியாக கண்டறிய இலைப் படத்தைப் பதிவேற்றவும்.",
    link: "/disease-detection",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: CloudSun,
    titleEn: "Weather Forecast",
    titleTa: "வானிலை முன்னறிவிப்பு",
    descEn: "Plan your farming with real-time weather insights and forecasts.",
    descTa: "நிகழ்நேர வானிலை நுண்ணறிவுகள் மற்றும் முன்னறிவிப்புகளுடன் உங்கள் விவசாயத்தை திட்டமிடுங்கள்.",
    link: "/weather",
    color: "bg-sky/10 text-sky",
  },
  {
    icon: FlaskConical,
    titleEn: "Fertilizer Guide",
    titleTa: "உர வழிகாட்டி",
    descEn: "Find the right fertilizer for your crops with detailed recommendations.",
    descTa: "விரிவான பரிந்துரைகளுடன் உங்கள் பயிர்களுக்கு சரியான உரத்தை கண்டறியுங்கள்.",
    link: "/fertilizer",
    color: "bg-gold/10 text-gold-foreground",
  },
  {
    icon: Leaf,
    titleEn: "Smart Farming Guide",
    titleTa: "ஸ்மார்ட் விவசாய வழிகாட்டி",
    descEn: "Complete guidance for 14 crops from planting to harvest with expert tips.",
    descTa: "நடவு முதல் அறுவடை வரை 14 பயிர்களுக்கான முழுமையான வழிகாட்டுதல்.",
    link: "/farming-guide",
    color: "bg-leaf/10 text-leaf",
  },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Lush green farming fields"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight"
          >
            {t("YOUR SMART FARMING ASSISTANT", "உங்கள் ஸ்மார்ட் விவசாய உதவியாளர்")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-light"
          >
            {t(
              "Smart Crops, Smart Choices — AI-Powered Guidance for Every Farmer!",
              "ஸ்மார்ட் பயிர்கள், ஸ்மார்ட் தேர்வுகள் — ஒவ்வொரு விவசாயிக்கும் AI வழிகாட்டுதல்!"
            )}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/farming-guide">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full font-semibold shadow-lg">
                {t("Explore Features", "அம்சங்களை ஆராயுங்கள்")} →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4" id="features">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-foreground">
            {t("Features", "அம்சங்கள்")}
          </h2>
          <p className="section-subtitle">
            {t(
              "AgriSmart provides farmers with essential tools for smarter, more productive farming.",
              "அக்ரிஸ்மார்ட் விவசாயிகளுக்கு ஸ்மார்ட், அதிக உற்பத்தி விவசாயத்திற்கான அத்தியாவசிய கருவிகளை வழங்குகிறது."
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.titleEn}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={f.link}>
                  <div className="bg-card rounded-xl p-6 border border-border feature-card-hover h-full">
                    <div className={`w-12 h-12 rounded-lg ${f.color} flex items-center justify-center mb-4`}>
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {t(f.titleEn, f.titleTa)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(f.descEn, f.descTa)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="section-title text-foreground">
            {t("About AgriSmart", "அக்ரிஸ்மார்ட் பற்றி")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t(
              "AgriSmart is an AI-powered smart farming assistant that helps farmers make data-driven decisions. From crop recommendations based on soil and climate data, to plant disease identification through image analysis, real-time weather forecasts, and fertilizer guidance — we empower farmers with cutting-edge technology for sustainable agriculture.",
              "அக்ரிஸ்மார்ட் விவசாயிகள் தரவு சார்ந்த முடிவுகளை எடுக்க உதவும் AI சக்தி வாய்ந்த ஸ்மார்ட் விவசாய உதவியாளர். மண் மற்றும் காலநிலை தரவின் அடிப்படையில் பயிர் பரிந்துரைகள் முதல், படப் பகுப்பாய்வு மூலம் தாவர நோய் கண்டறிதல், நிகழ்நேர வானிலை முன்னறிவிப்புகள், உர வழிகாட்டுதல் வரை — நிலையான விவசாயத்திற்கான நவீன தொழில்நுட்பத்துடன் விவசாயிகளுக்கு அதிகாரம் அளிக்கிறோம்."
            )}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
