import "./Miner.scss";
import { useState } from "react";

const Miner = ({
  blockchain,
  handleBlockChange,
  handleDataChange,
  handleNonceChange,
  clickHandler,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="miner">
      <div className="dataform">
        <h4>Block: </h4>
        <input
          type="number"
          value={blockchain.block}
          onChange={(e) => handleBlockChange(blockchain.id, e.target.value)}
          className="miner_Data_Input"
        />
      </div>
      <div className="dataform">
        <h4>Nonce: </h4>
        <input
          type="number"
          value={blockchain.nonce}
          onChange={(e) => handleNonceChange(blockchain.id, e.target.value)}
          className="miner_Data_Input"
        />
      </div>
      <div className="dataform">
        <h4>Data: </h4>
        <textarea
          value={blockchain.data}
          onChange={(e) => handleDataChange(blockchain.id, e.target.value)}
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
          placeholder={blockchain.prev}
        />
      </div>
      <div className="dataform">
        <h4>Hash: </h4>
        <textarea
          disabled
          rows={3}
          className="miner_Data_Input"
          placeholder={blockchain.hash}
        />
      </div>
      <button
        className="mine"
        onClick={(e) => {
          setLoading(true);
          clickHandler(blockchain.id);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }}
        disabled={loading}
      >
        {!loading ? (
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
  );
};

export default Miner;
