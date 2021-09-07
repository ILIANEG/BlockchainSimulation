import Blockchain from "./Blockchain"
import {Transaction, SignedTransaction } from "./Transaction";
import { SHA256 } from "crypto-js";
import { ec } from 'elliptic';

export default class Wallet {
    public blockchain: Blockchain;
    public transactions: Array<Transaction>;
    private privateKey: Buffer;
    public publicKey: Buffer;
    public address: string

    constructor(privateKey: string, publicKey: string, blockchain: Blockchain) {
        this.blockchain = blockchain;
        this.privateKey = Buffer.from(privateKey, 'hex');
        this.publicKey = Buffer.from(publicKey, 'hex');
        this.address = SHA256(this.publicKey.toString('hex')).toString();
        this.transactions = [];
    }

    getBalance() {
        const personalAddress = SHA256(this.publicKey.toString('hex')).toString();
        let balance = 0;
        this.transactions.forEach(transaction => {
            transaction.receiver === personalAddress
                ? balance += transaction.amount 
                : balance -= transaction.amount;
        })
    }

    createTransaction(receiver: string, amount: number) {
        const ecdsa = new ec('secp256k1');
        const signature = ecdsa.sign(ecdsa.hash({sender: this.address, receiver: receiver, amount: amount}), this.privateKey);
        return new SignedTransaction(this.address, receiver, amount, this.publicKey.toString('hex'), signature)
    }

    submitNewTransaction(transaction : SignedTransaction) {
        this.blockchain.addTransaction(transaction)
    }
}