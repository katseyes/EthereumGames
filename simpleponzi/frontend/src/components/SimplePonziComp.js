import { getBlockNumber,getWeb3 } from '../eth/network';
import React, { Component } from 'react';
import { getGasPrice } from '../eth/gasPrice';
// import { ethers } from 'hardhat';
import BN from 'bignumber.js';



const CONFIRMATIONS = 6;

class SimplePonziComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentInvestor: null,
            currentInvestment: null,
            loading: true
        };
        this.handleInvest = this.handleInvest.bind(this);
        this.subscribeTransactions = this.subscribeTransactions.bind(this);

    }

     subscribeTransactions() 
    {
        const { contract, owner } = this.props;
        // Instantiate subscription object
        //const subscription =  getWeb3().eth.subscribe('pendingTransactions')
       // console.log("subscribing");
        contract.events.Deposit({}, (error, data) => {
            if (error)
              console.log("Error: " + error);
            else 
            {
              //console.log("Log data: " + data);
              console.log(data.returnValues._from);
              console.log(data.returnValues._value);
              this.setState({ currentInvestor:data.returnValues._from,currentInvestment:data.returnValues._value });
            } 
          });
    }


  




    async componentDidMount() 
    {
        const { contract, owner } = this.props;
        const currentBlock = await getBlockNumber();
        // TODO: gerer les reorgs
        // const confirmedBlock = currentBlock - CONFIRMATIONS;
        var _currentInvestor = await contract.methods.currentInvestor().call();
        var _currentInvestment = await contract.methods.currentInvestment().call();
       
        this.subscribeTransactions();
        this.setState({ currentInvestor:_currentInvestor,currentInvestment:_currentInvestment, loading: false });
        // contract.methods.currentInvestment().call().then(function(result)
        // {
        //  console.log(result);
        // });
    }


    // async invest() {
    //     const { contract, owner } = this.props;
    //     const from = owner;
      
    //     const currentinvest = contract.methods.currentInvestment;
    //     var tx = {
    //         to: contract.address,
    //         // for now send what's needed
    //         // todo: add a greyable editbox
    //         value: (currentinvest*1.1)//ethers.utils.parseEther("1.0")
    //     };
        
    //     //ethers.provider.sendTransaction(tx).then(function(tx) {
    //        // console.log(tx);
    //     //});

    //     web3.eth.sendTransaction(
    //         {from:from,
    //         to:contract.address,
    //         value: (currentinvest*1.1), 
            
    //             }, function(err, transactionHash) {
    //                 if (!err)
    //                   console.log(transactionHash + " success"); 
    //               });


    // }

    async handleInvest(event) {
        event.preventDefault(); 
       // await this.invest();
       const { contract, owner } = this.props;


        
       // contract.methods.mint(owner, id).send({ value, gas, gasPrice, from })


       contract.methods.currentInvestment().call().then(function(result)
       {
        console.log(result);
        // var bn = new BN(result);
        // console.log(bn);
        result = result*1.1;

        var toadd = getWeb3().utils.toWei('0.000001', 'ether');

        console.log(toadd);
        // var bn2 = new BN(getWeb3().utils.toWei('0.000001', 'ether'));

        // bn = bn + bn2;
        //var newresult = Math.ceil(result*1.1 + getWeb3().utils.toWei('0.000001', 'ether'));
        var newresult = result+toadd;

        var bn1 = new BN(result);

        var bn2 = new BN(toadd);
        var bn3 = bn1.plus(bn2)

       // var bn3 = bn1 + bn2;

        console.log(bn3);
        //console.log(newresult);
        var tx = {
            from:owner,
            to: contract.options.address,
            data:"",
            // for now send what's needed
            // todo: add a greyable editbox
            value: bn3//getWeb3().utils.toBN(newresult)//getWeb3().utils.toWei('1', 'ether')
        };

        // estimate gas
        getGasPrice().then(function(gp)
        {
        console.log(gp);
        getWeb3().eth.estimateGas(tx).then(function(gas)
        {
            tx.gas = gas;
            tx.gasPrice = gp;
            getWeb3().eth.sendTransaction(tx);
        });
        });
        //         {
        //             console.log(gas);
        //             getWeb3().eth.sendTransaction(tx);
        //         });
        //     });

      //  getWeb3().eth.sendTransaction(tx);
        // var gp = getGasPrice();
        // console.log(gp);
    //    getGasPrice().then(//function(gasPrice)
    //    {

    //     getWeb3().eth.estimateGas(tx).then(function(gas)
    //         {
    //             console.log(gas);
    //             getWeb3().eth.sendTransaction(tx);
    //         });
    //     });
    });
 

     
    }


    render() {
        const { currentInvestor,currentInvestment, loading } = this.state;
        if (loading) return "Loading";
       
        return (
          
        <form onSubmit={this.handleInvest}>
        {/* <input type="numeric" value={value}
        onChange={this.handleChange} />
        <button disabled={!mintable}>Invest</button> */}
        <h1>Simple Ponzi</h1>
        <p>Your account: {this.props.owner}</p>
        <p>current investor: {this.state.currentInvestor}</p>
        <p>current investment: {this.state.currentInvestment}</p>
          <button>Invest</button>
        </form>
        );
    }
}

// Exporting the component
export default SimplePonziComp;