import React from "react";
import "./Home.scss";
import "../body.scss";
import Hash from "../Components/Hash/Hash";
import Block from "../Components/Block/Block";
import Blockchain from "../Components/Blockchain/Blockchain";
import Distributed from "../Components/Distributed/Distributed";

function Home() {
  return (
    <div>
      <div className="Navbar">
        <h1>Live Blockchain</h1>
      </div>
      <div className="home">
        <Hash />
        <Block />
        <Blockchain />
        <Distributed />
      </div>
    </div>
  );
}

export default Home;
