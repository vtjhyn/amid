import React from "react";
import ProfileCard from "../components/ProfileCard";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <ProfileCard />
      <Menu />
    </div>
  );
};

export default Home;
