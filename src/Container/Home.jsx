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
      <div className="navbar">
        <h1>Live Blockchain</h1>
      </div>
      <div className="home">
        <Hash />
        <Block />
        <Blockchain />
        <Distributed />
      </div>
      <div className="footer">
        <h4>Created by:</h4>
        <p>201851012 Mayank Ajmeri</p>
        <p>201851089 Prateek Chouhan</p>
        <p>201851029 Ashutosh Singh</p>
        <p>201851013 Akshat Srivastava</p>
        <p>201851038 Devansh Agrawal</p>
      </div>
    </div>
  );
}

export default Home;
