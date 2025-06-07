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
} from "chart.js";
import { WeatherData } from "../utils/api";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
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
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      title: {
        display: true,
        text: "Daily Temperature Trends",
        font: { 
          size: window.innerWidth < 640 ? 14 : 18,
          weight: "bold" as const 
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: window.innerWidth < 640 ? 12 : 20,
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Temperature (°C)",
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          }
        },
        ticks: {
          font: {
            size: window.innerWidth < 640 ? 9 : 11,
          }
        }
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          }
        },
        ticks: {
          maxTicksLimit: window.innerWidth < 640 ? 5 : 10,
          font: {
            size: window.innerWidth < 640 ? 9 : 11,
          }
        }
      },
    },
  };

  return (
    <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-md w-full">
      <div className="relative h-64 sm:h-80 lg:h-96 w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}