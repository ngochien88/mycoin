const Block = require("./block");

/**
 * describe is jest specific function
 * name of the object as string for which the test is written
 * function that will define a series of tests
 */
describe("Block", () => {
  let data, lastBlock, block;
  /**
   * beforeEach allows us to run some code before
   * running any test
   * example creating an instance
   */
  beforeEach(() => {
    data = "bar";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });
  /**
   * it function is used to write unit tests
   * first param is a description
   * second param is callback arrow function
   */
  
});
