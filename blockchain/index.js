const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
    return block;
  }

  isValidBlock(block) {
    const lastBlock = this.chain[this.chain.length - 1];
    if (block.hash !== Block.blockHash(block)) return false;
    if (block.lastHash != lastBlock.hash) return false;
    return true;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      console.log("Blockchain -> isValidChain -> chain[0]", chain[0]);
      console.log(
        "Blockchain -> isValidChain -> Block.genesis()",
        Block.genesis()
      );
      console.log("fail genesis");
      // console.log(JSON.stringify(chain[0]));
      // console.log(JSON.stringify(Block.genesis()));
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      )
        return false;
    }

    return true;
  }


  }
}

module.exports = Blockchain;
