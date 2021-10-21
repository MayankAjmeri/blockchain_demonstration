const Miner = ({
  blockchain,
  handleBlockChange,
  handleDataChange,
  handleNonceChange,
  clickHandler,
}) => {
  return (
    <div className="miner">
      <div className="dataform">
        <h4>Block: </h4>
        <textarea
          value={blockchain.block}
          onChange={(e) => handleBlockChange(blockchain.id, e.target.value)}
          rows={1}
          className="miner_Data_Input"
        />
      </div>
      <div className="dataform">
        <h4>Nonce: </h4>
        <textarea
          value={blockchain.nonce}
          onChange={(e) => handleNonceChange(blockchain.id, e.target.value)}
          rows={1}
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
      <button className="mine" onClick={(e) => clickHandler(blockchain.id)}>
        Mine
      </button>
    </div>
  );
};

export default Miner;
