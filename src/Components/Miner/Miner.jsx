import React, { Component } from "react";
import "./Miner.scss";

class Miner extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      nonce: "15390",
      block: "1",
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleChange(event) {
    let p = event.target.value;
    this.setState(() => ({ data: p }));
  }

  clickHandler() {
    console.log("clicked");
  }

  render() {
    return (
      <div className="miner">
        <div className="dataform">
          <h4>Block: </h4>
          <textarea
            value={this.state.block}
            onChange={this.handleChange}
            rows={1}
            className="miner_Data_Input"
          />
        </div>
        <div className="dataform">
          <h4>Nonce: </h4>
          <textarea
            value={this.state.nonce}
            onChange={this.handleChange}
            rows={1}
            className="miner_Data_Input"
          />
        </div>
        <div className="dataform">
          <h4>Data: </h4>
          <textarea
            value={this.state.data}
            onChange={this.handleChange}
            rows={10}
            className="miner_Data_Input"
          />
        </div>
        <div className="dataform">
          <h4>Hash: </h4>
          <textarea
            disabled
            rows={1}
            className="miner_Data_Input"
            placeholder={this.state.data}
          />
        </div>
        <button className="mine" onClick={this.clickHandler}>
          Mine
        </button>
      </div>
    );
  }
}

export default Miner;
