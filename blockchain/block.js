const SHA256 = require("sha256");

const { DIFFICULTY, MINE_RATE } = require("../config");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  /**
   * returns what the object looks like
   * substring is used to make it look nice
   * hashes are too big to printed on command line
   */

  toString() {
    return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0, 10)}
        Hash      : ${this.hash.substring(0, 10)}
        Nonce     : ${this.nonce}
        Data      : ${this.data}
        Difficulty: ${this.difficulty}`;
  }

  /**
   * function to create the first block or the genesis block
   */

  static genesis() {
    return new this(0, "----", SHA256("genesis"), [], 0, DIFFICULTY);
  }

  /**
   * function to create new blocks or to mine new blocks
   */

  static mineBlock(lastBlock, data) {
    let hash;
    let timestamp;
    const lastHash = lastBlock.hash;

    let { difficulty } = lastBlock;

    let nonce = 0;
    //generate the hash of the block
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
      // checking if we have the required no of leading number of zeros
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

