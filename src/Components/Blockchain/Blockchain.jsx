import React, { Component } from "react";
import Miner from "../Miner/Miner";
import "./Blockchain.scss";

class Blockchain extends Component {
  constructor() {
    super();
    this.state = {
      block: "1",
      nonce: "15390",
      data: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let p = event.target.value;
    this.setState(() => ({ data: p }));
  }

  render() {
    return (
      <div className="container">
        <h1>Blockchain </h1>
        <div className="blockchain">
          <Miner />
          <Miner />
          <Miner />
          <Miner />
          <Miner />
        </div>
      </div>
    );
  }
}

export default Blockchain;
