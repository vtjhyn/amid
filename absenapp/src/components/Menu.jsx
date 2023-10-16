import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };
  
  return (
    <div className="flex gap-4 mt-12">
      <Button
        label="Edit Profile"
        className="bg-button px-4 py-2 w-[150px]"
        onClick={() => navigate("/editprofile")}
      />
      <Button
        label="Absen"
        className="bg-button px-4 py-2 w-[150px]"
        onClick={() => navigate("/absen")}
      />
      <Button
        label="Summary"
        className="bg-button px-4 py-2 w-[150px]"
        onClick={() => navigate("/summary")}
      />
      <Button
        label="Logout"
        className="bg-button px-4 py-2 w-[150px]"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Menu;
