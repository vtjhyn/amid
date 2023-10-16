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
        label="All User"
        className="bg-button px-4 py-2 w-[150px]"
        onClick={() => navigate("/users")}
      />
      <Button
        label="All Absben"
        className="bg-button px-4 py-2 w-[150px]"
        onClick={() => navigate("/absen")}
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
