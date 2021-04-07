const { Block } = require('./block.js');
const fs = require('fs');
module.exports = {
	Blockchain: class Blockchain {
		constructor(blockchainFile = "./data/blockchain.json") {
			this.blockchainFile = blockchainFile;
			this.blockchain = [this.genesisBlock()];
		}
		genesisBlock() {
			return new Block(0, Date.now(), "Genesis Block", 1, "0");
		}
		latestBlock() {
			return this.blockchain[this.blockchain.length - 1];
		}
		blockchainLength() {
			return this.blockchain.length;
		}
		newBlock(block) {
			block.precedingHash = this.latestBlock().hash;
			block.hash = block.computeHash();
			this.blockchain.push(block);
		}
		saveBlockchainToDisk() {
			fs.writeFileSync(this.blockchainFile, JSON.stringify(this.blockchain))
		}
	}
}