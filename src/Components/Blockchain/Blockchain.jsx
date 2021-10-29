import { useEffect, useState } from "react";
import crypto from "crypto";
import "./Blockchain.scss";
import Miner from "../Miner/Miner";

const BlockChain = () => {
  const [blocks, setBlocks] = useState([
    {
      id: 0,
      block: 1,
      nonce: 11316,
      data: null,
      prev: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: null,
    },
    {
      id: 1,
      block: 2,
      nonce: 35230,
      data: null,
      prev: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: null,
    },
    {
      id: 2,
      block: 3,
      nonce: 12937,
      data: null,
      prev: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: null,
    },
    {
      id: 3,
      block: 4,
      nonce: 35990,
      data: null,
      prev: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: null,
    },
    {
      id: 4,
      block: 5,
      nonce: 56265,
      data: null,
      prev: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: null,
    },
  ]);

  const updateHash = (tempBlock, index) => {
    for (; index < tempBlock.length; index++) {
      const prev =
        index > 0 ? tempBlock[index - 1].hash : tempBlock[index].prev;
      const hash = crypto
        .createHash("sha256")
        .update(
          tempBlock[index].block +
            tempBlock[index].nonce +
            tempBlock[index].data +
            prev
        )
        .digest("hex");
      tempBlock[index].prev = prev;
      tempBlock[index].hash = hash;
    }
    return tempBlock;
  };

  useEffect(() => {
    setBlocks([...updateHash(blocks, 0)]);
  }, []);

  const handleBlockChange = (index, value) => {
    const temp = blocks;
    temp[index].block = value;
    setBlocks([...updateHash(temp, index)]);
  };

  const handleNonceChange = (index, value) => {
    const temp = blocks;
    temp[index].nonce = value;
    setBlocks([...updateHash(temp, index)]);
  };

  const handleDataChange = (index, value) => {
    const temp = blocks;
    temp[index].data = value;
    setBlocks([...updateHash(temp, index)]);
  };

  const clickHandler = (index) => {
    const temp = blocks;
    let nonce = 1;
    const hash = crypto.createHash("sha256");
    let is_req_hash = false;
    let hash_value;
    while (!is_req_hash) {
      hash_value = hash
        .update(temp[index].block + nonce + temp[index].data + temp[index].prev)
        .digest("hex");
      if (hash_value.substr(0, 4) === "0000") {
        is_req_hash = true;
      }
      nonce++;
    }
    temp[index].hash = hash_value;
    temp[index].nonce = nonce;
    index++;
    for (; index < temp.length; index++) {
      const prev = index > 0 ? temp[index - 1].hash : temp[index].prev;
      const hash = crypto
        .createHash("sha256")
        .update(temp[index].block + temp[index].nonce + temp[index].data + prev)
        .digest("hex");
      temp[index].prev = prev;
      temp[index].hash = hash;
    }
    setBlocks([...temp]);
  };
  return (
    <div className="container">
      <h1>Blockchain </h1>
      <div className="blockchain">
        {blocks.map((block) => {
          return (
            <Miner
              key={block.id}
              blockchain={block}
              handleBlockChange={handleBlockChange}
              handleDataChange={handleDataChange}
              handleNonceChange={handleNonceChange}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlockChain;
