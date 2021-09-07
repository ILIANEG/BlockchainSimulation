import { ec } from 'elliptic';
import { randomBytes } from 'crypto';

function genreateRandom32(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        randomBytes(32, (error, buffer) => {
            if (error) reject(error);
            else resolve(buffer);
        })
    })
}

async function generatePrivateKey() {
    const ecdsa = new ec('secp256k1');
    const max = Buffer.from('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', 'hex');

    let isInvalid = true;
    let privateKey: Buffer = await genreateRandom32();
    while(isInvalid) {
        if (Buffer.compare(max, privateKey) === 1) isInvalid = false;
        else privateKey = await genreateRandom32();
    }
    return privateKey;
}

async function generatePublicKey(privateKey: Buffer) {
    const ecdsa = new ec('secp256k1');
    const keys = ecdsa.keyFromPrivate(privateKey);
    const publicKey = keys.getPublic('hex');
    return publicKey
}

generatePrivateKey().then(privateKey => {
    generatePublicKey(privateKey).then(publicKey => {
        console.log('PRIVATE KEY:', privateKey.toString('hex'));
        console.log('PUBLIC KEY:', publicKey);

    })
})