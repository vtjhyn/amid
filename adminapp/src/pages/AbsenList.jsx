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

  return (
    <div className="min-h-screen pt-14 flex flex-col gap-8">
      <h1 className="w-full text-center font-bold text-[28px]">Absen List</h1>
      <div>
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="border p-2 text-center">NAMA</th>
              <th className="border p-2 text-center">STATUS</th>
              <th className="border p-2 text-center">WAKTU</th>
            </tr>
          </thead>
          <tbody>
            {absen.map((data, index) => (
              <tr
                className={`text-gray-700 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-white"
                }`}
                key={index}
              >
                <td className="border p-2 text-center">{data.user.name}</td>
                <td className="border p-2 text-center">{data.status}</td>
                <td className="border p-2 text-center">
                  {data.date} {data.time.split("+")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbsenList;
