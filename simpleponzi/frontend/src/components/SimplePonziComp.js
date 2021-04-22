import { getBlockNumber,getWeb3 } from '../eth/network';
import React, { Component } from 'react';
import { getGasPrice } from '../eth/gasPrice';
import { ethers } from 'hardhat';
//mport BN from 'bignumber.js';



const CONFIRMATIONS = 6;

class SimplePonziComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };

    }



    async componentDidMount() {

 
    }


    async invest() {
        const { contract, owner } = this.props;
        const from = owner;
      
        const currentinvest = contract.methods.currentInvestment;
        var tx = {
            to: contract.address,
            // for now send what's needed
            // todo: add a greyable editbox
            value: (currentinvest*1.1)//ethers.utils.parseEther("1.0")
        };
        
        ethers.provider.sendTransaction(tx).then(function(tx) {
           // console.log(tx);
        });
    }

    async handleInvest(event) {
        event.preventDefault();
        invest();

     
    }


    render() {
       
        return (
        <form onSubmit={this.handleInvest}>
        {/* <input type="numeric" value={value}
        onChange={this.handleChange} />
        <button disabled={!mintable}>Invest</button> */}
          <button>Invest</button>
        </form>
        );
    }
}

// Exporting the component
export default SimplePonziComp;