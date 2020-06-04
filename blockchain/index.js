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
