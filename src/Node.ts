import Blockchain from "./Blockchain";
import Miner from "./Miner";
import Wallet from "./Wallet";

export class Node extends Miner {
    public wallet: Wallet

    constructor(wallet: Wallet, blockchain: Blockchain) {
        super(blockchain);
        this.wallet = wallet;
    }
}