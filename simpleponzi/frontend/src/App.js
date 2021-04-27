import React, { Component } from 'react';
import { getDeployed } from './contracts/ponz';
import { hasProvider, getAccount } from './eth/network';
import SimplePonziComp from './components/SimplePonziComp';


class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {contract:null, sender:null};
  }

  async componentDidMount() {
    if (hasProvider()) {
      const contract = await getDeployed();
      const sender = await getAccount();
      this.setState({ contract, sender });

      window.ethereum.on('accountsChanged', async (accounts)=>{
        this.setState({ sender: accounts[0] });
        });


        window.ethereum.on('chainChanged', (chainId) => {
          // Handle the new chain.
          // Correctly handling chain changes can be complicated.
          // We recommend reloading the page unless you have good reason not to.
          window.location.reload();
        });
    }
  }
  render() {
    const { contract, sender } = this.state;
    return (
      // <div className="App">
      // { (hasProvider() && contract && sender)
      // ? <SimplePonziComp contract={contract} owner={sender} key={sender} />
      // : <div>Please enable Metamask and reload</div>
      // }
      // </div>

      <div className="App">
      { (hasProvider() && sender)
      ? ((contract)?(<SimplePonziComp contract={contract} owner={sender} key={sender} />):<div>Contract not found make sure you are on the right network</div>)
      : <div>Please enable Metamask and reload</div>
      }
      </div>
    );
  }

 
}
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
