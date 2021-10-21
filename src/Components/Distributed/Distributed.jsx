import React, { Component } from "react";
import Miner from "../Miner/Temp";
import "./Distributed.scss";

class Distributed extends Component {
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
        <h2>Peer A</h2>
        <div className="peers">
          <Miner />
          <Miner />
          <Miner />
          <Miner />
          <Miner />
        </div>
        <h2>Peer B</h2>
        <div className="peers">
          <Miner />
          <Miner />
          <Miner />
          <Miner />
          <Miner />
        </div>
        <h2>Peer C</h2>
        <div className="peers">
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

export default Distributed;
