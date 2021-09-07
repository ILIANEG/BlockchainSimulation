import Miner from "./Miner";
import Blockchain from "./Blockchain";
import Block from "./Block";

let blockchain = new Blockchain();
let miner1 = new Miner(blockchain);
let miner2 = new Miner(blockchain);
let miner3 = new Miner(blockchain);

miner1.mine({name: 'miner1'});
miner2.mine({name: 'miner2'});
miner3.mine({name: 'miner3'});

blockchain.chain.forEach((block, i) => {
    console.log(`***BLOCK${i}***`);
    console.log(`Hash: ${block.hash()}`);
    console.log(block);
    console.log(`*********`);
})

console.log(`Is chain valid before tempering? ${blockchain.isChainValid()}`);
blockchain.chain[1].timestamp = 1;
console.log(`Is chain valid after tempering? ${blockchain.isChainValid()}`);