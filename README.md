# 🌦️ Weather Dashboard (Frontend Challenge)

This is a responsive weather dashboard built using **React (Next.js)** and **Tailwind CSS**, integrating the [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api). It allows users to input a location (latitude and longitude) and date range, and view historical temperature trends in both chart and table format.

---

## 🚀 Live Demo

🔗 [View Live on Vercel](https://your-vercel-url.vercel.app/)

---

## 📸 Features

- 🌍 Input fields for latitude, longitude, start date, and end date
- 📈 Interactive line chart for daily temperature trends
- 📊 Data table with pagination and selectable rows per page
- 🔁 API loading state and error handling
- ✅ Clean, validated inputs with graceful fallback for missing data

---

## 🛠️ Tech Stack

- **React / Next.js 14 (App Router)**
- **Tailwind CSS** – modern utility-first styling
- **Axios** – for API calls
- **Chart.js + react-chartjs-2** – for data visualization
- **React Datepicker** – date inputs
- **React Paginate** – pagination for the table

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Sarthak-A-Naphade/weather-dashboard.git
cd weather-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev

# Open in browser
http://localhost:3000