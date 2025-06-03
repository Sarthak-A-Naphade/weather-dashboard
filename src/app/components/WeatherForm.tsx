'use client'

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface WeatherFormProps {
  onSubmit?: (params: {
    latitude: number;
    longitude: number;
    startDate: Date;
    endDate: Date;
  }) => void;
}
  

export default function WeatherForm({ onSubmit }: WeatherFormProps){
    const [latitude, setLatitude] = useState<number | ''>('')
    const [longitude, setLongitude] = useState<number | ''>('')
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [error, setError] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!latitude || !longitude || !startDate || !endDate) {
            setError('Please fill in all fields')
            return
        }
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            setError('Please enter valid latitude and longitude values.')
            return
        }
        if (startDate > endDate) {
            setError('Start date must be before end date')
            return
        }
        
        onSubmit?.({
            latitude: Number(latitude),
            longitude: Number(longitude),
            startDate,
            endDate,
        })
    }

    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Latitude (-90 to 90)
            </label>
            <input
              type="number"
              value={latitude}
              onChange={(e) =>
                setLatitude(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="text-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              step="any"
              min="-90"
              max="90"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Longitude (-180 to 180)
            </label>
            <input
              type="number"
              value={longitude}
              onChange={(e) =>
                setLongitude(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="text-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              step="any"
              min="-180"
              max="180"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="text-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="text-gray-700 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText="Select start date"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Fetch Weather Data
        </button>
      </form>
    );
}
