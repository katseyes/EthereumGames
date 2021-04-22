// src/eth/network.js
import Web3 from 'web3';
let web3;


// export function getWeb3() {
//     if (!web3) {
//         web3 = new Web3(window.ethereum
//         || (window.web3 && window.web3.currentProvider)
//         || "wss://mainnet.infura.io/ws/v3/df962d2d5b4c448dbb3d13dbe7793f48");
//     } return web3;
// }


export function getWeb3() {
    if (!web3) {
        web3 = new Web3(Web3.givenProvider);
    }
    return web3;
}

export function hasProvider() {
    return !!Web3.givenProvider;
}

export async function getAccount() {
    const accounts = await window.ethereum.enable();
    return accounts[0];
}

export async function getBlockNumber() {
    return web3.eth.getBlockNumber();
}

export async function getNetwork() {
    return web3.eth.net.getId();
}