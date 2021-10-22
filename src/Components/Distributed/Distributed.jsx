import { useEffect, useState } from "react";
import Miner from "../Miner/Miner";
import "./Distributed.scss";
import crypto from "crypto";

const Distributed = () => {
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

  const updateHash = (tempBlock) => {
    tempBlock.forEach((ele, index, tempBlock) => {
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
    setBlocks([...updateHash(blocks)]);
  }, []);

  const handleBlockChange = (index, value) => {
    const temp = blocks;
    // console.log("index, value", index, value);

    temp[index].block = value;
    // console.log([...updateHash(temp)]);
    setBlocks([...updateHash(temp)]);
  };

  const handleNonceChange = (index, value) => {
    const temp = blocks;
    console.log(temp[index]);
    temp[index].nonce = value;
    setBlocks([...updateHash(temp)]);
  };

  const handleDataChange = (index, value) => {
    const temp = blocks;
    temp[index].data = value;
    setBlocks([...updateHash(temp)]);
  };

  const clickHandler = (index) => {
    const temp = blocks;
    console.log(index);
    let nonce = 1;
    const hash = crypto.createHash("sha256");
    let is_req_hash = false;
    console.log(temp[index]);
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
    console.log(hash_value);
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
      <h1>Distributed Blockchain </h1>
      <h2>Peer A</h2>
      <div className="peers">
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
      <h2>Peer B</h2>
      <div className="peers">
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
      <h2>Peer C</h2>
      <div className="peers">
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


export default Distributed;
