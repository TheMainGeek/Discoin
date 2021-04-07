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
	res.send(empty.concat('{"address": "', public, '"}'));
});

app.listen(8080);