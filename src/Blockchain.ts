import Block from "./Block";
import { Node } from "./Node";
import { SignedTransaction, Transaction } from "./Transaction";

export default class Blockchain {
    public chain: Array<Block>;
    public trasnactions: Array<SignedTransaction>;
    public nodes: Set<Node>;

    constructor() {
        this.chain = [];
        this.trasnactions = [];
        this.nodes = new Set();
    }

    addBlock(block: Block) {
        this.chain.push(block);
    }

    getLastBlockHash() {
        if (this.chain.length === 0) return '0';
        else return this.chain[this.chain.length - 1].hash()
    }

    isChainValid() {
        return this.chain.every((block, i, chain) => {
            if (i === 0 && block.previousHash != '0') return false;
            else if (i !== 0 && block.previousHash !== chain[i-1].hash()) return false;
            return this.checkProofOfWork(block.hash());
        });
    }

    checkProofOfWork(hash: string) {
        return hash.slice(0, 4) === '0000';
    }

    /**
     * 
     * @param sender address of sender
     * @param receiver address of receiver
     * @param amount amount trabsferred
     * @returns index of te block which will take care of given transaction
     */
    addTransaction(transaction: SignedTransaction) {
        this.nodes.forEach(node => {
            if(node.wallet.address === transaction.sender) {
                SignedTransaction.verifyTransaction(transaction, node.wallet.publicKey, transaction.signature)
            }
        })
        this.trasnactions.push(transaction)
        return this.chain[this.chain.length];
    }

}