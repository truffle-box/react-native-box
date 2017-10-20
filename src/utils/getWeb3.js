import Web3 from 'web3';
import { Platform } from 'react-native';

let results;
let getWeb3 = new Promise(function(resolve, reject) {
  if (results) {
    return resolve(results);
  }
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  var web3 = window.web3;

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    web3 = new Web3(web3.currentProvider);

    results = {
      web3: web3
    };

    console.log('Injected web3 detected.');

    resolve(results);
  } else {
    // iOS and Android have different host computer hostnames.
    var testRpcUrl = '10.0.2.2';

    if (Platform.OS === 'ios') {
      testRpcUrl = 'localhost';
    }

    // Fallback to localhost if no web3 injection.
    var provider = new Web3.providers.HttpProvider('http://' + testRpcUrl + ':8545');

    web3 = new Web3(provider);

    results = {
      web3: web3
    };

    console.log('No web3 instance injected, using Local web3.');

    resolve(results);
  }
});

export default getWeb3;
