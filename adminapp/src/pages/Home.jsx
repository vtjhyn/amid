import React from "react";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <h1>Welcome</h1>
      <Menu />
    </div>
  );
};

export default Home;
