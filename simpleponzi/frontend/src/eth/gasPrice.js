// src/eth/gasPrice.js
import axios from 'axios';
import BN from 'bignumber.js';
const URL = 'https://www.etherchain.org/api/gasPriceOracle';


export async function getGasPrice() {
    const { data: gasData } = await axios.get(URL);
    const bn = new BN(gasData.fast);
    console.log(bn);
    console.log("**********");
    console.log(bn.shiftedBy(9).toString(10));
    return bn.shiftedBy(9).toString(10);
}