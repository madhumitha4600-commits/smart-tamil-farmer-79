import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, User, Globe, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { t, toggleLang, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: t("Home", "முகப்பு") },
    { to: "/farming-guide", label: t("Farming Guide", "விவசாய வழிகாட்டி") },
    { to: "/disease-detection", label: t("Disease Detection", "நோய் கண்டறிதல்") },
    { to: "/weather", label: t("Weather", "வானிலை") },
    { to: "/fertilizer", label: t("Fertilizer", "உரம்") },
    { to: "/crop-recommendation", label: t("Crop Advice", "பயிர் ஆலோசனை") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span className="text-2xl">🌾</span>
          <span className="tracking-tight">{t("AgriSync", "அக்ரிசிங்க்")}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-accent hover:scale-105"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/chat">
            <Button variant="outline" size="sm" className="gap-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t("AI Chat", "AI அரட்டை")}</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleLang}
            className="gap-1"
          >
            <Globe className="h-4 w-4" />
            {lang === "en" ? "தமிழ்" : "English"}
          </Button>

          <Link to="/profile">
            <Button variant="outline" size="sm" className="gap-1">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Profile", "சுயவிவரம்")}</span>
            </Button>
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-card border-b border-border px-4 py-3 space-y-1 animate-fade-in-up">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/chat" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-accent">
            💬 {t("AI Chat Assistant", "AI அரட்டை உதவியாளர்")}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
