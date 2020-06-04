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


/* DELETE peer */
router.get("/peer/:id/delete", function (req, res, next) {
  peers.splice(req.params.id - 1, 1);
  res.redirect("back");
});

/* CONNECT peer */
router.get("/peer/:id/connect/:idPeerConnect", function (req, res, next) {
  peers[req.params.id - 1].connect[req.params.idPeerConnect - 1] = true;
  peers[req.params.idPeerConnect - 1].connect[req.params.id - 1] = true;
  blockchainReceiver = peers[req.params.id - 1].blockchain;
  blockchainSender = peers[req.params.idPeerConnect - 1].blockchain;
  handleConnect(blockchainReceiver, blockchainSender);
  handleConnect(blockchainSender, blockchainReceiver);
  res.redirect("back");
});

/* DISCONNECT peer */
router.get("/peer/:id/disconnect/:idPeerConnect", function (req, res, next) {
  peers[req.params.id - 1].connect[req.params.idPeerConnect - 1] = false;
  peers[req.params.idPeerConnect - 1].connect[req.params.id - 1] = false;
  console.log(peers[req.params.id - 1].connect);
  res.redirect("back");
});

/* ADD Peer */
router.get("/addPeer", function (req, res, next) {
  console.log("addPeer");
  peers.push({
    name: peers.length + 1,
    blockchain: new Blockchain(),
    connect: {},
  });
  peers.length > 1 ? res.redirect("back") : res.redirect("/");
});

module.exports = router;
