import { SHA256 } from "crypto-js";

export default class Block {
    public data: Object | null;
    public timestamp: number;
    public nonce: number;
    public previousHash: string;

    constructor(data: Object | null, nonce: number, previousHash: string) {
        this.data = data;
        this.timestamp = Block.getTimeStamp();
        this.nonce = nonce;
        this.previousHash = previousHash;
    }

    hash() {
        return SHA256(JSON.stringify({
            data: this.data,
            timestamp: this.timestamp,
            nonce: this.nonce,
            previousHash: this.previousHash
        })).toString();
    }

    static getTimeStamp() {
        return Math.floor(new Date().getTime() / 1000)
    }
}