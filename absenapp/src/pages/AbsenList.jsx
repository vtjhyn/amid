import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import Button from "../components/Button";

const AbsenList = () => {
  const today = moment().tz("Asia/Jakarta").format();
  const defaultStartDate = today.split("T")[0];
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultStartDate);

  const { data: absen, isLoading: absenLoading } = useSelector(
    (state) => state.absen
  );
  const [filteredData, setFilteredData] = useState(absen);

  const handleFilter = () => {
    const filteredResults = absen.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (startDate && endDate) {
        const filterStartDate = new Date(startDate);
        const filterEndDate = new Date(endDate);
        return entryDate >= filterStartDate && entryDate <= filterEndDate;
      }
      return true;
    });
    setFilteredData(filteredResults);
  };

  const groupEntriesByDate = (entries) => {
    const groupedData = {};
    entries.forEach((entry) => {
      const date = entry.date;
      if (!groupedData[date]) {
        groupedData[date] = { MASUK: null, PULANG: null };
      }
      if (entry.status === "MASUK") {
        groupedData[date].MASUK = date + " " + entry.time.split("+")[0];
      } else if (entry.status === "PULANG") {
        groupedData[date].PULANG = date + " " + entry.time.split("+")[0];
      }
    });
    return groupedData;
  };

  const groupedData = groupEntriesByDate(filteredData);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-semibold mb-4">Absen List</h1>
      <div className="w-full flex items-center justify-center gap-4">
        <label className="mr-2">FROM</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-1 mr-2 hover:cursor-pointer"
        />
        <label className="mr-2">TO</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-1 mr-2 hover:cursor-pointer"
        />
        <Button
          label="Cari"
          onClick={handleFilter}
          className="bg-button px-4 py-1"
          disabled={startDate <= endDate ? false : true}
        />
      </div>
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-800 text-gray-200">
            <th className="border p-2 text-center">MASUK</th>
            <th className="border p-2 text-center">PULANG</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((date, index) => (
            <tr
              className={`text-gray-700 ${
                index % 2 === 0 ? "bg-gray-200" : "bg-white"
              }`}
              key={date}
            >
              <td className="border p-2 text-center">
                {groupedData[date].MASUK || "-"}
              </td>
              <td className="border p-2 text-center">
                {groupedData[date].PULANG || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenList;
