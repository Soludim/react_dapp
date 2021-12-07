import Web3 from "web3";

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        
        //getting metamask for user to install
        const yes = window.confirm('Metamask is required. Confirm to add metamask and refresh page');
        if (yes) window.open('https://metamask.io/', '_blank');
        resolve(web3);
      }
    });

export default getWeb3;
