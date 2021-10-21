import { useEffect, useState } from "react";
import crypto from "crypto";
import "./Blockchain.scss";
import Temp from "../Miner/Miner";

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

  return (
    <div className="container">
      <h1>Blockchain </h1>
      <div className="blockchain">
        {blocks.map((block) => {
          return (
            <Temp
              key={block.id}
              blockchain={block}
              handleBlockChange={handleBlockChange}
              handleDataChange={handleDataChange}
              handleNonceChange={handleNonceChange}
              clickHandler={() => null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlockChain;
