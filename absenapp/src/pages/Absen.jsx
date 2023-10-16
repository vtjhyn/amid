import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAbsen } from "../store/slice/absenSlice";
import moment from "moment-timezone";

const Absen = () => {
  const currentDate = moment().tz("Asia/Jakarta").format();
  const date = currentDate.split("T")[0];
  const time = currentDate.split("T")[1].split(".")[0].split("+")[0];

  const [absenType, setAbsenType] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: absen, isLoading: absenLoading } = useSelector(
    (state) => state.absen
  );

  const handleAbsen = (type) => {
    setAbsenType(type);
  };

  const handleSubmit = () => {
    if (absenType) {
      const payload = {
        id: user.id,
        status: absenType.toUpperCase(),
      };
      dispatch(addAbsen(payload));
    } else {
      console.log("Pilih jenis absen terlebih dahulu");
    }
  };

  useEffect(() => {
    if (user.id) {
      if (absen) {
        const isMasukAbsen = absen.some(
          (data) => data.status === "MASUK" && data.date === date
        );
        const isPulangAbsen = absen.some(
          (data) => data.status === "PULANG" && data.date === date
        );

        setDisabled({
          masuk: isMasukAbsen,
          pulang: isPulangAbsen,
        });
      } else {
        console.log("tidak ada absen");
      }
    } else {
      console.log("tidak ada user");
    }
  }, [absen, date]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Absen</h1>
        <p className="text-lg text-gray-600 mb-4">
          Tanggal: {date}, Waktu: {time}
        </p>
        <div className="space-y-4">
          <p className="text-xl text-gray-600">Pilih jenis absen:</p>
          <div className="flex justify-center space-x-4">
            <Button
              label="Masuk"
              className={`w-32 h-32 rounded-full border-4 border-button ${
                absenType === "MASUK"
                  ? "bg-[#183D3D] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleAbsen("MASUK")}
              disabled={disabled.masuk}
            />
            <Button
              label="Pulang"
              className={`w-32 h-32 rounded-full border-4 border-button ${
                absenType === "PULANG"
                  ? "bg-[#183D3D] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleAbsen("PULANG")}
              disabled={disabled.pulang}
            />
          </div>
          {disabled.masuk && disabled.pulang && (
            <p className="text-green-500 font-semibold">
              Anda telah menyelesaikan absen untuk hari ini
            </p>
          )}
          <Button
            label="Submit"
            className="w-32 h-12 rounded-lg bg-button"
            onClick={handleSubmit}
            disabled={disabled.masuk && disabled.pulang}
          />
        </div>
      </div>
    </div>
  );
};

export default Absen;
