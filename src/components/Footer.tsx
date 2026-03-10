import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>🌾</span> {t("AgriSync", "அக்ரிசிங்க்")}
            </h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              {t(
                "AI-powered smart farming assistant for better crop management, disease detection, and higher yields. Empowering farmers with cutting-edge technology.",
                "சிறந்த பயிர் மேலாண்மை, நோய் கண்டறிதல் மற்றும் அதிக மகசூலுக்கான AI சக்தி வாய்ந்த ஸ்மார்ட் விவசாய உதவியாளர்."
              )}
            </p>
            <div className="text-xs text-primary-foreground/60">
              <p className="font-semibold mb-1">{t("Developed by", "உருவாக்கியவர்கள்")}</p>
              <p>MADHUMITHA A • AATHIKA N M • ARUNI B • KOWSALYA M</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t("Quick Links", "விரைவு இணைப்புகள்")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/farming-guide" className="hover:text-primary-foreground transition-colors">{t("Farming Guide", "விவசாய வழிகாட்டி")}</Link></li>
              <li><Link to="/disease-detection" className="hover:text-primary-foreground transition-colors">{t("Disease Detection", "நோய் கண்டறிதல்")}</Link></li>
              <li><Link to="/weather" className="hover:text-primary-foreground transition-colors">{t("Weather Forecast", "வானிலை முன்னறிவிப்பு")}</Link></li>
              <li><Link to="/crop-recommendation" className="hover:text-primary-foreground transition-colors">{t("Crop Recommendation", "பயிர் பரிந்துரை")}</Link></li>
              <li><Link to="/chat" className="hover:text-primary-foreground transition-colors">{t("AI Assistant", "AI உதவியாளர்")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t("Contact", "தொடர்பு")}</h4>
            <p className="text-sm text-primary-foreground/80">
              {t("Email: support@agrisync.com", "மின்னஞ்சல்: support@agrisync.com")}
            </p>
            <p className="text-sm text-primary-foreground/80 mt-1">
              {t("Phone: +91 98765 43210", "தொலைபேசி: +91 98765 43210")}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          © 2026 AgriSync. {t("All rights reserved.", "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
