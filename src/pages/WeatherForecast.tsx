import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CloudSun, Droplets, Wind, Thermometer, Gauge, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import weatherImg from "@/assets/weather-station.jpg";

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
  forecast: { day: string; dayTa: string; high: number; low: number; desc: string; descTa: string; icon: string }[];
}

const mockWeather: Record<string, WeatherData> = {
  chennai: {
    city: "Chennai", temp: 32, humidity: 78, windSpeed: 15,
    description: "Partly Cloudy", descriptionTa: "ஓரளவு மேகமூட்டம்",
    feelsLike: 36, visibility: 8, pressure: 1010, icon: "⛅",
    forecast: [
      { day: "Mon", dayTa: "திங்கள்", high: 33, low: 26, desc: "Sunny", descTa: "வெயில்", icon: "☀️" },
      { day: "Tue", dayTa: "செவ்வாய்", high: 31, low: 25, desc: "Rainy", descTa: "மழை", icon: "🌧️" },
      { day: "Wed", dayTa: "புதன்", high: 30, low: 24, desc: "Cloudy", descTa: "மேகமூட்டம்", icon: "☁️" },
      { day: "Thu", dayTa: "வியாழன்", high: 32, low: 25, desc: "Sunny", descTa: "வெயில்", icon: "☀️" },
      { day: "Fri", dayTa: "வெள்ளி", high: 34, low: 27, desc: "Hot", descTa: "வெப்பம்", icon: "🔥" },
    ],
  },
  madurai: {
    city: "Madurai", temp: 35, humidity: 65, windSpeed: 10,
    description: "Sunny", descriptionTa: "வெயில்",
    feelsLike: 38, visibility: 10, pressure: 1008, icon: "☀️",
    forecast: [
      { day: "Mon", dayTa: "திங்கள்", high: 36, low: 27, desc: "Hot", descTa: "வெப்பம்", icon: "🔥" },
      { day: "Tue", dayTa: "செவ்வாய்", high: 35, low: 26, desc: "Sunny", descTa: "வெயில்", icon: "☀️" },
      { day: "Wed", dayTa: "புதன்", high: 33, low: 25, desc: "Cloudy", descTa: "மேகமூட்டம்", icon: "☁️" },
      { day: "Thu", dayTa: "வியாழன்", high: 34, low: 26, desc: "Sunny", descTa: "வெயில்", icon: "☀️" },
      { day: "Fri", dayTa: "வெள்ளி", high: 36, low: 28, desc: "Hot", descTa: "வெப்பம்", icon: "🔥" },
    ],
  },
  coimbatore: {
    city: "Coimbatore", temp: 28, humidity: 70, windSpeed: 12,
    description: "Pleasant", descriptionTa: "இனிமையான",
    feelsLike: 30, visibility: 12, pressure: 1012, icon: "🌤️",
    forecast: [
      { day: "Mon", dayTa: "திங்கள்", high: 29, low: 22, desc: "Pleasant", descTa: "இனிமையான", icon: "🌤️" },
      { day: "Tue", dayTa: "செவ்வாய்", high: 28, low: 21, desc: "Rainy", descTa: "மழை", icon: "🌧️" },
      { day: "Wed", dayTa: "புதன்", high: 27, low: 20, desc: "Cloudy", descTa: "மேகமூட்டம்", icon: "☁️" },
      { day: "Thu", dayTa: "வியாழன்", high: 29, low: 22, desc: "Sunny", descTa: "வெயில்", icon: "☀️" },
      { day: "Fri", dayTa: "வெள்ளி", high: 30, low: 23, desc: "Pleasant", descTa: "இனிமையான", icon: "🌤️" },
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

      {/* Hero Banner */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-64 md:h-72">
          <img src={weatherImg} alt="Weather monitoring" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-sky/50" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4"
            >
              {t("Weather Forecast", "வானிலை முன்னறிவிப்பு")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/90 text-lg max-w-2xl"
            >
              {t(
                "Get real-time weather data to plan your farming activities effectively.",
                "உங்கள் விவசாய நடவடிக்கைகளை திறம்பட திட்டமிட நிகழ்நேர வானிலை தரவைப் பெறுங்கள்."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          {/* Search */}
          <div className="flex gap-3 mt-10 mb-8 max-w-lg mx-auto">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchWeather()}
                placeholder={t("Enter city name...", "நகரத்தின் பெயரை உள்ளிடவும்...")}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <Button onClick={searchWeather} className="gap-2 rounded-xl px-6">
              <Search className="h-4 w-4" />
              {t("Search", "தேடு")}
            </Button>
          </div>

          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Main Weather */}
              <div className="bg-gradient-to-br from-primary/10 to-sky/10 border border-border rounded-2xl p-8 md:p-10 text-center">
                <p className="text-muted-foreground mb-2 font-medium">{weather.city}</p>
                <div className="text-7xl md:text-8xl mb-4">{weather.icon}</div>
                <div className="text-5xl md:text-6xl font-extrabold text-foreground mb-2">{weather.temp}°C</div>
                <p className="text-lg text-muted-foreground">{t(weather.description, weather.descriptionTa)}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Thermometer, label: t("Feels Like", "உணர்வு"), value: `${weather.feelsLike}°C`, color: "text-destructive" },
                  { icon: Droplets, label: t("Humidity", "ஈரப்பதம்"), value: `${weather.humidity}%`, color: "text-sky" },
                  { icon: Wind, label: t("Wind Speed", "காற்றின் வேகம்"), value: `${weather.windSpeed} km/h`, color: "text-primary" },
                  { icon: Gauge, label: t("Pressure", "அழுத்தம்"), value: `${weather.pressure} hPa`, color: "text-gold" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-5 text-center group hover:shadow-lg transition-shadow"
                  >
                    <item.icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-foreground">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* 5-Day Forecast */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-lg text-foreground mb-4">{t("5-Day Forecast", "5 நாள் முன்னறிவிப்பு")}</h3>
                <div className="grid grid-cols-5 gap-3">
                  {weather.forecast.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="text-center p-3 md:p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
                    >
                      <p className="text-xs font-semibold text-foreground">{t(day.day, day.dayTa)}</p>
                      <div className="text-2xl my-2">{day.icon}</div>
                      <p className="text-sm font-bold text-foreground">{day.high}°/{day.low}°</p>
                      <p className="text-xs text-muted-foreground mt-1">{t(day.desc, day.descTa)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Farming Advisory */}
              <div className="bg-accent/50 border-2 border-primary/20 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">🌾 {t("Farming Advisory", "விவசாய ஆலோசனை")}</h3>
                <div className="space-y-3">
                  {weather.humidity > 70 && (
                    <div className="flex items-start gap-3 bg-card rounded-xl p-4">
                      <span className="text-xl">💧</span>
                      <div>
                        <p className="font-medium text-sm text-foreground">{t("High Humidity Alert", "அதிக ஈரப்பத எச்சரிக்கை")}</p>
                        <p className="text-xs text-muted-foreground">{t("Monitor for fungal diseases. Ensure proper ventilation.", "பூஞ்சை நோய்களை கண்காணிக்கவும். சரியான காற்றோட்டத்தை உறுதிசெய்யவும்.")}</p>
                      </div>
                    </div>
                  )}
                  {weather.temp > 33 && (
                    <div className="flex items-start gap-3 bg-card rounded-xl p-4">
                      <span className="text-xl">🌡️</span>
                      <div>
                        <p className="font-medium text-sm text-foreground">{t("High Temperature Warning", "அதிக வெப்பநிலை எச்சரிக்கை")}</p>
                        <p className="text-xs text-muted-foreground">{t("Ensure adequate irrigation. Use mulching to retain soil moisture.", "போதுமான நீர்ப்பாசனம் உறுதிசெய்யவும். மண் ஈரப்பதத்தை தக்கவைக்க மல்ச்சிங் பயன்படுத்தவும்.")}</p>
                      </div>
                    </div>
                  )}
                  {weather.windSpeed > 12 && (
                    <div className="flex items-start gap-3 bg-card rounded-xl p-4">
                      <span className="text-xl">💨</span>
                      <div>
                        <p className="font-medium text-sm text-foreground">{t("Windy Conditions", "காற்று நிலை")}</p>
                        <p className="text-xs text-muted-foreground">{t("Secure young plants. Apply mulch to prevent soil erosion.", "இளம் செடிகளை பாதுகாக்கவும். மண் அரிப்பை தடுக்க மல்ச் போடவும்.")}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 bg-card rounded-xl p-4">
                    <span className="text-xl">📋</span>
                    <div>
                      <p className="font-medium text-sm text-foreground">{t("General Tip", "பொது குறிப்பு")}</p>
                      <p className="text-xs text-muted-foreground">{t("Check soil moisture before irrigating. Water early morning or late evening.", "நீர்ப்பாசனத்திற்கு முன் மண் ஈரப்பதத்தை சரிபார்க்கவும். அதிகாலை அல்லது மாலையில் நீர் ஊற்றவும்.")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!weather && (
            <div className="text-center text-muted-foreground py-16">
              <CloudSun className="h-20 w-20 mx-auto mb-6 text-muted-foreground/30" />
              <p className="text-lg">{t("Enter a city name to see weather forecast", "வானிலை முன்னறிவிப்பைப் பார்க்க நகரத்தின் பெயரை உள்ளிடவும்")}</p>
              <p className="text-sm mt-2 text-muted-foreground">{t("Try: Chennai, Madurai, Coimbatore", "முயற்சிக்கவும்: Chennai, Madurai, Coimbatore")}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WeatherForecast;
