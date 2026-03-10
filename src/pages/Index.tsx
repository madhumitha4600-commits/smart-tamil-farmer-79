import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Bug, CloudSun, FlaskConical, Sprout, MessageCircle, ArrowRight, Users, BarChart3, Shield, Zap, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/farming-landscape.jpg";
import farmerTech from "@/assets/farmer-tech.jpg";
import seedlingImg from "@/assets/seedling-growth.jpg";
import terracedImg from "@/assets/terraced-fields.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Sprout,
    titleEn: "Crop Recommendations",
    titleTa: "பயிர் பரிந்துரைகள்",
    descEn: "Get personalized crop suggestions based on your soil, climate, and land parameters using smart algorithms.",
    descTa: "ஸ்மார்ட் அல்காரிதம்களைப் பயன்படுத்தி உங்கள் மண், காலநிலை மற்றும் நில அளவுருக்கள் அடிப்படையில் தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெறுங்கள்.",
    link: "/crop-recommendation",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Bug,
    titleEn: "Disease Detection",
    titleTa: "நோய் கண்டறிதல்",
    descEn: "Upload a leaf image to identify diseases instantly using AI-powered analysis and get treatment plans.",
    descTa: "AI பகுப்பாய்வைப் பயன்படுத்தி நோய்களை உடனடியாக கண்டறிய இலைப் படத்தைப் பதிவேற்றவும்.",
    link: "/disease-detection",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: CloudSun,
    titleEn: "Weather Forecast",
    titleTa: "வானிலை முன்னறிவிப்பு",
    descEn: "Plan your farming with real-time weather insights, 5-day forecasts, and farming advisories.",
    descTa: "நிகழ்நேர வானிலை நுண்ணறிவுகள், 5 நாள் முன்னறிவிப்புகள் மற்றும் விவசாய ஆலோசனைகளுடன் திட்டமிடுங்கள்.",
    link: "/weather",
    color: "bg-sky/10 text-sky",
  },
  {
    icon: FlaskConical,
    titleEn: "Fertilizer Guide",
    titleTa: "உர வழிகாட்டி",
    descEn: "Find the right fertilizer for your crops with detailed NPK analysis and application methods.",
    descTa: "விரிவான NPK பகுப்பாய்வு மற்றும் பயன்பாட்டு முறைகளுடன் உங்கள் பயிர்களுக்கு சரியான உரத்தை கண்டறியுங்கள்.",
    link: "/fertilizer",
    color: "bg-gold/10 text-gold-foreground",
  },
  {
    icon: Leaf,
    titleEn: "Smart Farming Guide",
    titleTa: "ஸ்மார்ட் விவசாய வழிகாட்டி",
    descEn: "Complete guidance for 14 crops from planting to harvest with expert tips and best practices.",
    descTa: "நடவு முதல் அறுவடை வரை 14 பயிர்களுக்கான முழுமையான வழிகாட்டுதல்.",
    link: "/farming-guide",
    color: "bg-leaf/10 text-leaf",
  },
  {
    icon: MessageCircle,
    titleEn: "AI Chat Assistant",
    titleTa: "AI அரட்டை உதவியாளர்",
    descEn: "Chat with our AI farming assistant for instant answers to all your agriculture questions.",
    descTa: "உங்கள் அனைத்து விவசாய கேள்விகளுக்கும் உடனடி பதில்களுக்கு எங்கள் AI விவசாய உதவியாளரிடம் அரட்டையடிக்கவும்.",
    link: "/chat",
    color: "bg-primary/10 text-primary",
  },
];

const stats = [
  { value: "14+", labelEn: "Crops Covered", labelTa: "பயிர்கள்" },
  { value: "50+", labelEn: "Disease Types", labelTa: "நோய் வகைகள்" },
  { value: "100%", labelEn: "Free to Use", labelTa: "இலவசம்" },
  { value: "2", labelEn: "Languages", labelTa: "மொழிகள்" },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Lush green farming fields at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-primary-foreground/20 backdrop-blur-md rounded-full text-primary-foreground text-sm font-medium mb-6 border border-primary-foreground/30"
          >
            🌱 {t("AI-Powered Smart Farming Platform", "AI சக்தி வாய்ந்த ஸ்மார்ட் விவசாய தளம்")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight drop-shadow-lg"
          >
            {t("AgriSync", "அக்ரிசிங்க்")}
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold opacity-90">
              {t("YOUR SMART FARMING ASSISTANT", "உங்கள் ஸ்மார்ட் விவசாய உதவியாளர்")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-primary-foreground/90 mb-10 font-light max-w-3xl mx-auto"
          >
            {t(
              "Smart Crops, Smart Choices — AI-Powered Guidance for Every Farmer!",
              "ஸ்மார்ட் பயிர்கள், ஸ்மார்ட் தேர்வுகள் — ஒவ்வொரு விவசாயிக்கும் AI வழிகாட்டுதல்!"
            )}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/farming-guide">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                {t("Explore Features", "அம்சங்களை ஆராயுங்கள்")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full font-semibold bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20 backdrop-blur-md">
                <MessageCircle className="mr-2 h-5 w-5" /> {t("Talk to AI", "AI உடன் பேசுங்கள்")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-xl border border-border p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.labelEn}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{t(s.labelEn, s.labelTa)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4" id="features">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="section-title text-foreground">
              {t("Powerful Features", "சக்திவாய்ந்த அம்சங்கள்")}
            </h2>
            <p className="section-subtitle">
              {t(
                "AgriSync provides farmers with essential AI-powered tools for smarter, more productive, and sustainable farming.",
                "அக்ரிசிங்க் விவசாயிகளுக்கு ஸ்மார்ட், அதிக உற்பத்தி, நிலையான விவசாயத்திற்கான AI கருவிகளை வழங்குகிறது."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.titleEn}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to={f.link}>
                  <div className="bg-card rounded-xl p-6 border border-border feature-card-hover h-full group">
                    <div className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <f.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {t(f.titleEn, f.titleTa)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(f.descEn, f.descTa)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("Learn More", "மேலும் அறிக")} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-accent/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-foreground">
            {t("How AgriSync Works", "அக்ரிசிங்க் எவ்வாறு செயல்படுகிறது")}
          </h2>
          <p className="section-subtitle">
            {t(
              "Three simple steps to transform your farming with AI technology",
              "AI தொழில்நுட்பத்துடன் உங்கள் விவசாயத்தை மாற்ற மூன்று எளிய படிகள்"
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { step: "01", titleEn: "Input Your Data", titleTa: "உங்கள் தரவை உள்ளிடவும்", descEn: "Enter soil parameters, upload leaf images, or search your location for weather data.", descTa: "மண் அளவுருக்களை உள்ளிடவும், இலைப் படங்களை பதிவேற்றவும், அல்லது வானிலை தரவுக்கு உங்கள் இருப்பிடத்தை தேடவும்.", icon: BarChart3 },
              { step: "02", titleEn: "AI Analyzes", titleTa: "AI பகுப்பாய்வு", descEn: "Our smart algorithms process your data to provide accurate, personalized recommendations.", descTa: "எங்கள் ஸ்மார்ட் அல்காரிதம்கள் உங்கள் தரவை செயலாக்கி துல்லியமான, தனிப்பயன் பரிந்துரைகளை வழங்குகின்றன.", icon: Zap },
              { step: "03", titleEn: "Get Results", titleTa: "முடிவுகளைப் பெறுங்கள்", descEn: "Receive actionable insights — crop choices, disease treatments, fertilizer plans, and more.", descTa: "செயல்படக்கூடிய நுண்ணறிவுகளைப் பெறுங்கள் — பயிர் தேர்வுகள், நோய் சிகிச்சைகள், உர திட்டங்கள்.", icon: CheckCircle },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-card rounded-2xl p-8 border border-border text-center group hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {item.step}
                </div>
                <item.icon className="h-10 w-10 text-primary mx-auto mb-4 mt-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{t(item.titleEn, item.titleTa)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descEn, item.descTa)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section with Image */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={farmerTech} alt="Farmer using technology" className="rounded-2xl shadow-xl w-full object-cover aspect-square" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("Technology Meets Tradition", "தொழில்நுட்பமும் பாரம்பரியமும்")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t(
                  "AgriSync bridges the gap between traditional farming wisdom and modern AI technology. Our platform is designed to be simple enough for every farmer while powerful enough to make a real difference in crop yields and farm management.",
                  "அக்ரிசிங்க் பாரம்பரிய விவசாய ஞானத்திற்கும் நவீன AI தொழில்நுட்பத்திற்கும் இடையிலான இடைவெளியை இணைக்கிறது. எங்கள் தளம் ஒவ்வொரு விவசாயிக்கும் எளிமையானதாகவும், பயிர் மகசூல் மற்றும் பண்ணை மேலாண்மையில் உண்மையான மாற்றத்தை ஏற்படுத்தும் அளவுக்கு சக்திவாய்ந்ததாகவும் வடிவமைக்கப்பட்டுள்ளது."
                )}
              </p>
              <div className="space-y-4">
                {[
                  { en: "Available in English & Tamil", ta: "ஆங்கிலம் & தமிழில் கிடைக்கும்" },
                  { en: "Works on any device — mobile, tablet, desktop", ta: "எந்த சாதனத்திலும் செயல்படும்" },
                  { en: "AI-powered crop and disease analysis", ta: "AI சக்தி வாய்ந்த பயிர் மற்றும் நோய் பகுப்பாய்வு" },
                  { en: "Completely free for all farmers", ta: "அனைத்து விவசாயிகளுக்கும் முற்றிலும் இலவசம்" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{t(item.en, item.ta)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA with parallax image */}
      <section className="relative py-32 px-4 overflow-hidden">
        <img src={terracedImg} alt="Terraced farming fields" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-primary/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 container mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            {t("Ready to Farm Smarter?", "ஸ்மார்ட்டாக விவசாயம் செய்ய தயாரா?")}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            {t(
              "Join thousands of farmers using AgriSync to boost productivity, prevent diseases, and make data-driven decisions.",
              "உற்பத்தியை அதிகரிக்கவும், நோய்களைத் தடுக்கவும், தரவு சார்ந்த முடிவுகளை எடுக்கவும் அக்ரிசிங்க்கைப் பயன்படுத்தும் ஆயிரக்கணக்கான விவசாயிகளுடன் இணையுங்கள்."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/farming-guide">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-full font-semibold shadow-lg">
                {t("Start Exploring", "ஆராய ஆரம்பியுங்கள்")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <MessageCircle className="mr-2 h-5 w-5" /> {t("Ask AI Assistant", "AI உதவியாளரிடம் கேளுங்கள்")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-accent/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("About AgriSync", "அக்ரிசிங்க் பற்றி")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t(
                  "AgriSync is an AI-powered smart farming assistant that helps farmers make data-driven decisions. From crop recommendations based on soil and climate data, to plant disease identification through image analysis, real-time weather forecasts, and fertilizer guidance — we empower farmers with cutting-edge technology for sustainable agriculture.",
                  "அக்ரிசிங்க் விவசாயிகள் தரவு சார்ந்த முடிவுகளை எடுக்க உதவும் AI சக்தி வாய்ந்த ஸ்மார்ட் விவசாய உதவியாளர். மண் மற்றும் காலநிலை தரவின் அடிப்படையில் பயிர் பரிந்துரைகள் முதல், படப் பகுப்பாய்வு மூலம் தாவர நோய் கண்டறிதல், நிகழ்நேர வானிலை முன்னறிவிப்புகள், உர வழிகாட்டுதல் வரை — நிலையான விவசாயத்திற்கான நவீன தொழில்நுட்பத்துடன் விவசாயிகளுக்கு அதிகாரம் அளிக்கிறோம்."
                )}
              </p>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold text-foreground mb-3">{t("Our Team", "எங்கள் குழு")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["MADHUMITHA A", "AATHIKA N M", "ARUNI B", "KOWSALYA M"].map((name) => (
                    <div key={name} className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={seedlingImg} alt="Seedling growth" className="rounded-2xl shadow-xl w-full object-cover aspect-square" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
