const Blockchain = require(".");
const Block = require("./block");
describe("Blockchain", () => {
  let blockchain, blockchain2;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

 

    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it("replaces the chain with a valid chain", () => {
    blockchain2.addBlock("goo");
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it("does not replaces the chain with a one with less than or equal to chain", () => {
    blockchain.addBlock("foo");
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });
});
