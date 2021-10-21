import React, { Component } from "react";
import "./Hash.scss";

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
    this.setState(() => ({ data: p }));
  }

  render() {
    return (
      <div className="hash_Container">
        <h1>Hash </h1>
        <div className="hash">
          <div className="data">
            <h4>Data: </h4>
            <textarea
              value={this.state.data}
              onChange={this.handleChange}
              rows={5}
              className="data_Input"
            />
          </div>
          <div className="data">
            <h4>Hash: </h4>
            <textarea
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