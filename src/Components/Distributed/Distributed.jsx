import { useEffect, useState } from "react";
import DistributedMiner from "../Miner/DistributedMiner";
import "./Distributed.scss";
import crypto from "crypto";

const Distributed = () => {
  const [blocks, setBlocks] = useState([
    [{
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
    },], [{
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
    },], [{
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
    },]
  ])


  const updateHash = (tempBlock, peer) => {

    tempBlock[peer].forEach((ele, index, tempBlock) => {
      const prev = index > 0 ? tempBlock[index - 1].hash : ele.prev;
      const hash = crypto
        .createHash("sha256")
        .update(ele.block + ele.nonce + ele.data + prev)
        .digest("hex");
      ele.prev = prev;
      ele.hash = hash;
      return ele;
    });

    return tempBlock;
  };

  useEffect(() => {
    setBlocks([...updateHash(blocks, 0)]);
    setBlocks([...updateHash(blocks, 1)]);
    setBlocks([...updateHash(blocks, 2)]);
  }, []);

  const handleBlockChange = (peer, index, value) => {
    const temp = blocks;
    // 

    temp[peer][index].block = value;
    // 
    setBlocks([...updateHash(temp, peer)]);
  };

  const handleNonceChange = (peer, index, value) => {
    const temp = blocks;

    temp[peer][index].nonce = value;
    setBlocks([...updateHash(temp, peer)]);
  };

  const handleDataChange = (peer, index, value) => {
    const temp = blocks;
    temp[peer][index].data = value;
    setBlocks([...updateHash(temp, peer)]);
  };

  const clickHandler = (peer, index) => {
    const temp = blocks;
    // 
    // 
    let nonce = 1;
    const hash = crypto.createHash("sha256");
    let is_req_hash = false;

    let hash_value;
    while (!is_req_hash) {
      hash_value = hash
        .update(temp[peer][index].block + nonce + temp[peer][index].data + temp[peer][index].prev)
        .digest("hex");
      if (hash_value.substr(0, 4) === "0000") {
        is_req_hash = true;
      }
      nonce++;
    }

    temp[peer][index].hash = hash_value;
    temp[peer][index].nonce = nonce;
    index++;
    for (; index < temp[peer].length; index++) {
      const prev = index > 0 ? temp[peer][index - 1].hash : temp[peer][index].prev;
      const hash = crypto
        .createHash("sha256")
        .update(temp[peer][index].block + temp[peer][index].nonce + temp[peer][index].data + prev)
        .digest("hex");
      temp[peer][index].prev = prev;
      temp[peer][index].hash = hash;
    }
    setBlocks([...temp]);
  };
  return (
    <div className="container">
      <h1>Distributed Blockchain </h1>
      <h2>Peer A</h2>
      <div className="peers">
        {blocks[0].map((block) => {
          return (
            <DistributedMiner
              key={block.id}
              blockchain={block}
              peer={0}
              handleBlockChange={handleBlockChange}
              handleDataChange={handleDataChange}
              handleNonceChange={handleNonceChange}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
      <h2>Peer B</h2>
      <div className="peers">
        {blocks[1].map((block) => {
          return (
            <DistributedMiner
              key={block.id}
              peer={1}
              blockchain={block}
              handleBlockChange={handleBlockChange}
              handleDataChange={handleDataChange}
              handleNonceChange={handleNonceChange}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
      <h2>Peer C</h2>
      <div className="peers">
        {blocks[2].map((block) => {
          return (
            <DistributedMiner
              key={block.id}
              peer={2}
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


export default Distributed;
