import React, { Component } from "react";
import "./Hash.scss";
const crypto = require("crypto");
class Hash extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let p = event.target.value;
    const hash = crypto.createHash("sha256").update(p).digest("hex");
    this.setState(() => ({ data: hash }));
  }

  render() {
    return (
      <div className="container">
        <h1>Hash </h1>
        <div className="hash">
          <div className="dataform">
            <h4>Data: </h4>
            <textarea
              onChange={this.handleChange}
              rows={5}
              className="data_Input"
            />
          </div>
          <div className="dataform">
            <h4>Hash: </h4>
            <textarea
              rows={1}
              disabled
              className="data_Input"
              placeholder={this.state.data}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Hash;
