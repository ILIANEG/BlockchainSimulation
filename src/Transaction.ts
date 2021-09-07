import { randomUUID } from 'crypto';
import { ec } from 'elliptic';

export interface Transaction {
    id: string;
    sender: string;
    receiver: string;
    amount: number;
}

export class SignedTransaction implements Transaction {
    id: string;
    sender: string;
    receiver: string;
    amount: number;
    publicKey: string;
    signature: ec.Signature;

    constructor(sender: string, receiver: string, amount: number, publicKey: string, signature: ec.Signature) {
        const ecdsa = new ec('secp256k1');
        this.id = randomUUID(),
        this.sender = sender,
        this.receiver = receiver,
        this.amount = amount
        this.publicKey = publicKey;
        this.signature = signature;
    }

    static verifyTransaction(transaction: Transaction, publicKey: Buffer, signature: ec.Signature) {
        const ecdsa = new ec('secp256k1');
        return ecdsa.verify(ecdsa.hash({sender: transaction.sender, receiver: transaction.receiver, amount: transaction.amount}), signature, publicKey)
    }
}