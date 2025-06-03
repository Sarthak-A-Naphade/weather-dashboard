"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  plugins,
} from "chart.js";
import { WeatherData } from "../utils/api";

  ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  plugins
);

interface Props {
  data: WeatherData;
}

export default function WeatherChart({ data }: Props) {
  const chartData = {
    labels: data.time,
    datasets: [
      {
        label: "Max Temp (°C)",
        data: data.temperature_2m_max,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Min Temp (°C)",
        data: data.temperature_2m_min,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
      {
        label: "Mean Temp (°C)",
        data: data.temperature_2m_mean,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Daily Temperature Trends",
        font: { size: 18, weight: "bold" as const },
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}