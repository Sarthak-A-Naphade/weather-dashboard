'use client'

import { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import { fetchHistoricalWeather, WeatherData } from "./utils/api";
import WeatherChart from "./components/WeatherChart";
import WeatherTable from "./components/WeatherTable";

export default function Home (){
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async ({
    latitude,
    longitude,
    startDate,
    endDate,
  }: {
    latitude: number;
    longitude: number;
    startDate: Date;
    endDate: Date;
  }) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];
      const data = await fetchHistoricalWeather(latitude, longitude, start, end);
      setWeatherData(data);
    } catch (err: unknown) {
      console.error(err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">Weather Dashboard</h1>
        
        <WeatherForm onSubmit={handleFormSubmit} />

        {loading && <p className="text-center text-blue-600">Loading...</p>}
        {error && <p  className="text-center text-red-500">{error}</p>}

        {weatherData && (
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-bold text-blue-700">Weather Data</h2>
            <WeatherChart data={weatherData} />
            <WeatherTable data={weatherData} />
            <p className="text-center text-green-700">Weather data loaded successfully!</p>
            {/* <pre className="text-sm text-gray-700">{JSON.stringify(weatherData, null, 2)}</pre> */}
          </div>
        )}

      </div>
    </main>
  );
}