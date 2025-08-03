import React from "react";


const WeatherCard = ({ weather, unit }) => {
  const temp =
    unit === "C"
      ? weather.main.temp
      : (weather.main.temp * 9) / 5 + 32;

  return (
    <div className="bg-black bg-opacity-50 p-6 rounded-2xl max-w-md w-full text-center shadow-lg">
      <h1 className="text-3xl font-bold">{weather.name}</h1>
      <p className="text-xl mt-2">{weather.weather[0].description}</p>
      <p className="text-6xl font-extrabold mt-4">
        {Math.round(temp)}°{unit}
      </p>
    </div>
  );
};

export default WeatherCard;
