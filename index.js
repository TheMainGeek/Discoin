const { Blockchain } = require('./classes/blockchain.js');
const { Block } = require('./classes/block.js');
const Discoin = new Blockchain();
while (true) {
	Discoin.newBlock(new Block(
		Discoin.blockchainLength(),
		Date.now(),
		{},
		Math.floor(Math.random() * (99999 - 999) + 999) * Discoin.blockchainLength()
	));
	console.log(`Block ${Discoin.latestBlock().index} has been discovered with a payout of ${Discoin.latestBlock().calculatePayout()} DSC`);
	Discoin.saveBlockchainToDisk()
}