import React, { Component } from "react";
import "./Miner.scss";
const crypto = require("crypto");

class Miner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "props.block.id",
      nonce: "",
      block: "",
      hash: "",
      prev: "",
    };
    this.handleBlockChange = this.handleBlockChange.bind(this);
    this.handleNonceChange = this.handleNonceChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    // console.log("props", this.props.block);
  }

  componentWillMount() {
    // console.log("componentWillMount ", this.props);
    if (this.props?.block) {
      // console.log("componentDidMount props", this);
      this.setState(() => ({
        block: this.props.block.block,
        data: this.props.block.data,
        nonce: this.props.block.nonce,
        hash: this.props.block.hash,
        prev: this.props.block.prev,
      }));
    }
  }

  componentWillReceiveProps() {
    this.setState(() => ({
      block: this.props.block.block,
      data: this.props.block.data,
      nonce: this.props.block.nonce,
      hash: this.props.block.hash,
      prev: this.props.block.prev,
    }));
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
    this.setState(() => ({ nonce: nonce, hash: hash_value }));
  }

  render() {
    return (
      <div className="miner">
        <div className="dataform">
          <h4>Block: </h4>
          <textarea
            value={this.state.block}
            onChange={this.handleBlockChange}
            rows={1}
            className="miner_Data_Input"
          />
        </div>
        <div className="dataform">
          <h4>Nonce: </h4>
          <textarea
            value={this.state.nonce}
            onChange={this.handleNonceChange}
            rows={1}
            className="miner_Data_Input"
          />
        </div>
        <div className="dataform">
          <h4>Data: </h4>
          <textarea
            value={this.state.data}
            onChange={this.handleDataChange}
            rows={10}
            className="miner_Data_Input"
          />
        </div>
        <div className="dataform">
          <h4>Prev: </h4>
          <textarea
            disabled
            rows={3}
            className="miner_Data_Input"
            placeholder={this.state.prev}
          />
        </div>
        <div className="dataform">
          <h4>Hash: </h4>
          <textarea
            disabled
            rows={3}
            className="miner_Data_Input"
            placeholder={this.state.hash}
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
