import axios from "axios";

export interface WeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  temperature_2m_mean: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  apparent_temperature_mean: number[];
}

export async function fetchHistoricalWeather(
  latitude: number,
  longitude: number,
  start: string, // Format: yyyy-MM-dd
  end: string
): Promise<WeatherData> {
  const url = "https://archive-api.open-meteo.com/v1/archive";

  const params = {
    latitude,
    longitude,
    start_date: start,
    end_date: end,
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "temperature_2m_mean",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "apparent_temperature_mean",
    ],
    timezone: "auto",
  };

  const { data } = await axios.get(url, { params });
  return data.daily;
}
