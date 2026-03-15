import { useLanguage } from "@/contexts/LanguageContext";

const tips = [
  { en: "🌱 Test soil before every season", ta: "🌱 ஒவ்வொரு பருவத்திற்கும் முன் மண்ணை சோதிக்கவும்" },
  { en: "💧 Drip irrigation saves 60% water", ta: "💧 சொட்டு நீர்ப்பாசனம் 60% நீரை சேமிக்கிறது" },
  { en: "🌾 Crop rotation prevents soil depletion", ta: "🌾 பயிர் சுழற்சி மண் சோர்வைத் தடுக்கிறது" },
  { en: "🐛 Use IPM for eco-friendly pest control", ta: "🐛 சுற்றுச்சூழல் நட்பு பூச்சி கட்டுப்பாட்டிற்கு IPM பயன்படுத்துங்கள்" },
  { en: "☀️ Harvest early morning in summer", ta: "☀️ கோடையில் அதிகாலையில் அறுவடை செய்யுங்கள்" },
  { en: "🧪 Neem-coated urea for slow nitrogen release", ta: "🧪 மெதுவான நைட்ரஜன் வெளியீட்டுக்கு வேப்ப பூசிய யூரியா" },
  { en: "🌿 Vermicompost improves soil structure", ta: "🌿 மண்புழு உரம் மண் அமைப்பை மேம்படுத்துகிறது" },
  { en: "📊 AgriSync AI helps 500+ farmers daily", ta: "📊 அக்ரிசிங்க் AI தினமும் 500+ விவசாயிகளுக்கு உதவுகிறது" },
];

const TickerBar = () => {
  const { t } = useLanguage();

  const content = tips.map(tip => t(tip.en, tip.ta)).join("   •   ");

  return (
    <div className="bg-primary text-primary-foreground py-2 ticker-bar relative overflow-hidden">
      <div className="ticker-content font-body text-xs tracking-wide">
        {content}   •   {content}
      </div>
    </div>
  );
};

export default TickerBar;
