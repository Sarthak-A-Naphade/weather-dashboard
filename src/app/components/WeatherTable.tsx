'use client'

import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { WeatherData } from '../utils/api';

interface Props {
  data: WeatherData
}

export default function WeatherTable({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const totalItems = data.time.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const offset = currentPage * itemsPerPage;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value))
    setCurrentPage(0)
  }

  const slice = (arr: number[] | string[]) => arr.slice(offset, offset + itemsPerPage)


  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-700">Weather Table</h2>
        <div>
          <label className="mr-2 text-sm text-gray-700">Rows per page:</label>
          <select
            className="border rounded px-2 py-1 text-sm text-gray-800"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border text-gray-800">Date</th>
              <th className="px-4 py-2 border text-gray-800">Max Temp (°C)</th>
              <th className="px-4 py-2 border text-gray-800">Min Temp (°C)</th>
              <th className="px-4 py-2 border text-gray-800">Mean Temp (°C)</th>
              <th className="px-4 py-2 border text-gray-800">Max Apparent Temp (°C)</th>
              <th className="px-4 py-2 border text-gray-800">Min Apparent Temp (°C)</th>
              <th className="px-4 py-2 border text-gray-800">Mean Apparent Temp (°C)</th>
            </tr>
          </thead>
          <tbody>
          {slice(data.time).map((date, idx) => {
              const i = offset + idx
              return (
                <tr key={date}>
                  <td className="px-4 py-2 border text-gray-800">{date}</td>
                  <td className="px-4 py-2 border text-gray-800">{data.temperature_2m_max[i] ?? 'N/A'}</td>
                  <td className="px-4 py-2 border text-gray-800">{data.temperature_2m_min[i] ?? 'N/A'}</td>
                  <td className="px-4 py-2 border text-gray-800">{data.temperature_2m_mean[i] ?? 'N/A'}</td>
                  <td className="px-4 py-2 border text-gray-800">{data.apparent_temperature_max[i] ?? 'N/A'}</td>
                  <td className="px-4 py-2 border text-gray-800">{data.apparent_temperature_min[i] ?? 'N/A'}</td>
                  <td className="px-4 py-2 border text-gray-800">{data.apparent_temperature_mean[i] ?? 'N/A'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center items-center space-x-2 text-sm text-gray-800"
        pageClassName="px-2 py-1 border rounded text-gray-800"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-2 py-1 text-gray-800"
        nextClassName="px-2 py-1 text-gray-800"
        breakLabel="..."
      />
    </div>
  );
}