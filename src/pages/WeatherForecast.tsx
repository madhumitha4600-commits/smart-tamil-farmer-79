import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CloudSun, Droplets, Wind, Thermometer, Eye, Gauge, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  descriptionTa: string;
  feelsLike: number;
  visibility: number;
  pressure: number;
  icon: string;
  forecast: { day: string; dayTa: string; high: number; low: number; desc: string; descTa: string }[];
}

const mockWeather: Record<string, WeatherData> = {
  chennai: {
    city: "Chennai",
    temp: 32,
    humidity: 78,
    windSpeed: 15,
    description: "Partly Cloudy",
    descriptionTa: "ஓரளவு மேகமூட்டம்",
    feelsLike: 36,
    visibility: 8,
    pressure: 1010,
    icon: "⛅",
    forecast: [
      { day: "Mon", dayTa: "திங்கள்", high: 33, low: 26, desc: "Sunny", descTa: "வெயில்" },
      { day: "Tue", dayTa: "செவ்வாய்", high: 31, low: 25, desc: "Rainy", descTa: "மழை" },
      { day: "Wed", dayTa: "புதன்", high: 30, low: 24, desc: "Cloudy", descTa: "மேகமூட்டம்" },
      { day: "Thu", dayTa: "வியாழன்", high: 32, low: 25, desc: "Sunny", descTa: "வெயில்" },
      { day: "Fri", dayTa: "வெள்ளி", high: 34, low: 27, desc: "Hot", descTa: "வெப்பம்" },
    ],
  },
  madurai: {
    city: "Madurai",
    temp: 35,
    humidity: 65,
    windSpeed: 10,
    description: "Sunny",
    descriptionTa: "வெயில்",
    feelsLike: 38,
    visibility: 10,
    pressure: 1008,
    icon: "☀️",
    forecast: [
      { day: "Mon", dayTa: "திங்கள்", high: 36, low: 27, desc: "Hot", descTa: "வெப்பம்" },
      { day: "Tue", dayTa: "செவ்வாய்", high: 35, low: 26, desc: "Sunny", descTa: "வெயில்" },
      { day: "Wed", dayTa: "புதன்", high: 33, low: 25, desc: "Cloudy", descTa: "மேகமூட்டம்" },
      { day: "Thu", dayTa: "வியாழன்", high: 34, low: 26, desc: "Sunny", descTa: "வெயில்" },
      { day: "Fri", dayTa: "வெள்ளி", high: 36, low: 28, desc: "Hot", descTa: "வெப்பம்" },
    ],
  },
  coimbatore: {
    city: "Coimbatore",
    temp: 28,
    humidity: 70,
    windSpeed: 12,
    description: "Pleasant",
    descriptionTa: "இனிமையான",
    feelsLike: 30,
    visibility: 12,
    pressure: 1012,
    icon: "🌤️",
    forecast: [
      { day: "Mon", dayTa: "திங்கள்", high: 29, low: 22, desc: "Pleasant", descTa: "இனிமையான" },
      { day: "Tue", dayTa: "செவ்வாய்", high: 28, low: 21, desc: "Rainy", descTa: "மழை" },
      { day: "Wed", dayTa: "புதன்", high: 27, low: 20, desc: "Cloudy", descTa: "மேகமூட்டம்" },
      { day: "Thu", dayTa: "வியாழன்", high: 29, low: 22, desc: "Sunny", descTa: "வெயில்" },
      { day: "Fri", dayTa: "வெள்ளி", high: 30, low: 23, desc: "Pleasant", descTa: "இனிமையான" },
    ],
  },
};

const WeatherForecast = () => {
  const { t } = useLanguage();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const searchWeather = () => {
    const key = city.toLowerCase().trim();
    const found = mockWeather[key] || mockWeather["chennai"];
    setWeather({ ...found, city: city || "Chennai" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="section-title text-foreground mt-8">
            {t("Weather Forecast", "வானிலை முன்னறிவிப்பு")}
          </h1>
          <p className="section-subtitle">
            {t(
              "Get real-time weather data to plan your farming activities effectively.",
              "உங்கள் விவசாய நடவடிக்கைகளை திறம்பட திட்டமிட நிகழ்நேர வானிலை தரவைப் பெறுங்கள்."
            )}
          </p>

          {/* Search */}
          <div className="flex gap-3 mb-8 max-w-md mx-auto">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchWeather()}
                placeholder={t("Enter city name...", "நகரத்தின் பெயரை உள்ளிடவும்...")}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground"
              />
            </div>
            <Button onClick={searchWeather} className="gap-2">
              <Search className="h-4 w-4" />
              {t("Search", "தேடு")}
            </Button>
          </div>

          {weather && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Main Weather */}
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <p className="text-muted-foreground mb-2">{weather.city}</p>
                <div className="text-7xl mb-4">{weather.icon}</div>
                <div className="text-5xl font-bold text-foreground mb-2">{weather.temp}°C</div>
                <p className="text-lg text-muted-foreground">{t(weather.description, weather.descriptionTa)}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Thermometer, label: t("Feels Like", "உணர்வு"), value: `${weather.feelsLike}°C` },
                  { icon: Droplets, label: t("Humidity", "ஈரப்பதம்"), value: `${weather.humidity}%` },
                  { icon: Wind, label: t("Wind Speed", "காற்றின் வேகம்"), value: `${weather.windSpeed} km/h` },
                  { icon: Gauge, label: t("Pressure", "அழுத்தம்"), value: `${weather.pressure} hPa` },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-xl p-4 text-center">
                    <item.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* 5-Day Forecast */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-4">{t("5-Day Forecast", "5 நாள் முன்னறிவிப்பு")}</h3>
                <div className="grid grid-cols-5 gap-3">
                  {weather.forecast.map((day) => (
                    <div key={day.day} className="text-center p-3 rounded-lg bg-accent/50">
                      <p className="text-xs font-medium text-foreground">{t(day.day, day.dayTa)}</p>
                      <p className="text-sm font-semibold text-foreground mt-1">{day.high}°/{day.low}°</p>
                      <p className="text-xs text-muted-foreground mt-1">{t(day.desc, day.descTa)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Farming Advisory */}
              <div className="bg-accent/50 border border-border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-3">🌾 {t("Farming Advisory", "விவசாய ஆலோசனை")}</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {weather.humidity > 70 && <li>💧 {t("High humidity — monitor for fungal diseases", "அதிக ஈரப்பதம் — பூஞ்சை நோய்களை கண்காணிக்கவும்")}</li>}
                  {weather.temp > 33 && <li>🌡️ {t("High temperature — ensure adequate irrigation", "அதிக வெப்பநிலை — போதுமான நீர்ப்பாசனம் உறுதிசெய்யவும்")}</li>}
                  {weather.windSpeed > 12 && <li>💨 {t("Windy conditions — secure young plants and mulch", "காற்று நிலை — இளம் செடிகளை பாதுகாக்கவும்")}</li>}
                  <li>📋 {t("Check soil moisture before irrigating", "நீர்ப்பாசனத்திற்கு முன் மண் ஈரப்பதத்தை சரிபார்க்கவும்")}</li>
                </ul>
              </div>
            </div>
          )}

          {!weather && (
            <div className="text-center text-muted-foreground py-12">
              <CloudSun className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p>{t("Enter a city name to see weather forecast", "வானிலை முன்னறிவிப்பைப் பார்க்க நகரத்தின் பெயரை உள்ளிடவும்")}</p>
              <p className="text-sm mt-2">{t("Try: Chennai, Madurai, Coimbatore", "முயற்சிக்கவும்: Chennai, Madurai, Coimbatore")}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WeatherForecast;
