import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getBackgroundClass = (desc = "") => {
  if (desc.includes("sunny")) return "from-yellow-300 to-orange-600";
  if (desc.includes("cloud")) return "from-gray-500 to-gray-800";
  if (desc.includes("rain")) return "from-blue-600 to-gray-900";
  if (desc.includes("snow")) return "from-blue-100 to-white";
  return "from-slate-800 to-black";
};

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      const data = await res.json();
      if (data.success === false || !data.current) {
        setError(data.error?.info || "Invalid city or API error");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Network error");
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const convertTemp = (tempC) =>
    unit === "C" ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br text-white transition-all duration-500 ${
        weather ? getBackgroundClass(weather.current.weather_descriptions[0]?.toLowerCase()) : "from-slate-900 to-black"
      }`}
    >
      <div className="bg-black/40 p-6 rounded-2xl w-full max-w-md shadow-xl">
        {/* Search */}
        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 p-3 rounded-l-xl"
          />
          <button
            onClick={fetchWeather}
            className="bg-white text-black px-4 rounded-r-xl font-semibold"
          >
            Search
          </button>
        </div>

        {/* Toggle */}
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleUnit}
            className="text-sm bg-white text-black px-3 py-1 rounded-full"
          >
            Switch to °{unit === "C" ? "F" : "C"}
          </button>
        </div>

        {/* Display */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-200">{error}</p>
        ) : weather ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold">{weather.location.name}</h1>
            <p className="capitalize text-lg mt-1">
              {weather.current.weather_descriptions[0]}
            </p>
            <div className="text-6xl font-extrabold my-4">
              {convertTemp(weather.current.temperature)}°{unit}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
              <div>
                <p>Humidity</p>
                <p className="font-semibold">{weather.current.humidity}%</p>
              </div>
              <div>
                <p>Wind</p>
                <p className="font-semibold">
                  {weather.current.wind_speed} km/h
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
