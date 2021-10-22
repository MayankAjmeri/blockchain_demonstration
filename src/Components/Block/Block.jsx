import React, { Component } from "react";
import "./Block.scss";
const crypto = require("crypto");
class Block extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      nonce: "15390",
      block: "1",
      hash: "",
      loading: false,
    };
    this.handleBlockChange = this.handleBlockChange.bind(this);
    this.handleNonceChange = this.handleNonceChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleBlockChange(event) {
    let block = event.target.value;
    let data = this.state.data;
    let nonce = this.state.nonce;
    const hash = crypto
      .createHash("sha256")
      .update(nonce + data + block)
      .digest("hex");
    this.setState(() => ({ block: block, hash: hash }));
  }

  handleNonceChange(event) {
    let block = this.state.block;
    let data = this.state.data;
    let nonce = event.target.value;
    const hash = crypto
      .createHash("sha256")
      .update(nonce + data + block)
      .digest("hex");
    this.setState(() => ({ nonce: nonce, hash: hash }));
  }

  handleDataChange(event) {
    let block = this.state.block;
    let nonce = this.state.nonce;
    let data = event.target.value;
    const hash = crypto
      .createHash("sha256")
      .update(nonce + data + block)
      .digest("hex");
    this.setState(() => ({ data: data, hash: hash }));
  }

  clickHandler(event) {
    this.setState({ loading: true });
    let nonce = 1;
    const hash = crypto.createHash("sha256");
    let is_req_hash = false;
    let hash_value;
    let data = this.state.data;
    let block = this.state.block;
    while (!is_req_hash) {
      hash_value = hash.update(nonce + data + block).digest("hex");
      if (hash_value.substr(0, 4) === "0000") {
        is_req_hash = true;
      } else {
        nonce++;
      }
    }
    setTimeout(() => {
      this.setState(() => ({ loading: false }));
    }, 2000);
    this.setState(() => ({ nonce: nonce, hash: hash_value }));
  }

  render() {
    return (
      <div className="container">
        <h1>Block </h1>
        <div className="block">
          <div className="dataform">
            <h4>Block: </h4>
            <input
              type="number"
              value={this.state.block}
              onChange={this.handleBlockChange}
              className="data_Input"
            />
          </div>
          <div className="dataform">
            <h4>Nonce: </h4>
            <input
              type="number"
              value={this.state.nonce}
              onChange={this.handleNonceChange}
              className="data_Input"
            />
          </div>
          <div className="dataform">
            <h4>Data: </h4>
            <textarea
              value={this.state.data}
              onChange={this.handleDataChange}
              rows={5}
              className="data_Input"
            />
          </div>
          <div className="dataform">
            <h4>Hash: </h4>
            <textarea
              disabled
              rows={1}
              className="data_Input"
              placeholder={this.state.hash}
            />
          </div>
          <button
            className="mine"
            onClick={this.clickHandler}
            disabled={this.state.loading}
          >
            {!this.state.loading ? (
              <p style={{ margin: "0px" }}>Mine</p>
            ) : (
              <p style={{ margin: "0px", justifyContent: "center" }}>
                {" "}
                Mining
                <i
                  className="fa fa-spinner fa-spin"
                  style={{ margin: "0 5px", fontSize: "24px" }}
                />
              </p>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default Block;
