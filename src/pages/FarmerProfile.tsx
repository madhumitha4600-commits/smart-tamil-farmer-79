import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Save, CheckCircle } from "lucide-react";

const FarmerProfile = () => {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "Tamil Nadu",
    landSize: "",
    soilType: "loamy",
    irrigationType: "drip",
    mainCrops: "",
  });

  const update = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("farmer-profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const soilOptions = [
    { value: "loamy", en: "Loamy", ta: "களிமண்" },
    { value: "sandy", en: "Sandy", ta: "மணல்" },
    { value: "clay", en: "Clay", ta: "களிமண் பசை" },
    { value: "silty", en: "Silty", ta: "வண்டல்" },
    { value: "red", en: "Red Soil", ta: "செம்மண்" },
    { value: "black", en: "Black Soil", ta: "கருப்பு மண்" },
    { value: "alluvial", en: "Alluvial", ta: "வண்டல் மண்" },
  ];

  const irrigationOptions = [
    { value: "drip", en: "Drip Irrigation", ta: "சொட்டு நீர்ப்பாசனம்" },
    { value: "sprinkler", en: "Sprinkler", ta: "தெளிப்பான்" },
    { value: "flood", en: "Flood Irrigation", ta: "வெள்ள நீர்ப்பாசனம்" },
    { value: "canal", en: "Canal", ta: "கால்வாய்" },
    { value: "rainfed", en: "Rainfed", ta: "மழையை நம்பியது" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mt-8 mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {t("Farmer Profile", "விவசாயி சுயவிவரம்")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("Your farming details help us provide better recommendations.", "உங்கள் விவசாய விவரங்கள் சிறந்த பரிந்துரைகளை வழங்க உதவுகின்றன.")}
            </p>
          </div>

          <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("Full Name", "முழு பெயர்")}</label>
                <input type="text" value={profile.name} onChange={(e) => update("name", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground" placeholder={t("Enter your name", "உங்கள் பெயரை உள்ளிடவும்")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("Phone Number", "தொலைபேசி எண்")}</label>
                <input type="tel" value={profile.phone} onChange={(e) => update("phone", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("Village", "கிராமம்")}</label>
                <input type="text" value={profile.village} onChange={(e) => update("village", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("District", "மாவட்டம்")}</label>
                <input type="text" value={profile.district} onChange={(e) => update("district", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("Land Size", "நில அளவு")}</label>
                <input type="text" value={profile.landSize} onChange={(e) => update("landSize", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground" placeholder={t("e.g., 5 acres", "எ.கா., 5 ஏக்கர்")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("Soil Type", "மண் வகை")}</label>
                <select value={profile.soilType} onChange={(e) => update("soilType", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                  {soilOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{t(opt.en, opt.ta)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("Irrigation Type", "நீர்ப்பாசன வகை")}</label>
                <select value={profile.irrigationType} onChange={(e) => update("irrigationType", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                  {irrigationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{t(opt.en, opt.ta)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t("Main Crops", "முக்கிய பயிர்கள்")}</label>
                <input type="text" value={profile.mainCrops} onChange={(e) => update("mainCrops", e.target.value)} className="w-full p-3 rounded-lg border border-border bg-background text-foreground" placeholder={t("e.g., Rice, Sugarcane", "எ.கா., அரிசி, கரும்பு")} />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 py-6 text-lg">
              {saved ? <CheckCircle className="h-5 w-5" /> : <Save className="h-5 w-5" />}
              {saved ? t("Saved!", "சேமிக்கப்பட்டது!") : t("Save Profile", "சுயவிவரத்தை சேமிக்கவும்")}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerProfile;
