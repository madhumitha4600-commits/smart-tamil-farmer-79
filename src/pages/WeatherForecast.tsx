import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CloudSun, Droplets, Wind, Thermometer, Gauge, MapPin, Search, AlertTriangle, Loader2, Sprout, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WeatherData {
  city: string;
  lat: number;
  lon: number;
  temp: number;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  pressure: number;
  uvIndex: number;
  rainfall: number;
  hourlyRain: number[];
  daily: { dateStr: string; maxTemp: number; minTemp: number; rain: number; et0: number }[];
}

const WMO_ICONS: Record<number, string> = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "🌨️", 80: "🌧️", 81: "🌧️", 82: "🌧️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
};

function humidex(temp: number, humidity: number): number {
  const dew = temp - ((100 - humidity) / 5);
  const e = 6.11 * Math.exp(5417.7530 * (1/273.16 - 1/(273.15 + dew)));
  return Math.round(temp + (5/9) * (e - 10));
}

function hargreavesET0(tmax: number, tmin: number, lat: number, dayOfYear: number): number {
  const dr = 1 + 0.033 * Math.cos(2 * Math.PI * dayOfYear / 365);
  const delta = 0.409 * Math.sin(2 * Math.PI * dayOfYear / 365 - 1.39);
  const phi = lat * Math.PI / 180;
  const ws = Math.acos(-Math.tan(phi) * Math.tan(delta));
  const Ra = (24 * 60 / Math.PI) * 0.0820 * dr * (ws * Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.sin(ws));
  return Math.max(0, 0.0023 * (((tmax + tmin) / 2) + 17.8) * Math.sqrt(Math.max(0, tmax - tmin)) * Ra);
}

function pestRisk(temp: number, humidity: number): { name: string; risk: string; color: string; advice: string }[] {
  const risks = [];
  if (temp > 25 && humidity > 80) risks.push({ name: "Fungal Blight", risk: "High", color: "text-destructive", advice: "Apply Mancozeb 2.5g/L immediately" });
  if (temp > 30 && humidity > 70) risks.push({ name: "Brown Plant Hopper", risk: "Medium", color: "text-secondary", advice: "Monitor paddy fields, use light traps" });
  if (temp > 35 && humidity < 50) risks.push({ name: "Spider Mite", risk: "Medium", color: "text-secondary", advice: "Spray Dicofol 2ml/L on affected crops" });
  if (risks.length === 0) risks.push({ name: "General", risk: "Low", color: "text-primary", advice: "Conditions normal. Continue regular monitoring." });
  return risks;
}

const WeatherForecast = () => {
  const { t } = useLanguage();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,pressure_msl,precipitation&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&timezone=Asia/Kolkata&forecast_days=14`
      );
      const data = await resp.json();
      if (!data.current) throw new Error("No data");

      const hourlyRain = (data.hourly?.precipitation_probability || []).slice(0, 24) as number[];
      const daily = (data.daily?.time || []).map((d: string, i: number) => {
        const maxT = data.daily.temperature_2m_max[i];
        const minT = data.daily.temperature_2m_min[i];
        const dayOfYear = Math.floor((new Date(d).getTime() - new Date(new Date(d).getFullYear(), 0, 0).getTime()) / 86400000);
        return {
          dateStr: new Date(d).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
          maxTemp: Math.round(maxT),
          minTemp: Math.round(minT),
          rain: Math.round((data.daily.precipitation_sum?.[i] || 0) * 10) / 10,
          et0: Math.round(hargreavesET0(maxT, minT, lat, dayOfYear) * 10) / 10,
        };
      });

      setWeather({
        city: cityName,
        lat, lon,
        temp: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        feelsLike: Math.round(data.current.apparent_temperature),
        pressure: Math.round(data.current.pressure_msl),
        uvIndex: data.daily?.uv_index_max?.[0] || 0,
        rainfall: data.current.precipitation || 0,
        hourlyRain,
        daily,
      });
    } catch {
      setError(t("Could not fetch weather data", "வானிலை தரவை பெற முடியவில்லை"));
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const data = await resp.json();
      if (data.results?.length) {
        await fetchWeather(data.results[0].latitude, data.results[0].longitude, data.results[0].name);
      } else {
        setError(t("City not found", "நகரம் கிடைக்கவில்லை"));
        setLoading(false);
      }
    } catch {
      setError(t("Search failed", "தேடல் தோல்வி"));
      setLoading(false);
    }
  };

  const useGPS = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(pos.coords.latitude, pos.coords.longitude, t("Your Location", "உங்கள் இருப்பிடம்")),
      () => setError(t("Location access denied", "இருப்பிட அணுகல் மறுக்கப்பட்டது"))
    );
  };

  const heatIndex = weather ? humidex(weather.temp, weather.humidity) : 0;
  const heatDanger = heatIndex > 45 ? "🔴 Extreme" : heatIndex > 40 ? "🟠 Dangerous" : heatIndex > 35 ? "🟡 Caution" : "🟢 Safe";
  const todayET0 = weather?.daily?.[0]?.et0 || 0;

  // Sowing window analysis
  const sowingWindows = weather?.daily?.slice(0, 12).map((_, i) => {
    if (i > 9) return null;
    const window = weather.daily.slice(i, i + 3);
    if (window.length < 3) return null;
    const avgTemp = window.reduce((s, d) => s + (d.maxTemp + d.minTemp) / 2, 0) / 3;
    const totalRain = window.reduce((s, d) => s + d.rain, 0);
    let score = 0;
    if (avgTemp >= 22 && avgTemp <= 32) score += 40;
    else if (avgTemp >= 18 && avgTemp <= 36) score += 20;
    if (totalRain >= 5 && totalRain <= 30) score += 35;
    else if (totalRain < 5) score += 15;
    score += Math.min(25, 25 - Math.abs(totalRain - 15));
    return { start: weather.daily[i].dateStr, score: Math.max(0, Math.min(100, Math.round(score))), avgTemp: Math.round(avgTemp), totalRain: Math.round(totalRain * 10) / 10 };
  }).filter(Boolean) as { start: string; score: number; avgTemp: number; totalRain: number }[] || [];

  const bestWindow = sowingWindows.length ? sowingWindows.reduce((a, b) => a.score > b.score ? a : b) : null;

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-sky to-primary">
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground mb-3">
              {t("Advanced Weather Forecast", "மேம்பட்ட வானிலை முன்னறிவிப்பு")}
            </motion.h1>
            <p className="text-primary-foreground/80">{t("Heat stress, ET₀, pest risk & sowing window analysis", "வெப்ப அழுத்தம், ET₀, பூச்சி ஆபத்து & விதைப்பு சாளர பகுப்பாய்வு")}</p>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex gap-3 mt-8 mb-6 max-w-lg mx-auto">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input type="text" value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === "Enter" && searchCity()} placeholder={t("Enter city...", "நகரத்தை உள்ளிடவும்...")} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            <Button onClick={searchCity} disabled={loading} className="gap-2 rounded-xl">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={useGPS} className="gap-1 rounded-xl text-xs">
              📍 GPS
            </Button>
          </div>

          {error && <p className="text-center text-destructive text-sm mb-4">{error}</p>}

          {weather && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Main card */}
              <div className="bg-gradient-to-br from-sky/10 to-primary/10 border border-border rounded-2xl p-6 md:p-8 text-center">
                <p className="text-muted-foreground mb-1 font-medium">{weather.city}</p>
                <div className="text-5xl md:text-6xl font-display font-extrabold text-foreground">{weather.temp}°C</div>
                <p className="text-sm text-muted-foreground mt-1">{t("Feels like", "உணர்வு")} {weather.feelsLike}°C</p>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Droplets, label: t("Humidity", "ஈரப்பதம்"), value: `${weather.humidity}%`, color: "text-sky" },
                  { icon: Wind, label: t("Wind", "காற்று"), value: `${weather.windSpeed} km/h`, color: "text-primary" },
                  { icon: Gauge, label: t("Pressure", "அழுத்தம்"), value: `${weather.pressure} hPa`, color: "text-gold" },
                  { icon: Thermometer, label: t("UV Index", "UV குறியீடு"), value: `${weather.uvIndex}`, color: "text-destructive" },
                ].map(item => (
                  <div key={item.label} className="bg-card border border-border rounded-xl p-4 text-center">
                    <item.icon className={`h-5 w-5 mx-auto mb-1 ${item.color}`} />
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Heat Stress Index */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                  🌡️ {t("Heat Stress Index (Humidex)", "வெப்ப அழுத்த குறியீடு")}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-display font-extrabold">{heatIndex}°</span>
                  <span className="text-sm font-medium">{heatDanger}</span>
                </div>
                {heatIndex > 35 && (
                  <p className="text-xs text-destructive mt-2">{t("⚠️ Avoid prolonged field work. Ensure workers have shade and hydration.", "⚠️ நீண்ட நேர வயல் வேலையைத் தவிர்க்கவும். நிழல் மற்றும் நீர் உறுதிசெய்யவும்.")}</p>
                )}
              </div>

              {/* ET₀ Irrigation Calculator */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                  💧 {t("ET₀ Irrigation Need (Hargreaves)", "ET₀ நீர்ப்பாசன தேவை")}
                </h3>
                <p className="text-3xl font-display font-extrabold text-sky">{todayET0} <span className="text-lg text-muted-foreground">L/m²/day</span></p>
                <p className="text-xs text-muted-foreground mt-2">{t("This is how much water your crop needs today based on temperature.", "வெப்பநிலையின் அடிப்படையில் உங்கள் பயிருக்கு இன்று எவ்வளவு நீர் தேவை.")}</p>
              </div>

              {/* 24h Rain Chart */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4">{t("24-Hour Rain Probability", "24 மணி நேர மழை நிகழ்தகவு")}</h3>
                <div className="flex items-end gap-0.5 h-24">
                  {weather.hourlyRain.map((p, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${p}%` }}
                        transition={{ delay: i * 0.03, duration: 0.5 }}
                        className={`w-full rounded-t ${p > 60 ? 'bg-sky' : p > 30 ? 'bg-sky/60' : 'bg-sky/30'}`}
                        style={{ minHeight: p > 0 ? '2px' : '0px' }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span><span>11PM</span>
                </div>
              </div>

              {/* Pest Risk */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Bug className="h-5 w-5 text-destructive" />
                  {t("Pest & Disease Risk Forecast", "பூச்சி & நோய் ஆபத்து")}
                </h3>
                <div className="space-y-3">
                  {pestRisk(weather.temp, weather.humidity).map((r, i) => (
                    <div key={i} className="flex items-start gap-3 bg-accent/50 rounded-xl p-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${r.color} bg-card`}>{r.risk}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.advice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 14-day forecast */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4">{t("14-Day Forecast", "14 நாள் முன்னறிவிப்பு")}</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weather.daily.map((d, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="text-center p-2 rounded-xl bg-accent/30 text-xs">
                      <p className="font-medium text-foreground truncate">{d.dateStr.split(',')[0]}</p>
                      <p className="font-bold text-foreground mt-1">{d.maxTemp}°/{d.minTemp}°</p>
                      <p className="text-muted-foreground">{d.rain}mm</p>
                      <p className="text-sky text-[10px]">ET₀:{d.et0}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Sowing Window */}
              {sowingWindows.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-primary" />
                    {t("AI Sowing Window Detector", "AI விதைப்பு சாளர கண்டறிதல்")}
                  </h3>
                  <div className="space-y-2">
                    {sowingWindows.slice(0, 5).map((w, i) => (
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${w === bestWindow ? 'bg-primary/10 border-2 border-primary/30' : 'bg-accent/30'}`}>
                        <div className="w-full">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-foreground">{w.start} (3 days)</span>
                            <span className="text-xs font-bold text-primary">{w.score}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${w.score}%` }} transition={{ duration: 1 }} className="bg-primary h-2 rounded-full" />
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1">Avg: {w.avgTemp}°C • Rain: {w.totalRain}mm {w === bestWindow ? `• ${t("⭐ Best Window", "⭐ சிறந்த சாளரம்")}` : ""}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Farming Advisory */}
              <div className="bg-accent/50 border-2 border-primary/20 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">🌾 {t("Today's Farming Advisory", "இன்றைய விவசாய ஆலோசனை")}</h3>
                <div className="space-y-2">
                  {weather.humidity > 70 && <div className="flex items-start gap-2 bg-card rounded-xl p-3"><AlertTriangle className="h-4 w-4 text-gold mt-0.5" /><p className="text-xs text-muted-foreground">{t("High humidity — monitor for fungal diseases, ensure ventilation.", "அதிக ஈரப்பதம் — பூஞ்சை நோய்களை கண்காணிக்கவும்.")}</p></div>}
                  {weather.temp > 33 && <div className="flex items-start gap-2 bg-card rounded-xl p-3"><AlertTriangle className="h-4 w-4 text-destructive mt-0.5" /><p className="text-xs text-muted-foreground">{t("High temperature — irrigate early morning or late evening.", "அதிக வெப்பநிலை — அதிகாலை அல்லது மாலையில் நீர் ஊற்றவும்.")}</p></div>}
                  {todayET0 > 5 && <div className="flex items-start gap-2 bg-card rounded-xl p-3"><Droplets className="h-4 w-4 text-sky mt-0.5" /><p className="text-xs text-muted-foreground">{t(`High water demand (${todayET0} L/m²). Ensure adequate irrigation.`, `அதிக நீர் தேவை (${todayET0} L/m²). போதுமான நீர்ப்பாசனம் உறுதிசெய்யவும்.`)}</p></div>}
                  <div className="flex items-start gap-2 bg-card rounded-xl p-3"><Sprout className="h-4 w-4 text-primary mt-0.5" /><p className="text-xs text-muted-foreground">{t("Check soil moisture before irrigating. Water early morning.", "நீர்ப்பாசனத்திற்கு முன் மண் ஈரப்பதத்தை சரிபார்க்கவும்.")}</p></div>
                </div>
              </div>
            </motion.div>
          )}

          {!weather && !loading && (
            <div className="text-center text-muted-foreground py-16">
              <CloudSun className="h-20 w-20 mx-auto mb-6 text-muted-foreground/30" />
              <p className="text-lg font-display">{t("Enter a city or use GPS", "நகரத்தை உள்ளிடவும் அல்லது GPS பயன்படுத்தவும்")}</p>
              <p className="text-sm mt-2">{t("Try: Chennai, Madurai, Coimbatore, Thanjavur", "முயற்சிக்கவும்: Chennai, Madurai, Coimbatore, Thanjavur")}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WeatherForecast;
