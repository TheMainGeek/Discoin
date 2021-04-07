const sha256 = require('crypto-js/sha256');
module.exports = {
	Block: class Block {
		constructor(index, timestamp, data, difficulty = 100000, precedingHash = " ") {
			this.difficulty = difficulty;
			this.index = index;
			this.timestamp = timestamp;
			this.data = data;
			this.precedingHash = precedingHash;
			this.hash = this.computeHash();
			this.payout = this.calculatePayout();
		}
		computeHash() {
			var hash = this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data);
			for (var i = 0; i < this.difficulty; i++) {
				hash = sha256(hash).toString();
			}
			return hash;
		}
		calculatePayout() {
			var num = (0.051 * this.difficulty) / 69.420;
			return Math.ceil(num * 100) / 1000;
		}
	}
}