const { Blockchain } = require('./classes/blockchain.js');
const { Block } = require('./classes/block.js');
const JSONdb = require('simple-json-db');
const express = require('express');
const bodyParser = require('body-parser');

function generateString(length) {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join("");
}

const Discoin = new Blockchain();
const walletdb = new JSONdb("./data/wallets.json");
const router = express.Router();
const app = express();

const empty = "";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

router.get("/newacc", (req, res) => {
	var public = generateString(32);
	walletdb.set(public, 0)
	res.send(empty.concat('Your new wallet address is', public, '!'));
});
router.post("/mine", (req, res) => {
	if (!walletdb.has(req.body.wallet)) {return res.send("Specified wallet was not found! Go to /newacc to make a new wallet!")}
	Discoin.newBlock(new Block(
		Discoin.blockchainLength,
		Date.now(),
		{
			"miner": req.body.wallet
		},
		Math.floor(Math.random() * (999999 - 999) + 999)
	));
	var newBal = walletdb.get(req.body.wallet) + Discoin.latestBlock().calculatePayout();
	walletdb.set(req.body.wallet, newBal);
	Discoin.saveBlockchainToDisk()
	res.send(`You mined a block! ${Discoin.latestBlock().calculatePayout()} DSC has been deposited into your wallet.`);
});
router.get("/mine", (req, res) => {
	Discoin.newBlock(new Block(
		Discoin.blockchainLength,
		Date.now(),
		{
			"miner": "Zlqzuk$!0q#4yvQfHx#xZItoMW@zXTWo"
		},
		Math.floor(Math.random() * (999999 - 999) + 999)
	));
	var newBal = walletdb.get("Zlqzuk$!0q#4yvQfHx#xZItoMW@zXTWo") + Discoin.latestBlock().calculatePayout();
	walletdb.set("Zlqzuk$!0q#4yvQfHx#xZItoMW@zXTWo", newBal);
	Discoin.saveBlockchainToDisk()
	res.send(`You mined a block! Since you visited this page using GET and not POST, ${Discoin.latestBlock().calculatePayout()} DSC has been deposited into the creators' wallet.`);
});
app.listen(8080);