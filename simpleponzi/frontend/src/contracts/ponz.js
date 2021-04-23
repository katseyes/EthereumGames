// src/contracts/ERC721.js
import Artifact from './SimplePonzi/SimplePonzi.json';
import Deploys from './SimplePonzi/Deploys.json';
import {getWeb3, getAccount, getNetwork} from '../eth/network.js';
//import { getGasPrice } from '../eth/gasPrice';
import BN from 'bignumber.js';


export default function SimplePonzi(web3,address=null,options={}) 
{
    const abi = Artifact.abi;
    return new web3.eth.Contract(abi, address, { ...options });
}


    
export async function getDeployed() {
    const web3 = getWeb3();
    const from = await getAccount();
    const network = await getNetwork();
    var idfixed = network;
    if (network == 5777) 
        idfixed = 1337;
    const address = Deploys[idfixed];
    if (!address) throw new Error(`Could not find address for contract in network ${network}`);
    return SimplePonzi(web3, address, { from });
}