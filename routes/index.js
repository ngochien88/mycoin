var express = require("express");
var router = express.Router();
const Blockchain = require("../blockchain");
const blockchain = new Blockchain();

const peers = [{ name: 1, blockchain: new Blockchain(), connect: {} }];

const handleConnect = (blockchainReceiver, blockchainSender) => {
  //Received lasted block
  lastedBlockSender = blockchainSender.chain[blockchainSender.chain.length - 1];
  if (blockchainReceiver.isValidBlock(lastedBlockSender))
    blockchainReceiver.chain.push(lastedBlockSender);
  else if (blockchainSender.chain.length > blockchainReceiver.chain.length)
    if (blockchainReceiver.isValidChain(blockchainSender.chain))
      blockchainReceiver.replaceChain(blockchainSender.chain);
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect(`peer/${peers.length}`);
});
/* GET Peer */
router.get("/peer/:id", function (req, res, next) {
  if (!peers[req.params.id - 1] && req.params.id > 0)
    res.redirect(`/peer/${req.params.id - 1}`);
  res.render("index", {
    title: "Peer " + req.params.id,
    peers: peers,
    peer: peers[req.params.id - 1],
    index: req.params.id,
  });
});

/* ADD data of peer */
router.post("/peer/:id/addData", function (req, res, next) {
  peers[req.params.id - 1].blockchain.addBlock(req.body.data);
  peers.forEach((peer, index) => {
    if (peers[req.params.id - 1].connect[index]) {
      blockchainSender = peers[req.params.id - 1].blockchain;
      blockchainReceiver = peers[index].blockchain;
      handleConnect(blockchainReceiver, blockchainSender);
    }
  });
  res.redirect("back");
});



module.exports = router;
