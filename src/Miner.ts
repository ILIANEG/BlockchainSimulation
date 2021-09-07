import Block from "./Block";
import Blockchain from "./Blockchain"

export default class Miner {
    public blockchain: Blockchain;

    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
    }

    mine(data: Object) {
        let success = false;
        let nonce = 0;
        let initTime = Block.getTimeStamp();
        while(!success) {
            if(initTime < Block.getTimeStamp()) {
                initTime = Block.getTimeStamp();
                nonce = 0;
            }
            let block = new Block(
                data,
                nonce,
                this.blockchain.getLastBlockHash()
            )
            if (this.blockchain.checkProofOfWork(block.hash())) {
                this.blockchain.addBlock(block)
                success = true;
            } else {
                nonce++;
            }
        }
    }
    
    getBlockChain() {
        return this.blockchain;
    }
}